CREATE DATABASE todos;
USE todos;

CREATE TABLE todos (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO todos (title, description)
VALUES
('The one thing', 'This stuff matters'),
('The two square', 'This is exponent math'),
('Three in a row', 'English magic');
