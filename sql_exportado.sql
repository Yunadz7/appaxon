-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.4.3 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para axon
DROP DATABASE IF EXISTS `axon`;
CREATE DATABASE IF NOT EXISTS `axon` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `axon`;

-- Copiando estrutura para tabela axon.ajuda
DROP TABLE IF EXISTS `ajuda`;
CREATE TABLE IF NOT EXISTS `ajuda` (
  `id_ajuda` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `nome_contato` varchar(100) NOT NULL,
  `numero` varchar(20) NOT NULL,
  PRIMARY KEY (`id_ajuda`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `ajuda_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.atividades
DROP TABLE IF EXISTS `atividades`;
CREATE TABLE IF NOT EXISTS `atividades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.atividades_usuario
DROP TABLE IF EXISTS `atividades_usuario`;
CREATE TABLE IF NOT EXISTS `atividades_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_atividade` int NOT NULL,
  `concluida` tinyint DEFAULT '0',
  `data_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.consulta
DROP TABLE IF EXISTS `consulta`;
CREATE TABLE IF NOT EXISTS `consulta` (
  `id_consulta` int NOT NULL AUTO_INCREMENT,
  `id_medico` int DEFAULT NULL,
  `id_usuario` int NOT NULL,
  `data_consulta` date NOT NULL,
  `horario` time NOT NULL,
  PRIMARY KEY (`id_consulta`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_medico` (`id_medico`),
  CONSTRAINT `consulta_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `consulta_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medico` (`id_medico`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.dispositivo
DROP TABLE IF EXISTS `dispositivo`;
CREATE TABLE IF NOT EXISTS `dispositivo` (
  `id_dispositivo` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  PRIMARY KEY (`id_dispositivo`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.historico_emocional
DROP TABLE IF EXISTS `historico_emocional`;
CREATE TABLE IF NOT EXISTS `historico_emocional` (
  `id_historico` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `emocao` varchar(50) DEFAULT NULL,
  `nivel_humor` tinyint DEFAULT NULL,
  `data_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_historico`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `historico_emocional_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.leitura_dispositivo
DROP TABLE IF EXISTS `leitura_dispositivo`;
CREATE TABLE IF NOT EXISTS `leitura_dispositivo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_dispositivo` int NOT NULL,
  `leitura` varchar(100) DEFAULT NULL,
  `data_leitura` datetime DEFAULT CURRENT_TIMESTAMP,
  `alerta` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_dispositivo` (`id_dispositivo`),
  CONSTRAINT `leitura_dispositivo_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `dispositivo` (`id_dispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.medico
DROP TABLE IF EXISTS `medico`;
CREATE TABLE IF NOT EXISTS `medico` (
  `id_medico` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `crm` varchar(20) NOT NULL,
  `especialidade` varchar(100) NOT NULL,
  PRIMARY KEY (`id_medico`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.registro
DROP TABLE IF EXISTS `registro`;
CREATE TABLE IF NOT EXISTS `registro` (
  `id_registro` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `emocoes` varchar(100) DEFAULT NULL,
  `sono` varchar(100) DEFAULT NULL,
  `ansiedade` tinyint DEFAULT NULL,
  `energia` tinyint DEFAULT NULL,
  `agua` tinyint DEFAULT NULL,
  `medicacao` varchar(100) DEFAULT NULL,
  `observacoes` text,
  `data_registro` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_registro`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela axon.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `data_nascimento` date DEFAULT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
