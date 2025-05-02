TBR App Overview

TBR App is a web application developed using:
Frontend: React
Backend: Hapi.js
Database: MongoDB
Deployment: EC2

Setup Instructions

Backend:
1. Go into the backend folder:
   cd backend
2. Make a .env file
    nano .env
3. Add this to .env file
    MONGO_URI=mongodb://localhost:27017/tbr
4. Install NPM (Node Package Manager)
    npm install
5. Start the backend development server
    node index.js

Frontend:
1. Go into the frontend folder
    cd frontend
2. Go into the tbr-tracker folder
    cd tbr-tracker
3. Install NPM (Node Package Manager)
    npm install
4. Start the frontend development server
    npm start

Project Structure

TBR-App/
│
├── frontend/
|    |──tbr-tracker/         
│       ├── src/components/
│       ├── App.js
│       └── index.js
│
├── backend/              
│   ├── models/
│   ├── src/routes/
│   ├── index.js
│   └── .env
│
└── README.md             


API Documentation

URL: http://localhost:4000

Endpoints: 

GET /books
Retrieve a list of all books.
Method: GET
Path: /books

Response:
{
  "data": [
    {
      "id": "1",
      "title": "Sample",
      "author": "Sample",
      "status": "To Read"
    },
    {
      "id": "2",
      "title": "Sample2",
      "author": "Sample2",
      "status": "Reading"
    }
  ]
}

GET /books/{id}
Retrieve a single book by its ID.
Method: GET
Path: /books/{id}

{
  "data": {
    "id": "2",
      "title": "Sample2",
      "author": "Sample2",
      "status": "Reading"
      "description": "Sample2"
  }
}

POST /books
Add a new book.
Method: POST
Path: /books

{
  "title": "New Book Title",
  "author": "Author Name",
  "status": "To Read",
  "description": "A brief description of the book"
}

After Post 
{
  "status": "success",
  "data": {
    "id": "3",
    "title": "Sample3",
    "author": "Sample3",
    "status": "To Read",
    "description": "Sample3"
  }
}

PUT /books/{id}
Update existing book.
Method: PUT
Path: /books/{id}

{
  "title": "Updated Book Title",
  "author": "Updated Author",
  "status": "Finished",
  "description": "Updated description of the book"
}

After PUT
{
  "status": "success",
  "data": {
    "id": "1",
    "title": "Sample1",
    "author": "Sample1",
    "status": "Finished",
    "description": "Sample1"
  }
}

DELETE /books/{id}
Delete existing book.
Method: DELETE
Path: /books/{id}

{
  "status": "success",
  "message": "Book deleted"
}
