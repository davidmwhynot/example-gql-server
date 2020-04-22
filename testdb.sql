-- MySQL dump 10.17  Distrib 10.3.22-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB-0ubuntu0.19.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `age` tinyint(2) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profile_user` (`user_id`),
  CONSTRAINT `profile_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES ('0d242d29-e952-4514-b1f0-9686a58bae34','61c36daf-743e-4b74-8173-36d44d051547','David','Whynot',24),('438e6c72-ddfa-40b5-bb27-76b53c8f0de1','ab0af838-80dd-4b18-88e8-ea925812f348',NULL,NULL,NULL),('4f05b596-0287-43c5-96c7-77bf52fffdf3','dc93c4ac-fde5-4fea-b7a6-a1d27b9a11c3',NULL,NULL,NULL);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscription` (
  `id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `payment_id` varchar(255) NOT NULL,
  `level` varchar(45) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subscription_user` (`user_id`),
  CONSTRAINT `subscription_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription`
--

LOCK TABLES `subscription` WRITE;
/*!40000 ALTER TABLE `subscription` DISABLE KEYS */;
INSERT INTO `subscription` VALUES ('05c537e8-c041-43bc-8d47-0a0cd0e5925a','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:16:29','0000-00-00 00:00:00'),('26fbddc0-e8dc-43b6-b908-8c0913a3b129','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:24:40','2020-04-21 15:53:12'),('4077eeda-68ad-47d7-9001-4990458de718','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:17:11','2020-04-21 15:53:12'),('42255417-e690-4a66-b160-d434d929b4fa','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:12:04','0000-00-00 00:00:00'),('4864694f-65a9-40ab-ac32-b563b446b71a','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:19:31','2020-04-21 15:53:12'),('5463e519-49cb-46ef-831d-b2c75d90a715','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:24:48','2020-04-21 15:53:12'),('8aea8e1d-5ffa-486f-aa58-d27114885029','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:15:19','2020-04-21 15:53:12'),('8b6a70a9-1174-4bcb-8cd6-ac5e32632390','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:24:46','2020-04-21 15:53:12'),('9e6a6b57-d1f0-4ba9-a90d-ed621032e766','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:10:59','0000-00-00 00:00:00'),('d8d7cd52-be48-482b-aa28-f029360e8d1a','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:09:20','0000-00-00 00:00:00'),('e615b8f2-89f9-46cc-800d-7fc01ccd45bc','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:13:22','0000-00-00 00:00:00'),('ee3a6465-0fd8-475c-9809-6532897c33df','61c36daf-743e-4b74-8173-36d44d051547','abc123','PRO','2020-04-21 16:14:27','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('61c36daf-743e-4b74-8173-36d44d051547','david2','abc123'),('ab0af838-80dd-4b18-88e8-ea925812f348','david','abc123'),('dc93c4ac-fde5-4fea-b7a6-a1d27b9a11c3','david1','abc123');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-21 21:43:15
