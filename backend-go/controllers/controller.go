package controllers

import (
	"context"
	"fmt"
	"net/http"
	"encoding/json"
	"log"
	"time"

	"golang-project/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
	//"go.mongodb.org/mongo-driver/bson"
	"golang-project/database"

	//"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"labix.org/v2/mgo/bson"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

//VerifyPassword checks the input password while verifying it with the passward in the DB.
func VerifyPassword(userPassword string, providedPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(providedPassword))
	check := true
	msg := ""
	if err != nil {
		msg = fmt.Sprintf("Invalid password")
		check = false
	}

	return check, msg
}

//Generate token
func GenerateToken(email string) (string, error) {
	// Create the token
	token := jwt.New(jwt.SigningMethodHS256)

	// Set some claims
	claims := token.Claims.(jwt.MapClaims)
	claims["email"] = email
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// Sign and get the complete encoded token as a string
	return token.SignedString([]byte("secret"))
}

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "user")
var orderCollection *mongo.Collection = database.OpenCollection(database.Client, "order")

func HelloServer(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %s!\n", r.URL.Path[1:])
}

//Register
func CreateUser(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	var user models.User
	_ = json.NewDecoder(r.Body).Decode(&user)
	user.Password = HashPassword(user.Password)
	err := userCollection.FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&user)
	if err == nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode("User already exists")
		return
	}
	insertResult, err := userCollection.InsertOne(context.Background(), user)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		log.Fatal(err)
		return
	}
	fmt.Println(r.Body)
	fmt.Println("Inserted a Single User ", insertResult.InsertedID)
	json.NewEncoder(w).Encode(user)
}

//Login
func Login(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	var foundUser models.User
	var user models.User
	_ = json.NewDecoder(r.Body).Decode(&user)
	err := userCollection.FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&foundUser)
	defer r.Body.Close()
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode("Invalid email or password")
		return
	}
	check, msg := VerifyPassword(foundUser.Password, user.Password)
	if check == false {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(msg)
		return
	}
	fmt.Println(foundUser.Id)
	token, err := GenerateToken(foundUser.Email)
	if err != nil {
		fmt.Println(err)
	}
	var data = map[string]string{"Token": token,"User":foundUser.Name}
	json.NewEncoder(w).Encode(data)
}

//Fetch All Users
func AllUsers(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	var users []models.User
	cur, err := userCollection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(context.Background()) {
		var user models.User
		err := cur.Decode(&user)
		if err != nil {
			log.Fatal(err)
		}
		users = append(users, user)
	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.Background())
	json.NewEncoder(w).Encode(users)
}

//Cancel an order
func CancelOrder(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	params := mux.Vars(r)
	OrderId,_ := primitive.ObjectIDFromHex(params["id"])
	fmt.Println(OrderId)
	result, err := orderCollection.DeleteOne(context.Background(), bson.M{"_id": OrderId})
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(result)
}

//Create an order
func PlaceOrder(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	var order models.Order
	_ = json.NewDecoder(r.Body).Decode(&order)
	fmt.Println(order)
	fmt.Println(r.Header.Get("email"))
	var user models.User
	err := userCollection.FindOne(context.Background(), bson.M{"email": r.Header.Get("email")}).Decode(&user)
	if err != nil {
		log.Fatal(err)
	}
	order.User = user.Id
	fmt.Println(order)
	insertResult, err := orderCollection.InsertOne(context.Background(), order)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a Single Order ", insertResult.InsertedID)
	json.NewEncoder(w).Encode(order)
}


//Fetch all orders
func GetOrders(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	var orders []models.Order
	email := r.Header.Get("email")
	fmt.Println(email)
	var user models.User
	err := userCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(user.Id)
	cur, err := orderCollection.Find(context.Background(), bson.M{"user": user.Id})
	if err != nil {
		log.Fatal(err)
	}
	for cur.Next(context.Background()) {
		var order models.Order
		err := cur.Decode(&order)
		if err != nil {
			log.Fatal(err)
		}
		orders = append(orders, order)
	}
	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}
	cur.Close(context.Background())
	json.NewEncoder(w).Encode(orders)
}

//Update order
func UpdateOrder(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	params := mux.Vars(r)
	OrderId,_ := primitive.ObjectIDFromHex(params["id"])
	var order models.Order
	_ = json.NewDecoder(r.Body).Decode(&order)
	fmt.Println(order)
	order.Id = OrderId
	result, err := orderCollection.ReplaceOne(context.Background(), bson.M{"_id": OrderId}, order)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(result)
}

//Get order By ID
func GetOrderById(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-type", "application/json")
	params := mux.Vars(r)
	OrderId,_ := primitive.ObjectIDFromHex(params["id"])
	var order models.Order
	err := orderCollection.FindOne(context.Background(),bson.M{"_id":OrderId}).Decode(&order)
	if err != nil{
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(order)
}