# Express Server for Form Submissions
This Repositry contains an server written in Typescript using Express.js to handle form submissions.


## Setup
To run this server locally make sure to follow these steps : 

1 . **Clone the repositry:**
```bash
  git clone https://github.com/lgsurith/json-db-backend.git
  cd json-db-backend
```
2. **Installing the Dependencies :**
```bash
   npm install
   pnpm install
```
3. **To Start the Server :**
```bash
  npm start
  pnpm start
```
As indicated in the port , it will start at 'https://localhost:3000'.

## API Endpoints

- **GET /ping**
  
  Checks if the server is running and the port connection is established.
 ![read](https://github.com/lgsurith/json-db-backend/assets/117572209/9d10cc38-c45b-499b-b4c5-e92773490212)

- **POST /submit**
  
  Creates a new submission as per the interface.
  ![submit](https://github.com/lgsurith/json-db-backend/assets/117572209/623613a5-f855-4941-a992-66183d057929)

- **GET /read**
  
  Retrieves a submission by quering in index.
  ![read](https://github.com/lgsurith/json-db-backend/assets/117572209/67153371-3324-42d1-a35e-7e4ef33fc1e2)

- **DELETE /submissions/:index**
  
  Deletes a submission by index.
  ![delete](https://github.com/lgsurith/json-db-backend/assets/117572209/7919a9a7-964b-4580-8544-5e12d64a6169)

- **PUT /edit/:index**
  
  Updates a submission by index.
  ![update](https://github.com/lgsurith/json-db-backend/assets/117572209/bafad76b-9c81-416b-9140-f011886cdfbb)

- **GET /search**
  
  Searches for a submission by quering in your email.
  ![email](https://github.com/lgsurith/json-db-backend/assets/117572209/9d43f6b6-407e-4259-817c-263f7dbc16e8)

  
