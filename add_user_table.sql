USE bettys_books;

CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(20) DEFAULT NULL,
  `firstName` varchar(20) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `hashedPassword` varchar(64) DEFAULT NULL);