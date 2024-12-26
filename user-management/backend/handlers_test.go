package main

import (
    "bytes"
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "strconv"
    "testing"

    "github.com/gorilla/mux"
)

func setupRouter() *mux.Router {
    router := mux.NewRouter()
    router.HandleFunc("/api/users", getUsers).Methods("GET")
    router.HandleFunc("/api/users/{id}", getUser).Methods("GET")
    router.HandleFunc("/api/users", createUser).Methods("POST")
    router.HandleFunc("/api/users/{id}", updateUser).Methods("PUT")
    router.HandleFunc("/api/users/{id}", deleteUser).Methods("DELETE")
    return router
}

func TestGetUsers(t *testing.T) {
    req, _ := http.NewRequest("GET", "/api/users", nil)
    rr := httptest.NewRecorder()
    router := setupRouter()
    router.ServeHTTP(rr, req)

    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
    }

    var users []User
    if err := json.NewDecoder(rr.Body).Decode(&users); err != nil {
        t.Errorf("could not decode response: %v", err)
    }
}

func TestGetUser(t *testing.T) {
    // First, create a user to ensure there is a user to get
    user := User{Name: "Test User", Email: "test@example.com"}
    if err := saveUser(&user); err != nil {
        t.Fatalf("could not save user: %v", err)
    }

    t.Logf("Created user with ID: %d", user.ID)

    req, _ := http.NewRequest("GET", "/api/users/"+strconv.Itoa(user.ID), nil)
    rr := httptest.NewRecorder()
    router := setupRouter()
    router.ServeHTTP(rr, req)

    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
    }

    var returnedUser User
    if err := json.NewDecoder(rr.Body).Decode(&returnedUser); err != nil {
        t.Errorf("could not decode response: %v", err)
    }

    if returnedUser.Name != user.Name {
        t.Errorf("expected user name to be '%v', got '%v'", user.Name, returnedUser.Name)
    }
}

func TestCreateUser(t *testing.T) {
    user := User{Name: "New User", Email: "new@example.com"}
    payload, _ := json.Marshal(user)

    req, _ := http.NewRequest("POST", "/api/users", bytes.NewBuffer(payload))
    req.Header.Set("Content-Type", "application/json")
    rr := httptest.NewRecorder()
    router := setupRouter()
    router.ServeHTTP(rr, req)

    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
    }

    var createdUser User
    if err := json.NewDecoder(rr.Body).Decode(&createdUser); err != nil {
        t.Errorf("could not decode response: %v", err)
    }

    if createdUser.Name != user.Name {
        t.Errorf("expected user name to be '%v', got '%v'", user.Name, createdUser.Name)
    }
}

func TestUpdateUser(t *testing.T) {
    // First, create a user to ensure there is a user to update
    user := User{Name: "Update User", Email: "update@example.com"}
    if err := saveUser(&user); err != nil {
        t.Fatalf("could not save user: %v", err)
    }

    updatedUser := User{Name: "Updated User", Email: "updated@example.com"}
    payload, _ := json.Marshal(updatedUser)

    req, _ := http.NewRequest("PUT", "/api/users/"+strconv.Itoa(user.ID), bytes.NewBuffer(payload))
    req.Header.Set("Content-Type", "application/json")
    rr := httptest.NewRecorder()
    router := setupRouter()
    router.ServeHTTP(rr, req)

    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
    }

    var returnedUser User
    if err := json.NewDecoder(rr.Body).Decode(&returnedUser); err != nil {
        t.Errorf("could not decode response: %v", err)
    }

    if returnedUser.Name != updatedUser.Name {
        t.Errorf("expected user name to be '%v', got '%v'", updatedUser.Name, returnedUser.Name)
    }
}

func TestDeleteUser(t *testing.T) {
    // First, create a user to ensure there is a user to delete
    user := User{Name: "Delete User", Email: "delete@example.com"}
    if err := saveUser(&user); err != nil {
        t.Fatalf("could not save user: %v", err)
    }

    req, _ := http.NewRequest("DELETE", "/api/users/"+strconv.Itoa(user.ID), nil)
    rr := httptest.NewRecorder()
    router := setupRouter()
    router.ServeHTTP(rr, req)

    if status := rr.Code; status != http.StatusNoContent {
        t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusNoContent)
    }

    // Verify the user was deleted
    _, err := getUserByID(user.ID)
    if err == nil {
        t.Errorf("expected error when getting deleted user, got nil")
    }
}