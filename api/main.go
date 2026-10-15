package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type Plan struct {
	ID            string   `json:"id"`
	Title         string   `json:"title"`
	Description   string   `json:"description"`
	Moods         []string `json:"moods"`
	Budgets       []string `json:"budgets"`
	Durations     []string `json:"durations"`
	DurationLabel string   `json:"durationLabel"`
	BudgetLabel   string   `json:"budgetLabel"`
	Steps         []string `json:"steps"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", health)
	mux.HandleFunc("GET /api/plans", listPlans)
	mux.HandleFunc("/api/favorites", favoritesNotImplemented)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Plan a Dos API listening on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, mux))
}

func health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func listPlans(w http.ResponseWriter, _ *http.Request) {
	// The frontend currently owns the catalogue. Move it to persistent storage here
	// when the backend is connected, preserving the JSON shape documented in README.
	writeJSON(w, http.StatusOK, []Plan{})
}

func favoritesNotImplemented(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusNotImplemented, map[string]string{
		"error": "Favorites require authentication and persistent storage.",
	})
}

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(value); err != nil {
		log.Printf("write JSON response: %v", err)
	}
}
