CREATE DATABASE  IF NOT EXISTS `surgerywaitinglist` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `surgerywaitinglist`;
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
  `officerRank` varchar(45) NOT NULL,
  `armyRank` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`officerID`),
  CONSTRAINT `officerIDFK` FOREIGN KEY (`officerID`) REFERENCES `patients` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officers`
--

LOCK TABLES `officers` WRITE;
/*!40000 ALTER TABLE `officers` DISABLE KEYS */;
INSERT INTO `officers` VALUES (483,'Στρατιώτης (Στρ)',NULL),(489,'Ανώτερος',NULL),(491,'Ανώτερος',NULL),(493,'Ανώτατος',NULL),(496,'Κατώτερος',NULL),(497,'Ανώτερος',NULL),(499,'Κατώτερος',NULL),(504,'Αρχιλοχίας (Αλχιας)',NULL),(507,'Ανώτερος',NULL),(509,'Ανώτερος',NULL),(511,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)',NULL),(515,'Κατώτερος',NULL),(520,'Ανώτερος',NULL),(522,'Ανώτερος',NULL),(525,'Ταξίαρχος (Ταξχος)',NULL),(530,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)',NULL),(532,'Ανθυπολοχαγός (Ανθλγός)',NULL),(536,'Κατώτερος',NULL),(538,'Ανώτερος',NULL),(539,'Ανώτατος',NULL),(540,'Κατώτερος',NULL),(541,'Στρατηγός (Στγος)',NULL),(544,'Αρχιλοχίας (Αλχιας)',NULL),(546,'Στρατηγός (Στγος)',NULL),(547,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)',NULL),(552,'Κατώτερος',NULL),(553,'Στρατιώτης (Στρ)',NULL),(554,'Στρατιώτης (Στρ)',NULL),(564,'Υπόστράτηγος (Υπγος)',NULL),(567,'Λοχαγός (Λγός)',NULL),(569,'Ανώτερος',NULL),(571,'Ανώτατος',NULL),(572,'Ανώτερος',NULL),(574,'Στρατιώτης (Στρ)',NULL),(585,'Στρατιώτης (Στρ)',NULL),(591,'Κατώτερος',NULL),(594,'Στρατιώτης (Στρ)',NULL),(595,'Ανώτερος',NULL),(596,'Στρατιώτης (Στρ)',NULL),(597,'Στρατιώτης (Στρ)',NULL),(600,'Αρχιλοχίας (Αλχιας)','29 ΤΑΞ ΠΖ'),(601,'Συνταγματάρχης (Σχης)','ΕΦΟΔΙΑΣΜΟΥ ΜΕΤΑΦΟΡΩΝ'),(602,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)','ΣΤΡΑΤΟΝΟΜΙΑ'),(605,'Επιλοχίας (Επχίας)','ΠΕΖΙΚΟ'),(606,'Κατώτερος',NULL),(607,'Στρατιώτης (Στρ)','ΔΙΑΒΙΒΑΣΕΙΣ'),(608,'Υπόστράτηγος (Υπγος)','ΓΕΣ'),(611,'Κατώτερος',NULL),(613,'Ανώτατος',NULL),(619,'Ανθυπασπιστής (Ανθστής)','10 ΣΠ'),(624,'Λοχίας (Λχίας)','ΣΜΥ'),(625,'Δόκιμος Έφεδρος Αξιωματικός (ΔΕΑ)','ΕΘΝΟΦΥΛΑΚΗ'),(626,'Στρατιώτης (Στρ)','ΠΕΖΙΚΟ'),(627,'Ανθυπασπιστής (Ανθστής)','ΤΕΘΩΡΑΚΙΣΜΕΝΑ'),(629,'Στρατιώτης (Στρ)','ΠΥΡΟΒΟΛΙΚΟ'),(630,'Στρατιώτης (Στρ)','ΔΙΑΒΙΒΑΣΕΙΣ'),(632,'Στρατιώτης (Στρ)','ΤΕΧΝΙΚΟ'),(634,'Κατώτερος',NULL),(637,'Στρατιώτης (Στρ)','ΕΛΕΓΚΤΙΚΟ'),(638,'Ανώτατος',NULL);
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

-- Dump completed on 2025-01-19 16:34:54
