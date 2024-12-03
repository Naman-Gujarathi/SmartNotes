# Smart Notes

This is a Express.js API for managing notes. It allows users to create, read, update, and delete notes, along with fetching information about countries using an external API.

## Features

- **Create Note:** Add a new note with a title and description.
- **Get Note by ID:** Fetch a note using its unique ID.
- **Update Note:** Modify an existing note by ID.
- **Delete Note:** Remove a note by ID.
- **Fetch Country Info:** Retrieve information about a country by its name using the [REST Countries API](https://restcountries.com/).

## Endpoints

### Notes
1. **POST `/notes`**
   - Create a new note.
   - Request Body: `{ "title": "string", "description": "string" }`

2. **GET `/notes/:id`**
   - Retrieve a note by its ID.

3. **PUT `/notes/:id`**
   - Update an existing note by its ID.
   - Request Body: `{ "title": "string", "description": "string" }`

4. **DELETE `/notes/:id`**
   - Delete a note by its ID.

### Country Info
1. **GET `/countryinfo/:value`**
   - Fetch information about a country by its name.

## Validation Rules
- **Title & Description:** Required, must be strings, cannot be empty.
- **Title:** Max length of 50 characters.
- **Description:** Max length of 200 characters.
- **ID Validation:** Ensures valid MongoDB ObjectID format.

## Error Handling
- Proper error messages for validation failures and server issues.
- Handles missing fields, invalid data types, and server errors gracefully.

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
