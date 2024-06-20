import { Test, TestingModule } from '@nestjs/testing';
import { SecretNoteService } from './secret-note.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SecretNote } from './entities/secret-note.entity';
import { Repository } from 'typeorm';

describe('SecretNoteService', () => {
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
});
