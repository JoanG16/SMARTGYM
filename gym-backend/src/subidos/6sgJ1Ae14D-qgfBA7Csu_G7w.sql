CREATE DATABASE  IF NOT EXISTS `bdprueba` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bdprueba`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: bdprueba
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `asistencia_empleado`
--

DROP TABLE IF EXISTS `asistencia_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencia_empleado` (
  `idasistencia_empleado` bigint unsigned NOT NULL AUTO_INCREMENT,
  `idempleado` bigint unsigned NOT NULL,
  `fecha_hora_ingreso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_hora_fin` datetime DEFAULT NULL,
  PRIMARY KEY (`idasistencia_empleado`),
  KEY `idempleado` (`idempleado`),
  CONSTRAINT `asistencia_empleado_ibfk_1` FOREIGN KEY (`idempleado`) REFERENCES `empleados` (`idempleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia_empleado`
--

LOCK TABLES `asistencia_empleado` WRITE;
/*!40000 ALTER TABLE `asistencia_empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `asistencia_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_productos`
--

DROP TABLE IF EXISTS `categoria_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_productos` (
  `idcategoria` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_productos`
--

LOCK TABLES `categoria_productos` WRITE;
/*!40000 ALTER TABLE `categoria_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compra` (
  `idcompra` bigint unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  `idempleado` bigint unsigned DEFAULT NULL,
  `idproveedor` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`idcompra`),
  KEY `idempleado` (`idempleado`),
  KEY `idproveedor` (`idproveedor`),
  CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`idempleado`) REFERENCES `empleados` (`idempleado`),
  CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`idproveedor`) REFERENCES `proveedores` (`idproveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compra`
--

LOCK TABLES `compra` WRITE;
/*!40000 ALTER TABLE `compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion` (
  `idConfiguracion` int unsigned NOT NULL AUTO_INCREMENT,
  `nombreGym` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `descripcion` text,
  `usuario_cambio` varchar(255) DEFAULT NULL,
  `fecha_cambio` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idConfiguracion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion`
--

LOCK TABLES `configuracion` WRITE;
/*!40000 ALTER TABLE `configuracion` DISABLE KEYS */;
/*!40000 ALTER TABLE `configuracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_compra`
--

DROP TABLE IF EXISTS `detalle_compra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_compra` (
  `iddetalle_compra` bigint unsigned NOT NULL AUTO_INCREMENT,
  `idcompra` bigint unsigned DEFAULT NULL,
  `idproducto` int unsigned DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `costo_unitario` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`iddetalle_compra`),
  KEY `idcompra` (`idcompra`),
  KEY `idproducto` (`idproducto`),
  CONSTRAINT `detalle_compra_ibfk_1` FOREIGN KEY (`idcompra`) REFERENCES `compra` (`idcompra`),
  CONSTRAINT `detalle_compra_ibfk_2` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`idproducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_compra`
--

LOCK TABLES `detalle_compra` WRITE;
/*!40000 ALTER TABLE `detalle_compra` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_compra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_venta`
--

DROP TABLE IF EXISTS `detalle_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta` (
  `iddetalle_venta` bigint unsigned NOT NULL AUTO_INCREMENT,
  `idventa` bigint unsigned NOT NULL,
  `idproducto` int unsigned NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`iddetalle_venta`),
  KEY `idventa` (`idventa`),
  KEY `idproducto` (`idproducto`),
  CONSTRAINT `detalle_venta_ibfk_1` FOREIGN KEY (`idventa`) REFERENCES `venta` (`idventa`),
  CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`idproducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta`
--

LOCK TABLES `detalle_venta` WRITE;
/*!40000 ALTER TABLE `detalle_venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `idempleado` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `idjornada_laboral` bigint unsigned NOT NULL,
  PRIMARY KEY (`idempleado`),
  KEY `idjornada_laboral` (`idjornada_laboral`),
  CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`idjornada_laboral`) REFERENCES `jornada_laboral` (`idjornada_laboral`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos`
--

DROP TABLE IF EXISTS `equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos` (
  `idequipo` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `idtipo_equipo` bigint unsigned DEFAULT NULL,
  `idproveedor` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`idequipo`),
  KEY `idtipo_equipo` (`idtipo_equipo`),
  KEY `idproveedor` (`idproveedor`),
  CONSTRAINT `equipos_ibfk_1` FOREIGN KEY (`idtipo_equipo`) REFERENCES `tipo_equipo` (`idtipo_equipo`),
  CONSTRAINT `equipos_ibfk_2` FOREIGN KEY (`idproveedor`) REFERENCES `proveedores` (`idproveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos`
--

LOCK TABLES `equipos` WRITE;
/*!40000 ALTER TABLE `equipos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jornada_laboral`
--

DROP TABLE IF EXISTS `jornada_laboral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jornada_laboral` (
  `idjornada_laboral` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `hora_ingreso` time NOT NULL,
  `hora_salida` time NOT NULL,
  PRIMARY KEY (`idjornada_laboral`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jornada_laboral`
--

LOCK TABLES `jornada_laboral` WRITE;
/*!40000 ALTER TABLE `jornada_laboral` DISABLE KEYS */;
/*!40000 ALTER TABLE `jornada_laboral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membresia_miembro`
--

DROP TABLE IF EXISTS `membresia_miembro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membresia_miembro` (
  `idmembresia_miembro` bigint unsigned NOT NULL AUTO_INCREMENT,
  `idmiembro` bigint unsigned NOT NULL,
  `idmembresia` bigint unsigned NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `estado` enum('ACTIVO','VENCIDO') DEFAULT NULL,
  PRIMARY KEY (`idmembresia_miembro`),
  KEY `idmiembro` (`idmiembro`),
  KEY `idmembresia` (`idmembresia`),
  CONSTRAINT `membresia_miembro_ibfk_1` FOREIGN KEY (`idmiembro`) REFERENCES `miembros` (`idmiembro`),
  CONSTRAINT `membresia_miembro_ibfk_2` FOREIGN KEY (`idmembresia`) REFERENCES `membresias` (`idmembresia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membresia_miembro`
--

LOCK TABLES `membresia_miembro` WRITE;
/*!40000 ALTER TABLE `membresia_miembro` DISABLE KEYS */;
/*!40000 ALTER TABLE `membresia_miembro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membresias`
--

DROP TABLE IF EXISTS `membresias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `membresias` (
  `idmembresia` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `duracion` smallint NOT NULL,
  `precio` decimal(5,2) NOT NULL,
  PRIMARY KEY (`idmembresia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membresias`
--

LOCK TABLES `membresias` WRITE;
/*!40000 ALTER TABLE `membresias` DISABLE KEYS */;
/*!40000 ALTER TABLE `membresias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `miembros`
--

DROP TABLE IF EXISTS `miembros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `miembros` (
  `idmiembro` bigint unsigned NOT NULL AUTO_INCREMENT,
  `matricula` varchar(50) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `edad` tinyint NOT NULL,
  `sufreEnfermedad` tinyint(1) DEFAULT NULL,
  `tieneSeguro` tinyint(1) DEFAULT NULL,
  `enfermedad` varchar(45) DEFAULT NULL,
  `institucion` varchar(45) DEFAULT NULL,
  `nombreContacto` varchar(45) NOT NULL,
  `telefonoContacto` varchar(20) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `estado` enum('ACTIVO','VENCIDO') DEFAULT NULL,
  `fechaRegistro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idmiembro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `miembros`
--

LOCK TABLES `miembros` WRITE;
/*!40000 ALTER TABLE `miembros` DISABLE KEYS */;
/*!40000 ALTER TABLE `miembros` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `generar_matricula` BEFORE INSERT ON `miembros` FOR EACH ROW BEGIN
    DECLARE year_prefix VARCHAR(4);
    DECLARE new_id INT;
    
    -- Obtener el año actual
    SET year_prefix = YEAR(NEW.fechaRegistro);
    
    -- Obtener el nuevo id del miembro
    SELECT MAX(idmiembro) + 1 INTO new_id FROM miembros;
    
    -- Si no hay ningún registro en la tabla, establecer el nuevo_id a 1
    IF new_id IS NULL THEN
        SET new_id = 1;
    END IF;
    
    -- Establecer la nueva matrícula
    SET NEW.matricula = CONCAT(year_prefix, '-', new_id);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `idpago` bigint unsigned NOT NULL AUTO_INCREMENT,
  `idmembresia_miembro` bigint unsigned NOT NULL,
  `fecha` datetime NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  PRIMARY KEY (`idpago`),
  KEY `idmembresia_miembro` (`idmembresia_miembro`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idmembresia_miembro`) REFERENCES `membresia_miembro` (`idmembresia_miembro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idproducto` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `precio` decimal(10,2) NOT NULL,
  `costo` decimal(10,2) NOT NULL,
  `idcategoria` int unsigned DEFAULT NULL,
  PRIMARY KEY (`idproducto`),
  KEY `idcategoria` (`idcategoria`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria_productos` (`idcategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedores`
--

DROP TABLE IF EXISTS `proveedores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedores` (
  `idproveedor` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre_compania` varchar(255) NOT NULL,
  `nombre_contacto` varchar(255) NOT NULL,
  `cargo_contacto` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono_contacto` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idproveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedores`
--

LOCK TABLES `proveedores` WRITE;
/*!40000 ALTER TABLE `proveedores` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `idstock` int unsigned NOT NULL AUTO_INCREMENT,
  `idproducto` int unsigned NOT NULL,
  `cantidad` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`idstock`),
  KEY `idproducto` (`idproducto`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`idproducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_equipo`
--

DROP TABLE IF EXISTS `tipo_equipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_equipo` (
  `idtipo_equipo` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`idtipo_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_equipo`
--

LOCK TABLES `tipo_equipo` WRITE;
/*!40000 ALTER TABLE `tipo_equipo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_equipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `user_privileges`
--

DROP TABLE IF EXISTS `user_privileges`;
/*!50001 DROP VIEW IF EXISTS `user_privileges`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_privileges` AS SELECT 
 1 AS `user`,
 1 AS `host`,
 1 AS `roles`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `idventa` bigint unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idmiembro` bigint unsigned DEFAULT NULL,
  `idempleado` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`idventa`),
  KEY `idmiembro` (`idmiembro`),
  KEY `idempleado` (`idempleado`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`idmiembro`) REFERENCES `miembros` (`idmiembro`),
  CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`idempleado`) REFERENCES `empleados` (`idempleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visita`
--

DROP TABLE IF EXISTS `visita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visita` (
  `idvisita` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nombre_visita` varchar(255) DEFAULT NULL,
  `precio` decimal(8,2) DEFAULT NULL,
  `idmembresia_miembro` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`idvisita`),
  KEY `idmembresia_miembro` (`idmembresia_miembro`),
  CONSTRAINT `visita_ibfk_1` FOREIGN KEY (`idmembresia_miembro`) REFERENCES `membresia_miembro` (`idmembresia_miembro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visita`
--

LOCK TABLES `visita` WRITE;
/*!40000 ALTER TABLE `visita` DISABLE KEYS */;
/*!40000 ALTER TABLE `visita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdprueba'
--

--
-- Dumping routines for database 'bdprueba'
--
/*!50003 DROP PROCEDURE IF EXISTS `CambiarNombreYContraseña` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `CambiarNombreYContraseña`(IN nuevo_nombre VARCHAR(255), IN nueva_contraseña VARCHAR(255), IN nombre_viejo VARCHAR(255))
BEGIN
    DECLARE exit handler for sqlexception
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;

    -- Verificar si el nuevo nombre es diferente del nombre viejo
    IF nuevo_nombre <> nombre_viejo THEN
        -- Cambiar el nombre del usuario
        SET @rename_user_query = CONCAT('RENAME USER ''', nombre_viejo, '''@''gym'' TO ''', nuevo_nombre, '''@''gym''');
        PREPARE stmt FROM @rename_user_query;
        EXECUTE stmt;
        DEALLOCATE PREPARE stmt;
    END IF;

    -- Cambiar la contraseña del usuario
    SET @password_change_query = CONCAT('ALTER USER ''', nuevo_nombre, '''@''gym'' IDENTIFIED BY ''', nueva_contraseña, '''');
    PREPARE stmt FROM @password_change_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cambiar_rol` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cambiar_rol`(IN nombre_usuario VARCHAR(50), IN nuevo_rol VARCHAR(50))
BEGIN
    -- Verificar si el usuario existe
    DECLARE user_exists INT DEFAULT 0;
    SELECT COUNT(*) INTO user_exists FROM mysql.user WHERE user = nombre_usuario;
    IF user_exists > 0 THEN

        -- Obtener los privilegios asociados al nuevo rol
        SELECT privilegios INTO @privilegios FROM roles WHERE nombre = nuevo_rol;

        -- Otorgar los privilegios al usuario
        IF @privilegios IS NOT NULL THEN
            SET @sql = CONCAT('GRANT ', @privilegios, ' ON *.* TO \'', nombre_usuario, '\'@\'gym\';');
            PREPARE stmt FROM @sql;
			EXECUTE stmt;
			DEALLOCATE PREPARE stmt;

        END IF;
    ELSE
        SELECT 'El usuario especificado no existe';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `user_privileges`
--

/*!50001 DROP VIEW IF EXISTS `user_privileges`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_privileges` AS select `mysql`.`user`.`User` AS `user`,`mysql`.`user`.`Host` AS `host`,group_concat(concat(if((`mysql`.`user`.`Select_priv` = 'Y'),'SELECT, ',''),if((`mysql`.`user`.`Insert_priv` = 'Y'),'INSERT, ',''),if((`mysql`.`user`.`Update_priv` = 'Y'),'UPDATE, ',''),if((`mysql`.`user`.`Delete_priv` = 'Y'),'DELETE, ',''),if((`mysql`.`user`.`Create_priv` = 'Y'),'CREATE, ','')) separator ',') AS `roles` from `mysql`.`user` where (`mysql`.`user`.`Host` = 'gym') group by `mysql`.`user`.`User`,`mysql`.`user`.`Host` */;
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

-- Dump completed on 2024-05-17 17:47:01
