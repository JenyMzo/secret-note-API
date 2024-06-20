import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecretNote } from './entities/secret-note.entity';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { encrypt, decrypt } from '../crypto/utils';

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
      where: { id }
    });
    note.note = decrypt(note.encryptedNote);
    return note;
  }


  findOneEncrypted(id: number): Promise<SecretNote> {
    return this.secretNoteRepository.findOne({
      where: { id },
      select: ['id', 'encryptedNote'],
    });
  }

  async update(id: number, updateNoteDto: UpdateSecretNoteDto): Promise<SecretNote> {
    const note = await this.secretNoteRepository.findOne({
      where: { id }
    });
    note.note = updateNoteDto.note;
    note.encryptedNote = encrypt(updateNoteDto.note);
    return this.secretNoteRepository.save(note);
  }

  remove(id: number): Promise<void> {
    return this.secretNoteRepository.delete(id).then(() => {});
  }
}
