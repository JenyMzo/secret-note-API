import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretNote } from '../typeorm/entities/secret-note.entity';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { encrypt } from '../crypto/utils';

@Injectable()
export class SecretNoteService {
  constructor(
    @InjectRepository(SecretNote)
    private secretNoteRepository: Repository<SecretNote>,
  ) {}

  async create(createNoteDto: CreateSecretNoteDto): Promise<SecretNote> {
    const encryptedNote = encrypt(createNoteDto.note);
    const secretNote = this.secretNoteRepository.create({
      note: createNoteDto.note,
      encryptedNote,
    });
    return this.secretNoteRepository.save(secretNote);
  }

  findAll(): Promise<SecretNote[]> {
    return this.secretNoteRepository.find({
      select: ['id', 'createdAt'],
    });
  }

  async findOneDecrypted(id: number): Promise<SecretNote> {
    const note = await this.secretNoteRepository.findOne({
      where: { id },
      select: ['note']
    });

    if(!note) {
      throw new NotFoundException(`SecretNote with id ${id} not found`);
    }

    return note;
  }


  async findOneEncrypted(id: number): Promise<SecretNote> {
    const note = await this.secretNoteRepository.findOne({
      where: { id },
      select: ['encryptedNote'],
    });

    if(!note) {
      throw new NotFoundException(`SecretNote with id ${id} not found`);
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateSecretNoteDto): Promise<SecretNote> {
    const note = await this.secretNoteRepository.findOne({
      where: { id }
    });

    if (!note) {
      throw new NotFoundException(`SecretNote with id ${id} not found`);
    }

    note.note = updateNoteDto.note;
    note.encryptedNote = encrypt(updateNoteDto.note);
    return this.secretNoteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    const result = await this.secretNoteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`SecretNote with id ${id} not found`);
    }
  }
}
