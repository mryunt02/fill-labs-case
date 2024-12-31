# Go questions

## Questions

1. **Sort Words by 'a' Characters**:

   - Function: `sortWords`
   - Description: Sorts words by the number of 'a' characters in decreasing order, by length if the number of 'a' characters is the same, and lexicographically if lengths are the same.
   - Example:
     ```go
     words := []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"}
     sortedWords := sortWords(words)
     fmt.Println("Sorted words:", sortedWords)
     ```

2. **Generate Sequence**:

   - Function: [generateSequence](http://_vscodecontentref_/1)
   - Description: Generates a sequence of numbers based on the given input.
   - Example:
     ```go
     number := 9
     result := generateSequence(number)
     fmt.Println("Generated sequence:")
     for _, num := range result {
         fmt.Println(num)
     }
     ```

3. **Most Repeated Word**:
   - Function: [mostRepeated](http://_vscodecontentref_/2)
   - Description: Finds the most repeated string in the given slice.
   - Example:
     ```go
     wordsForQ3 := []string{"apple", "pie", "apple", "red", "red", "red","apple","apple","apple"}
     mostRepeatedWord := mostRepeated(wordsForQ3)
     fmt.Println("Most repeated word:", mostRepeatedWord)
     ```

# User Management System

This is a simple User Management System built using Go for the backend and React with TypeScript and Next.js for the frontend. The system supports basic CRUD operations (Create, Read, Update, Delete) for managing users, with persistent storage via an SQLite database.

## Features

- **Master View**: Displays all users in a data grid with buttons for CRUD operations (New, Edit, Delete).
- **Detailed View**: Displays the user details in a form with buttons that change based on the operation selected (Create, Save, Delete).
- **REST API**: Exposes a RESTful API to perform CRUD operations on users.
- **SQLite**: A lightweight, persistent database to store user data.
- **Backend (Go)**: Written in Go using the Gorilla Mux router.
- **Frontend (React + TypeScript + Next.js)**: A React-based frontend with TypeScript, integrated with Next.js.

## Tech Stack

### Backend:

- Go (Golang)
- Gorilla Mux (Routing)
- SQLite (Database)

### Frontend:

- React (UI framework)
- Next.js (Server-side rendering)
- TypeScript (Strong typing)
- Axios (For making API requests)

## API Endpoints

The backend provides the following REST API endpoints:

- **GET /api/users**: Returns a list of all users.
- **GET /api/users/{id}**: Returns a specific user by id.
- **POST /api/users**: Creates a new user.
- **PUT /api/users/{id}**: Updates an existing user by id.
- **DELETE /api/users/{id}**: Deletes a user by id.

### Example Request Bodies

**Create a User (POST /api/users):**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Update a User (PUT /api/users/{id}):**

```json
{
  "name": "John Doe Updated",
  "email": "john.doe@example.com"
}
```

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Go (1.16 or later)
- Node.js (14.x or later)
- npm (6.x or later) or yarn (1.x or later)
- SQLite

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/mryunt02/fill-labs-case.git
cd fill-labs-case
cd user-management
```

2. **Backend Setup:**

```sh
cd backend
go mod tidy
go run .
```

3. **Frontend Setup:**

```sh
cd frontend
npm install
npm run dev
```

### Running the Application

- The backend server will start on `http://localhost:8000`
- The frontend application will start on `http://localhost:3000`

### Running Tests

- **Backend Tests:**

  ```sh
  cd backend
  go test ./...
  ```
