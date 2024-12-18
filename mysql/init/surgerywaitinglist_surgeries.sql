-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: surgerywaitinglist
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `surgeries`
--

DROP TABLE IF EXISTS `surgeries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surgeries` (
  `surgeryId` int NOT NULL AUTO_INCREMENT,
  `examDate` date NOT NULL,
  `disease` varchar(90) NOT NULL,
  `diseaseDescription` text NOT NULL,
  `organ` enum('Στοματοφάρυγγας','Μύτη','Παραρρίνιοι κόλποι','Τράχηλος','Αυτί','Ρινοφάρυγγας','Υποφάρυγγας','Λάρυγγας','Άλλη περιοχή') NOT NULL,
  `surgeryName` varchar(255) NOT NULL,
  `surgeryDate` date DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `referral` tinyint(1) DEFAULT '0',
  `patientId` int NOT NULL,
  `comments` text,
  PRIMARY KEY (`surgeryId`),
  KEY `patientIdFK_idx` (`patientId`),
  KEY `surgeryNameFK_idx` (`surgeryName`),
  CONSTRAINT `patientIdFK` FOREIGN KEY (`patientId`) REFERENCES `patients` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `surgeryNameFK` FOREIGN KEY (`surgeryName`) REFERENCES `surgerytypes` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-18  9:37:43
