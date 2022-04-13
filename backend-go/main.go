package main

import (
	"fmt"
	"golang-project/middleware"
	"golang-project/routers"
	"log"
	"net/http"
)

func main(){
	r := routers.Router()
	fmt.Println("Starting server on the port 8080...")
	log.Fatal(http.ListenAndServe(":8080", middleware.GetCorsConfig().Handler(r)))
}