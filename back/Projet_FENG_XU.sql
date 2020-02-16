-- phpMyAdmin SQL Dump
-- version 4.6.6deb4
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Jeu 28 Février 2019 à 13:01
-- Version du serveur :  5.7.23
-- Version de PHP :  7.0.33-0+deb9u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `Projet_FENG_XU`
--

-- --------------------------------------------------------

--
-- Structure de la table `CONNECTIONS`
--

CREATE TABLE `CONNECTIONS` (
  `idUser` int(4) NOT NULL,
  `cle` int(5) NOT NULL,
  `dateFin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `FOLLOW`
--

CREATE TABLE `FOLLOW` (
  `id_follower` int(4) NOT NULL,
  `id_followed` int(4) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `USERS`
--

CREATE TABLE `USERS` (
  `idUser` int(4) NOT NULL,
  `email` varchar(32) NOT NULL,
  `username` varchar(20) NOT NULL,
  `psd` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `USERS`
--

INSERT INTO `USERS` (`idUser`, `email`, `username`, `psd`, `prenom`, `nom`) VALUES
(1, 'toto@gmail.com', 'toto', '123456', 'kewei', 'xu'),
(2, 'tata@163.com', 'tata', '123321', 'zixuan', 'feng');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `CONNECTIONS`
--
ALTER TABLE `CONNECTIONS`
  ADD PRIMARY KEY (`idUser`,`cle`),
  ADD UNIQUE KEY `cle` (`cle`),
  ADD KEY `FK_idUser` (`idUser`);

--
-- Index pour la table `FOLLOW`
--
ALTER TABLE `FOLLOW`
  ADD PRIMARY KEY (`id_follower`,`id_followed`),
  ADD KEY `users_friends_fk1` (`id_follower`),
  ADD KEY `users_friends_fk2` (`id_followed`);

--
-- Index pour la table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `CONNECTIONS`
--
ALTER TABLE `CONNECTIONS`
  MODIFY `cle` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `idUser` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `CONNECTIONS`
--
ALTER TABLE `CONNECTIONS`
  ADD CONSTRAINT `FK_idUser` FOREIGN KEY (`idUser`) REFERENCES `USERS` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `FOLLOW`
--
ALTER TABLE `FOLLOW`
  ADD CONSTRAINT `users_friends_fk1` FOREIGN KEY (`id_follower`) REFERENCES `USERS` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_friends_fk2` FOREIGN KEY (`id_followed`) REFERENCES `USERS` (`idUser`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
