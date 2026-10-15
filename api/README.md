# Plan a Dos API (Go)

This directory is the future REST backend boundary. It is intentionally not deployed with GitHub Pages, which can host only static files.

## Local execution

```sh
cd api
go run .
```

`GET /health` returns the service status. `GET /api/plans` reserves the catalogue endpoint and will return `Plan` JSON objects with the same fields used by `src/domain/plan.ts`. It accepts optional `mood`, `budget`, and `duration` query parameters. `POST`, `GET`, and `DELETE /api/favorites` are reserved for authenticated, persistent favorites.

When the API is ready, set `VITE_API_BASE_URL=https://your-api.example` during the frontend build. The frontend will then use `GET /api/plans`; the API must allow the GitHub Pages origin through CORS.
