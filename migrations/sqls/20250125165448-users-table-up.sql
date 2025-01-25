CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstName TEXT,
  lastName TEXT,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL
);