-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2025 at 09:42 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `driveshare`
--

-- --------------------------------------------------------

--
-- Table structure for table `availability`
--

CREATE TABLE `availability` (
  `CID` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `availability`
--

INSERT INTO `availability` (`CID`, `date`) VALUES
(54, '2025-03-02'),
(54, '2025-03-03'),
(54, '2025-03-04'),
(54, '2025-03-05'),
(55, '2025-03-31'),
(55, '2025-04-01'),
(55, '2025-04-02'),
(55, '2025-04-03');

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `CID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `owner` varchar(64) NOT NULL,
  `model` varchar(64) NOT NULL,
  `year` int(11) NOT NULL,
  `mileage` int(11) NOT NULL,
  `location` varchar(64) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`CID`, `UID`, `owner`, `model`, `year`, `mileage`, `location`, `price`) VALUES
(54, 14, 'John Johnson', 'Ford F-150', 2019, 3411, 'Lexington, Kentucky', 58),
(55, 15, 'Peter Peterson', 'Chevrolet Blazer', 2022, 3456, 'Detroit, Michigan', 61);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `senderEmail` varchar(64) NOT NULL,
  `receiverEmail` varchar(64) NOT NULL,
  `message` varchar(8000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`datetime`, `senderEmail`, `receiverEmail`, `message`) VALUES
('2025-03-30 13:07:26', 'pp@gmail.com', 'jj@gmail.com', 'Hello I would like to rent your car'),
('2025-03-30 15:25:35', 'rr@gmail.com', 'pp@gmail.com', 'Your car is pretty bad'),
('2025-03-30 15:27:36', 'pp@gmail.com', 'rr@gmail.com', 'Excuse me? Who do you think you are? What gives you the right to insult my car?'),
('2025-03-30 15:29:20', 'rr@gmail.com', 'pp@gmail.com', 'Your car is trash. Just letting you know. Take it down if you have any decency,'),
('2025-03-30 15:32:13', 'pp@gmail.com', 'rr@gmail.com', 'You\'re calling it trash when you\'re so broke that you can only afford to rent a car and not buy one. Show some gratitude.'),
('2025-03-30 15:32:53', 'rr@gmail.com', 'pp@gmail.com', 'I do own a car, buddy. You\'re free to check it out.'),
('2025-03-30 15:34:06', 'pp@gmail.com', 'rr@gmail.com', 'LOL I see it. That car is the definition of trash. Now I see why you think my car is trash. Your taste is trash.');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `UID` int(11) NOT NULL,
  `notification` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`datetime`, `UID`, `notification`) VALUES
('2025-03-29 18:48:21', 14, 'You have listed a car for rental: 2019 Ford F-150'),
('2025-03-30 13:01:32', 15, 'Congratulations, Peter Peterson! You have successfully signed up for DriveShare!'),
('2025-03-30 13:02:43', 15, 'You have listed a car for rental: 2022 Chevrolet Blazer'),
('2025-03-30 15:02:55', 16, 'You rented Peter Peterson\'s 2022 Chevrolet Blazer'),
('2025-03-30 15:02:55', 15, 'Robert Robertson rented your 2022 Chevrolet Blazer'),
('2025-03-30 15:19:55', 16, 'You have modified the price of your 2008 Honda Civic'),
('2025-03-30 15:20:15', 16, 'You have delisted your 2008 Honda Civic'),
('2025-03-30 15:25:35', 15, 'New message from rr@gmail.com'),
('2025-03-30 15:27:36', 16, 'New message from pp@gmail.com'),
('2025-03-30 15:29:20', 15, 'New message from rr@gmail.com'),
('2025-03-30 15:32:13', 16, 'New message from pp@gmail.com'),
('2025-03-30 15:32:53', 15, 'New message from rr@gmail.com'),
('2025-03-30 15:34:06', 16, 'New message from pp@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `rents`
--

CREATE TABLE `rents` (
  `CID` int(11) NOT NULL,
  `UID` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rents`
--

INSERT INTO `rents` (`CID`, `UID`, `date`) VALUES
(54, 15, '2025-03-02'),
(55, 16, '2025-03-31'),
(55, 16, '2025-04-01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UID` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `secq1` varchar(1000) NOT NULL,
  `secq2` varchar(1000) NOT NULL,
  `secq3` varchar(1000) NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UID`, `name`, `email`, `password`, `secq1`, `secq2`, `secq3`, `balance`) VALUES
(14, 'John Johnson', 'jj@gmail.com', 'johnjohn', 'John City', 'John Car', 'John Exam', 1000),
(15, 'Peter Peterson', 'pp@gmail.com', 'peterpeter', 'Peter City', 'Peter Car', 'Peter Exam', 1431),
(16, 'Robert Robertson', 'rr@gmail.com', 'robertrobert', 'Robert City', 'Robertmobile', 'Intro to Robertology', 5231);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `availability`
--
ALTER TABLE `availability`
  ADD KEY `availability_ibfk_1` (`CID`);

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`CID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD KEY `receiverEmail` (`receiverEmail`),
  ADD KEY `senderEmail` (`senderEmail`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `rents`
--
ALTER TABLE `rents`
  ADD KEY `CID` (`CID`),
  ADD KEY `UID` (`UID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `CID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `availability`
--
ALTER TABLE `availability`
  ADD CONSTRAINT `availability_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `cars` (`CID`) ON DELETE CASCADE;

--
-- Constraints for table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`receiverEmail`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`senderEmail`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `rents`
--
ALTER TABLE `rents`
  ADD CONSTRAINT `rents_ibfk_1` FOREIGN KEY (`CID`) REFERENCES `cars` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rents_ibfk_2` FOREIGN KEY (`UID`) REFERENCES `users` (`UID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
