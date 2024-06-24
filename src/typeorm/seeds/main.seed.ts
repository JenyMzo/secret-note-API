import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../database/data-source';
import { SecretNote } from '../entities/secret-note.entity';

const dataSource = new DataSource(dataSourceOptions);
const userRepository = dataSource.getRepository(SecretNote);

async function connect() {
  try {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    await dataSource.initialize();
    console.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source connect', err);
  }
}

async function disconnect() {
  try {
    await dataSource.destroy();

    console.log('Data Source disconnected!');
  } catch (err) {
    console.error('Error during Data Source disconnect', err);
  }
}

async function seed() {
  const SecretNoteSeed = () => [
    {
      note: 'lalalala',
      encryptedNote: 'u48z34ithf934z83z483tu4hf34'
    }
  ];

  await userRepository.save(SecretNoteSeed());
  console.log('created seeds');
}

async function runSeed() {
  await connect();
  console.log('connected');
  await seed();
  console.log('seed done');
  await disconnect();
  console.log('disconnected');
}

runSeed();
