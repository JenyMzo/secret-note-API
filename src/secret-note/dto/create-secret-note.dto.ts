import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
  
export class CreateSecretNoteDto {
    @ApiProperty({
        example: 'This is a note example',
        required: true
     })
    @IsNotEmpty()
    @IsString()
    note: string;
}
