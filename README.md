# Flashcards

This monorepo hosts the code for a small flashcard learning application.  The backend is located in [`packages/backend`](packages/backend) and the frontend lives in [`packages/frontend`](packages/frontend).

## Getting started

Install all dependencies for the workspaces:

```bash
yarn install
```

### Running the backend

The development server can be started via:

```bash
yarn workspace @flashcards/backend dev
```

### Running the frontend

Launch the frontend development server with:

```bash
yarn workspace @flashcards/frontend dev
```

## Environment variables

The backend expects several environment variables such as `MONGO_URL`, `PORT` and `CLIENT_URL` along with token secrets and database credentials.  The full list is defined in [`packages/backend/env.d.ts`](packages/backend/env.d.ts).

For the frontend an example `.env` file is provided in [`packages/frontend/.env.example`](packages/frontend/.env.example) which defines `VITE_API_URL`.

## Coding conventions

Backend code follows the conventions described in [`packages/backend/convention.txt`](packages/backend/convention.txt).  Additional notes for the frontend are available in [`packages/frontend/readme.txt`](packages/frontend/readme.txt).
