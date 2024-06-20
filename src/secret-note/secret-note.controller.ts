import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecretNoteService } from './secret-note.service';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
// import { CreateSecretNoteDto, UpdateSecretNoteDto } from './dto';

@Controller('secret-note')
export class SecretNoteController {
  constructor(private readonly secretNoteService: SecretNoteService) {}

  @Post()
  create(@Body() createSecretNoteDto: CreateSecretNoteDto) {
    return this.secretNoteService.create(createSecretNoteDto);
  }

  @Get()
  findAll() {
    return this.secretNoteService.findAll();
  }

  @Get(':id/decrypted')
  findOneDecrypted(@Param('id') id: string) {
    return this.secretNoteService.findOneDecrypted(+id);
  }

  @Get(':id/encrypted')
  findOneEncrypted(@Param('id') id: string) {
    return this.secretNoteService.findOneEncrypted(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecretNoteDto: UpdateSecretNoteDto) {
    return this.secretNoteService.update(+id, updateSecretNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secretNoteService.remove(+id);
  }
}
