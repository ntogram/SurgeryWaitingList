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
-- Table structure for table `token_blacklist`
--

DROP TABLE IF EXISTS `token_blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jti` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jti_UNIQUE` (`jti`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist`
--

LOCK TABLES `token_blacklist` WRITE;
/*!40000 ALTER TABLE `token_blacklist` DISABLE KEYS */;
INSERT INTO `token_blacklist` VALUES (6,'cb4c9176-dd00-4ce5-8759-4625fe0c886f','2024-11-06 07:05:53'),(7,'3e4a2dfe-7cd5-47eb-887d-d9a5028b14ab','2024-11-06 07:05:53'),(8,'29bb6649-6e79-4491-8925-3a5b77ed7f64','2024-11-06 07:05:53'),(9,'857037d7-f72a-4e3b-8bf2-8d0135dd7169','2024-11-06 07:05:53'),(10,'0a2fd4f0-d1a6-48b1-a7cb-b29129f43945','2024-11-07 06:52:37'),(11,'104ee321-c7c4-4c13-a823-2b6e2d5c3fb9','2024-11-07 06:52:37'),(12,'561b67c7-24e2-47ff-916c-96663d479848','2024-11-07 07:50:08'),(13,'5d75e7f7-8fc3-4666-afb1-4bd90e719db4','2024-11-07 07:50:08'),(14,'9d80ff63-37cb-462c-ba98-d0b3e71cbd9b','2024-11-07 07:50:08'),(15,'16ed8ed9-ec85-4f22-a57d-07dc506bb2d5','2024-11-07 07:50:08'),(16,'e40e9f7e-044a-46a1-b580-e181be994587','2024-11-08 03:39:56'),(17,'66a1fc6a-3926-4c27-bd7c-fcd7dfd7a124','2024-11-08 03:39:56'),(18,'a347a3c1-433e-4fe0-89c1-732e7107760e','2024-11-08 03:39:56'),(19,'f2e1ceca-2fe5-474c-b529-016671d5db8a','2024-11-08 03:39:56'),(20,'7227a1ea-afaf-43c9-8972-e1ef372e6881','2024-11-08 03:39:56'),(21,'0988014b-e185-4b53-a614-31048ab564a2','2024-11-08 03:39:56'),(22,'0b79f8e0-b52a-430d-a897-32a783638ce7','2024-11-08 03:39:56'),(23,'752c5b1e-5f73-42ae-a198-9611a521ba90','2024-11-08 03:39:56'),(24,'375870f2-3e9c-49ad-9674-c2eccfb6abb5','2024-11-08 03:39:56'),(25,'9238018e-ee0e-402f-9c8e-982cc9454282','2024-11-08 03:39:56'),(26,'19d9f780-7f62-4307-b7cb-0c75d852f031','2024-11-08 03:39:56'),(27,'2377529c-27be-4951-a9e0-d62344c28590','2024-11-08 03:39:56'),(28,'a139f30a-0a25-4316-9fa8-1235543abf9c','2024-11-08 03:39:56'),(29,'6320040d-5e76-4f41-a555-f3ba225e70f4','2024-11-08 03:39:56'),(30,'f2529820-ad9c-4a90-82b4-8c01c58b2552','2024-11-08 09:40:28'),(31,'8053d33a-5f58-4592-a8c8-dbb4d3a94351','2024-11-08 09:40:28'),(32,'f33172eb-669f-4e93-8f55-73d472bedfc5','2024-11-08 09:40:28'),(33,'ee134c1e-08ed-4357-a527-ea30dd51c96d','2024-11-08 09:40:28'),(34,'946279f4-a881-4a7c-bb9d-21bcef4de61e','2024-11-08 09:40:28'),(35,'6141c59f-c9cb-4d40-b15b-e69a308c5e89','2024-11-08 09:40:28'),(36,'5ff08459-5eff-4dca-9915-b9b1504a49f3','2024-11-08 09:40:28'),(37,'d054fdf7-8bda-4dd1-9620-3d37ce671013','2024-11-08 09:40:28'),(38,'f5bee657-a3b5-4a0d-9001-781c9311fae2','2024-11-08 09:40:28'),(39,'a87704b4-ea36-4f7a-a7c0-523d0a58bb3d','2024-11-08 09:40:28'),(40,'64550b25-ecc1-4e33-be29-c4b0ab0b7185','2024-11-08 09:40:28'),(41,'0c7b5c88-8d28-4a95-9576-bc2b4e03431d','2024-11-08 09:40:28'),(42,'2b057e5e-bb1e-4458-9861-e1e2a5f43f6a','2024-11-08 09:40:28'),(43,'e9fc34f1-39c4-426c-9b27-2c26e4f40374','2024-11-08 09:40:28'),(44,'6bad9f73-f525-4e13-9fbe-5daa87da4ecd','2024-11-08 11:09:15'),(45,'b0ddc175-2408-4e3b-85b1-c9bfdea9fbd0','2024-11-08 11:09:15'),(46,'b8204e17-d9ca-4c80-bd70-6efdb45a84b8','2024-11-08 11:09:15'),(47,'43f8042a-e68e-493d-bb09-58fef903a767','2024-11-08 11:09:15'),(48,'ccf2340a-ae8e-418e-9f2d-ad702174e746','2024-11-08 14:32:38'),(49,'711cb4d6-b536-4954-ba92-e043b594be99','2024-11-08 14:32:38'),(50,'dfe55f16-a319-4f15-8c41-549f63ee6c48','2024-11-08 14:32:38'),(51,'12044859-e8a9-4655-a1aa-a0012f4ac697','2024-11-08 14:32:38'),(52,'dbb6ea7b-9c14-4999-a4a0-d08116697270','2024-11-08 14:32:38'),(53,'13aabb1b-4ace-4958-a3b8-90b0c56c2c77','2024-11-08 14:32:38'),(54,'8355daac-f3a8-4029-b5a9-b5756f3ec92f','2024-11-08 14:32:38'),(55,'89d9704f-a50a-44c7-a559-1b6d7e8c5375','2024-11-08 14:32:38'),(56,'97ff5150-d6bb-4a80-ada3-d04a1269e937','2024-11-08 14:32:38'),(57,'e887044f-73ff-427e-93db-77c05b644133','2024-11-08 14:32:38'),(58,'e488de55-2745-46b6-9ebd-1862caf0113a','2024-11-08 14:32:38'),(59,'c0bf8116-cf0e-46ad-a3b2-d405a511d006','2024-11-08 14:32:38'),(60,'9e618e67-144c-4032-a78c-a79702e7d5e0','2024-11-08 15:02:17'),(61,'e852c172-7590-4f9e-88f4-26ed3921ea46','2024-11-08 15:02:17'),(62,'e44617b5-75b1-47a3-8495-f8f4876208cc','2024-11-08 15:30:35'),(63,'478f403d-9a79-49f2-83a4-4b49112704da','2024-11-08 15:30:35'),(64,'8c95fc3f-c731-428b-b8c4-d56efd40181c','2024-11-08 15:30:35'),(65,'c2965ddb-7cc7-4f64-8c51-481659e0dff3','2024-11-08 15:30:35'),(66,'f1e406d1-a226-4186-9b9f-5e7a2eda33b9','2024-11-08 15:30:35'),(67,'14086ab5-b64c-4b7b-951c-ac739e842adc','2024-11-08 15:30:35'),(68,'de4662be-5f13-4fbd-8aee-1fc86117b0bd','2024-11-08 15:30:35'),(69,'b8a4961e-61a1-450f-8894-b9c6dcd15066','2024-11-08 15:30:35'),(70,'e0cc7efd-8d0a-4333-b118-9d1b7989b604','2024-11-10 07:14:27'),(71,'d5fc39e2-7bbc-4a4a-a214-76106c14a98c','2024-11-10 07:14:27'),(72,'5d9dbf72-fba4-4ea1-8a91-5038421e81d2','2024-11-10 08:12:35'),(73,'fe94faaa-4dd3-4da5-a6e7-b8bcaf38d375','2024-11-10 08:12:35'),(74,'3a149f8a-82e8-4c57-b4c1-fd19b96fd7fa','2024-11-10 09:09:39'),(75,'c0318bea-10a4-4f92-b50c-b9c0cbb21d56','2024-11-10 09:09:39'),(76,'a0da9ff2-39fb-4ddb-b40a-bfcdc6dd88ff','2024-11-10 09:50:06'),(77,'bf7c3761-19d8-4615-b216-5fb41d70ba8c','2024-11-10 09:50:06'),(78,'3b938edf-f89e-4961-8abe-56beb139dcf7','2024-11-10 15:23:57'),(79,'0ff65dbd-f74f-46ad-a21c-f1a26f83bccb','2024-11-10 15:23:57'),(80,'f807432f-6bee-426f-925e-9f60dab57df2','2024-11-28 05:07:48'),(81,'de3123e5-c90a-42ac-a22a-09cb3fa9878d','2024-11-28 05:07:48'),(82,'19011cfc-457b-4be7-92a8-a84bf13fc716','2024-11-28 05:07:48'),(83,'49de227f-449a-42a9-9550-b6faf1c4261d','2024-11-28 05:07:48'),(84,'eda661a7-12ae-4cdf-b1c6-e52652749756','2025-01-02 05:32:30'),(85,'9d17bf04-5971-4c9f-9d0f-ab385647561e','2025-01-02 05:32:30');
/*!40000 ALTER TABLE `token_blacklist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-19 16:34:53
