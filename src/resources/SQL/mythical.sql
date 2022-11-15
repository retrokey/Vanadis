SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `mythical_news`
-- ----------------------------
DROP TABLE IF EXISTS `mythical_news`;
CREATE TABLE `mythical_news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `text` text,
  `images` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `author` int DEFAULT NULL,
  `time` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of mythical_news
-- ----------------------------
INSERT INTO `mythical_news` VALUES ('1', 'Welcome!', 'Welcome on Mythical!', 'http://localhost:8080/images/news/image.png', '1', '1668511701764');

-- ----------------------------
-- Table structure for `mythical_permission`
-- ----------------------------
DROP TABLE IF EXISTS `mythical_permission`;
CREATE TABLE `mythical_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission` int DEFAULT NULL,
  `rank` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of mythical_permission
-- ----------------------------
INSERT INTO `mythical_permission` VALUES ('1', '1', '7');
INSERT INTO `mythical_permission` VALUES ('2', '2', '7');
INSERT INTO `mythical_permission` VALUES ('3', '3', '7');
INSERT INTO `mythical_permission` VALUES ('4', '4', '7');
INSERT INTO `mythical_permission` VALUES ('5', '5', '7');
INSERT INTO `mythical_permission` VALUES ('6', '6', '7');
INSERT INTO `mythical_permission` VALUES ('7', '7', '7');
INSERT INTO `mythical_permission` VALUES ('8', '8', '7');
INSERT INTO `mythical_permission` VALUES ('9', '9', '7');
INSERT INTO `mythical_permission` VALUES ('10', '10', '7');
INSERT INTO `mythical_permission` VALUES ('11', '11', '7');
INSERT INTO `mythical_permission` VALUES ('12', '12', '7');
INSERT INTO `mythical_permission` VALUES ('13', '13', '7');

-- ----------------------------
-- Table structure for `mythical_permission_name`
-- ----------------------------
DROP TABLE IF EXISTS `mythical_permission_name`;
CREATE TABLE `mythical_permission_name` (
  `id` int NOT NULL AUTO_INCREMENT,
  `permission` varchar(50) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of mythical_permission_name
-- ----------------------------
INSERT INTO `mythical_permission_name` VALUES ('1', 'admin.login', 'Ability to use admin panel');
INSERT INTO `mythical_permission_name` VALUES ('2', 'admin.news', 'Ability to use news section');
INSERT INTO `mythical_permission_name` VALUES ('3', 'admin.news.list', 'Ability to see news list');
INSERT INTO `mythical_permission_name` VALUES ('4', 'admin.news.edit', 'Ability to edit the news');
INSERT INTO `mythical_permission_name` VALUES ('5', 'admin.news.delete', 'Ability to delete the news');
INSERT INTO `mythical_permission_name` VALUES ('6', 'admin.user', 'Ability to use user section');
INSERT INTO `mythical_permission_name` VALUES ('7', 'admin.user.list', 'Ability to see user list');
INSERT INTO `mythical_permission_name` VALUES ('8', 'admin.user.ranks', 'Ability to edit user rank');
INSERT INTO `mythical_permission_name` VALUES ('9', 'admin.user.clone', 'Ability to check the clone for user');
INSERT INTO `mythical_permission_name` VALUES ('10', 'admin.user.currency', 'Ability to edit user currency');
INSERT INTO `mythical_permission_name` VALUES ('11', 'admin.mythical', 'Ability to edit the cms settings');
INSERT INTO `mythical_permission_name` VALUES ('12', 'admin.mythical.permission', 'Ability to manager the permissions');
INSERT INTO `mythical_permission_name` VALUES ('13', 'maintenance.login', 'Ability to login when maintenace mode is true');

-- ----------------------------
-- Alter of users
-- ----------------------------
ALTER TABLE `users` ADD `role` varchar(20) DEFAULT NULL;