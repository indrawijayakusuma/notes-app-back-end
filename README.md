# Project Name: Notes API using Node.js with Hapi

## Description

The **Notes API** project is a RESTful API designed to manage personal notes. It is built using Node.js with the Hapi framework. The primary goal of this project is to provide an interface for creating, retrieving, updating, and deleting notes.

The API allows users to perform various operations, such as adding new notes, retrieving note details, updating note content, and deleting notes. It provides endpoints to interact with the notes collection and supports CRUD (Create, Read, Update, Delete) operations.

## Features

- **Create Note:** Users can add new notes by providing a title and content for the note.
- **Retrieve Note:** The API allows users to retrieve information about a specific note by its unique identifier or fetch a list of all notes.
- **Update Note:** Users can update the content of an existing note, modifying the title or the actual content.
- **Delete Note:** The API provides an endpoint to delete a note based on its unique identifier.
- **Validation:** Input data is validated to ensure that the required fields are provided.
- **Error Handling:** The API includes error handling mechanisms to provide meaningful error messages and appropriate HTTP status codes.

## Technologies Used

- Node.js
- Hapi framework
- JavaScript
- npm (Node Package Manager)

## Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (along with npm)

## Installation

1. Clone the repository:

```bash
https://github.com/indrawijayakusuma/notes-app-back-end.git
```
2. Install dependencies:
```bash
cd notes-app-back-end
npm install
```
3. Run the application:
```bash
npm start
```
4. Access the API:
The API will be available at http://localhost:5000. You can use tools like Postman or curl to interact with the endpoints.

## API Endpoints

The following endpoints are available:

- `GET /notes`: Retrieve a list of all notes.
- `GET /notes/{id}`: Retrieve details of a specific note.
- `POST /notes`: Create a new note.
- `PUT /notes/{id}`: Update content of a specific note.
- `DELETE /notes/{id}`: Delete a specific note.

For detailed information on request and response payloads, please refer to the API documentation or explore the codebase.

