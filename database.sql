-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Dec 17, 2014 at 06:34 AM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `CP3-eindopdracht-2DEV2-groep3`
--

-- --------------------------------------------------------

--
-- Table structure for table `flowcharts`
--

CREATE TABLE `flowcharts` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `shape_ids` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `line_ids` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `flowcharts`
--

INSERT INTO `flowcharts` (`id`, `user_id`, `group_id`, `shape_ids`, `line_ids`, `name`) VALUES
(2, 3, 1, ',', ',', 'Second post y''all!'),
(3, 1, 1, ',', ',', 'First post y''all!'),
(4, 1, 0, ',', ',', 'My secret post'),
(5, 1, 1, ',', ',', 'Just couldn''t help myself'),
(12, 1, 1, ',', ',', 'Kleurtjes!'),
(13, 1, 1, ',', ',', 'untitled'),
(14, 1, 1, ',', ',', 'Kleurtjes2!');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
`id` int(11) NOT NULL,
  `user_ids` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `flowchart_ids` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `user_ids`, `flowchart_ids`, `name`, `description`) VALUES
(1, '1, 3', '', '2DEV2', 'This is a group for the awesome 2DEV2 group. Go us!'),
(2, '1', '', 'gaylords unite', 'We are the league of extraordinary gaymen!'),
(5, '1, 2, 3', '', 'Groep3', 'Voor de diehards');

-- --------------------------------------------------------

--
-- Table structure for table `lines`
--

CREATE TABLE `lines` (
`id` int(11) NOT NULL,
  `flowchart_id` int(11) NOT NULL,
  `x1` int(11) NOT NULL,
  `y1` int(11) NOT NULL,
  `x2` int(11) NOT NULL,
  `y2` int(11) NOT NULL,
  `color` varchar(11) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0,0,0'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lines`
--

INSERT INTO `lines` (`id`, `flowchart_id`, `x1`, `y1`, `x2`, `y2`, `color`) VALUES
(1, 1, 154, 78, 493, 120, '0,0,0'),
(2, 2, 154, 78, 493, 120, '0,0,0'),
(3, 3, 154, 78, 493, 120, '0,0,0'),
(4, 4, 312, 102, 408, 194, '0,0,0'),
(5, 4, 447, 264, 287, 354, '0,0,0'),
(6, 5, 196, 70, 129, 144, '0,0,0'),
(7, 5, 140, 190, 220, 274, '0,0,0'),
(8, 5, 355, 255, 452, 190, '0,0,0'),
(9, 5, 432, 130, 359, 55, '0,0,0');

-- --------------------------------------------------------

--
-- Table structure for table `shapes`
--

CREATE TABLE `shapes` (
`id` int(11) NOT NULL,
  `flowchart_id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `color` varchar(11) COLLATE utf8_unicode_ci NOT NULL DEFAULT '200,200,200',
  `type` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `shapes`
--

INSERT INTO `shapes` (`id`, `flowchart_id`, `x`, `y`, `width`, `height`, `color`, `type`, `content`) VALUES
(1, 1, 45, 30, 124, 53, '200,200,200', 'text', 'woohooo!'),
(2, 1, 406, 136, 121, 41, '200,200,200', 'text', 'So awesome!'),
(3, 1, 53, 146, 200, 200, '200,200,200', 'image', 'http://localhost/CPIII/CPIII_whiteboard/uploads/bow.jpeg'),
(4, 2, 67, 19, 124, 53, '200,200,200', 'text', 'woohooo!'),
(5, 2, 406, 136, 121, 41, '200,200,200', 'text', 'So awesome!'),
(6, 2, 53, 146, 200, 200, '200,200,200', 'image', 'http://localhost/CPIII/CPIII_whiteboard/uploads/bow.jpeg'),
(7, 2, 272, 222, 200, 100, '200,200,200', 'text', 'Adding to this post :O'),
(8, 3, 67, 19, 124, 53, '200,200,200', 'text', 'woohooo!'),
(9, 3, 406, 136, 121, 41, '200,200,200', 'text', 'So awesome!'),
(10, 3, 340, 242, 200, 100, '200,200,200', 'text', 'Adding to this post :O'),
(11, 4, 90, 49, 200, 100, '200,200,200', 'text', 'So hidden'),
(12, 4, 409, 131, 200, 100, '200,200,200', 'text', 'Much private'),
(13, 4, 64, 294, 200, 100, '200,200,200', 'text', 'Very sneak'),
(14, 5, 187, 108, 200, 100, '200,200,200', 'text', 'babydoll'),
(15, 14, 123, 76, 200, 100, '#bbb', 'text', ''),
(16, 14, 402, 131, 200, 100, '#ff7153', 'text', ''),
(17, 14, 161, 224, 200, 100, '#faf05b', 'text', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `extension` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '.jpg',
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `extension`, `password`) VALUES
(1, 'NoProfilePic', 'nopic@mail.com', 'jpg', '$2y$12$zkNJWf3DSuV5fQAAwrPRqeNR/ZPZf44SDXbM8W6gmm1zSyXBlekTS'),
(2, 'CharlotteVanroelen', 'charlotte.vanroelen@gmail.com', 'jpg', '$2y$12$NeHUkm4RcZaSKV7V0W6FGes2H4Q.yrosQEbSIb9iYgug9.hjzWsUK'),
(3, 'CVanroelen', 'charlotte@vanroelen.be', 'gif', '$2y$12$J607ArHjeLFXqAaX0jMAEuG.ojZdZvThUEPWG0Kp6g/FzLZrKaiwO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `flowcharts`
--
ALTER TABLE `flowcharts`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lines`
--
ALTER TABLE `lines`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shapes`
--
ALTER TABLE `shapes`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `flowcharts`
--
ALTER TABLE `flowcharts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `lines`
--
ALTER TABLE `lines`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `shapes`
--
ALTER TABLE `shapes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
