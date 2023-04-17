CREATE TABLE assign_work_details(
    id SERIAL PRIMARY KEY,
    assign_id INTEGER REFERENCES assign(id),
    work INTEGER REFERENCES work(id)
)