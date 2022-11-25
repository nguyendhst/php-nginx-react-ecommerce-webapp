CREATE TABLE `Users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `role` ENUM ('Admin', 'Customer'),
  `lname` varchar(255),
  `fname` varchar(255),
  `phone` varchar(255) UNIQUE,
  `email` varchar(255),
  `username` varchar(255) UNIQUE NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `yob` int,
  `passw_changed_at` datetime DEFAULT (now()),
  `created_at` datetime DEFAULT (now())
);

CREATE UNIQUE INDEX `Users_index_0` ON `Users` (`email`);

CREATE INDEX `Users_index_1` ON `Users` (`lname`, `fname`);

CREATE INDEX `Users_index_2` ON `Users` (`username`);


/*-- Path: backend-local/sql/init_accounts.sql

/* insert data */

INSERT INTO `Users` (`role`, `lname`, `fname`, `phone`, `email`, `username`, `password_hash`, `yob`)
    
