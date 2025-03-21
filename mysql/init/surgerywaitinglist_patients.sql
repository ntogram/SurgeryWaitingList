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
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `fatherName` varchar(45) NOT NULL,
  `age` smallint NOT NULL,
  `property` enum('Μόνιμος Στρατιωτικός','Έφεδρος Στρατιωτικός','Αστυνομικός','Απόστρατος','Μέλος','Ιδιώτης') NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `PATIENTDATA` (`name`,`surname`,`fatherName`,`age`,`property`)
) ENGINE=InnoDB AUTO_INCREMENT=645 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (626,'a','c','s',22,'Έφεδρος Στρατιωτικός'),(601,'A','N','P',51,'Μόνιμος Στρατιωτικός'),(629,'a1','b1','c1',20,'Έφεδρος Στρατιωτικός'),(605,'b','v','f',67,'Μόνιμος Στρατιωτικός'),(627,'ddd','sdss','sssss',23,'Μόνιμος Στρατιωτικός'),(563,'dff','wdwd','ss',24,'Μέλος'),(628,'ds','sss','sss',22,'Μέλος'),(582,'e','r','a',43,'Μέλος'),(634,'er','rt','ff',56,'Αστυνομικός'),(606,'ff','ddd','fff',67,'Αστυνομικός'),(572,'ff','vdd','svsvsv',25,'Αστυνομικός'),(596,'g','y','u',0,'Έφεδρος Στρατιωτικός'),(590,'gfjffj','fjfjfj','fjfj',25,'Ιδιώτης'),(637,'grgrgrg','rrgrg','rggrrgrg',48,'Έφεδρος Στρατιωτικός'),(636,'kkk','jooo','fefe',16,'Ιδιώτης'),(570,'mmkk','ctcyy','uuoo',41,'Μέλος'),(639,'rrry','yerryeyre','ryerye',45,'Απόστρατος'),(638,'scs','scsc','scsc',32,'Αστυνομικός'),(591,'sjshs','sdbdkd','rrkepe',0,'Αστυνομικός'),(602,'V','B','B',21,'Μόνιμος Στρατιωτικός'),(562,'we','rr','ww',84,'Απόστρατος'),(541,'Αθανασια','Αλεβιζόπουλος','Νικόλαος',0,'Μόνιμος Στρατιωτικός'),(513,'Αθανασια','Αλιβιζάτος','Απόστολος',0,'Ιδιώτης'),(508,'Αθανασια','Ζέρβας','Αθανασια',0,'Μέλος'),(485,'Αθανάσιος','Αυγερινός','Φώτιος',0,'Ιδιώτης'),(520,'Αθανάσιος','Βλαστός','Ανδρέας',0,'Αστυνομικός'),(552,'Αθανάσιος','Μαυρίδης','Αντώνης',0,'Αστυνομικός'),(573,'Αθηνά','Οικονόμου','Ευάγγελος',21,'Απόστρατος'),(512,'Αικατερινη','Κωνσταντίνου','Αριστείδης',0,'Ιδιώτης'),(483,'Αλεξανδρος','Ζάππας','Θρασύβουλος',22,'Έφεδρος Στρατιωτικός'),(564,'Αλέξης','Ζορμπάς','Νικόλαος',53,'Μόνιμος Στρατιωτικός'),(566,'Αναστασία','Πάνου','Χριστόφορος',18,'Μέλος'),(532,'Αννα','Παπακωνσταντίνου','Αλεξανδρα',1,'Μόνιμος Στρατιωτικός'),(540,'Αννα','Παπαστεφάνου','Αθανάσιος',0,'Αστυνομικός'),(499,'Απόστολος','Αγγελόπουλος','Στέφανος',1,'Αστυνομικός'),(531,'Απόστολος','Αντωνόπουλος','Δεσποινα',0,'Ιδιώτης'),(542,'Απόστολος','Ζαφειρόπουλος','Νικόλαος',0,'Ιδιώτης'),(524,'Απόστολος','Λόντος','Στέφανος',1,'Μέλος'),(514,'Αριστείδης','Γκόφας','Θεόδωρος',0,'Ιδιώτης'),(548,'Αριστείδης','Δραγούμης','Δημήτρης',0,'Απόστρατος'),(489,'Αριστείδης','Μαγγίνας','Γεώργιος',1,'Αστυνομικός'),(607,'ας','βσω','γδφς',44,'Έφεδρος Στρατιωτικός'),(624,'γ','γ','γ',32,'Μόνιμος Στρατιωτικός'),(625,'γ','γγ','η',64,'Μόνιμος Στρατιωτικός'),(623,'γδγδ','δγδγ','δγγδδγδγ',5,'Μέλος'),(493,'Γεωργια','Παπάγος','Άγγελος',0,'Αστυνομικός'),(494,'Γεώργιος','Δελής','Παναγιώτης',0,'Έφεδρος Στρατιωτικός'),(569,'γηγξξ','γθηη','μμο',14,'Αστυνομικός'),(618,'δ','γδδ','γδγδδ',23,'Ιδιώτης'),(595,'δδββ','δδφσσσφσφφσφ','δδωβδδ',29,'Αστυνομικός'),(501,'Δεσποινα','Αναγνωστάκης','Δημήτρης',1,'Ιδιώτης'),(518,'Δεσποινα','Ηλιόπουλος','Γρηγόριος',0,'Ιδιώτης'),(538,'Δεσποινα','Κομνηνός','Ιωάννης',1,'Αστυνομικός'),(504,'Δεσποινα','Μπουκουβαλαίοι','Χαράλαμπος',0,'Μόνιμος Στρατιωτικός'),(528,'Δημητρα','Μελετόπουλος','Δημήτρης',0,'Ιδιώτης'),(503,'Δημήτρης','Δεσποτόπουλος','Αντώνης',0,'Μέλος'),(495,'Διονύσιος','Αναγνώστου','Σταύρος',0,'Έφεδρος Στρατιωτικός'),(511,'Διονύσιος','Βασιλείου','Αναστασια',1,'Μόνιμος Στρατιωτικός'),(502,'Διονύσιος','Βλαστός','Γρηγόριος',0,'Μέλος'),(547,'Διονύσιος','Παπαστεφάνου','Παρασκευάς',0,'Μόνιμος Στρατιωτικός'),(608,'δςφεςφεςφε','φεςφεςφ','φεςςφεφ',52,'Μόνιμος Στρατιωτικός'),(620,'δφφ','φδσφσδσφδ','φσσ',3,'Μέλος'),(621,'δφφδ','φσφ','σφφσ',18,'Ιδιώτης'),(545,'Ελευθέριος','Παπαϊωάννου','Αριστείδης',0,'Μέλος'),(546,'Ευαγγελια','Μεσσηνέζης','Απόστολος',1,'Μόνιμος Στρατιωτικός'),(539,'Ευάγγελος','Παπαντωνίου','Χρήστος',1,'Αστυνομικός'),(536,'Ευστάθιος','Καλύβας','Σοφια',0,'Αστυνομικός'),(543,'Ηλίας','Βασιλειάδης','Φώτιος',0,'Ιδιώτης'),(616,'ηξξ','μκλλ','ξιξιξικο',98,'Ιδιώτης'),(611,'ηφη','δφδφφηδ','ηδδηδη',22,'Αστυνομικός'),(553,'Ιάσων','Πολίτης','Νίκολαος',25,'Έφεδρος Στρατιωτικός'),(610,'ιιι','ηθηθθη','ξξκοκο',3,'Μέλος'),(550,'Ιωαννα','Ζαχαρίου','Νικόλαος',1,'Απόστρατος'),(507,'Ιωαννα','Πανταζής','Στέφανος',0,'Αστυνομικός'),(492,'Ιωαννα','Παπανικολάου','Ιωάννης',0,'Απόστρατος'),(496,'Ιωάννης','Λαμπρόπουλος','Αντώνης',0,'Αστυνομικός'),(587,'κκ','τξ','ασ',23,'Μέλος'),(600,'κκφκφ','φκφκφ','φφφλφ',35,'Μόνιμος Στρατιωτικός'),(633,'Κωσταντίνα','Αναγνώστου','Ευάγγελος',32,'Μέλος'),(641,'Κώστας','Καρότος','Πατρίκος',16,'Αστυνομικός'),(574,'Κώστας','Χρήστου','Λύσανδρος',45,'Έφεδρος Στρατιωτικός'),(554,'Κωστής','Χρήστου','Σταμάτιος',0,'Έφεδρος Στρατιωτικός'),(497,'Λεωνίδας','Γιαννόπουλος','Φώτιος',0,'Αστυνομικός'),(498,'Λεωνίδας','Διαμαντόπουλος','Θεόδωρος',0,'Ιδιώτης'),(588,'λσλσ','σασασα','σασα',31,'Απόστρατος'),(491,'Μαρια','Ζαφειρόπουλος','Σταυρουλα',1,'Αστυνομικός'),(640,'Μικαέλα','Χριστοφορίδου','Νικόλαος',75,'Μέλος'),(517,'Μιχαήλ','Αλεξόπουλος','Δημητρα',1,'Ιδιώτης'),(523,'Μιχαήλ','Αποστόλου','Αναστάσιος',0,'Απόστρατος'),(506,'Μιχαήλ','Κανακάρης-Ρούφος','Απόστολος',72,'Απόστρατος'),(565,'Μπάμπης','Αντωνίου','Νίκος',33,'Μέλος'),(589,'νγωβψβψ','νψ','νψνψνν',24,'Μέλος'),(549,'Νικόλαος','Δελή','Άγγελος',0,'Μέλος'),(644,'Νικολέττα','Προκοπίου','Ανδρέα',20,'Μέλος'),(576,'Νίκος ','Αλετρός','Βαγγέλης',17,'Ιδιώτης'),(643,'Νίκος','Παπαδόπουλος','Γεώργιος',20,'Έφεδρος Στρατιωτικός'),(597,'Νίκος','Παπαδόπουλος','Γιάνης',20,'Έφεδρος Στρατιωτικός'),(568,'Νίκος','Πέτρου','Στέφανος',64,'Απόστρατος'),(617,'ξθθθ','ξξιξι','ξιιξιξο',75,'Μέλος'),(609,'ξξξ','φφκλκφκ','κσκασκα',3,'Μέλος'),(584,'ο','η','ξ',27,'Απόστρατος'),(615,'οιηη','νξξιξιξ','νξκνμκμκμκ',82,'Απόστρατος'),(525,'Παναγιωτα','Βιλαέτης','Ευάγγελος',0,'Μόνιμος Στρατιωτικός'),(519,'Παναγιωτα','Παπαδάκης','Πέτρος',0,'Μέλος'),(522,'Παναγιώτης','Αργυριάδης','Αθανασια',0,'Αστυνομικός'),(484,'Παναγιώτης','Μπότσαρης','Μιχαήλ',1,'Μέλος'),(487,'Παρασκευάς','Καζαντζής','Σωτήριος',80,'Απόστρατος'),(527,'Παρασκευάς','Παπανδρέου','Σταυρουλα',0,'Μέλος'),(534,'Παρασκευη','Βασιλειάδης','Αννα',1,'Μέλος'),(505,'Παρασκευη','Γιαννόπουλος','Εμμανουήλ',0,'Απόστρατος'),(486,'Παρασκευη','Κακριδής','Ιωάννης',0,'Ιδιώτης'),(510,'Παύλος','Κομνηνός','Φώτιος',0,'Απόστρατος'),(500,'Πέτρος','Αλεξιάδης','Σταύρος',1,'Μέλος'),(521,'Πέτρος','Ζέρβας','Γρηγόριος',0,'Μέλος'),(575,'Πέτρος','Κωνσταντίνου','Κυριάκος',10,'Μέλος'),(630,'Πηνελόπη','Άγριου','Ιεροκλής',14,'Έφεδρος Στρατιωτικός'),(567,'Πηνελόπη','Ιακώβιδου','Νεκτάριος',35,'Μόνιμος Στρατιωτικός'),(585,'πκ','πλ','πμ',25,'Έφεδρος Στρατιωτικός'),(613,'ποπρ','κγκηκ','ργγδγ',42,'Αστυνομικός'),(614,'ππγρππργ','γργε΄γε΄γλε','γγέ΄΄γγέ΄γεγγεογγοεογεογε',31,'Ιδιώτης'),(619,'πυπυ[δ[δδ','δγδ΄γδπδγ','γ\'γδ[[δγ',38,'Μόνιμος Στρατιωτικός'),(594,'ρδφφωφ','φδσρδρ','ρφρρφδ',9,'Έφεδρος Στρατιωτικός'),(612,'ρρτετερε','ςτεςττςρετ','ξιιξιειρετ',50,'Απόστρατος'),(571,'ρρφ','ςφφς','5υηεςφςφ',38,'Αστυνομικός'),(583,'σ','δ','ε',25,'Μέλος'),(592,'σδξσδξιιδσδο','δξκδσξδσξ','ρτερερερε',0,'Μέλος'),(642,'ςιιδςιδς','ςδς;ςδ;κςδ;κς','ςδ;ςδδςςδ',32,'Αστυνομικός'),(529,'Σταύρος','Αλαφούζος','Σταυρουλα',0,'Μέλος'),(544,'Στέφανος','Αγγελίδου','Φώτιος',1,'Μόνιμος Στρατιωτικός'),(526,'Στέφανος','Δαμασκηνός','Θεόδωρος',1,'Μέλος'),(488,'Στυλιανός','Ζάρκος','Κωνσταντινα',0,'Ιδιώτης'),(551,'Στυλιανός','Καλάρης','Γεώργιος',0,'Απόστρατος'),(533,'Σωτήριος','Βαρουξής','Αικατερινη',0,'Μέλος'),(516,'Σωτήριος','Βλαστός','Φώτιος',0,'Μέλος'),(535,'Σωτήριος','Μπότσαρης','Παύλος',0,'Απόστρατος'),(509,'Σωτήριος','Νικολάκος','Παρασκευάς',1,'Αστυνομικός'),(622,'τττ','υυθι','θξιο',45,'Μέλος'),(635,'υθ','φφ','φφ',22,'Μέλος'),(586,'υιπ','υικλ','θοοο',24,'Μέλος'),(593,'υτητβγτ','υυερυ','υυυ',0,'Ιδιώτης'),(515,'Χαράλαμπος','Κοσμόπουλος','Σταυρουλα',0,'Αστυνομικός'),(537,'Χρήστος','Αλεξάνδρου','Χριστινα',0,'Ιδιώτης'),(632,'Χριστόδουλος','Χρήστου','Χρύσανθου',21,'Έφεδρος Στρατιωτικός'),(490,'Χρυσουλα','Ζαχαρίου','Σταύρος',0,'Απόστρατος'),(530,'Χρυσουλα','Μήτζου','Ευαγγελια',1,'Μόνιμος Στρατιωτικός');
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-13 10:55:01
