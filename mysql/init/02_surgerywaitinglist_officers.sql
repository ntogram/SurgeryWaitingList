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
-- Table structure for table `officers`
--

DROP TABLE IF EXISTS `officers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `officers` (
  `officerID` int NOT NULL,
  `armyRank` varchar(45) NOT NULL,
  PRIMARY KEY (`officerID`),
  CONSTRAINT `officerIDFK` FOREIGN KEY (`officerID`) REFERENCES `patients` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officers`
--

LOCK TABLES `officers` WRITE;
/*!40000 ALTER TABLE `officers` DISABLE KEYS */;
INSERT INTO `officers` VALUES (483,'Στρατιώτης (Στρ)'),(487,'Στρατιώτης (Στρ)'),(489,'Ανώτερος'),(491,'Ανώτερος'),(493,'Ανώτατος'),(496,'Κατώτερος'),(497,'Ανώτερος'),(499,'Κατώτερος'),(504,'Αρχιλοχίας (Αλχιας)'),(507,'Ανώτερος'),(509,'Ανώτερος'),(511,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)'),(515,'Κατώτερος'),(520,'Ανώτερος'),(522,'Ανώτερος'),(525,'Ταξίαρχος (Ταξχος)'),(530,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)'),(532,'Ανθυπολοχαγός (Ανθλγός)'),(536,'Κατώτερος'),(538,'Ανώτερος'),(539,'Ανώτατος'),(540,'Κατώτερος'),(541,'Στρατηγός (Στγος)'),(544,'Αρχιλοχίας (Αλχιας)'),(546,'Στρατηγός (Στγος)'),(547,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)'),(552,'Κατώτερος'),(553,'Στρατιώτης (Στρ)'),(554,'Στρατιώτης (Στρ)'),(564,'Υπόστράτηγος (Υπγος)'),(567,'Λοχαγός (Λγός)'),(569,'Ανώτερος'),(571,'Ανώτατος'),(572,'Ανώτερος'),(574,'Στρατιώτης (Στρ)'),(585,'Στρατιώτης (Στρ)'),(591,'Κατώτερος'),(594,'Στρατιώτης (Στρ)'),(595,'Ανώτερος');
/*!40000 ALTER TABLE `officers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14  7:32:06
