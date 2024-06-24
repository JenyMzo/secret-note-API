import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecretNoteService } from './secret-note.service';
import { CreateSecretNoteDto } from './dto/create-secret-note.dto';
import { UpdateSecretNoteDto } from './dto/update-secret-note.dto';
import { ApiBody, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('SecretNote')
@Controller('secret-note')
export class SecretNoteController {
  constructor(private readonly secretNoteService: SecretNoteService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 404, description: 'Not Found.'})
  @ApiBody({
      type: CreateSecretNoteDto,
      description: 'Json structure for Secret note object',
  })
  create(@Body() createSecretNoteDto: CreateSecretNoteDto) {
    return this.secretNoteService.create(createSecretNoteDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Ok.' })
  @ApiResponse({ status: 404, description: 'Not Found.'})
  findAll() {
    return this.secretNoteService.findAll();
  }

  @Get(':id/decrypted')
  @ApiResponse({ status: 200, description: 'Ok.' })
  @ApiResponse({ status: 404, description: 'Not Found.'})
  findOneDecrypted(@Param('id') id: string) {
    return this.secretNoteService.findOneDecrypted(+id);
  }

  @Get(':id/encrypted')
  @ApiResponse({ status: 200, description: 'Ok.' })
  @ApiResponse({ status: 404, description: 'Not Found.'})
  findOneEncrypted(@Param('id') id: string) {
    return this.secretNoteService.findOneEncrypted(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ok.' })
  @ApiResponse({ status: 404, description: 'Not Found.'})
  update(@Param('id') id: string, @Body() updateSecretNoteDto: UpdateSecretNoteDto) {
    return this.secretNoteService.update(+id, updateSecretNoteDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Ok.' })
  @ApiResponse({ status: 404, description: 'Not Found.'})
  remove(@Param('id') id: string) {
    return this.secretNoteService.remove(+id);
  }
}
