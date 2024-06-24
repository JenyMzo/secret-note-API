import { Module } from '@nestjs/common';
import { SecretNoteService } from './secret-note.service';
import { SecretNoteController } from './secret-note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretNote } from '../typeorm/entities/secret-note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ SecretNote ])
  ],
  controllers: [SecretNoteController],
  providers: [SecretNoteService],
})
export class SecretNoteModule {}
