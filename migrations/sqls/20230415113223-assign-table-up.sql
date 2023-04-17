CREATE TABLE assign(
    id SERIAL PRIMARY KEY,
    assign_date TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);