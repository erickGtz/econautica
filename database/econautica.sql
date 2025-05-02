-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2025 at 10:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `econautica`
--
CREATE DATABASE IF NOT EXISTS `econautica` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `econautica`;

-- --------------------------------------------------------

--
-- Table structure for table `actividades`
--

CREATE TABLE `actividades` (
  `id` int(11) NOT NULL,
  `id_propietario` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `duracion` varchar(255) NOT NULL,
  `costo` float(8,2) NOT NULL,
  `img` varchar(255) NOT NULL,
  `eliminado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `actividades`
--

INSERT INTO `actividades` (`id`, `id_propietario`, `titulo`, `categoria`, `descripcion`, `ubicacion`, `duracion`, `costo`, `img`, `eliminado`) VALUES
(1, 2, 'Snorkel en Cancún', 'snorkel', 'Una experiencia única para explorar los arrecifes de Cancún', 'Quintana Roo', '1 hora 30 min', 150.00, 'snorkel-cancun.jpg', 0),
(2, 4, 'Buceo en Cozumel', 'buceo', 'Aventura de buceo en uno de los mejores destinos del mundo', 'Quintana Roo', '2 horas 30 min', 250.00, 'buceo-cozumel.jpg', 0),
(3, 4, 'Viaje en barco a Isla Mujeres', 'viaje en embarcacion', 'Explora Isla Mujeres en un relajante paseo en barco', 'Quintana Roo', '1 hora 15 min', 200.00, 'viaje-islas.jpg', 0),
(4, 2, 'Fotografía marina en Baja California', 'fotografia marina', 'Captura la belleza del mar en Baja California', 'Baja California', '1 hora 10 min', 180.00, 'foto-marina.png', 0),
(5, 4, 'Liberación de tortugas en Mazunte', 'liberacion', 'Únete al programa de conservación de tortugas en Mazunte', 'Oaxaca', '2 hora 5 min', 120.00, 'tortugas.jpg', 0),
(6, 2, 'Buceo nocturno en Chiapas', 'buceo', 'Vive la experiencia del buceo nocturno en Chiapas', 'Chiapas', '2 horas', 300.00, 'buceo-chiapas.jpg', 0),
(7, 2, 'Prueba2', 'viaje por barco', 'prueba prueba', 'Colima', '1 hora', 123.55, 'default.png', 1),
(8, 2, 'Recorrido Hierve el Agua', 'viaje por barco', 'Disfruta de un recorrido guiado por las cascadas de Hierve el Agua en Oaxaca, rodeado de impresionantes paisajes.', 'Oaxaca', '5 horas', 500.00, 'hierveAgua.jpeg', 0),
(9, 4, 'Recorrido en Lagunas Montebello, Chiapas', 'viaje por barco', 'Vive la experiencia de recorrer y acampar en las hermosas Lagunas de Montebello, rodeado de la naturaleza de Chiapas.', 'Chiapas', '12 horas', 1200.00, 'Montebello-Chiapas1.jpg', 0),
(12, 2, 'Aventura en la Costa', 'viaje por barco', 'Recorrido en barco por la costa de Oaxaca, explorando sus hermosos paisajes marítimos.', 'Oaxaca', '5 horas', 1500.00, 'costaOaxaca.jpeg', 0),
(13, 4, 'Recorrido en los manglares de Veracruz', 'fotografia marina', 'Explora los manglares de Veracruz y captura las mejores tomas de la fauna marina y la vegetación exuberante en este recorrido guiado.', 'Veracruz', '6 horas', 600.00, 'manglares-veracruz2.jpeg', 0),
(14, 2, 'Cenotes de Yucatán: un paraíso subterráneo', 'buceo', 'Sumérgete en los impresionantes cenotes de Yucatán, explorando sus aguas cristalinas y formaciones rocosas únicas en un tour de buceo.', 'Yucatán', '5 horas', 700.00, 'CenoteYucatan2.jpg', 0),
(15, 4, 'Expedición a los cenotes Aktun Chen y Santa Cruz', 'snorkel', 'Explora los cenotes Aktun Chen y Santa Cruz en un recorrido de snorkel en las cristalinas aguas subterráneas de Yucatán.', 'Yucatán', '4 horas', 700.00, 'cenotes Aktun Chen y Santa Cruz.jpg', 0),
(16, 2, 'Snorkel en la laguna “Yal-kú”', 'snorkel', 'Vive una experiencia única de snorkel en las aguas tranquilas y cristalinas de la laguna “Yal-kú” en Akumal, Quintana Roo.', 'Quintana Roo', '4 horas', 2000.00, 'laguna Yal-ku.png', 0),
(17, 4, 'Adopta una tortuga en el Centro Ecológico Akumal, CEA', 'liberacion', 'Participa en un programa de adopción de tortugas marinas en el Centro Ecológico Akumal y ayuda a la conservación de estas especies.', 'Quintana Roo', '5 horas', 900.00, 'Adopta una tortuga.jpg', 0),
(18, 2, 'Recorrido por las 4 bahías de Akumal', 'snorkel', 'Explora las aguas cristalinas de las cuatro bahías de Akumal en un recorrido guiado de snorkel, descubriendo la vida marina local.', 'Quintana Roo', '2 horas', 500.00, 'akumal.jpg', 0),
(20, 2, 'Recorrido en barco al Parque Nacional Cabo Pulmo', 'viaje por barco', 'Recorrido en barco por el Parque Nacional Cabo Pulmo en Baja California, famoso por su biodiversidad marina.', 'Baja California', '4 horas', 1800.00, 'Buceo en Cabo Pulmo.jpg', 0),
(21, 4, 'Buceo y toma de fotografía en Parque Nacional Cabo Pulmo', 'fotografia marina', 'Realiza un buceo increíble en el Parque Nacional Cabo Pulmo, ideal para la fotografía submarina, y captura la vida marina.', 'Baja California', '5 horas', 800.00, 'cabo pulmo baja california.jpg', 0),
(22, 2, 'Cascadas de Texolo y rappel en Veracruz', 'snorkel', 'Disfruta de un emocionante salto y rappel en las impresionantes Cascadas de Texolo, ubicadas en el corazón de Veracruz, rodeadas de naturaleza.', 'Veracruz', '5 horas', 1500.00, 'TexoloVeracruz2.jpeg', 0),
(23, 4, 'Rafting en el río Colima', 'viaje por barco', 'Vive la emoción del rafting en el río Colima, una experiencia única rodeada de paisajes naturales y aguas turbulentas.', 'Colima', '3 horas', 1200.00, 'RaftingColima.jpeg', 0),
(24, 2, 'Snorkel en Isla Tiburón, Sonora', 'snorkel', 'Disfruta de un tour guiado de snorkel en las aguas cristalinas de Isla Tiburón, en Sonora, donde podrás explorar la rica vida marina.', 'Sonora', '3 horas', 700.00, 'Sonora.jpg', 0),
(25, 4, 'Liberación de tortugas en Playa Ventura, Guerrero', 'liberacion', 'Participa en la liberación de tortugas en la playa Ventura, Guerrero, y contribuye a la conservación de estas maravillosas especies marinas.', 'Guerrero', '4 horas', 500.00, 'tortugasGuerrero.jpg', 0),
(26, 2, 'Buceo en las Islas Marietas, Nayarit', 'buceo', 'Sumérgete en las aguas cristalinas de las Islas Marietas en Nayarit, un lugar perfecto para explorar la vida marina a través del buceo.', 'Nayarit', '7 horas', 1500.00, 'MarietasNayarit.jpeg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `encuestas`
--

CREATE TABLE `encuestas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `q1` int(11) NOT NULL,
  `q2` int(11) NOT NULL,
  `q3` int(11) NOT NULL,
  `q4` int(11) NOT NULL,
  `q5` int(11) NOT NULL,
  `q6` int(11) NOT NULL,
  `q7` int(11) NOT NULL,
  `q8` int(11) NOT NULL,
  `q9` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `encuestas`
--

INSERT INTO `encuestas` (`id`, `id_usuario`, `q1`, `q2`, `q3`, `q4`, `q5`, `q6`, `q7`, `q8`, `q9`) VALUES
(1, 1, 3, 1, 2, 4, 2, 1, 2, 1, 234),
(2, 1, 3, 1, 2, 4, 2, 1, 2, 1, 23414),
(3, 1, 3, 1, 2, 4, 2, 2, 1, 2, 2341414),
(4, 1, 2, 5, 3, 2, 4, 1, 2, 2, 12),
(5, 1, 2, 5, 3, 2, 4, 2, 4, 1, 121),
(6, 1, 2, 5, 3, 2, 4, 2, 4, 1, 1214);

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_actividad` int(11) NOT NULL,
  `personas` int(11) NOT NULL,
  `total` float(8,2) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `eliminado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservas`
--

INSERT INTO `reservas` (`id`, `id_usuario`, `id_actividad`, `personas`, `total`, `fecha`, `eliminado`) VALUES
(5, 1, 6, 3, 900.00, '2024-12-28', 0),
(6, 1, 6, 4, 1200.00, '2025-01-03', 1),
(7, 1, 6, 7, 2100.00, '2024-12-06', 0),
(8, 3, 2, 2, 500.00, '2024-12-26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido_pat` varchar(255) NOT NULL,
  `apellido_mat` varchar(255) NOT NULL,
  `telefono` bigint(20) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `tipo` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido_pat`, `apellido_mat`, `telefono`, `correo`, `contrasena`, `tipo`) VALUES
(1, 'Juan', 'Pérez', 'Gómez', 5523456789, 'juan@email.com', '123', 0),
(2, 'Ana', 'López', 'Martínez', 5534567890, 'ana@email.com', '123', 1),
(3, 'Carlos', 'González', 'Sánchez', 5545678901, 'carlos.gonzalez@email.com', 'contraseña789', 0),
(4, 'María', 'Rodríguez', 'Hernández', 5556789012, 'maria.rodriguez@email.com', 'contraseña012', 1),
(5, 'Pedro', 'Torres', 'Ramírez', 5567890123, 'pedro.torres@email.com', 'contraseña345', 0),
(8, 'Carlos', 'Conde', 'Ramirez', 1234567890, 'profe@email.com', '1234', 0),
(9, 'gtgt', 'gtgt', 'gtgtgt', 1234567890, 'dede@elaim.com', '123', 0),
(10, 'edwed', 'dwecwc', 'jgyjg', 1234567876, 'derfer@correo.com', '123', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actividades`
--
ALTER TABLE `actividades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_propietario_actividad` (`id_propietario`);

--
-- Indexes for table `encuestas`
--
ALTER TABLE `encuestas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_encuesta` (`id_usuario`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario_reserva` (`id_usuario`),
  ADD KEY `fk_actividad_reserva` (`id_actividad`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actividades`
--
ALTER TABLE `actividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `encuestas`
--
ALTER TABLE `encuestas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `actividades`
--
ALTER TABLE `actividades`
  ADD CONSTRAINT `fk_propietario_actividad` FOREIGN KEY (`id_propietario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `encuestas`
--
ALTER TABLE `encuestas`
  ADD CONSTRAINT `fk_usuario_encuesta` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `fk_actividad_reserva` FOREIGN KEY (`id_actividad`) REFERENCES `actividades` (`id`),
  ADD CONSTRAINT `fk_usuario_reserva` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
