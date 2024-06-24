import { Test, TestingModule } from '@nestjs/testing';
import { SecretNoteController } from './secret-note.controller';
import { SecretNoteService } from './secret-note.service';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { SecretNote } from './../typeorm/entities/secret-note.entity';

describe('SecretNoteController', () => {
  let controller: SecretNoteController;
  let service: SecretNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecretNoteController],
      providers: [
        {
          provide: SecretNoteService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOneDecrypted: jest.fn(),
            findOneEncrypted: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SecretNoteController>(SecretNoteController);
    service = module.get<SecretNoteService>(SecretNoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with the correct parameters', async () => {
      const createDto: CreateSecretNoteDto = { note: 'Test Note' };
      const result = { id: 1, ...createDto, encryptedNote: 'encryptedNote', createdAt: new Date() };
      jest.spyOn(service, 'create').mockResolvedValue(result);
  
      expect(await controller.create(createDto)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return the result', async () => {
      const result = [{ id: 1, createdAt: new Date() }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as SecretNote[]);
  
      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneDecrypted', () => {
    it('should call service.findOneDecrypted with the correct id', async () => {
      const result = { id: 1, note: 'Test Note' };
      jest.spyOn(service, 'findOneDecrypted').mockResolvedValue(result as SecretNote);
  
      expect(await controller.findOneDecrypted('1')).toBe(result);
      expect(service.findOneDecrypted).toHaveBeenCalledWith(1);
    });
  });

  describe('findOneEncrypted', () => {
    it('should call service.findOneEncrypted with the correct id', async () => {
      const result = { id: 1, encryptedNote: 'encryptedNote' };
      jest.spyOn(service, 'findOneEncrypted').mockResolvedValue(result as SecretNote);
  
      expect(await controller.findOneEncrypted('1')).toBe(result);
      expect(service.findOneEncrypted).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call service.update with the correct parameters', async () => {
      const updateDto: UpdateSecretNoteDto = { note: 'Updated Note' };
      const result = { id: 1, ...updateDto, encryptedNote: 'encryptedUpdatedNote', createdAt: new Date() };
      jest.spyOn(service, 'update').mockResolvedValue(result as SecretNote);
  
      expect(await controller.update('1', updateDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith(1, updateDto);
    });
  });

  describe('remove', () => {
    it('should call service.remove with the correct id', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue();
  
      await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
  
});
