-- Database: MySQL
-- Table: User

CREATE TABLE User (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  birthday date NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT birthday_check CHECK (birthday < '2000-01-01')
) 