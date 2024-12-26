package main

import (
    "database/sql"
    _ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func init() {
    var err error
    db, err = sql.Open("sqlite3", "./users.db")
    if err != nil {
        panic(err)
    }

    createTable := `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
    );`

    _, err = db.Exec(createTable)
    if err != nil {
        panic(err)
    }
}

func getAllUsers() ([]User, error) {
    rows, err := db.Query("SELECT id, name, email FROM users")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var user User
        if err := rows.Scan(&user.ID, &user.Name, &user.Email); err != nil {
            return nil, err
        }
        users = append(users, user)
    }
    return users, nil
}

func getUserByID(id int) (*User, error) {
    row := db.QueryRow("SELECT id, name, email FROM users WHERE id = ?", id)

    var user User
    if err := row.Scan(&user.ID, &user.Name, &user.Email); err != nil {
        return nil, err
    }
    return &user, nil
}

func saveUser(user *User) error {
    stmt, err := db.Prepare("INSERT INTO users(name, email) VALUES(?, ?)")
    if err != nil {
        return err
    }
    result, err := stmt.Exec(user.Name, user.Email)
    if err != nil {
        return err
    }
    id, err := result.LastInsertId()
    if err != nil {
        return err
    }
    user.ID = int(id)
    return nil
}

func updateUserByID(id int, user *User) error {
    stmt, err := db.Prepare("UPDATE users SET name = ?, email = ? WHERE id = ?")
    if err != nil {
        return err
    }
    _, err = stmt.Exec(user.Name, user.Email, id)
    return err
}

func deleteUserByID(id int) error {
    stmt, err := db.Prepare("DELETE FROM users WHERE id = ?")
    if err != nil {
        return err
    }
    _, err = stmt.Exec(id)
    return err
}