# Syte dashboard

This project is a full-stack application that allows users to manage catalogs metadata.
Users can view, add, update, delete catalogs, and perform bulk delete actions.

## Table of Contents

- [Catalog Management Dashboard](#catalog-management-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
    - [1. Backend](#backend)
    - [2. Frontend](#frontend)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

## Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/assaf888/syteAssignment.git
   cd syteAssignment
   ```


2. ## Backend:

   ```cd server
   npm install
   npm run build
   npm start
   ```

3. ## Frontend:

   ```
   cd ../client
   npm install
   npm start
   ```

## Running the project
### Backend
Create .env file in the backend folder and add the following
```
PORT=3001
MONGODB_URI=mongo_connection_string (sent in mail)
JWT_SECRET=jwt_secret (sent in mail)
```

Run the backend
```
npm start
```
### Frontend
```
cd ../client
npm start
```


Backend will run on 3001 port and the frontend will run on 3000 (react default)
