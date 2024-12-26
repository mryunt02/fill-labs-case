package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
    "github.com/rs/cors"
)

func main() {
    router := mux.NewRouter()

    router.HandleFunc("/api/users", getUsers).Methods("GET")
    router.HandleFunc("/api/users/{id}", getUser).Methods("GET")
    router.HandleFunc("/api/users", createUser).Methods("POST")
    router.HandleFunc("/api/users/{id}", updateUser).Methods("PUT")
    router.HandleFunc("/api/users/{id}", deleteUser).Methods("DELETE")

    // Enable CORS
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type"},
        AllowCredentials: true,
    })

    handler := c.Handler(router)

    log.Fatal(http.ListenAndServe(":8000", handler))
}