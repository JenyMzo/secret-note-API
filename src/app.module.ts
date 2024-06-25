import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretNoteModule } from './secret-note/secret-note.module';
import { SecretNote } from './typeorm/entities/secret-note.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [SecretNote],
      database: process.env.POSTGRES_DATABASE,
      synchronize: process.env.NODE_ENV !== 'production', // Disable synchronize in production
      logging: process.env.NODE_ENV !== 'production',     // Disable logging in production
    }),
    SecretNoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
