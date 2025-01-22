# Basic User Management with Hono

## What:

Part of a tech test, I took the opportunity to explore Hono as a Web Application framework instead of Express.js.
It's a simple RESTful API (with a frontend) to add, update and delete users.

## Tech:

Built using:

- TypeScript
- Node.js
- Hono
- Vite (TypeScript React)

## Why:

- TypeScript (both backend and frontend) because I want to get better and more comfortable with ensuring I have everything typed correctly to avoid errors as much as possible.
- Node.js and Hono because I've seen a lot about Hono and wanted to try it out in comparison to Express. It was really easy to use, the context it provides is very easy to access and the fact that it comes with a lot of the things you'd normally want to install like CORS, logging, validation etc, it comes with for free.
- Vite and React because React is still very commonly used in production and I want to improve my skills there.

## Set up instructions:

Clone the repo to your local machine

```
git clone https://github.com/Tyriol/basic-user-management-with-hono.git
```

### Backend setup

Navigate to the folder you've cloned the repo to.

To install dependencies run:

```bash
cd backend
npm install
```

To start the server run:

```bash
npm run dev
```

This will start the server listening on Port: 3000 and check to see if the `users.json` file exists, if not, it will create it with an empty array.

### Frontend setup

In a new terminal Navigate to the folder you've cloned the repo to.

To install dependencies run:

```bash
cd frontend
npm install
```

To start the server run:

```bash
npm run dev
```

This will start the Vite app and give you a URL to access the app from. Likely: `http://localhost:5173/`

## Todo

- TODO: Add validation on form inputs (server side and client side)
  - As good practice, and to resolve issue when an empty form is submitted
- TODO: Update ID to be an automatically created UUID
- TODO: Tidy up backend with routes and helpers.
- TODO:Make it look better
