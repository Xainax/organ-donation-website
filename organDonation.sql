-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2023 at 01:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `organDonation`
--

-- --------------------------------------------------------

--
-- Table structure for table `Available`
--

CREATE TABLE `Available` (
  `DonorID` int(11) NOT NULL,
  `OrganType` varchar(255) NOT NULL,
  `BloodType` varchar(10) NOT NULL,
  `ViableHours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Available`
--

INSERT INTO `Available` (`DonorID`, `OrganType`, `BloodType`, `ViableHours`) VALUES
(1, 'Kidney', 'A+', 30),
(2, 'Heart', 'B+', 1),
(3, 'Liver', 'AB-', 50),
(4, 'Pancreas', 'O-', 16),
(5, 'Liver', 'A-', 8),
(6, 'Liver', 'AB+', 12),
(7, 'Heart', 'B-', 4);

-- --------------------------------------------------------

--
-- Table structure for table `DONOR`
--

CREATE TABLE `DONOR` (
  `DonorID` int(11) NOT NULL,
  `Fname` varchar(255) DEFAULT NULL,
  `Lname` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `OrgansDonating` varchar(255) DEFAULT NULL,
  `BloodType` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `Hospital` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `DONOR`
--

INSERT INTO `DONOR` (`DonorID`, `Fname`, `Lname`, `Age`, `OrgansDonating`, `BloodType`, `Gender`, `Hospital`) VALUES
(1, 'Kyle', 'Tran', 41, 'Kidney', 'A+', 'M', 'UCLA Medical Center'),
(2, 'Tracy', 'Peterson', 23, 'Heart', 'B+', 'F', 'Massachusetts General Hospital'),
(3, 'Peter', 'Nguyen', 5, 'Liver', 'AB-', 'M', 'Cedars-Sinai Medical'),
(4, 'Roger', 'Grant', 16, 'Pancreas', 'O-', 'M', 'Kaiser Permanente'),
(5, 'Ivy', 'Danvers', 33, 'Liver', 'A-', 'F', 'Massachusetts General Hospital'),
(6, 'Elaine', 'Wong', 61, 'Liver', 'AB+', 'F', 'Cleveland Clinic'),
(7, 'Elizabeth', 'Kim', 9, 'Heart', 'B-', 'F', 'Johns Hopkins');

-- --------------------------------------------------------

--
-- Table structure for table `priority`
--

CREATE TABLE `priority` (
  `OrganType` varchar(255) NOT NULL,
  `Priority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `priority`
--

INSERT INTO `priority` (`OrganType`, `Priority`) VALUES
('Brain', 6),
('Heart', 1),
('Kidney', 5),
('Liver', 4),
('Lung', 2),
('Pancreas', 3);

-- --------------------------------------------------------

--
-- Table structure for table `RECIPIENT`
--

CREATE TABLE `RECIPIENT` (
  `RecipientID` int(11) NOT NULL,
  `Fname` varchar(255) DEFAULT NULL,
  `Lname` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `OrgansNeeded` varchar(255) DEFAULT NULL,
  `BloodType` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `Hospital` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `RECIPIENT`
--

INSERT INTO `RECIPIENT` (`RecipientID`, `Fname`, `Lname`, `Age`, `OrgansNeeded`, `BloodType`, `Gender`, `Hospital`) VALUES
(1, 'Megan', 'Nguyen', 34, 'Lungs', 'O+', 'F', 'UCSF Medical Center'),
(2, 'Justin', 'Chung', 26, 'Heart', 'AB', 'M', 'Cedars-Sinai'),
(3, 'Calvin', 'Vu', 37, 'Liver', 'A-', 'M', 'Cedars-Sinai'),
(4, 'Mary', 'Lam', 7, 'Liver', 'B+', 'F', 'Mayo Clinic'),
(5, 'Farrah', 'Daniels', 12, 'Heart', 'AB+', 'F', 'Johns Hopkins'),
(6, 'Toby', 'Grayson', 11, 'Lungs', 'A', 'M', 'Hoag Memorial Hospital'),
(7, 'Henry', 'Chieu', 79, 'Pancreas', 'B', 'M', 'Torrance Memorial Medical Center');

-- --------------------------------------------------------

--
-- Table structure for table `Requests`
--

CREATE TABLE `Requests` (
  `RequestID` int(11) NOT NULL,
  `RecipientID` int(11) DEFAULT NULL,
  `OrganType` varchar(255) DEFAULT NULL,
  `BloodType` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Requests`
--

INSERT INTO `Requests` (`RequestID`, `RecipientID`, `OrganType`, `BloodType`) VALUES
(2001, 4, 'Liver', 'B+'),
(2002, 1, 'Lungs', 'O+'),
(2003, 2, 'Heart', 'AB'),
(2004, 3, 'Liver', 'A-'),
(2005, 5, 'Heart', 'AB+'),
(2006, 6, 'Lungs', 'A'),
(2007, 8, 'Kidney', 'AB'),
(2008, 7, 'Pancreas', 'B');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Available`
--
ALTER TABLE `Available`
  ADD PRIMARY KEY (`DonorID`);

--
-- Indexes for table `DONOR`
--
ALTER TABLE `DONOR`
  ADD PRIMARY KEY (`DonorID`);

--
-- Indexes for table `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`OrganType`);

--
-- Indexes for table `RECIPIENT`
--
ALTER TABLE `RECIPIENT`
  ADD PRIMARY KEY (`RecipientID`);

--
-- Indexes for table `Requests`
--
ALTER TABLE `Requests`
  ADD PRIMARY KEY (`RequestID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
