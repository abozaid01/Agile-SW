CREATE TABLE userTypeLinks(
    id SERIAL PRIMARY KEY,
    userType_id INTEGER REFERENCES userType(id),
    link_id INTEGER REFERENCES links(id)
);