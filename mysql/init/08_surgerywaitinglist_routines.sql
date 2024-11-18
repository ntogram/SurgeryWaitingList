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
-- Temporary view structure for view `surgery_property_combinations`
--

DROP TABLE IF EXISTS `surgery_property_combinations`;
/*!50001 DROP VIEW IF EXISTS `surgery_property_combinations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `surgery_property_combinations` AS SELECT 
 1 AS `property`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `organ_property_combinations`
--

DROP TABLE IF EXISTS `organ_property_combinations`;
/*!50001 DROP VIEW IF EXISTS `organ_property_combinations`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `organ_property_combinations` AS SELECT 
 1 AS `property`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `surgery_property_combinations`
--

/*!50001 DROP VIEW IF EXISTS `surgery_property_combinations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `surgery_property_combinations` AS select `properties`.`property` AS `property`,`surgerytypes`.`name` AS `name` from ((select 'Μόνιμος Στρατιωτικός' AS `property` union all select 'Έφεδρος Στρατιωτικός' AS `Έφεδρος Στρατιωτικός` union all select 'Αστυνομικός' AS `Αστυνομικός` union all select 'Απόστρατος' AS `Απόστρατος` union all select 'Μέλος' AS `Μέλος` union all select 'Ιδιώτης' AS `Ιδιώτης`) `properties` join `surgerytypes`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `organ_property_combinations`
--

/*!50001 DROP VIEW IF EXISTS `organ_property_combinations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `organ_property_combinations` AS select `properties`.`property` AS `property`,`organs`.`name` AS `name` from ((select 'Μόνιμος Στρατιωτικός' AS `property` union all select 'Έφεδρος Στρατιωτικός' AS `Έφεδρος Στρατιωτικός` union all select 'Αστυνομικός' AS `Αστυνομικός` union all select 'Απόστρατος' AS `Απόστρατος` union all select 'Μέλος' AS `Μέλος` union all select 'Ιδιώτης' AS `Ιδιώτης`) `properties` join (select 'Στοματοφάρυγγας' AS `name` union all select 'Μύτη' AS `Μύτη` union all select 'Παραρρίνιοι κόλποι' AS `Παραρρίνιοι κόλποι` union all select 'Τράχηλος' AS `Τράχηλος` union all select 'Αυτί' AS `Αυτί` union all select 'Ρινοφάρυγγας' AS `Ρινοφάρυγγας` union all select 'Υποφάρυγγας' AS `Υποφάρυγγας` union all select 'Λάρυγγας' AS `Λάρυγγας` union all select 'Άλλη περιοχή' AS `Άλλη περιοχή`) `organs`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-14  7:32:07
