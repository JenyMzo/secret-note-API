import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SecretNoteService } from './secret-note.service';
import { SecretNote } from '../typeorm/entities/secret-note.entity';
import { Repository } from 'typeorm';
import { encrypt } from '../crypto/utils';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';

describe('SecretNoteService', () => {
  const testNotes = [
    { 
      id: 1, 
      note: 'Test Note 1',
      encryptedNote: '12345987654:abc',
      createdAt: new Date() 
    },
    { 
      id: 2, 
      note: 'Test Note 2',
      encryptedNote: '12345987654:deft',
      createdAt: new Date() 
    },
  ];

  let service: SecretNoteService;
  let repository: Repository<SecretNote>;
 
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecretNoteService,
        {
          provide: getRepositoryToken(SecretNote),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SecretNoteService>(SecretNoteService);
    repository = module.get<Repository<SecretNote>>(getRepositoryToken(SecretNote));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and encrypt a note successfully', async () => {
      const createNoteDto: CreateSecretNoteDto = { note: 'Test Note' };
      const encryptedNote = encrypt(createNoteDto.note);
      const savedNote = { id: 1, note: createNoteDto.note, encryptedNote, createdAt: new Date() };
      jest.spyOn(repository, 'create').mockReturnValue(savedNote);
      jest.spyOn(repository, 'save').mockResolvedValue(savedNote);

      const result = await service.create(createNoteDto);
      expect(repository.create).toHaveBeenCalledWith({ note: createNoteDto.note, encryptedNote });
      expect(repository.save).toHaveBeenCalledWith(savedNote);
      expect(result).toEqual(savedNote);
    });

    it('should throw validation error for empty note', async () => {
      const createNoteDto: CreateSecretNoteDto = { note: '' };
      await expect(service.create(createNoteDto)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      
      jest.spyOn(repository, 'find').mockResolvedValue(testNotes);
      expect(await service.findAll()).toBe(testNotes);
    });
  });

  describe('findOneDecrypted', () => {
    it('should return a decrypted note by id', async () => {
      const note = { id: 1, note: 'Test Note 1' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(note as SecretNote);
      expect(await service.findOneDecrypted(1)).toBe(note);
    });

    it('should handle not found errors', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findOneDecrypted(3)).rejects.toThrow();
    });
  });

  describe('findOneEncrypted', () => {
    it('should return an encrypted note by id', async () => {
      const note = { id: 1, encryptedNote: 'encrypted_note' };
      jest.spyOn(repository, 'findOne').mockResolvedValue(note as SecretNote);
      expect(await service.findOneEncrypted(1)).toBe(note);
    });
  });

  describe('update', () => {
    it('should update and encrypt a note successfully', async () => {
      const updateNoteDto: UpdateSecretNoteDto = { note: 'Updated Note' };
      const existingNote = { id: 1, note: 'Old Note', encryptedNote: 'old_encrypted_note', createdAt: new Date() };
      const updatedNote = { ...existingNote, note: updateNoteDto.note, encryptedNote: encrypt(updateNoteDto.note) };

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingNote);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedNote);

      const result = await service.update(1, updateNoteDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith(updatedNote);
      expect(result).toEqual(updatedNote);
    });

    it('should handle not found errors', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.update(1, { note: 'Updated Note' })).rejects.toThrow();
    });
  });

  describe('remove', () => {
    it('should remove a note successfully', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({} as any);
      await expect(service.remove(1)).resolves.not.toThrow();
    });
  });
});
