# secret-note-API
REST API to create, handle and encrypt using AES-256 standard for a single user.

## Why Choosing Symmetric approach for Encrypting Notes?

Due to its speed, efficiency, simplicity in key management, and strong security features. It allows for quick and secure encryption and decryption, making it well-suited for applications where users frequently read and write notes.

Asymmetric Encryption, involves the use of key pairs, making the encryption and decryption process more complex and slower. It’s typically used for secure key exchange and digital signatures rather than for bulk data encryption.

Regarding to hashing, it's a one-way process and cannot be used to encrypt and then decrypt data. It’s ideal for data integrity checks and password storage but not for protecting the confidentiality of notes that need to be read back.


## Why Choosing AES-256 for Encrypting Notes?

* It uses a very large key size, making it really hard for attackers to crack. It’s been thoroughly tested and is considered very secure by experts.

* It is the go-to encryption method recommended by many security guidelines and regulations. 

* It works quickly and smoothly, even with large amounts of data. It’s efficient enough to be used on everything from powerful servers to smartphones, what would be a huge advantages if we want to build a secret notes app. 

* It has symmetric Encryption, meaning it uses the same key to encrypt and decrypt, simplifying the process.

* Most cryptographic libraries and tools support AES-256, making it easy to implement.

* It’s been around for a long time, so the available tools and libraries are well-tested and reliable.

### Compared to Other Methods of symmetric encryption

* **RSA**: Better for encrypting keys rather than data due to being slower.

* **3DES**: Older and less secure, also slower than AES.

* **Blowfish**: Can be secure but is less commonly used and has some limitations compared to AES.

## Getting started

Run ```npm run i``` and ```npm run start```

Start docker container by running ```docker-compose up``` with  ```--build``` flag if you run it for the first time.

## Run tests

Run ```npm run test```

## API Documentation

Once the server starts, you can see the API documentation navigating to [localhost://3000/api-docs](https://localhost://3000/api-docs)

