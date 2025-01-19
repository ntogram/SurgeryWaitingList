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
INSERT INTO `surgerytypes` VALUES ('Full FESS','Πολύ Μεγάλη',220),('Mini FESS','Μεγάλη',210),('UPPP','Μεγάλη',210),('Αδενοτομή','Μεσαία',75),('Άλλου είδους επέμβαση','Πολύ Μεγάλη',220),('Αμυγδαλεκτομή','Μεσαία',75),('Αναβολεκτομή','Μεγάλη',210),('Ανοπλαστική λειτουργική','Μεγάλη',210),('Αφαίρεση λίθου υπογνάθιου αδένα','Μεσαία',75),('Αφαίρεση συγγενών διαμαρτιών (βρογχιακή κύστη, κύστη θυρεογλωσσικού πόρου)','Μεγάλη',210),('Αφαίρεση υπογνάθιου αδένα','Μεγάλη',210),('Βιοψία βλάβης-όγκου υπό διερεύνηση','Μεσαία',75),('Διαφραγματοπλαστική-Κογχοπηξία','Μεσαία',75),('Θυροειδεκτομή','Μεγάλη',210),('Καναλοπλαστική','Μεσαία',75),('Κογχοπηξία','Μικρή',30),('Κογχοπλαστική','Μεσαία',75),('Λεμφαδενικός καθαρισμός τραχήλου','Πολύ Μεγάλη',220),('Μαστοειδεκτομή','Μεγάλη',210),('Μέση ρινοαντροστομία','Μεγάλη',210),('Μέση ρινοαντροστομίας άμφω','Μεγάλη',210),('Μικρολαρυγγοσκόπηση','Μεσαία',75),('Όγκοι κακοήθεις','Μεγάλη',210),('Όγκοι καλοήθεις','Μεγάλη',210),('Πανενδοσκόπηση','Μεσαία',75),('Παρωτιδεκτομή','Μεγάλη',210),('Σιαλενδοσκόπηση','Μεσαία',75),('Σιελαδενίτιδα','Μεγάλη',210),('Τυμπανοπλαστική','Μεγάλη',210);
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

-- Dump completed on 2025-01-19 16:34:54
