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
-- Table structure for table `surgerytypes`
--

DROP TABLE IF EXISTS `surgerytypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surgerytypes` (
  `name` varchar(255) NOT NULL,
  `severity` enum('Μικρή','Μεσαία','Μεγάλη','Πολύ Μεγάλη') NOT NULL,
  `estimatedDuration` smallint unsigned NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surgerytypes`
--

LOCK TABLES `surgerytypes` WRITE;
/*!40000 ALTER TABLE `surgerytypes` DISABLE KEYS */;
INSERT INTO `surgerytypes` VALUES ('Άλλου είδους επέμβαση','Πολύ Μεγάλη',220),('Αποφρακτική υπνική άπνοια','Μεγάλη',210),('Βιοψία βλάβης-όγκου υπό διερεύνηση','Μεσαία',75),('Λεμφαδενικός καθαρισμός τραχήλου','Πολύ Μεγάλη',220),('Μέση ρινοαντροστομίας άμφω','Μεγάλη',210),('Όγκοι κακοήθεις','Μεγάλη',210),('Όγκοι καλοήθεις','Μεγάλη',210),('Όγκος θυρεοειδή (θυρεοειδεκτομή)','Μεγάλη',210),('Όγκος παρωτίδας (παρωτιδεκτομή)','Μεγάλη',210),('Όγκος υπογνάθιου αδένα (Αφαίρεση υπογνάθιου αδένα)','Μεγάλη',210),('Σιελαδενίτιδα','Μεγάλη',210),('Σκολίωση ρινικού διαφράγματος','Μεσαία',75),('Σκολίωση ρινικού διαφράγματος+λειτουργική ρινοπλαστική','Μεγάλη',210),('Συγγενείς διαμαρτίες (βρογχιακή κύστη, κύστη θυρεογλωσσικού πόρου)','Μεγάλη',210),('Υπερτροφία αδενοειδών εκβλαστήσεων','Μεσαία',75),('Χρόνια αμυγδαλίτιδα','Μεσαία',75),('Χρόνια παραρρινοκολπίτιδα','Πολύ Μεγάλη',220),('Χρόνια ρινίτιδα','Μικρή',30);
/*!40000 ALTER TABLE `surgerytypes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14  7:32:07
