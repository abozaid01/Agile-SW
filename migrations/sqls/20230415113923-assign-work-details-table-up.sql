CREATE TABLE assign_work_details(
    id SERIAL PRIMARY KEY,
    assign_id INTEGER REFERENCES assign(id),
    work_id INTEGER REFERENCES work(id)
)