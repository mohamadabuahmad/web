-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: localhost    Database: networking
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `comment_content` text,
  `comment_date` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,2,'Nice post, John!','2024-07-27 11:00:00'),(2,2,3,'Great post, Jane!','2024-07-27 11:05:00'),(3,3,4,'Interesting post, Alice!','2024-07-27 11:10:00'),(4,4,5,'Thanks for sharing, Bob!','2024-07-27 11:15:00'),(5,5,6,'Good job, Charlie!','2024-07-27 11:20:00'),(6,6,7,'Well done, David!','2024-07-27 11:25:00'),(7,7,8,'Awesome post, Eve!','2024-07-27 11:30:00'),(8,8,9,'Very informative, Frank!','2024-07-27 11:35:00'),(9,9,10,'Thanks for the info, Grace!','2024-07-27 11:40:00'),(10,10,1,'Nice one, Hank!','2024-07-27 11:45:00'),(11,1,1,'good','2024-07-27 15:10:41');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`friend_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (10,1),(1,2),(2,3),(3,4),(4,5),(5,6),(6,7),(7,8),(8,9),(9,10);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`like_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,1,'2'),(2,2,'3'),(3,3,'4'),(4,4,'5'),(5,5,'6'),(6,6,'7'),(7,7,'8'),(8,8,'9'),(9,9,'10'),(10,10,'1'),(11,1,'1');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `notification_content` text,
  `seen` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'You have a new friend request from Jane.',0),(2,2,'You have a new friend request from John.',0),(3,3,'Your post received a new comment from Bob.',0),(4,4,'Your post received a new like from Alice.',0),(5,5,'You have a new friend request from David.',0),(6,6,'Your profile was viewed by Eve.',0),(7,7,'You have a new message from Frank.',0),(8,8,'Your post received a new like from Grace.',0),(9,9,'You have a new friend request from Hank.',0),(10,10,'Your post received a new comment from John.',0),(11,1,'john_doe has liked your post',0),(12,1,'john_doe added a comment to your post: good',0);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_content` text,
  `post_date` datetime DEFAULT NULL,
  `likes_num` int DEFAULT '0',
  `comments_num` int DEFAULT '0',
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'This is the first post by John.','2024-07-27 10:00:00',11,6),(2,2,'This is the first post by Jane.','2024-07-27 10:05:00',8,3),(3,3,'This is the first post by Alice.','2024-07-27 10:10:00',12,6),(4,4,'This is the first post by Bob.','2024-07-27 10:15:00',7,2),(5,5,'This is the first post by Charlie.','2024-07-27 10:20:00',9,4),(6,6,'This is the first post by David.','2024-07-27 10:25:00',11,5),(7,7,'This is the first post by Eve.','2024-07-27 10:30:00',5,1),(8,8,'This is the first post by Frank.','2024-07-27 10:35:00',14,7),(9,9,'This is the first post by Grace.','2024-07-27 10:40:00',6,3),(10,10,'This is the first post by Hank.','2024-07-27 10:45:00',13,8),(11,1,'hello i am new here\n','2024-07-27 15:10:52',0,0);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recovery`
--

DROP TABLE IF EXISTS `recovery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recovery` (
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `question1` varchar(255) DEFAULT NULL,
  `answer1` varchar(255) DEFAULT NULL,
  `question2` varchar(255) DEFAULT NULL,
  `answer2` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`email`),
  CONSTRAINT `recovery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recovery`
--

LOCK TABLES `recovery` WRITE;
/*!40000 ALTER TABLE `recovery` DISABLE KEYS */;
INSERT INTO `recovery` VALUES (1,'john.recovery@example.com','What is your pet’s name?','Fluffy','What is your mother’s maiden name?','Smith','123456'),(2,'jane.recovery@example.com','What was the name of your first school?','Greenwood','What is your favorite book?','1984','654321'),(3,'alice.recovery@example.com','What is your favorite movie?','Inception','What was your first car?','Toyota','111111'),(4,'bob.recovery@example.com','Where were you born?','New York','What is your favorite color?','Blue','222222'),(5,'charlie.recovery@example.com','What is your favorite sport?','Soccer','What is your favorite dish?','Pizza','333333'),(6,'david.recovery@example.com','What is your dream job?','Scientist','What is your favorite hobby?','Reading','444444'),(7,'eve.recovery@example.com','What is your favorite animal?','Dog','What is your favorite city?','Paris','555555'),(8,'frank.recovery@example.com','What is your best friend’s name?','Mike','What is your favorite season?','Winter','666666'),(9,'grace.recovery@example.com','What is your favorite food?','Sushi','What is your favorite drink?','Coffee','777777'),(10,'hank.recovery@example.com','What is your favorite TV show?','Friends','What is your favorite holiday?','Christmas','888888'),(11,'mohamdadm254@gmail.com','What was the name of your first pet?','q1','What is your mother\'s maiden name?','q2',NULL);
/*!40000 ALTER TABLE `recovery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `user_id` int NOT NULL,
  `skill` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`,`skill`),
  CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (1,'JavaScript'),(2,'Python'),(3,'Java'),(4,'C++'),(5,'Ruby'),(6,'PHP'),(7,'Swift'),(8,'Go'),(9,'Kotlin'),(10,'Rust'),(11,'java');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suggestion_list`
--

DROP TABLE IF EXISTS `suggestion_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suggestion_list` (
  `user_id` int NOT NULL,
  `suggested_user_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`suggested_user_id`),
  KEY `suggested_user_id` (`suggested_user_id`),
  CONSTRAINT `suggestion_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `suggestion_list_ibfk_2` FOREIGN KEY (`suggested_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suggestion_list`
--

LOCK TABLES `suggestion_list` WRITE;
/*!40000 ALTER TABLE `suggestion_list` DISABLE KEYS */;
INSERT INTO `suggestion_list` VALUES (10,1),(1,2),(2,3),(3,4),(4,5),(5,6),(6,7),(7,8),(8,9),(9,10);
/*!40000 ALTER TABLE `suggestion_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `education` text,
  `photo` blob,
  `user_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John','Doe','1','john.doe@example.com','123456','123-456-7890','Bachelor of Science',_binary 'BLOB1','john_doe'),(2,'Jane','Smith','1','jane.smith@example.com','654321','987-654-3210','Master of Arts',_binary 'BLOB2','jane_smith'),(3,'Alice','Johnson','1','alice.johnson@example.com','111111','555-666-7777','Doctor of Philosophy',_binary 'BLOB3','alice_johnson'),(4,'Bob','Brown','1','bob.brown@example.com','222222','444-555-6666','Bachelor of Engineering',_binary 'BLOB4','bob_brown'),(5,'Charlie','Davis','1','charlie.davis@example.com','333333','333-444-5555','Master of Business Administration',_binary 'BLOB5','charlie_davis'),(6,'David','Wilson','1','david.wilson@example.com','444444','222-333-4444','Bachelor of Fine Arts',_binary 'BLOB6','david_wilson'),(7,'Eve','Taylor','1','eve.taylor@example.com','555555','111-222-3333','Master of Science',_binary 'BLOB7','eve_taylor'),(8,'Frank','Thomas','1','frank.thomas@example.com','666666','999-888-7777','Bachelor of Commerce',_binary 'BLOB8','frank_thomas'),(9,'Grace','Lee','1','grace.lee@example.com','777777','888-777-6666','Bachelor of Arts',_binary 'BLOB9','grace_lee'),(10,'Hank','Martinez','1','hank.martinez@example.com','888888','777-666-5555','Doctor of Medicine',_binary 'BLOB10','hank_martinez'),(11,'mohamad','abu ahmad','1','mohamdadm254@gmail.com','123','0542366982','1',_binary 'mohamad','Mohamad');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'networking'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-28 19:45:49
