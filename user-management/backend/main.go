package main

import (
    "log"
    "net/http"

    "github.com/gorilla/mux"
)

func main() {
    router := mux.NewRouter()

    router.HandleFunc("/api/users", getUsers).Methods("GET")
    router.HandleFunc("/api/users/{id}", getUser).Methods("GET")
    router.HandleFunc("/api/users", createUser).Methods("POST")
    router.HandleFunc("/api/users/{id}", updateUser).Methods("PUT")
    router.HandleFunc("/api/users/{id}", deleteUser).Methods("DELETE")

    log.Fatal(http.ListenAndServe(":8000", router))
}
