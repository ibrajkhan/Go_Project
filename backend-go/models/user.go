package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Email    string             `json:"email" bson:"email"`
	Phone	 int                `json:"phone" bson:"phone"`
	State    string             `json:"state" bson:"state"`
	District string             `json:"district" bson:"district"`
	Address  string             `json:"address" bson:"address"`
	Pincode  int                `json:"pincode" bson:"pincode"`
	Password string             `json:"password" bson:"password"`
}