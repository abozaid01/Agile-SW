# Agile-SW

<<<<<<< HEAD
This project is built in (PostgreSQL, Express, and Typescript)

## Getting Started

To get started with the app, you'll need to have Node.js and Postgres installed on your machine.

1. Clone the repo to your local machine: git clone https://github.com/abozaid01/Agile-SW.git

2. switch to the dev branch using `git switch dev`

3. make your own branch based on this branch using `git switch -c [name of your new branch]`

4. Create 2 databases in your postgres server and name them `agile_dev` and `agile_tes`

5. Install the dependencies using NPM:` cd Agile-SW && npm install`

6. Create a .env file in the root directory and add the following environment variables:

```bash
PORT=3000
NODE_ENV=dev
#set database connection info
POSTGRES_HOSt=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=agile_dev
POSTGRES_DATABASE_TEST=agile_test
POSTGRES_USER=[your-postgres-user]
POStGRES_PASSWORD=[your-password]
```

6. run the migration using `npx db-migrate up`
7. Start the development server: `npm run dev`

## Features

-   User authentication and authorization using JWT tokens
-   Login detection by username
-   Dynamic dashboard for each user in the system
=======

.
>>>>>>> f360c42d47f7c60f8c819a48efe728cf97f23355
