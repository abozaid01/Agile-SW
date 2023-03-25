CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    phone_number INTEGER NOT NULL,
    experience INTEGER NOT NULL,
    userType_id INTEGER REFERENCES userType(id)
);