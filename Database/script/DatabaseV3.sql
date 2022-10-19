-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: mock_tts_10
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `password` varchar(500) NOT NULL,
  `create_at` datetime DEFAULT (now()),
  `update_at` datetime DEFAULT (now()),
  `is_delete` bit(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'minhvn','123','2022-08-22 09:01:41','2022-08-22 09:01:44',_binary '\0'),(2,'minh','$2a$12$rgNZPbxxgPM4JEoF6fiDLOq13l5BEOHDxdlhNnmwC7/2yZtQZ9Cb6','2022-09-06 08:42:56','2022-09-06 08:42:56',_binary '\0'),(3,'admin','$2a$12$rgNZPbxxgPM4JEoF6fiDLOq13l5BEOHDxdlhNnmwC7/2yZtQZ9Cb6','2022-09-06 08:43:42','2022-09-06 08:43:42',_binary '\0'),(4,'staff','$2a$12$rgNZPbxxgPM4JEoF6fiDLOq13l5BEOHDxdlhNnmwC7/2yZtQZ9Cb6','2022-09-06 08:43:42','2022-09-06 08:43:42',_binary '\0');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_roles`
--

DROP TABLE IF EXISTS `accounts_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_roles` (
  `account_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`account_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `accounts_roles_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `accounts_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_roles`
--

LOCK TABLES `accounts_roles` WRITE;
/*!40000 ALTER TABLE `accounts_roles` DISABLE KEYS */;
INSERT INTO `accounts_roles` VALUES (3,1),(4,2),(2,3);
/*!40000 ALTER TABLE `accounts_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actions`
--

DROP TABLE IF EXISTS `actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actions`
--

LOCK TABLES `actions` WRITE;
/*!40000 ALTER TABLE `actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Apple','điện thoại của apple'),(2,'Samsung','điện thoại của samsung'),(16,'Đồ Thủ công','Đồ Thủ công'),(17,'Thiết bị điện tử','Thiết bị điện tử'),(18,'Trang sức','Trang sức'),(19,'Thời trang','Thời trang');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_products`
--

DROP TABLE IF EXISTS `categories_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories_products` (
  `product_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `categories_products_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `categories_products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_products`
--

LOCK TABLES `categories_products` WRITE;
/*!40000 ALTER TABLE `categories_products` DISABLE KEYS */;
INSERT INTO `categories_products` VALUES (4,1),(9,1),(10,1),(14,1),(4,2),(9,2),(10,2),(12,2),(14,2),(14,16),(14,17);
/*!40000 ALTER TABLE `categories_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `supplier_id` int NOT NULL,
  `status_id` int DEFAULT (0),
  `account_id` int NOT NULL,
  `create_at` datetime DEFAULT (now()),
  `update_at` datetime DEFAULT NULL,
  `is_delete` bit(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `account_id` (`account_id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `contacts_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  CONSTRAINT `contacts_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts_status`
--

DROP TABLE IF EXISTS `contacts_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contact_id` int NOT NULL,
  `status_id` int NOT NULL,
  `create_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `contacts_status_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `contacts_status_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts_status`
--

LOCK TABLES `contacts_status` WRITE;
/*!40000 ALTER TABLE `contacts_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_contacts`
--

DROP TABLE IF EXISTS `details_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contact_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `quantity` int DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `contact_id` (`contact_id`),
  KEY `product_variant_id` (`product_variant_id`),
  CONSTRAINT `details_contacts_ibfk_1` FOREIGN KEY (`contact_id`) REFERENCES `contacts` (`id`),
  CONSTRAINT `details_contacts_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_contacts`
--

LOCK TABLES `details_contacts` WRITE;
/*!40000 ALTER TABLE `details_contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `details_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_exports`
--

DROP TABLE IF EXISTS `details_exports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_exports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `export_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `quantity` int DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `export_id` (`export_id`),
  KEY `product_variant_id` (`product_variant_id`),
  CONSTRAINT `details_exports_ibfk_1` FOREIGN KEY (`export_id`) REFERENCES `exports` (`id`),
  CONSTRAINT `details_exports_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_exports`
--

LOCK TABLES `details_exports` WRITE;
/*!40000 ALTER TABLE `details_exports` DISABLE KEYS */;
INSERT INTO `details_exports` VALUES (13,9,4,1),(14,9,5,1),(15,10,1,1),(16,10,3,1),(17,10,2,2),(18,11,5,1),(19,12,49,1),(20,12,47,1),(21,13,4,10);
/*!40000 ALTER TABLE `details_exports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_imports`
--

DROP TABLE IF EXISTS `details_imports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_imports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `import_id` int DEFAULT NULL,
  `quantity` int DEFAULT (0),
  `total_price` decimal(20,2) NOT NULL,
  `product_variant_id` int DEFAULT NULL,
  `import_price` decimal(20,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `import_id` (`import_id`),
  KEY `foreign_key_name` (`product_variant_id`),
  CONSTRAINT `details_imports_ibfk_1` FOREIGN KEY (`import_id`) REFERENCES `imports` (`id`),
  CONSTRAINT `foreign_key_name` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_imports`
--

LOCK TABLES `details_imports` WRITE;
/*!40000 ALTER TABLE `details_imports` DISABLE KEYS */;
INSERT INTO `details_imports` VALUES (124,66,1,10000.00,7,10000.00),(125,66,4,80000.00,8,20000.00),(126,67,2,2000000.00,1,1000000.00),(127,67,5,150000.00,3,30000.00),(128,68,2,0.00,8,0.00),(129,68,1,0.00,7,0.00),(130,68,1,0.00,6,0.00),(131,70,1,0.00,8,0.00),(132,71,5,1000000.00,2,200000.00),(133,71,3,30000.00,3,10000.00),(134,72,2,40000.00,6,20000.00),(135,72,1,300000.00,2,300000.00),(136,73,1,70000.00,9,70000.00),(137,73,3,166665.00,8,55555.00),(138,73,1,10000.00,3,10000.00),(139,74,1,50000.00,5,50000.00),(140,74,5,15000.00,4,3000.00),(141,74,1,1000000.00,1,1000000.00),(142,75,1,12000.00,6,12000.00),(143,75,1,50000.00,3,50000.00),(144,75,1,30000.00,4,30000.00),(145,76,1,1000000.00,9,1000000.00),(146,77,2,20000.00,9,10000.00),(147,78,1,0.00,7,0.00),(148,78,1,0.00,6,0.00),(149,78,1,1000000.00,1,1000000.00),(150,79,1,10000.00,7,10000.00),(151,80,5,75000.00,7,15000.00),(152,81,1,160000.00,7,160000.00),(153,82,5,277775.00,7,55555.00),(154,83,1,0.00,7,0.00),(155,84,1,12.00,7,12.00),(156,85,8,720000.00,7,90000.00),(157,86,1,0.00,6,0.00),(158,87,1,40000.00,6,40000.00),(159,88,1,0.00,6,0.00),(160,89,2,0.00,6,0.00),(161,90,2,0.00,6,0.00),(162,91,1,0.00,6,0.00),(163,92,1,60000.00,9,60000.00),(164,92,8,320000.00,8,40000.00),(165,92,7,490000.00,3,70000.00),(166,92,5,1500000.00,2,300000.00),(167,92,1,1000000.00,1,1000000.00),(168,94,10,4300000.00,8,430000.00),(169,94,5,150000.00,6,30000.00),(170,94,9,3510000.00,7,390000.00),(171,95,3,0.00,8,0.00),(172,96,3,30000.00,8,10000.00),(173,96,5,1000000.00,5,200000.00),(174,97,3,30000.00,8,10000.00),(175,97,5,1000000.00,5,200000.00),(176,98,3,90000.00,8,30000.00),(177,98,5,1000000.00,9,200000.00),(178,99,5,100000.00,6,20000.00),(179,100,5,150000.00,8,30000.00),(180,100,1,100000.00,7,100000.00),(181,101,10,0.00,8,0.00),(182,102,1,30000.00,7,30000.00),(183,102,1,0.00,8,0.00),(184,103,4,120000.00,9,30000.00),(185,104,1,10000.00,9,10000.00),(186,106,8,80000.00,8,10000.00),(187,106,1,30000.00,6,30000.00),(188,106,1,10000.00,7,10000.00),(189,107,3,30000.00,8,10000.00),(190,107,3,150000.00,7,50000.00),(191,108,1,10000.00,8,10000.00),(192,108,2,200000.00,7,100000.00),(193,109,5,250000.00,9,50000.00),(194,110,1,10000000.00,36,10000000.00),(195,110,1,100000001.00,35,100000001.00),(196,111,30,3000000.00,8,100000.00),(197,112,20000,40000.00,9,2.00),(198,112,3,300000.00,36,100000.00),(199,113,2,20000.00,35,10000.00),(200,113,3,1500000.00,9,500000.00),(201,114,1,600000.00,49,600000.00),(202,114,1,600000.00,48,600000.00),(203,114,1,700000.00,47,700000.00),(204,114,1,700000.00,46,700000.00),(205,114,1,700000.00,45,700000.00),(206,115,1,600000.00,48,600000.00),(207,115,1,600000.00,49,600000.00),(208,116,4,2400000.00,49,600000.00),(209,116,2,1200000.00,48,600000.00),(210,116,1,700000.00,47,700000.00),(211,117,1,3000000.00,7,3000000.00),(212,117,20,20000000.00,4,1000000.00),(213,118,3,1800000.00,48,600000.00),(214,118,1,700000.00,45,700000.00);
/*!40000 ALTER TABLE `details_imports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `details_return_import`
--

DROP TABLE IF EXISTS `details_return_import`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `details_return_import` (
  `id` int NOT NULL AUTO_INCREMENT,
  `details_import_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `refund_reason` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `return_import_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_return_import_key` (`details_import_id`),
  KEY `tbl_return_import_2` (`return_import_id`),
  CONSTRAINT `tbl_return_import_2` FOREIGN KEY (`return_import_id`) REFERENCES `return_import` (`id`),
  CONSTRAINT `tbl_return_import_key` FOREIGN KEY (`details_import_id`) REFERENCES `details_imports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `details_return_import`
--

LOCK TABLES `details_return_import` WRITE;
/*!40000 ALTER TABLE `details_return_import` DISABLE KEYS */;
INSERT INTO `details_return_import` VALUES (38,174,2,NULL,9),(39,175,1,NULL,9),(40,175,2,NULL,10),(41,176,1,NULL,11),(42,177,2,NULL,11),(43,176,2,NULL,12),(44,177,1,NULL,12),(45,178,2,NULL,13),(46,178,2,NULL,14),(47,178,1,NULL,15),(48,172,2,NULL,16),(49,173,1,NULL,16),(50,172,1,NULL,17),(51,173,4,NULL,18),(52,156,2,NULL,19),(53,156,2,NULL,20),(54,182,1,NULL,21),(66,186,3,NULL,26),(67,187,1,NULL,26),(68,188,1,NULL,26),(69,186,3,NULL,27),(70,184,2,NULL,28),(72,189,1,NULL,30),(73,190,1,NULL,30),(74,189,2,NULL,31),(75,190,2,NULL,31),(76,185,1,NULL,32),(77,192,2,NULL,33),(78,191,1,NULL,34),(79,193,2,NULL,35),(80,193,2,NULL,36),(82,196,5,NULL,39),(83,196,20,NULL,40),(84,199,1,NULL,41),(85,200,2,NULL,41),(86,199,1,NULL,42),(87,200,1,NULL,42),(88,201,1,NULL,43),(89,202,1,NULL,43),(90,203,1,NULL,44),(91,208,3,NULL,45),(92,209,2,NULL,45),(93,208,1,NULL,46),(94,210,1,NULL,46),(95,212,10,NULL,47),(96,206,1,NULL,48),(97,207,1,NULL,49),(98,213,2,NULL,50),(99,214,1,NULL,50);
/*!40000 ALTER TABLE `details_return_import` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` text NOT NULL,
  `image` text,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `account_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Nhật Minh',NULL,'minhnhat@gmail.com','09111122244','127 Khu BIỆT THỰ Phú Mỹ Hưng',1),(2,'Thiện Nguyễn',NULL,'thienGiauCo@gmail.com','09199999999','99 Khu đô thị Tương Lai',2),(3,'Đức Anh',NULL,'anhDuc@gmail.com','03813992198','12 VinHome Bà Triệu',3),(4,'Ngọc Bùi',NULL,'ngocngoc@gmail.com','0818881238','1-99Khu nghỉ mát Nha Trang',4);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exports`
--

DROP TABLE IF EXISTS `exports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `export_inventory_id` int NOT NULL,
  `receive_inventory_id` int NOT NULL,
  `status_id` int DEFAULT (0),
  `transport_company_id` int DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `create_at` datetime DEFAULT (now()),
  `update_at` datetime DEFAULT NULL,
  `is_delete` bit(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `receive_inventory_id` (`receive_inventory_id`),
  KEY `export_inventory_id` (`export_inventory_id`),
  KEY `status_id` (`status_id`),
  KEY `transport_company_id` (`transport_company_id`),
  CONSTRAINT `exports_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `exports_ibfk_2` FOREIGN KEY (`receive_inventory_id`) REFERENCES `inventories` (`id`),
  CONSTRAINT `exports_ibfk_3` FOREIGN KEY (`export_inventory_id`) REFERENCES `inventories` (`id`),
  CONSTRAINT `exports_ibfk_4` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `exports_ibfk_5` FOREIGN KEY (`transport_company_id`) REFERENCES `transport_companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exports`
--

LOCK TABLES `exports` WRITE;
/*!40000 ALTER TABLE `exports` DISABLE KEYS */;
INSERT INTO `exports` VALUES (9,2,3,NULL,NULL,NULL,NULL,NULL,_binary '\0'),(10,1,2,NULL,NULL,NULL,NULL,NULL,_binary '\0'),(11,1,2,NULL,NULL,NULL,NULL,NULL,_binary '\0'),(12,2,1,NULL,NULL,NULL,NULL,NULL,_binary '\0'),(13,3,2,NULL,NULL,NULL,NULL,NULL,_binary '\0');
/*!40000 ALTER TABLE `exports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exports_status`
--

DROP TABLE IF EXISTS `exports_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exports_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `export_id` int NOT NULL,
  `status_id` int DEFAULT NULL,
  `create_at` datetime DEFAULT (now()),
  `account_create` int DEFAULT NULL,
  `account_receive` int DEFAULT NULL,
  `account_send` int DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `date_receive` varchar(255) DEFAULT NULL,
  `date_send` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `export_id` (`export_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `exports_status_ibfk_1` FOREIGN KEY (`export_id`) REFERENCES `exports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exports_status`
--

LOCK TABLES `exports_status` WRITE;
/*!40000 ALTER TABLE `exports_status` DISABLE KEYS */;
INSERT INTO `exports_status` VALUES (25,9,2,'2022-09-06 13:47:25',NULL,NULL,NULL,'TPN0009','06/09/2022 13:47','06/09/2022 13:47'),(26,10,2,'2022-09-06 13:48:08',NULL,NULL,NULL,'TPN00010','06/09/2022 13:48','06/09/2022 13:48'),(27,11,2,'2022-09-06 14:53:23',NULL,NULL,NULL,'TPN00011','06/09/2022 15:01','06/09/2022 15:01'),(28,12,0,'2022-09-06 15:04:13',NULL,NULL,NULL,'TPN00012',NULL,NULL),(29,13,2,'2022-09-06 16:07:19',NULL,NULL,NULL,'TPN00013','06/09/2022 16:08','06/09/2022 16:07');
/*!40000 ALTER TABLE `exports_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `import_seqid`
--

DROP TABLE IF EXISTS `import_seqid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `import_seqid` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `import_seqid`
--

LOCK TABLES `import_seqid` WRITE;
/*!40000 ALTER TABLE `import_seqid` DISABLE KEYS */;
INSERT INTO `import_seqid` VALUES (1),(6),(7),(8),(9),(10),(11),(12),(13),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26),(27),(28),(29),(30),(31),(32),(33),(34),(35),(36),(37),(38),(39),(40),(41),(42),(43),(44),(45),(46),(47),(48),(49),(50),(51),(52),(53),(54),(55),(56),(57),(58),(59),(60),(61),(62),(63),(64),(65),(66),(67),(68),(70),(71),(72),(73),(74),(75),(76),(77),(78),(79),(80),(81),(82),(83),(84),(85),(86),(87),(88),(89),(90),(91),(92),(94),(95),(96),(97),(98),(99),(100),(101),(102),(103),(104),(106),(107),(108),(109),(110),(111),(112),(113),(114),(115),(116),(117),(118);
/*!40000 ALTER TABLE `import_seqid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imports`
--

DROP TABLE IF EXISTS `imports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imports` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int DEFAULT NULL,
  `account_id` int NOT NULL,
  `note` varchar(250) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `code` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_general_ci DEFAULT NULL,
  `total_price` decimal(20,2) NOT NULL,
  `inventory_id` int NOT NULL,
  `is_paid` bit(1) DEFAULT b'0',
  `is_import` bit(1) DEFAULT b'0',
  `is_done` bit(1) DEFAULT b'0',
  `delivery_date` varchar(50) DEFAULT NULL,
  `is_return` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `account_id` (`account_id`),
  KEY `imports_ibkf_3` (`supplier_id`),
  KEY `imports_ibkf_5` (`inventory_id`),
  CONSTRAINT `imports_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `imports_ibkf_3` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  CONSTRAINT `imports_ibkf_5` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imports`
--

LOCK TABLES `imports` WRITE;
/*!40000 ALTER TABLE `imports` DISABLE KEYS */;
INSERT INTO `imports` VALUES (66,10,1,'','PON00066',90000.00,2,_binary '',_binary '',_binary '','31-08-2022 18:56',_binary '\0'),(67,7,1,'','PON00067',2150000.00,1,_binary '',_binary '',_binary '','31-08-2022 21:54',_binary '\0'),(68,1,1,'','PON00068',0.00,1,_binary '',_binary '',_binary '','12-08-2022 10:23',_binary '\0'),(70,10,1,'','PON00070',0.00,1,_binary '',_binary '',_binary '','0',_binary '\0'),(71,6,1,'','PON00071',1030000.00,2,_binary '',_binary '',_binary '','01-09-2022 17:03',_binary '\0'),(72,6,1,'','PON00072',340000.00,2,_binary '',_binary '',_binary '','02-10-2022 08:34',_binary '\0'),(73,7,1,'','PON00073',246665.00,2,_binary '',_binary '',_binary '','16-09-2022 18:30',_binary '\0'),(74,8,1,'','PON00074',1065000.00,1,_binary '',_binary '',_binary '','09-09-2022 15:00',_binary '\0'),(75,8,1,'','PON00075',92000.00,1,_binary '',_binary '',_binary '','09-09-2022 15:13',_binary '\0'),(76,1,1,'','PON00076',1000000.00,2,_binary '',_binary '',_binary '','02-09-2022 16:16',_binary '\0'),(77,8,1,'','PON00077',20000.00,2,_binary '',_binary '',_binary '','09-09-2022 16:02',_binary '\0'),(78,1,1,'','PON00078',1000000.00,1,_binary '',_binary '',_binary '','01-09-2022 18:13',_binary '\0'),(79,7,1,'','PON00079',10000.00,1,_binary '',_binary '',_binary '','01-09-2022 16:25',_binary '\0'),(80,1,1,'','PON00080',75000.00,1,_binary '',_binary '',_binary '','09-09-2022 16:19',_binary '\0'),(81,1,1,'','PON00081',160000.00,1,_binary '',_binary '',_binary '','09-09-2022 16:27',_binary '\0'),(82,1,1,'','PON00082',277775.00,1,_binary '',_binary '',_binary '','16-09-2022 16:29',_binary '\0'),(83,1,1,'','PON00083',0.00,1,_binary '',_binary '',_binary '','08-09-2022 16:38',_binary '\0'),(84,1,1,'','PON00084',12.00,1,_binary '',_binary '',_binary '','02-09-2022 16:41',_binary '\0'),(85,6,1,'','PON00085',720000.00,1,_binary '',_binary '',_binary '','10-09-2022 16:45',_binary ''),(86,1,1,'','PON00086',0.00,1,_binary '',_binary '',_binary '','02-09-2022 16:53',_binary '\0'),(87,1,1,'','PON00087',40000.00,1,_binary '',_binary '',_binary '','02-09-2022 16:55',_binary '\0'),(88,1,1,'','PON00088',0.00,1,_binary '',_binary '',_binary '','02-09-2022 16:57',_binary '\0'),(89,1,1,'','PON00089',0.00,1,_binary '',_binary '',_binary '','02-09-2022 16:57',_binary '\0'),(90,1,1,'','PON00090',0.00,1,_binary '',_binary '',_binary '','02-09-2022 16:57',_binary '\0'),(91,1,1,'','PON00091',0.00,1,_binary '',_binary '',_binary '','02-09-2022 16:57',_binary '\0'),(92,1,1,'','PON00092',3370000.00,1,_binary '',_binary '',_binary '','03-09-2022 13:11',_binary ''),(94,1,1,'','PON00094',7960000.00,2,_binary '',_binary '',_binary '','09-09-2022 19:26',_binary ''),(95,6,1,'','PON00095',0.00,1,_binary '',_binary '',_binary '','10-09-2022 20:00',_binary ''),(96,1,1,'','PON00096',1030000.00,1,_binary '',_binary '',_binary '','10-09-2022 21:36',_binary ''),(97,1,1,'','PON00097',1030000.00,1,_binary '',_binary '',_binary '','10-09-2022 21:36',_binary ''),(98,1,1,'','PON00098',1090000.00,2,_binary '',_binary '',_binary '','06-09-2022 07:13',_binary ''),(99,1,1,'','PON00099',100000.00,1,_binary '',_binary '',_binary '','06-09-2022 14:20',_binary ''),(100,1,1,'','PON00100',250000.00,3,_binary '\0',_binary '',_binary '\0','06-09-2022 20:40',_binary '\0'),(101,4,1,'','PON00101',0.00,3,_binary '',_binary '',_binary '','07-09-2022 20:41',_binary '\0'),(102,6,1,'','PON00102',30000.00,3,_binary '',_binary '',_binary '','13-09-2022 21:01',_binary ''),(103,1,1,'','PON00103',120000.00,3,_binary '',_binary '',_binary '','07-09-2022 07:51',_binary ''),(104,1,1,'','PON00104',10000.00,2,_binary '',_binary '',_binary '','06-09-2022 08:04',_binary ''),(106,6,1,'','PON00106',120000.00,3,_binary '',_binary '',_binary '','07-09-2022 09:57',_binary ''),(107,7,1,'','PON00107',180000.00,1,_binary '',_binary '',_binary '','0',_binary ''),(108,1,1,'','PON00108',210000.00,1,_binary '',_binary '',_binary '','17-09-2022 15:18',_binary ''),(109,8,1,'','PON00109',250000.00,1,_binary '',_binary '',_binary '','20-09-2022 15:21',_binary ''),(110,1,1,'','PON00110',110000001.00,2,_binary '',_binary '',_binary '','22-09-2022 18:14',_binary ''),(111,1,1,'','PON00111',3000000.00,2,_binary '',_binary '',_binary '','07-09-2022 18:16',_binary ''),(112,1,1,'','PON00112',340000.00,2,_binary '',_binary '',_binary '','0',_binary '\0'),(113,1,1,'','PON00113',1520000.00,2,_binary '',_binary '',_binary '','07-09-2022 13:19',_binary ''),(114,9,1,'','PON00114',3300000.00,2,_binary '',_binary '',_binary '','30-09-2022 10:40',_binary ''),(115,9,1,'','PON00115',1200000.00,2,_binary '',_binary '',_binary '','08-09-2022 15:06',_binary ''),(116,1,1,'','PON00116',4300000.00,2,_binary '',_binary '',_binary '','08-09-2022 15:58',_binary ''),(117,9,1,'','PON00117',23000000.00,3,_binary '',_binary '',_binary '','07-09-2022 16:02',_binary ''),(118,6,1,'','PON00118',2500000.00,2,_binary '',_binary '',_binary '','0',_binary '');
/*!40000 ALTER TABLE `imports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imports_status`
--

DROP TABLE IF EXISTS `imports_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imports_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `import_id` int NOT NULL,
  `status_id` int NOT NULL,
  `create_at` datetime DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `import_id` (`import_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `imports_status_ibfk_1` FOREIGN KEY (`import_id`) REFERENCES `imports` (`id`),
  CONSTRAINT `imports_status_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imports_status`
--

LOCK TABLES `imports_status` WRITE;
/*!40000 ALTER TABLE `imports_status` DISABLE KEYS */;
INSERT INTO `imports_status` VALUES (62,67,2,'2022-08-30 21:54:58'),(77,68,2,'2022-08-31 10:23:55'),(78,66,3,'2022-08-31 10:36:22'),(79,66,4,'2022-08-31 10:36:41'),(83,70,3,'2022-08-31 10:43:01'),(84,70,4,'2022-08-31 10:43:04'),(85,71,2,'2022-08-31 11:14:49'),(86,71,3,'2022-08-31 11:16:43'),(87,71,4,'2022-08-31 11:17:08'),(88,72,2,'2022-08-31 13:32:59'),(89,72,3,'2022-08-31 13:34:38'),(90,72,4,'2022-08-31 13:36:58'),(91,68,3,'2022-08-31 13:46:18'),(92,68,4,'2022-08-31 13:46:24'),(93,73,2,'2022-08-31 14:28:18'),(94,73,4,'2022-08-31 14:28:32'),(95,73,3,'2022-08-31 14:28:42'),(96,74,2,'2022-09-01 15:04:58'),(97,74,3,'2022-09-01 15:10:58'),(98,74,4,'2022-09-01 15:12:10'),(99,75,2,'2022-09-01 15:13:30'),(100,75,3,'2022-09-01 15:14:12'),(101,75,4,'2022-09-01 15:14:17'),(102,76,2,'2022-09-01 15:15:43'),(103,76,3,'2022-09-01 15:16:01'),(104,76,4,'2022-09-01 15:48:09'),(105,77,2,'2022-09-01 16:02:56'),(106,77,3,'2022-09-01 16:03:24'),(107,77,4,'2022-09-01 16:09:20'),(108,78,2,'2022-09-01 16:13:28'),(109,78,4,'2022-09-01 16:13:43'),(110,78,3,'2022-09-01 16:14:10'),(111,79,2,'2022-09-01 16:18:58'),(112,79,4,'2022-09-01 16:19:07'),(113,79,3,'2022-09-01 16:19:14'),(114,80,2,'2022-09-01 16:19:41'),(115,80,4,'2022-09-01 16:25:52'),(116,80,3,'2022-09-01 16:26:34'),(117,81,2,'2022-09-01 16:27:54'),(118,81,4,'2022-09-01 16:28:24'),(119,81,3,'2022-09-01 16:28:40'),(120,82,2,'2022-09-01 16:29:11'),(121,82,3,'2022-09-01 16:29:22'),(122,82,4,'2022-09-01 16:29:48'),(123,83,2,'2022-09-01 16:38:28'),(124,83,3,'2022-09-01 16:38:36'),(125,83,4,'2022-09-01 16:38:46'),(126,84,2,'2022-09-01 16:41:54'),(127,84,3,'2022-09-01 16:42:02'),(128,84,4,'2022-09-01 16:44:03'),(129,85,2,'2022-09-01 16:45:24'),(130,85,4,'2022-09-01 16:45:35'),(131,85,3,'2022-09-01 16:45:52'),(132,86,2,'2022-09-01 16:54:04'),(133,86,3,'2022-09-01 16:54:12'),(134,86,4,'2022-09-01 16:54:24'),(135,87,2,'2022-09-01 16:55:09'),(136,87,4,'2022-09-01 16:55:23'),(137,87,3,'2022-09-01 16:55:37'),(138,88,2,'2022-09-01 16:57:37'),(139,88,3,'2022-09-01 16:58:06'),(140,88,4,'2022-09-01 16:58:12'),(141,89,2,'2022-09-01 16:58:26'),(142,89,4,'2022-09-01 16:58:36'),(143,89,3,'2022-09-01 16:58:42'),(144,90,2,'2022-09-01 17:00:44'),(145,90,4,'2022-09-01 17:00:59'),(146,90,3,'2022-09-01 17:01:07'),(147,91,2,'2022-09-01 17:01:20'),(148,91,3,'2022-09-01 17:01:28'),(149,91,4,'2022-09-01 17:01:49'),(150,92,2,'2022-09-02 13:11:37'),(151,92,3,'2022-09-02 13:11:49'),(152,92,4,'2022-09-02 13:11:53'),(153,94,2,'2022-09-03 19:26:16'),(154,94,3,'2022-09-03 19:26:52'),(155,94,4,'2022-09-03 19:26:55'),(156,94,5,'2022-09-03 19:27:09'),(157,94,5,'2022-09-03 19:34:49'),(158,94,5,'2022-09-03 19:58:49'),(159,94,5,'2022-09-03 19:59:04'),(160,94,5,'2022-09-03 19:59:43'),(161,95,2,'2022-09-03 20:00:16'),(162,95,5,'2022-09-03 20:00:42'),(163,95,3,'2022-09-03 20:00:42'),(164,95,4,'2022-09-03 20:00:42'),(165,92,5,'2022-09-03 20:58:46'),(166,92,5,'2022-09-03 20:59:08'),(167,96,2,'2022-09-03 21:37:24'),(168,97,2,'2022-09-03 21:38:13'),(169,97,4,'2022-09-03 21:38:49'),(170,97,3,'2022-09-03 21:38:54'),(171,97,5,'2022-09-03 22:13:20'),(172,97,5,'2022-09-03 22:15:34'),(173,97,5,'2022-09-03 22:16:35'),(174,97,5,'2022-09-03 22:24:44'),(175,97,5,'2022-09-03 22:33:16'),(176,97,5,'2022-09-03 22:33:56'),(177,98,2,'2022-09-04 07:13:45'),(178,98,3,'2022-09-04 07:13:53'),(179,98,4,'2022-09-04 07:13:54'),(180,98,5,'2022-09-04 07:14:11'),(181,98,5,'2022-09-04 07:22:05'),(182,99,2,'2022-09-04 14:21:01'),(183,99,4,'2022-09-04 14:21:12'),(184,99,3,'2022-09-04 14:21:24'),(185,99,5,'2022-09-04 15:27:09'),(186,99,5,'2022-09-04 15:28:18'),(187,99,5,'2022-09-04 16:07:31'),(188,96,4,'2022-09-04 16:12:03'),(189,96,3,'2022-09-04 16:12:07'),(190,96,5,'2022-09-04 16:12:20'),(191,96,5,'2022-09-04 16:12:35'),(192,96,5,'2022-09-04 16:12:41'),(193,85,5,'2022-09-04 16:46:36'),(194,85,5,'2022-09-04 16:46:36'),(195,100,2,'2022-09-04 20:40:04'),(196,101,2,'2022-09-04 20:41:22'),(197,101,4,'2022-09-04 20:41:29'),(198,100,4,'2022-09-04 20:41:34'),(199,102,2,'2022-09-04 21:02:05'),(200,102,3,'2022-09-04 21:03:01'),(201,102,4,'2022-09-04 21:03:14'),(202,102,5,'2022-09-04 21:03:36'),(203,103,2,'2022-09-05 07:51:24'),(204,103,4,'2022-09-05 07:59:38'),(205,103,3,'2022-09-05 08:01:11'),(206,104,2,'2022-09-05 08:04:41'),(207,104,3,'2022-09-05 08:04:49'),(208,104,4,'2022-09-05 08:04:50'),(209,106,2,'2022-09-05 09:57:51'),(210,106,4,'2022-09-05 09:58:07'),(211,106,3,'2022-09-05 09:58:15'),(215,106,5,'2022-09-05 10:27:10'),(216,106,5,'2022-09-05 10:27:19'),(217,103,5,'2022-09-05 11:57:21'),(218,103,5,'2022-09-05 13:33:34'),(219,107,2,'2022-09-05 13:37:34'),(220,107,4,'2022-09-05 13:38:06'),(221,107,3,'2022-09-05 13:38:12'),(222,107,5,'2022-09-05 13:38:19'),(223,107,5,'2022-09-05 13:38:28'),(224,104,5,'2022-09-05 14:41:40'),(225,108,2,'2022-09-05 15:18:45'),(226,108,3,'2022-09-05 15:18:49'),(227,108,4,'2022-09-05 15:18:50'),(228,108,5,'2022-09-05 15:18:57'),(229,108,5,'2022-09-05 15:19:11'),(230,109,2,'2022-09-05 15:22:01'),(231,109,3,'2022-09-05 15:22:06'),(232,109,4,'2022-09-05 15:22:08'),(233,109,5,'2022-09-05 15:22:18'),(234,109,5,'2022-09-05 15:22:25'),(235,110,2,'2022-09-05 18:09:17'),(236,110,3,'2022-09-05 18:09:23'),(237,110,4,'2022-09-05 18:09:26'),(238,110,5,'2022-09-05 18:09:35'),(239,111,2,'2022-09-05 18:16:12'),(240,111,4,'2022-09-05 18:16:26'),(241,111,3,'2022-09-05 18:16:37'),(242,111,5,'2022-09-05 18:19:09'),(243,111,5,'2022-09-05 18:20:12'),(244,101,3,'2022-09-05 22:07:41'),(245,112,2,'2022-09-06 13:14:31'),(246,112,4,'2022-09-06 13:14:35'),(247,112,3,'2022-09-06 13:14:38'),(248,113,2,'2022-09-06 13:19:27'),(249,113,3,'2022-09-06 13:19:31'),(250,113,4,'2022-09-06 13:19:33'),(251,113,5,'2022-09-06 13:19:44'),(252,113,5,'2022-09-06 13:19:54'),(253,114,2,'2022-09-06 14:39:26'),(254,114,4,'2022-09-06 14:39:30'),(255,114,3,'2022-09-06 14:39:31'),(256,114,5,'2022-09-06 14:40:19'),(257,114,5,'2022-09-06 14:41:26'),(258,115,2,'2022-09-06 15:06:44'),(259,116,2,'2022-09-06 15:59:03'),(260,116,3,'2022-09-06 15:59:27'),(261,116,4,'2022-09-06 15:59:31'),(262,116,5,'2022-09-06 16:00:23'),(263,116,5,'2022-09-06 16:00:29'),(264,117,2,'2022-09-06 16:03:17'),(265,117,4,'2022-09-06 16:03:37'),(266,117,3,'2022-09-06 16:03:51'),(267,117,5,'2022-09-06 16:03:59'),(268,115,4,'2022-09-06 16:46:32'),(269,115,3,'2022-09-06 16:46:33'),(270,115,5,'2022-09-06 16:46:37'),(271,115,5,'2022-09-06 16:46:41'),(272,118,2,'2022-09-06 16:47:04'),(273,118,3,'2022-09-06 16:47:08'),(274,118,4,'2022-09-06 16:47:09'),(275,118,5,'2022-09-06 16:47:12');
/*!40000 ALTER TABLE `imports_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventories`
--

DROP TABLE IF EXISTS `inventories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `create_at` datetime DEFAULT (now()),
  `update_at` datetime DEFAULT NULL,
  `is_delete` bit(1) DEFAULT (0),
  `size` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories`
--

LOCK TABLES `inventories` WRITE;
/*!40000 ALTER TABLE `inventories` DISABLE KEYS */;
INSERT INTO `inventories` VALUES (1,'INV001','Kho Yên Phụ','19 Yên Phụ, Hồ tây, Hà Nội','2022-08-26 09:21:04','2022-09-06 12:36:49',_binary '\0',NULL),(2,'INV002','Kho Cầu Giấy','19 Cầu Giấy, Hà Nội','2022-08-28 15:48:08',NULL,_binary '\0',4000),(3,'INV003','Kho Hà Nội','18 Quan Nhân, Cầu Giấy, TP Hà Nội','2022-09-04 19:15:01',NULL,_binary '\0',10);
/*!40000 ALTER TABLE `inventories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventories_accounts`
--

DROP TABLE IF EXISTS `inventories_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventories_accounts` (
  `account_id` int NOT NULL,
  `inventory_id` int NOT NULL,
  PRIMARY KEY (`account_id`,`inventory_id`),
  KEY `inventory_id` (`inventory_id`),
  CONSTRAINT `inventories_accounts_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `inventories_accounts_ibfk_2` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories_accounts`
--

LOCK TABLES `inventories_accounts` WRITE;
/*!40000 ALTER TABLE `inventories_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventories_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventories_product_variant`
--

DROP TABLE IF EXISTS `inventories_product_variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventories_product_variant` (
  `inventory_id` int NOT NULL,
  `product_variant_id` int NOT NULL,
  `quantity` int DEFAULT (0),
  `is_delete` bit(1) DEFAULT (0),
  PRIMARY KEY (`inventory_id`,`product_variant_id`),
  KEY `product_variant_id` (`product_variant_id`),
  CONSTRAINT `inventories_product_variant_ibfk_1` FOREIGN KEY (`inventory_id`) REFERENCES `inventories` (`id`),
  CONSTRAINT `inventories_product_variant_ibfk_2` FOREIGN KEY (`product_variant_id`) REFERENCES `product_variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories_product_variant`
--

LOCK TABLES `inventories_product_variant` WRITE;
/*!40000 ALTER TABLE `inventories_product_variant` DISABLE KEYS */;
INSERT INTO `inventories_product_variant` VALUES (1,1,7,_binary '\0'),(1,2,15,_binary '\0'),(1,3,20,_binary '\0'),(1,4,7,_binary '\0'),(1,5,18,_binary '\0'),(1,6,13,_binary '\0'),(1,7,16,_binary '\0'),(1,8,31,_binary '\0'),(1,9,5,_binary '\0'),(2,1,1,_binary '\0'),(2,2,8,_binary '\0'),(2,3,6,_binary '\0'),(2,4,9,_binary '\0'),(2,5,1,_binary '\0'),(2,6,34,_binary '\0'),(2,7,61,_binary '\0'),(2,8,71,_binary '\0'),(2,9,20005,_binary '\0'),(2,35,1000,_binary '\0'),(2,36,200,_binary '\0'),(2,45,100,_binary '\0'),(2,46,99,_binary '\0'),(2,47,54,_binary '\0'),(2,48,19,_binary '\0'),(2,49,19,_binary '\0'),(3,4,100,_binary '\0'),(3,5,1,_binary '\0'),(3,6,98,_binary '\0'),(3,7,99,_binary '\0'),(3,8,12,_binary '\0'),(3,9,2,_binary '\0');
/*!40000 ALTER TABLE `inventories_product_variant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `action_id` int NOT NULL,
  `target_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `account_id` (`account_id`),
  KEY `action_id` (`action_id`),
  CONSTRAINT `logs_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `logs_ibfk_2` FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option_values`
--

DROP TABLE IF EXISTS `option_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `option_id` int NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `option_id` (`option_id`),
  CONSTRAINT `option_values_ibfk_1` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_values`
--

LOCK TABLES `option_values` WRITE;
/*!40000 ALTER TABLE `option_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `option_values` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `options`
--

DROP TABLE IF EXISTS `options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `options_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `options`
--

LOCK TABLES `options` WRITE;
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
/*!40000 ALTER TABLE `options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variant_options`
--

DROP TABLE IF EXISTS `product_variant_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variant_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `variant_id` int NOT NULL,
  `option_value_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `option_value_id` (`option_value_id`),
  KEY `variant_id` (`variant_id`),
  CONSTRAINT `product_variant_options_ibfk_1` FOREIGN KEY (`option_value_id`) REFERENCES `option_values` (`id`),
  CONSTRAINT `product_variant_options_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variant_options`
--

LOCK TABLES `product_variant_options` WRITE;
/*!40000 ALTER TABLE `product_variant_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_variant_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `product_id` int NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `image` text,
  `wholesale_price` decimal(20,2) DEFAULT (0),
  `sale_price` decimal(20,2) DEFAULT (0),
  `import_price` decimal(20,2) DEFAULT (0),
  `is_delete` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_variants_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (1,'SPV1',3,'nhà hàng việt nam 2-red-64GB',NULL,111111.00,123131.00,1000000.00,_binary '\0'),(2,'SPV2',3,'nhà hàng việt nam 2-green-64GB',NULL,111111.00,123131.00,300000.00,_binary '\0'),(3,'SPV3',4,'nhà hàng việt nam 2',NULL,111111.00,123131.00,NULL,_binary '\0'),(4,'SPV4',5,'macbook pro vip-64BG-red',NULL,0.00,10000000.00,NULL,_binary '\0'),(5,'SPV5',5,'macbook pro vip-64BG-green',NULL,0.00,10000000.00,NULL,_binary '\0'),(6,'SPV6',5,'macbook pro vip-64BG-black',NULL,0.00,10000000.00,NULL,_binary '\0'),(7,'SPV7',5,'macbook pro vip-12BG-red',NULL,0.00,10000000.00,NULL,_binary '\0'),(8,'SPV8',5,'macbook pro vip-12BG-green',NULL,0.00,10000000.00,NULL,_binary '\0'),(9,'SPV9',5,'macbook pro vip-12BG-black',NULL,0.00,10000000.00,NULL,_binary '\0'),(10,'SPV10',6,'macbook m2-xanh-64BG','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368435/celjpfltw7p5xvqsb8x1.jpg',20000.00,10000.00,100000.00,NULL),(11,'SPV11',6,'macbook m2-xanh-32BG','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368435/celjpfltw7p5xvqsb8x1.jpg',20000.00,10000.00,100000.00,NULL),(12,'SPV12',6,'macbook m2-đỏ-64BG','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368435/celjpfltw7p5xvqsb8x1.jpg',20000.00,10000.00,100000.00,NULL),(13,'SPV13',6,'macbook m2-đỏ-32BG','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368435/celjpfltw7p5xvqsb8x1.jpg',20000.00,10000.00,100000.00,NULL),(14,'SPV14',6,'macbook m2-tím-64BG','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368435/celjpfltw7p5xvqsb8x1.jpg',20000.00,10000.00,100000.00,NULL),(15,'SPV15',6,'macbook m2-tím-32BG','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368435/celjpfltw7p5xvqsb8x1.jpg',20000.00,10000.00,100000.00,NULL),(16,'SPV16',7,'123-1-a','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(17,'SPV17',7,'123-1-b','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(18,'SPV18',7,'123-1-c','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(19,'SPV19',7,'123-2-a','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(20,'SPV20',7,'123-2-b','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(21,'SPV21',7,'123-2-c','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(22,'SPV22',7,'123-3-a','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(23,'SPV23',7,'123-3-b','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(24,'SPV24',7,'123-3-c','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368587/alhle1bz12sbxclqofu1.jpg',123.00,1123.00,123123.00,NULL),(25,'SPV25',8,'1','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662368746/gcsbrps4ocsyqjcnjhyc.jpg',1.00,1.00,1.00,_binary '\0'),(26,'SPV26',9,'vidu-1-a','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',20000000.00,1000000.00,30000000.00,_binary '\0'),(27,'SPV27',9,'vidu-1-b','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(28,'SPV28',9,'vidu-1-c','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(29,'SPV29',9,'vidu-2-a','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(30,'SPV30',9,'vidu-2-b','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(31,'SPV31',9,'vidu-2-c','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(32,'SPV32',9,'vidu-3-a','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(33,'SPV33',9,'vidu-3-b','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(34,'SPV34',9,'vidu-3-c','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662369843/gacmegewbyf0c9d0lceo.jpg',2.00,1.00,3.00,_binary '\0'),(35,'SPV35',10,'MU-dốt','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662374877/fqg4kxbyduwccwh8mlsj.jpg',10000000.00,10000000.00,100000001.00,_binary '\0'),(36,'SPV36',10,'MU-ngu','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662374877/fqg4kxbyduwccwh8mlsj.jpg',10000000.00,10000000.00,10000000.00,_binary '\0'),(37,'SPV37',11,'nhà hàng việt nam',NULL,13.00,13.00,13.00,_binary '\0'),(38,'SPV38',12,'Samsung Galaxy S22 Ultra-Nâu-6GB','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449142/kd1ut92wxbxmfiltrhmu.jpg',18000000.00,20000000.00,15000000.00,_binary '\0'),(39,'SPV39',12,'Samsung Galaxy S22 Ultra-Nâu-8GB','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449142/kd1ut92wxbxmfiltrhmu.jpg',18000000.00,20000000.00,15000000.00,_binary '\0'),(40,'SPV40',12,'Samsung Galaxy S22 Ultra-Hồng-6GB','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449142/kd1ut92wxbxmfiltrhmu.jpg',18000000.00,20000000.00,15000000.00,_binary '\0'),(41,'SPV41',12,'Samsung Galaxy S22 Ultra-Hồng-8GB','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449142/kd1ut92wxbxmfiltrhmu.jpg',25000000.00,25000000.00,18000000.00,_binary '\0'),(42,'SPV42',12,'Samsung Galaxy S22 Ultra-Xanh-6GB','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449142/kd1ut92wxbxmfiltrhmu.jpg',25000000.00,25000000.00,18000000.00,_binary '\0'),(43,'SPV43',12,'Samsung Galaxy S22 Ultra-Xanh-8GB','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449142/kd1ut92wxbxmfiltrhmu.jpg',25000000.00,25000000.00,18000000.00,_binary '\0'),(44,'SPV44',13,'Bàn ăn Mogen-Sồi-Vàng','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449355/rghypjimht1ku24giwiv.jpg',1000000.00,1200000.00,700000.00,_binary '\0'),(45,'SPV45',13,'Bàn ăn Mogen-Sồi-Nâu','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449355/rghypjimht1ku24giwiv.jpg',1000000.00,1200000.00,700000.00,_binary '\0'),(46,'SPV46',13,'Bàn ăn Mogen-Xoan-Vàng','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449355/rghypjimht1ku24giwiv.jpg',1000000.00,1200000.00,700000.00,_binary '\0'),(47,'SPV47',13,'Bàn ăn Mogen-Xoan-Nâu','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449355/rghypjimht1ku24giwiv.jpg',1000000.00,1200000.00,700000.00,_binary '\0'),(48,'SPV48',14,'Đàn guita classic-Loang','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449853/frmgupabm0oybhsixok6.jpg',900000.00,1000000.00,600000.00,_binary '\0'),(49,'SPV49',14,'Đàn guita classic-Trơn','https://res.cloudinary.com/dbcjky0pz/image/upload/v1662449853/frmgupabm0oybhsixok6.jpg',900000.00,1000000.00,600000.00,_binary '\0');
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) NOT NULL,
  `name` text NOT NULL,
  `description` text,
  `status_id` int DEFAULT (0),
  `supplier_id` int DEFAULT NULL,
  `account_id` int NOT NULL,
  `create_at` datetime DEFAULT (now()),
  `update_at` datetime DEFAULT NULL,
  `is_delete` bit(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `supplier_id` (`supplier_id`),
  KEY `status_id` (`status_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,'SP1','nhà hàng việt nam 2','qưeqewqweq',1,1,1,'2022-08-23 16:11:28',NULL,_binary '\0'),(4,'SP4','nhà hàng việt nam 2','qưeqewqweq',1,1,1,'2022-08-25 08:52:21','2022-09-05 22:10:45',_binary '\0'),(5,'SP5','macbook pro vip 123','',1,5,1,'2022-08-26 08:40:24',NULL,_binary '\0'),(6,'SP6','macbook m2',NULL,1,NULL,1,'2022-09-05 16:02:38',NULL,_binary ''),(7,'SP7','123','123123',1,NULL,1,'2022-09-05 16:03:23',NULL,_binary ''),(8,'SP8','1',NULL,1,NULL,1,'2022-09-05 16:05:51',NULL,_binary ''),(9,'SP9','vidu số 2','qưeqwqe',1,NULL,1,'2022-09-05 16:24:19','2022-09-05 16:42:52',_binary ''),(10,'SP10','MUv1','Stack Overflow\nAbout\nProducts\nFor Teams\nSearch…\nHome\nPUBLIC\nQuestions\nTags\nUsers\nCompanies\nCOLLECTIVES\nExplore Collectives\nTEAMS\nStack Overflow for Teams – Start collaborating and sharing organizational knowledge. \nLoading indicator when button is clicked (reactjs and ant design)\nAsked 3 years, 1 month ago\nModified 1 year, 6 months ago\nViewed 5k times\n\n0\n\n\n1\nI made a button that changes its label from \'extract\' to \'extracted\' when clicked then it becomes disabled. What I want to do now is for it to have a loading indicator when clicked and stop when the button is disabled.\n\nI tried\n\ndocument.getElementById(inputID).setAttribute(\"loading\", \"true\");\nwhen button is clicked but found out that it doesn\'t work on buttons. I am also trying right now to use setState with my\n\ndocument.getElementById(\"btnTesting\").innerHTML = \"EXTRACTED\";\nclass DashboardPage extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      loading: false,\n    }\n  onClickBtn = () => {\n    this.setState({ loading: true});\n    document.getElementById(\"btnTesting\").innerHTML = \"EXTRACTED\";\n    document.getElementById(\"btnTesting\").setAttribute(\"disabled\",\"true\");\n  }\n    render() {\n       return (\n          <Button id=\"btnTesting\" onClick={this.onClickBtn} loading={this.state.loading}>EXTRACT</Button>\n       )\n    }\n  }\nI expect to have a loading indicator when clicked then stop when button is disabled. But the screen turns blank. I look in the console and saw this error\n\nUncaught DOMException: Failed to execute \'insertBefore\' on \'Node\': The node before which the new node is to be inserted is not a child of this node.\n\nThe above error occurred in the component: blah . blah .\n\nUncaught DOMException: Failed to execute \'insertBefore\' on \'Node\': The node before which the new node is to be inserted is not a child of this node.\n\nreactjs\nShare\nFollow\nedited Jul 9, 2019 at 12:19\nuser avatar\nDennis Vash\n44.4k66 gold badges8383 silver badges103103 bronze badges\nasked Jul 9, 2019 at 10:03\nuser avatar\nAlexandria.Omega.Reid\n4133 silver badges77 bronze badges\nFirst things first. Why don\'t you handle the button text and disabled attribute within the state? – \nPRogalla\n Jul 9, 2019 at 10:18\nWhen I used state, my other buttons get changed too. So I tried using innerHTML – \nAlexandria.Omega.Reid\n Jul 10, 2019 at 5:23\n@Alex.Reid. You would have to use separate state value for all the buttons to avoid that. – \nMobeen\n Jul 10, 2019 at 5:47\nAdd a comment\n3 Answers\nSorted by:\n\nHighest score (default)\n\n1\n\nBecause you\'re using React, you don\'t need to use the innerHTML or setAttribute to change button text or disabled state.\n\nYou can use state varibles buttonText, initialised to \"Extract\" and isDisabled, initialised to false, and you can change the state after the button is done executing.\n\nclass DashboardPage extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = {\n      loading: false,\n      buttonText: \"EXTRACT\",\n      isDisabled: false\n    };\n  }\n  onClickBtn = () => {\n    this.setState({ loading: true });\n    setTimeout(() => {\n      this.setState({\n        buttonText: \"EXTRACTED\",\n        isDisabled: true,\n        loading: false\n      });\n    }, 2000);\n  };\n  render() {\n    return (\n      <Button\n        id=\"btnTesting\"\n        onClick={this.onClickBtn}\n        loading={this.state.loading}\n        disabled={this.state.isDisabled}\n      >\n        {this.state.buttonText}\n      </Button>\n    );\n  }\n}\nI\'ve added a setTimeout of 2000ms so you can see the loading indicator.\n\nFind the demo here: https://codesandbox.io/s/antd-reproduction-template-l1d4r\n\nShare\nFollow\nanswered Jul 9, 2019 at 10:31\nuser avatar\nyay\n5377 bronze badges\nwhat if I have multiple buttons? How can I use my button ID? We actually have a dynamic ID from API. So our ID looks something like this id={extractButton-${value.sectionID}${value.specimenID}${value.requestID}} – \nAlexandria.Omega.Reid\n Jul 10, 2019 at 2:27\nThen your state can have objects for each button ID with the button text and loading state and disabled state. I\'ve updated my codesandbox with multiple buttons – \nyay\n Jul 10, 2019 at 13:43 \nYess. Exactly what I needed. I\'ll also try using dynamic object names. Thanks for this! – \nAlexandria.Omega.Reid\n Jul 11, 2019 at 2:01\nAdd a comment\n\n0\n\nCan you check if below code solves your issue ? I Added timer to demonstrate time affect so that loading becomes evident.\n\nWith ReactJS, you don\'t have to use setAttribute or innerHTML as ReactJS uses virtualDOM. Even if you use them, It can get DOM in inconsistent state. As per standard React practice you should handle your requirements (i.e changing DOM) with state variables\n\nclass DashboardPage extends React.Component {\n    constructor(props) {\n      super(props);\n      this.state = {\n        loading: {\"btn1\": false},\n        disabled: false,\n        buttonText: \'Extract\'\n      }\n    onClickBtn = (btnStr) => {\n      let loadingCopy = Object.assign({},this.state.loading)\n      loadingCopy[btnStr] = true\n      this.setState({loading: loadingCopy})\n      setInterval(() => {\n        loadingCopy[btnStr] = false\n        this.setState({ loading: loadingCopy, buttonText: \'Extracted\', disabled: true });\n        }, 3000);\n    }\n    render() {\n       return (\n          <ButtononClick={() =>this.onClickBtn(\"btn1\")} loading={this.state.loading[\"btn1\"]} disabled={this.state.disabled}>{this.state.buttonText}</Button>\n         )\n    }\n}\nShare\nFollow\nedited Jul 10, 2019 at 3:28\nanswered Jul 9, 2019 at 10:33\nuser avatar\nMobeen\n89522 gold badges88 silver badges2323 bronze badges\nI think I tried this weeks before. But what happens is if I have multiple buttons, they all load and change label at the same time. But this is what I needed . I just don\'t know what I should do if I have multiple buttons. PS: I\'m a beginner in Reactjs. – \nAlexandria.Omega.Reid\n Jul 10, 2019 at 1:57 \n<Button id=\"btn1\" onClick={this.onClickBtn} loading={this.state.loading} disabled={this.state.disabled}>{this.state.buttonText}</Button>           <Button id=\"btn2\" onClick={this.onClickBtn} loading={this.state.loading} disabled={this.state.disabled}>{this.state.buttonText}</Button> – \nAlexandria.Omega.Reid\n Jul 10, 2019 at 2:03\nIn that case each button should use different state variable for loading and button text. This could messy, so you can use arrays to represent each loading text. – \nMobeen\n Jul 10, 2019 at 2:50\ncan you please elaborate? – \nAlexandria.Omega.Reid\n Jul 10, 2019 at 3:16\nI have updated my answer (check how state loading is being updated now) to give you an idea. You will have to do same for other 2 states too. – \nMobeen\n Jul 10, 2019 at 3:24 \nAdd a comment\n\n0\n\nimport { Button } from \'antd\';\nimport React from \"react\";\n\nclass SubmitButton extends React.Component {\nstate = {\n    loadings: [],\n};\n\nenterLoading = index => {\n    this.setState(({loadings}) => {\n        const newLoadings = [...loadings];\n        newLoadings[index] = true;\n\n        return {\n            loadings: newLoadings,\n        };\n    });\n};\n\nrender() {\n    const {loadings} = this.state;\n    return (\n        <>\n            <Button type=\"primary\" htmlType=\"submit\" loading={loadings[0]} onClick={() => this.enterLoading(0)}>\n                Submit\n            </Button>\n        </>\n    );\n}\nCode: https://codesandbox.io/s/withered-framework-w5lmc?file=/src/App.js\n\nShare\nFollow\nanswered Feb 15, 2021 at 14:35\nuser avatar\nDanielSan\n722 bronze badges\nAdd a comment\nYour Answer\nSign up or log in\nPost as a guest\nName\nEmail\nRequired, but never shown\n\nBy clicking “Post Your Answer”, you agree to our terms of service, privacy policy and cookie policy\n\nNot the answer you\'re looking for? Browse other questions tagged reactjs or ask your own question.\nThe Overflow Blog\nFunctional programming is an ideal fit for developing blockchains\nEnvironments on-demand (Ep. 479)\nFeatured on Meta\nAnnouncing the Stack Overflow Student Ambassador Program\nGoogle Analytics 4 (GA4) upgrade\nStaging Ground Workflow: Question Lifecycle\nThe [option] tag is being burninated\nCollectives Update: WSO2 launches, and Google Go sunsets\nLinked\n0\nLoading indicator after clicking of button with dynamic id name\nRelated\n642\nWhat\'s the difference between \"super()\" and \"super(props)\" in React when using es6 classes?\n0\nUncaught (in promise) DOMException when pushing router\n0\nReactJS - Loading Indicator Not Disappearing\n5\nReactJS Ant Design - Open DatePicker on button click\n0\nError thrown when react component refreshes\n0\nant design alert position in reactjs\nHot Network Questions\nDoes water undergo thermolysis if a nuclear device detonates within it?\nDoes this money system make sense?\nHow to fill lower trianglar matrix with elements of a vector\nI messed up my text file. Have a formatting issue\nHow can an alien civilization mostly stay as a Monarchy but still are advanced enough to travel around the Galaxy?\nHow can I copy a file which gets deleted instantly\nWhich (if any) space telescope would have worked longer if it hadn\'t simply run out of helium?\nWill a spinning magnet slow down or lose its magnetism?\nWhy don\'t two Boomwhackers with a one-octave pitch difference have a 2:1 length ratio?\nWhat is the meaning of 死 in 死搬兵书上的理论?\nIf an event has a statistical probability of only 50%, is it possible to use a neural network to predict it with more than 50% accuracy?\nSimulate a biased coin with a fair coin using a fixed number of tosses\nUSCF: Should the arbiter start a time-forfeit claim?\nHow to create intervals of 100 based on a column in a query?\nSolve the inequality 1/x > x\nHow can I pay with my credit card, without disclosing its details to seller who needs them over the phone?\nWhy cite the access time of a URL if half the URLs become dead anyways?\nIs it legal to publish a \'\'copy\" of the Constitution with fake text added?\nIs possible to control \"gasleft()\" and exit of a loop before \"out of gas\" return?\nCan electrons absorb photons?\nThird law of motion before Newton?\nWhat\'s this stuff that looks like white chainmail armor growing on giant kelp?\nWhat is the best way to replace the if true condition in LWC\nYoghurt starter says to make the yoghurt at 20C/68F. What\'s different about it instead of the usual 43C/110F?\n Question feed\n\nSTACK OVERFLOW\nQuestions\nHelp\nPRODUCTS\nTeams\nAdvertising\nCollectives\nTalent\nCOMPANY\nAbout\nPress\nWork Here\nLegal\nPrivacy Policy\nTerms of Service\nContact Us\nCookie Settings\nCookie Policy\nSTACK EXCHANGE NETWORK\nTechnology\nCulture & recreation\nLife & arts\nScience\nProfessional\nBusiness\nAPI\nData\nBlog\nFacebook\nTwitter\nLinkedIn\nInstagram\nSite design / logo © 2022 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2022.9.1.42957',1,NULL,1,'2022-09-05 18:06:39','2022-09-05 18:07:10',_binary ''),(11,'SP11','nhà hàng việt nam','13',1,NULL,1,'2022-09-06 11:33:13',NULL,_binary ''),(12,'SP12','Samsung Galaxy S22 Ultra','ĐẶC ĐIỂM NỔI BẬT\nVi xử lý mạnh mẽ nhất Galaxy - Snapdragon 8 Gen 1 (4 nm)\nCamera mắt thần bóng đêm Nightography - Chụp đêm cực đỉnh\nS Pen đầu tiên trên Galaxy S - Độ trễ thấp, dễ thao tác\nDung lượng pin bất chấp ngày đêm - Viên pin 5000mAh, sạc nhanh 45W\nĐúng như các thông tin được đồn đoán trước đó, mẫu flagship mới của gả khổng lồ Hàn Quốc được ra mắt với tên gọi là Samsung Galaxy S22 Ultra với nhiều cải tiến đáng giá. Mẫu điện thoại cao cấp đến từ Samsung này có nhiều thay đổi từ thiết kế, cấu hình cho đến camera. Vậy siêu phẩm này có gì mới, giá bao nhiêu và có nên mua không? Hãy cùng tìm hiểu chi tiết ngay bên dưới nhé!\n\nSamsung S22 Ultra được nâng cấp gì so với S21 Ultra\nTrước khi chính thức ra mắt cộng đồng những chiếc điện thoại Samsung S22 Series đã có thời gian được thai nghén khá dài để đảm bảo có những tính năng thực sự vượt trội so với phiên bản tiền nhiệm. Để có thể hình dung rõ ràng ta xét đến 2 mẫu Samsung S22 Ultra và S21 Ulta xem dòng flagship mới nhà Samsung có những nâng cấp nổi trội nào nhé!\n\nĐánh giá Samsung Galaxy S22 Ultra 5G chi tiết\nNhững nâng cấp lớn về hiệu năng, dung lượng pin, và trên hết là camera sau chính là những điểm khiến nó trở thành siêu phẩm trong phân khúc cao cấp. Dưới đây là những thông tin cần biết về dòng điện thoại vừa ra mắt của Samsung. Dưới đây là thông số cấu hình của Samsung S22 Ultra vừa được gã khổng lồ Hàn Quốc giới thiệu.\n\nThiết kế nguyên khối - kính sang trọng với độ bền tối ưu\nSamsung Galaxy S22 Ultra đi theo ngôn ngữ thiết kế nguyên khối - kính cao cấp và sang trọng, vốn đã làm nên sự thành công của model tiền nhiệm. Chiếc máy có thiết kế mặt lưng đơn sắc tối giản nhưng không kém phần tinh tế, và màn hình tràn viền bao phủ gần như trọn mặt trước, tạo nên trải nghiệm quan sát rộng rãi trên một thiết bị di động nhỏ gọn vừa tay cầm.\n\nĐộ bền của máy được đảm bảo tối ưu không chỉ qua lớp vỏ nhôm nguyên khối Amor đánh bóng, mà còn qua kính cường lực Corning Gorilla Glass Victus+ bao phủ hai mặt trước và sau. Khung nhôm và kính hoạt động như bộ giáp bảo vệ điện thoại an toàn. Chiếc máy còn có khả năng chống bụi / nước đạt chuẩn IP68 giúp người dùng luôn an tâm khi dùng máy trong những điều kiện môi trường khác nhau.\n\nSamsung S22 Ultra 5G có thiết kế sang trọng với độ bền tối ưu\n\nỐng kính 108MP mang lại khả năng chụp ảnh không giới hạn\nỐng kính chính trên Samsung S22 Ultra với độ phân giải lên đến 108MP, với những khả năng chụp ảnh đêm, chụp chân dung, chụp góc siêu rộng, và zoom quang học 100x đều hiện diện. Chi tiết ảnh và màu sắc tốt nằm trong khoảng zoom 10x, có thể sử dụng zoom 30x trong điều kiện ánh sáng tốt, còn zoom 100x mang tính chất lưu lại thông tin. Camera chính và camera tele hỗ trợ công nghệ chống rung quang học OIS.\n\nCụm camera sau cho phép người dùng sáng tạo ảnh chụp của mình không giới hạn. Hai ống kính còn lại là ống kính 12MP hỗ trợ chụp góc siêu rộng và ống kính tele 10MP. Người dùng có thể sử dụng S22 chụp ảnh macro với ống kính siêu rộng. Màu sắc và chi tiết ảnh cao hơn các model tầm trung, cho độ phân giải và cảm biến tốt hơn.\n\nCamera 108MP trên S22 Ultra mang lại khả năng chụp ảnh không giới hạn\n\nThiết bị được trang bị khả năng chụp ảnh chân dung ban đêm, trong điều kiện thiếu sáng ấn tượng với bộ xử lý hình ảnh AI kết hợp với camera góc rộng 108MP mang lại bức ảnh ban đêm sáng rõ. Với không gian không quá tối, chỉ với thao tác sử dụng chế độ tự động, AI sẽ tự xử lý cho ra hình ảnh sáng, đầy đủ chi tiết và không bị nhiễu. Trường hợp thiếu sáng, chế độ chụp đêm là sự lựa chọn hoàn hảo.\n\nTốc độ khung hình phát hiện ánh sáng và tự động chuyển sang tốc độ khung hình tối ưu. Samsung Galaxy S22 Ultra sử dụng bộ xử lý 4nm với công nghệ Super Night Solution giảm nhiễu hiệu quả.\n\nĐồng thời, người dùng có thể điều chỉnh được mức độ xóa phông sau khi chụp. Khi thực hiện quay video cần hiệu chỉnh phần hậu cảnh, người dùng có thể làm nổi bật chủ thể bằng cách sử dụng bộ lọc đổi phông thành đen trắng. Phần chuyển nét mượt mà và không có cảm giác bị lẹm.\n\nĐánh giá camera Samsung Galaxy S22 Ultra 5G\n\nKhông chỉ chụp ảnh, thiết bị còn mang lại khả năng quay phim chất lượng với khả năng chống rung và công nghệ AI mang lại những thước phim chuyển động nhanh mà vẫn đảm bảo rõ nét, zoom tốt hơn. Điện thoại còng được trang bị công nghệ Super HDR tốt với tất cả các ống kính mang lại những thước phim giàu chi tiết. Ấn tượng nhất trên camera của Samsung S22 Ultra đó chính là khả năng thu phóng 100 lần đầy ấn tượng.\n\nPhía trước máy là camera selfie đơn với độ phân giải lên đến 40 MP, khẩu độ f/2.2 với khả năng chụp góc rộng cho ra ảnh chụp selfie bắt mắt. Tính năng làm đẹp AI, gọi video call kép và HDR tự động sẽ giúp tăng cường trải nghiệm chụp ảnh trên chiếc flagship này.\n\nĐiểm nổi bật nữa của cụm camera nằm ở thời gian phơi sáng đến 6 giây nhưng bị rung nhòe kể cả không sử dụng chân đế!\n\nĐánh giá camera Samsung Galaxy S22 Ultra 5G - Ảnh 2\n\nMàn hình 6.8 inch 120 Hz tương thích bút S-Pen hiện đại\nVới Galaxy S22 Ultra thì Samsung đã cho ra đời loại màn hình phủ trọn mặt trước đầy ấn tượng. Chiếc màn hình điện thoại có kích thước 6.8 inch, độ phân giải Quad HD+ (3200 x 1440 pixels) và sử dụng tấm nền Dynamic AMOLED 2X với Vision Booster cho ra độ bão hòa màu sắc đầy chân thực.\n\nMàn hình của Samsung S22 Ultra còn được tích hợp những tính năng cao cấp đặc trưng của Samsung như Always on display, tốc độ làm tươi đến 120 Hz cho trải nghiệm gaming vượt trội và chứng nhận màu HDR10+. Bề mặt màn hình được bảo vệ bởi kính Gorilla Glass Victus chống xước hiệu quả.\n\nSamsung S22 Ultra có màn hình 6.8 inch 120 Hz tương thích bút S-Pen hiện đại\n\nVi xử lý Snapdragon 8 Gen 1 cùng pin lớn giúp giải trí hiệu quả\nVới Samsung S22 Ultra 5G, nhà sản xuất đã chế tạo nên bộ vi xử lý thế hệ mới mang tên Qualcomm Snapdragon 8 Gen 1. Hiệu năng trên Qualcomm Snapdragon 8 Gen 1 được cải tiến rất nhiều so với thế hệ trước nhằm mang lại hiệu năng mượt mà đáp ứng cả những tựa game nặng nhất, đồng thời chứa khả năng tiết kiệm năng lượng pin giúp người dùng yên tâm dùng máy dài lâu.\n\nCon chip Qualcomm Snapdragon 8 Gen 1 được sản xuất trên tiến trình 4nm không chỉ mang lại một hiệu năng mạnh mẽ mà còn sở hữu sức mạnh AI mang lại trải nghiệm chụp đêm vượt trội.\n\nNói về pin, điện thoại được trang bị viên pin dung lượng 5000mAh sẽ cung cấp cho người dùng tới 81 giờ chơi nhạc. Công nghệ sạc nhanh siêu tốc 45W, cùng sạc không dây chuẩn Qi và sạc ngược sẽ giúp Galaxy S22 Ultra trở thành chiếc smartphone đa chức năng nổi bật trong phân khúc. Pin hỗ trợ tiết kiệm năng lượng, cho thời lượng sử dụng trong thời gian dài.\n\nĐánh giá hiệu năng Galaxy S22 Ultra với Snapdragon 8 Gen 1\n\nĐánh giá hiệu năng Samsung S22 Ultra với Snapdragon 8 Gen 1\n\nSau nhiều năm chạy chip Exynos thì S22 Ultra là mẫu điện thoại Samsung chính hãng hiếm hoi tại Việt Nam chạy Snapdragon 8 Gen 1. Trước khi đánh giá hiệu năng, cùng điểm lại một số thông số cấu hình nhé:\n\n- Vi xử lý: Snapdragon 8 Gen 1\n\n- Bộ nhớ RAM: 8GB hoặc 12GB.\n\n- Bộ nhớ trong: 128GB hoặc 256GB hoặc 512GB.\n\nSau đây là điểm số benchmark được các trang chuyên công nghệ thực hiện.\n\nĐiểm Geekbench 5 của S22 Ultra PCMag thực hiện:\n\n- Điểm đa nhân: 3.433 điểm \n\n- Điểm đơn nhân: 1.232\n\nĐiểm số này có sự khác biệt so với chip Snapdragon 888 được ra mắt nắm 2020. Cụ thể, điểm đơn lõi tăng 13% và đa lõi tăng 9%. Nhưng trên thang điểm chuẩn của GFXBench thì ở một số tác vụ nhất định, con chip này cho hiệu năng tốt hơn khoảng 20%.\n\n Đánh giá hiệu năng Galaxy S22 Ultra với Snapdragon 8 Gen 1 - Ảnh 2\n\nHỗ trợ bút S Pen tiện lợi\nTương tự như model tiền nhiệm, điện thoại thông minh Samsung Galaxy S22 Ultra cũng hoàn toàn tương thích với bút cảm ứng S-Pen qua điều khiển không day Air Actions - vốn là điểm đặc trưng của dòng Galaxy Note trước đây. Người dùng có thể dùng S-Pen cho những tác vụ thiết kế, ghi chú nhanh, và điều khiển từ xa với tính hiệu quả vượt trội.\n\nĐộ chính xác bút S-Pen cao, giúp các ghi chú và tin nhắn của bạn trở nên sinh động, thú vị. Chữ viết tay thành văn bản nhanh chóng hoặc thêm hình ảnh động vào, nâng cao tính chuyên nghiệp và sáng tạo.\n\nSamsung đã trang bị khe cắm S Pen trên thiết bị giúp người dùng có thể tiện lợi khi sử dụng. Tuy nhiên khác với trước đó là S Pen sẽ có cùng màu với máy thì năm nay, S-Pen sẽ chỉ có màu đen. \n\nVới bút S Pen, giời đây người dùng Galaxy S22 Ultra có thể thoải mái ghi chú, điều khiển điện thoại như trên các dòng Samsung Note. Bút Spen mới này cũng được cải thiện độ trễ mang lại trải nghiệm dùng chân thực từ viết chữ, vẽ hay ghi chú. ',1,NULL,1,'2022-09-06 14:26:47',NULL,_binary '\0'),(13,'SP13','Bàn ăn Mogen','Bàn ăn mango là dòng bán ăn bán chạy nhất hiện nay. Được nhiều khách hàng ưa chuộng nhờ thiết kế đẹp sang trọng. Kích thước gọn đa dạng chiều dài từ 1m2, 1m4, 1m6 tùy từng không gian. Bên cạnh đó Mogen cũng tạo ra bảng màu cho dòng bàn ăn đa dụng này: Màu nâu, màu gỗ tự nhiên, màu trắng hoặc kết hợp.\n\nmẫu bàn mango 6 ghế màu óc chó\nBàn ăn có thể kết hợp với 4 ghế hoặc 6 ghế tùy khách hàng. Đây là dòng bàn sơn màu óc chó\nmẫu bàn ăn mango 4 ghế\nmẫu bàn ăn mango 4 ghế\nSản phẩm dễ dàng lắp đặt cũng như tháo lắp. Dễ dàng vận chuyển vệ sinh dễ dàng. Quý khách hàng có thể mua thêm tấm kính để lên bàn ăn. Thiết kế nhỏ gọn, xinh xắn, đem đến cho không gian sự sang trọng, tinh tế và thanh lịch.\n\nkích thước bàn ăn mango\nCác bộ phận của sản phẩm như bàn ăn. chân bàn được kết nối với nhau bằng đinh ốc chất lượng cao. đem đến sự chắc chắn, vững chãi cho sản phẩm. không dễ dàng bị lung lay, lỏng lẻo trong quá trình sử dụng lâu dài.\n\nViệc sử dụng đinh ốc để kết nối các bộ phận của bàn ăn. cũng giúp cho công việc tháo lắp, vận chuyển, di dời dễ dàng và thuận tiện hơn. Tránh gây xước nền nhà, hoặc vác nặng cồng kềnh qua các không gian khác nhau.\n\nBàn: 1200 x 750 x 730 (mm)\nMàu sắc: Tự nhiên, Nâu, Trắng\nKích thước ghế phù hợp bàn ăn : 460 x 440 x 810 (mm)\nkích thước từ sàn lên mặt ngồi ghế: 445(mm)\nChất liệu\nBàn: MDF dán veneer, Khung chân bàn: gỗ cao su\nGhế: Gỗ cao su, ván ép uốn cong, nệm bọc simili giả da\nĐóng gói: 3 kiện/ set 4 ghế\nBàn ăn đóng thành kiện\nBảo hành 12 tháng\nMặt kính lựa chọn thêm\nkích thước bàn ghế ăn mango\nkích thước bàn ghế ăn\nỨng dụng bàn ăn\nViệc kết hợp với các sản phẩm như ghế Mango, ghế bull, ghế kennedy, ghế wishbone, ghế grace. Đã tạo ra những bộ sản phẩm tuyệt đẹp theo các trường phái riêng của sản phẩm. Dưới đây là một số kế hợp mà Mogen đã đưa ra.\n\n',1,NULL,1,'2022-09-06 14:30:02',NULL,_binary '\0'),(14,'SP14','Đàn guita classic','Đàn guitar Classic có âm thanh thường khá êm và trầm ấm, do vậy loại đàn này thường được sử dụng trong âm nhạc cổ điển, nhạc không lời, có thể đệm hát trong dòng nhạc trữ tình. Cấu tạo của đàn guitar classic bao gồm 6 dây: 3 dây dưới được làm bằng chất liệu nilon hoàn toàn còn 3 dây trên được làm bằng chất liệu kim loại cuốn bên ngoài, bên trong là sợi nilon nên vẫn rất mềm và dễ chơi.\n\nĐàn Classic màu loang lạ, độc đáo - được làm với bề mặt xử lý đẹp mắt, giúp hạn chế trầy xước, đồng thời dễ lau chùi khi bị bám bẩn. Thùng đàn tròn với các đường nét bo cong mềm mại giúp tăng thêm tính thẩm mỹ cho sản phẩm.',1,NULL,1,'2022-09-06 14:38:00','2022-09-06 16:10:10',_binary '\0');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_import`
--

DROP TABLE IF EXISTS `return_import`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `return_import` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT (now()),
  `import_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_import_return` (`import_id`),
  CONSTRAINT `tbl_import_return` FOREIGN KEY (`import_id`) REFERENCES `imports` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_import`
--

LOCK TABLES `return_import` WRITE;
/*!40000 ALTER TABLE `return_import` DISABLE KEYS */;
INSERT INTO `return_import` VALUES (9,'2022-09-03 22:33:15',97),(10,'2022-09-03 22:33:56',97),(11,'2022-09-04 07:14:11',98),(12,'2022-09-04 07:22:04',98),(13,'2022-09-04 15:27:09',99),(14,'2022-09-04 15:28:18',99),(15,'2022-09-04 16:07:31',99),(16,'2022-09-04 16:12:20',96),(17,'2022-09-04 16:12:35',96),(18,'2022-09-04 16:12:41',96),(19,'2022-09-04 16:46:35',85),(20,'2022-09-04 16:46:36',85),(21,'2022-09-04 21:03:36',102),(26,'2022-09-05 10:27:10',106),(27,'2022-09-05 10:27:18',106),(28,'2022-09-05 11:57:21',103),(30,'2022-09-05 13:38:19',107),(31,'2022-09-05 13:38:28',107),(32,'2022-09-05 14:41:38',104),(33,'2022-09-05 15:18:57',108),(34,'2022-09-05 15:19:11',108),(35,'2022-09-05 15:22:18',109),(36,'2022-09-05 15:22:25',109),(37,'2022-09-05 18:09:35',110),(39,'2022-09-05 18:19:08',111),(40,'2022-09-05 18:20:12',111),(41,'2022-09-06 13:19:44',113),(42,'2022-09-06 13:19:54',113),(43,'2022-09-06 14:40:19',114),(44,'2022-09-06 14:41:26',114),(45,'2022-09-06 16:00:23',116),(46,'2022-09-06 16:00:29',116),(47,'2022-09-06 16:03:59',117),(48,'2022-09-06 16:46:37',115),(49,'2022-09-06 16:46:41',115),(50,'2022-09-06 16:47:12',118);
/*!40000 ALTER TABLE `return_import` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','admin'),(2,'staff','staff'),(3,'stocker','stocker');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'1','1','1'),(2,'IMPORT01','Tạo mới phiếu nhập hàng','Thêm mới đơn nhập hàng'),(3,'IMPORT02','Thanh toán hóa đơn nhập hàng','Thêm mới thanh toán cho đơn nhập hàng'),(4,'IMPORT03','Tạo phiếu nhập kho','Thêm mới phiếu nhập kho'),(5,'IMPORT04','Tạo phiếu trả hàng','Thêm mới phiếu trả hàng');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier_seqid`
--

DROP TABLE IF EXISTS `supplier_seqid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier_seqid` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier_seqid`
--

LOCK TABLES `supplier_seqid` WRITE;
/*!40000 ALTER TABLE `supplier_seqid` DISABLE KEYS */;
INSERT INTO `supplier_seqid` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15),(16),(17),(18),(19),(20),(21),(22),(23),(24),(25),(26);
/*!40000 ALTER TABLE `supplier_seqid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(100) DEFAULT NULL,
  `name` text NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `account_id` int DEFAULT NULL,
  `create_at` datetime DEFAULT (now()),
  `update_at` datetime DEFAULT NULL,
  `is_delete` bit(1) DEFAULT (0),
  `status_transaction` bit(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `code_2` (`code`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `suppliers_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'SUPP00001','Nhà hàng Minh','minh@gmail.com','0984411223','17 thuỵ khuê',1,'2022-08-22 09:03:19','2022-08-22 09:03:19',_binary '\0',_binary ''),(2,'null','ew','ewew@gmail.com','0987885314','ew',1,'2022-08-22 11:09:45','2022-08-22 11:09:45',_binary '\0',_binary '\0'),(4,'SUPP00003','dsa','dsa@gmail.com','0987885313','2121212',1,'2022-08-22 11:14:07','2022-08-22 11:14:07',_binary '\0',_binary '\0'),(5,'SUPP00004','test123','43@gmail.com','0987885315','2121212',1,'2022-08-22 13:59:00','2022-08-22 13:59:00',_binary '\0',_binary '\0'),(6,'SUPP00005','nhà hàng nhật minh','minhnhatvu2002@gmai.com','0987885413','19 thuỵ khuê tây hồ',1,'2022-08-22 14:22:07','2022-08-22 21:17:51',_binary '\0',_binary ''),(7,'SUPP00006','nhà hàng việt nam  321','minhnhatvu2102@gmai.com','0923456784','18 hồ tây, yên phụ, hà nội',1,'2022-08-22 14:32:26','2022-08-22 21:17:36',_binary '\0',_binary ''),(8,'SUPP00007','nhà hàng diên hồng','ewq@gmail.com','0987885319','18 thuy khue Thành phố Hà Nội Quận Tây Hồ Phường Thụy Khuê',1,'2022-08-23 15:14:16','2022-08-23 15:14:16',_binary '\0',_binary ''),(9,'SUPP00008','nhà hàng long biên','dsa2@gmail.com','0987885312','29 ngọc lâm, Thành phố Hồ Chí Minh, Quận Bình Tân, Phường Bình Hưng Hoà B, ',1,'2022-08-23 15:17:42','2022-08-23 15:17:42',_binary '\0',_binary ''),(10,'SUPP00009','nhà hàng việt nam dz','minhvnph13588@fpt.edu.vn','0987885614','29 ngọc lâm, Tỉnh Tuyên Quang, Huyện Yên Sơn, Xã Xuân Vân, ',1,'2022-08-23 16:40:53','2022-08-23 16:41:13',_binary '\0',_binary ''),(11,'SUPP00010','hg 123','ds1a@gmail.com','0987885114','18 thuỵ khuê, Tỉnh Tuyên Quang, Huyện Yên Sơn, Xã Trung Trực, ',1,'2022-08-23 16:42:27','2022-08-25 08:34:09',_binary '\0',_binary ''),(58,'GG123','Test excel','excel@gmail.com','0987185384','12 Minh Khai, Cầu Giấy, Hà Nội',NULL,'2022-08-25 09:24:16','2022-08-25 09:24:16',_binary '\0',_binary ''),(59,'SUPP00025','Test excel 2','exce2l@gmail.com','0917145384','51 Minh Khai, Cầu Giấy, Hà Nội',NULL,'2022-08-25 09:24:16','2022-08-25 09:24:16',_binary '\0',_binary '\0'),(60,'SUPP00026','nhà hàng việt nam','minhvnph123588@fpt.edu.vn','0987885914','18 thuy khue, Thành phố Hà Nội, Quận Ba Đình, Phường Phúc Xá',1,'2022-08-25 09:33:32','2022-08-25 09:33:32',_binary '',_binary '');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transport_companies`
--

DROP TABLE IF EXISTS `transport_companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transport_companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(200) NOT NULL,
  `name` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `account_id` int NOT NULL,
  `create_at` datetime DEFAULT (now()),
  `update_at` datetime DEFAULT (now()),
  `is_delete` bit(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `email` (`email`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `transport_companies_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transport_companies`
--

LOCK TABLES `transport_companies` WRITE;
/*!40000 ALTER TABLE `transport_companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `transport_companies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-06 17:41:52
