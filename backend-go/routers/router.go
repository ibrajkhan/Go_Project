package routers

import (
	"golang-project/controllers"
	"golang-project/middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/",controllers.HelloServer)
	router.HandleFunc("/register", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/login", controllers.Login).Methods("POST")
	router.Handle("/users",middleware.TokenAuthMiddleware(controllers.AllUsers)).Methods("GET")
	router.Handle("/orders", middleware.TokenAuthMiddleware(controllers.PlaceOrder)).Methods("POST")
	router.Handle("/orders/{id}", middleware.TokenAuthMiddleware(controllers.CancelOrder)).Methods("DELETE")
	router.Handle("/orders", middleware.TokenAuthMiddleware(controllers.GetOrders)).Methods("GET")
	router.Handle("/orders/{id}",middleware.TokenAuthMiddleware(controllers.UpdateOrder)).Methods("PUT")
	router.HandleFunc("/orders/{id}",controllers.GetOrderById).Methods("GET")
	return router
}