# Agile-SW

### Prerequisites:

```
You must have npm and nodejs installed.
```

### To use the application:

```
1. Clone the project
2. Run npm install
3. Run npm start
```

### Database Schema:

![alt schema](/src/database/Schema.png)

### Design patterns implementd:

-   MVC
-   Self Referece Key
-   EAV - Factory

### Built With:

-   Typescript
-   Node.js
-   Express.js
-   PostgreSQL
-   ejs
-   dotenv
-   flash
-   bcrybt

### Usage

Once the server is running, you can access the app by visiting `http://localhost:3000` in your browser. You can log in as an Admin with username `admin` and password `admin`:

### Features

-   User authentication and authorization using JWT tokens
-   Login detection by username
-   Dynamic dashboard for each user in the system

#### Endpoints

#### Home page

-   `/ [GET]`

#### Login

-   `/login [GET]`
-   `/login [POST]`

#### Users (auto dedection functionallity)

-   `/admin [GET]`
-   `/admin [POST]`
-   `/admin/create-user [GET]`
-   `/admin/edit-user/:id [GET]`
-   `/admin/user/:id [GET]`
-   `/admin/user/:id [PATCH]`
-   `/admin/user/:id [DELETE]`
-   `/voultneer' [GET]`
-   `/voultneer' [POST]`
-   `/voultneer/:id' [GET]`
-   `/voultneer/:id' [PATCH]`
-   `/voultneer/:id' [DELETE]`

#### work

(still implementing ...)
