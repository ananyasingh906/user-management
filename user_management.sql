-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2025 at 03:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `pan_number` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `phone_number`, `pan_number`) VALUES
(3, 'jasiah ', 'nobel', 'jasiahnobel@mail.com', '8754693210', 'KIYGC7684Q'),
(4, 'presley', 'gaines', 'presleygaines@email.com', '6532980147', 'POLMN7863I'),
(5, 'Gina', 'Sawyer', 'gina.sawyer@example.com', '6129338974', 'MVKOS5977N'),
(6, 'Heidy', 'Tran', 'heidy.tran@mail.com', '6129338974', 'LCNUA4031Q'),
(7, 'Zayne', 'Munoz', 'zayne.munoz@testmail.org', '6129338974', 'LQREF1854C'),
(8, 'Leonidas', 'Nixon', 'leonidas.nixon@mail.com', '6129338974', 'PDWFH0704V'),
(9, 'Clarence', 'Gentry', 'clarence.gentry@mail.com', '6129338974', 'KHXEO5291X'),
(10, 'Hazel', 'Holder', 'hazel.holder@testmail.org', '6129338974', 'BBUWY5488B'),
(11, 'Kamryn', 'Massey', 'kamryn.massey@mail.com', '6129338974', 'QRBZU9932V'),
(12, 'Mitchell', 'Dixon', 'mitchell.dixon@mail.com', '6129338974', 'CIZDY2185Q'),
(13, 'Terrance', 'Mooney', 'terrance.mooney@testmail.org', '6129338974', 'BSOXB6371G'),
(14, 'Brynn', 'Rocha', 'brynn.rocha@mail.com', '6129338974', 'HOMXG3804F'),
(15, 'Corey', 'Massey', 'corey.massey@testmail.org', '6129338974', 'EABCA9709E'),
(16, 'Fletcher', 'Hampton', 'fletcher.hampton@testmail.org', '6129338974', 'RDPSD1996K');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
