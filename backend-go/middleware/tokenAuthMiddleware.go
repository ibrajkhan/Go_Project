package middleware

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"net/http"
)


func VerifyToken(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("secret"), nil
	})
	if err != nil {
		return nil, err
	}
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	} else {
		return nil, err
	}
}

func TokenAuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// do stuff here
		clientToken := r.Header.Get("Authorization")
		if clientToken == "" {
			http.Error(w, "Missing token", http.StatusBadRequest)
			return
		}
		claims,err := VerifyToken(clientToken)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		r.Header.Set("email", claims["email"].(string))
		fmt.Println(claims)
		next.ServeHTTP(w, r)
	}
}