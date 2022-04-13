package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct {
	ProductType string `json:"productType" bson:"productType"`
	Quantity   int    `json:"quantity" bson:"quantity"`
}

type Order struct {
	Id       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Status  string             `json:"status" bson:"status"`
	Products []Product          `json:"products" bson:"products"`
	TotalPrice float64           `json:"totalPrice" bson:"totalPrice"`
	TotalQuantity int             `json:"totalQuantity" bson:"totalQuantity"`
	User   primitive.ObjectID `json:"user" bson:"user" ref:"User"`
}