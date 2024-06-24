import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from 'typeorm';
  
  @Entity()
  export class SecretNote {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    note: string;
  
    @Column()
    encryptedNote: string;

    @CreateDateColumn()
    createdAt: Date;
  }