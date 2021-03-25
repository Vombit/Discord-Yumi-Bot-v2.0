create database yumidiscord;

create table Guilds (
    guildId varchar(100) NOT NULL PRIMARY KEY,
    guildOwnerId varchar(100) NOT NULL
);

create table GuildConfig (
    guildId varchar(100) NOT NULL PRIMARY KEY,
	cmdPrefix VARCHAR(10) default '.',
    hiChannelId VARCHAR(100) NOT NULL,
    logChannelId VARCHAR(100) NOT NULL,
	msgHi varchar(200) NOT NULL,
	msgBye varchar(200) NOT NULL
);

CREATE TABLE Users (
  `id` varchar(30) NOT NULL PRIMARY KEY,
  `username` varchar(1000) NOT NULL,
  `lvl` int NOT NULL DEFAULT '1',
  `xp` int NOT NULL DEFAULT '1',
  `max` int NOT NULL DEFAULT '50',
  `coins` int NOT NULL DEFAULT '200',
  `score` int NOT NULL DEFAULT '0',
  `rep` int NOT NULL DEFAULT '0'
);
