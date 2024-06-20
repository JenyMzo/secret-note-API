import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
  
export class CreateSecretNoteDto {
    @IsNotEmpty()
    @IsString()
    note: string;
  
    @IsNotEmpty()
    @IsString()
    encryptedNote: string;
}
 