CREATE TABLE Users (
  ID INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(50) NOT NULL DEFAULT '',
  LastName VARCHAR(50) NOT NULL DEFAULT '',
  Login VARCHAR(50) NOT NULL DEFAULT '',
  Password VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
);

CREATE TABLE Colors (
  ID INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL DEFAULT '',
  UserID INT NOT NULL DEFAULT 0,
  PRIMARY KEY (ID)
);

-- Test-only data for CI (throwaway database)
INSERT INTO Users (FirstName, LastName, Login, Password)
  VALUES ('Test', 'User', 'testuser', 'testpass');

INSERT INTO Colors (Name, UserID)
  VALUES ('Blue', 1), ('Light Blue', 1), ('Red', 1);
