-- create database db
CREATE DATABASE db;

-- use newly create database
USE db;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Chats` (
  `chat_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `chat_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `chat_id` (`chat_id`),
  CONSTRAINT `Carts_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `Chats` (`chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `MealItems` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Description` text,
  `Price` float DEFAULT NULL,
  `ItemType` text,
  `Image` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CartItems` (
    `cart_item_id` INT NOT NULL AUTO_INCREMENT,
    `cart_id` INT DEFAULT NULL,
    `meal_item_id` INT DEFAULT NULL,
    `added_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`cart_item_id`),
    KEY `cart_id` (`cart_id`),
    KEY `meal_item_id` (`meal_item_id`),
    CONSTRAINT `CartItems_ibfk_1` FOREIGN KEY (`cart_id`)
        REFERENCES `Carts` (`cart_id`),
    CONSTRAINT `CartItems_ibfk_2` FOREIGN KEY (`meal_item_id`)
        REFERENCES `MealItems` (`ID`)
)  ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4 COLLATE = UTF8MB4_0900_AI_CI;


CREATE TABLE `Messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `chat_id` int DEFAULT NULL,
  `sender_id` int DEFAULT NULL,
  `sender_role` text,
  `message_content` text,
  `sent_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `function_call` tinyint(1) DEFAULT NULL,
  `function_arg` int DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `chat_id` (`chat_id`),
  KEY `sender_id` (`sender_id`),
  CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `Chats` (`chat_id`),
  CONSTRAINT `Messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());

INSERT INTO Users (username, email, password, created_at)
VALUES ('User3', 'john.doe@example.com', 'hashed_password', NOW());

INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CRUNCHY ONION RINGS', 'Served with Honey BBQ Sauce.', 7.99, 'Side','https://olo-images-live.imgix.net/00/00be7998e630473c80c4b8f4c6886ab8.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=58c33c2fccb337b3e0b7b913e13163a3');

INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('SPINACH & ARTICHOKE DIP', 'Creamy spinach and artichoke dip topped with Parmesan cheese. Served with freshly made white corn tortilla chips and our chipotle lime salsa.', 8.99, 'Side','https://olo-images-live.imgix.net/92/924a7b49593846b190c478d1f56c6aa3.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=a21e282623f3de1a3538bd2b31fe146c');

INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CHICKEN WONTON TACOS', 'Sweet Asian chile marinated grilled chicken stuffed into crispy wonton shells topped with our signature coleslaw and cilantro.', 9.99, 'Entree','https://olo-images-live.imgix.net/65/65d5979d9fd5458682ee5824a3cd44b5.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=e35c31f3129bc2a83d4fc07a43d4df40');

INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CHICKEN QUESADILLA', 'Warm, grilled tortillas are loaded with chipotle lime chicken, house-made pico de gallo and a blend of melted Cheddar cheeses. Served with our chipotle lime salsa and sour cream.', 9.99, 'Entree','https://olo-images-live.imgix.net/67/676385a2dcd14d6c8993833e06eaf097.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=59499c1138373e62599bfc0361d0c64c');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('NEIGHBORHOOD NACHOS WITH CHIPOTLE LIME CHICKEN', 'Freshly made white corn tortilla chips are topped with grilled chicken, queso blanco, a blend of melted Cheddar cheeses, house-made pico de gallo, fresh jalapeños, chopped cilantro, sour cream and guacamole.', 12.99, 'Appetizer','https://olo-images-live.imgix.net/ce/ceacc0964d1341cca99ea076315a90eb.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=4c7afc1b2342475e62732730b797132d');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ("APPLEBEE'S® RIBLETS PLATTER", 'An Applebee’s original! Our famous slow cooked riblets, slathered in your choice of sauce. Pictured with signature coleslaw and fries.', 14.99, 'Entree','https://olo-images-live.imgix.net/6b/6b701ae8d98d42a29323ccf42898671b.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=5bd05e01e8e001ec0cf4cea15e223515');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('8 OZ. TOP SIRLOIN', 'Lightly seasoned USDA Select top sirloin* cooked to perfection and served hot off the grill. Served with your choice of two sides.', 15.99, 'Entree','https://olo-images-live.imgix.net/42/42e408f0b9674833b6dbb36d8f166e73.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=5f24a6ad5c2cf9c22311667fa4cc4661');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('BOURBON STREET STEAK', 'Big flavor from New Orleans. A grilled 8 oz. USDA Select Top Sirloin* is jazzed up with Cajun spices and garlic butter served sizzling on a cast iron platter with sautéed mushrooms and onions. Served with your choice of two sides.', 15.99, 'Entree','https://olo-images-live.imgix.net/30/30954e8a1897412c8eefe030a9183786.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=187f1843bbafeef79d41ad0291f3628a');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ("SHRIMP 'N PARMESAN SIRLOIN", "A popular take on surf 'n turf, this dish starts with a tender grilled 8 oz. USDA Select Top Sirloin* and is topped with sautéed blackened shrimp and our creamy lemon butter Parmesan sauce. Served with your choice of two sides.", 15.99, 'Entree','https://olo-images-live.imgix.net/e6/e663360d94344532a3e39db8cdc5f1eb.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=49d25351a50a58581330c469ab5aaa44');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CHICKEN TENDERS PLATTER', 'Crispy breaded chicken tenders are a grill and bar classic. Served with choice of side. Pictured with signature coleslaw and classic fries.', 16.99, 'Entree','https://olo-images-live.imgix.net/d8/d84f6411a4034620a523c9f43acef0d4.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=369cc38eecd5351092185e1782048c5f');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('FIESTA LIME CHICKEN', 'A celebration of flavor, this dish delivers on every level. Grilled chicken glazed with zesty lime sauce and drizzled with tangy Mexi-ranch is smothered with a rich blend of Cheddar cheeses on a bed of crispy tortilla strips. Served with Spanish rice and house-made pico de gallo.', 14.99, 'Entree','https://olo-images-live.imgix.net/a7/a7296be350434b1ea336e9c7a18061f3.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=be29aa6be23e47cd1cc5cc2e8aaafd1f');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('GRILLED CHICKEN BREAST', 'Juicy chicken breast seasoned and grilled over an open flame. Served with garlic mashed potatoes & broccoli.', 15.99, 'Entree','https://olo-images-live.imgix.net/30/30e2eb860ce741c29002f4b89e05610b.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=76425ac34784de027f1be273dd42fef4');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('BOURBON STREET CHICKEN & SHRIMP', 'Update Bourbon Street Chicken & Shrimp copy (PRINT ONLY) to “Cajun-seasoned chicken and blackened shrimp jazzed up in buttery garlic and parsley, served sizzling with sautéed mushrooms & onions and garlic mashed potatoes.', 12.99, 'Entree','https://olo-images-live.imgix.net/da/da53e0694b8a4aea8c2737187ba9a3ab.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=0217bf8ff404ed3997be4b56f88161e6');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('HAND-BATTERED FISH & CHIPS', 'Golden, crispy battered fish with fries. Comes with tartar sauce & a lemon wedge. Pictured with signature coleslaw and classic fries.', 13.99, 'Entree','https://olo-images-live.imgix.net/75/75e2da5ab34042f9b9846b56bd816c8a.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=c51359fea3d9db71f15dc5f94311dbfb');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('BLACKENED CAJUN SALMON', '6 oz. blackened salmon fillet grilled to perfection. Served with garlic mashed potatoes & broccoli.', 15.99, 'Entree','https://olo-images-live.imgix.net/aa/aa8caf0df1af4cdfb28800c4f9b06574.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=bf5a9e03d9aeabff8d71b31af982dd03');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('DOUBLE CRUNCH SHRIMP', 'Crispy battered shrimp are fried golden brown. Served with cocktail sauce. Pictured with signature coleslaw and fries.', 14.99, 'Entree','https://olo-images-live.imgix.net/02/020d79b064084f04b6321909f3eab885.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=45f42cbdce98b4ac78a4dfe2337e5a44');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CLASSIC BROCCOLI CHICKEN ALFREDO', 'Juicy grilled chicken is served warm on a bed of fettuccine pasta tossed with broccoli and rich Alfredo sauce topped with Parmesan cheese. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley.', 15.99, 'Entree','https://olo-images-live.imgix.net/96/96050f4ce2d040d19526703837bebf8b.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=7c391a3217deaf4dd29594e989ae55fe');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('THREE-CHEESE CHICKEN PENNE', 'Asiago, Parmesan and white Cheddar cheeses are mixed with penne pasta in a rich Parmesan cream sauce then topped with grilled chicken breast and bruschetta tomatoes.', 11.99, 'Entree','https://olo-images-live.imgix.net/56/566549990ca44708a4b0b43ebc88f647.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=a8ba669c98dba4397c2f9a0f6c15b761');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('FOUR CHEESE MAC & CHEESE WITH HONEY PEPPER CHICKEN TENDERS', 'A sweet and savory take on comfort food, four-cheese penne mac & cheese is topped with Applewood-smoked bacon and crispy chicken tenders tossed in honey pepper sauce. (Note: sauce contains bacon and cannot be removed.)', 9.99, 'Entree','https://olo-images-live.imgix.net/6a/6ac16be4295c431b824ab5ec4d7c4961.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=dd8f2d0883a05635bd1053ad5b289259');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('SOUTHWEST CHICKEN BOWL', 'Grilled chipotle lime chicken on fresh greens and cilantro rice with house-made pico de gallo, black bean corn salsa and guacamole. Topped with chimichurri, tortilla strips and a fresh lime wedge.', 15.99, 'Entree','https://olo-images-live.imgix.net/f2/f2f42f20ba834041850a2fbeec0bb0a3.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=83c672acdf83fd41135ec72441cabcfa');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('TEX-MEX SHRIMP BOWL', 'Grilled chipotle lime shrimp on fresh greens and cilantro rice with house-made pico de gallo, black bean corn salsa and guacamole. Topped with chimichurri, tortilla strips and a fresh lime wedge.', 16.99, 'Entree','https://olo-images-live.imgix.net/25/2507d35175d8450daba61a017ab0127a.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=dda501ad7add7172a296e86a78b3d4fc');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('ORIENTAL CHICKEN SALAD', 'A long-running favorite, crispy breaded chicken tenders top a bed of Asian greens, crunchy noodles and almonds with our Oriental vinaigrette on the side. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley.', 17.99, '','https://olo-images-live.imgix.net/d8/d8a50d6e025c40a7b05070466f71ac05.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=144f6288733634b9c36ba2a3dad23d00');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('GRILLED CHICKEN TENDER SALAD', 'A hearty salad with juicy grilled chicken on a bed of fresh greens topped with a blend of Cheddar cheeses and tomatoes. Served with honey Dijon mustard dressing on the side and a golden brown signature breadstick brushed with a buttery blend of garlic and parsley.', 15.99, 'Entree','https://olo-images-live.imgix.net/16/164d00bd07004deea8322b7aad03926a.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=2ff059a138f868e62b100cc56432ac46');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CRISPY CHICKEN TENDER SALAD', 'A hearty salad with crispy chicken tenders on a bed of fresh greens topped with a blend of Cheddar cheeses and tomatoes. Served with honey Dijon mustard dressing on the side and a golden brown signature breadstick brushed with a buttery blend of garlic and parsley.', 14.99, 'Entree','https://olo-images-live.imgix.net/27/27dd8b6d19224ef8a23e512e9459b454.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=1935e34fe9bcb49417c8e71f36f7d8b8');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('BLACKENED SHRIMP CAESAR SALAD', 'Crisp romaine topped with blackened shrimp, croutons, shaved Parmesan and garlic Caesar dressing on the side. Served with a golden brown signature breadstick brushed with a buttery blend of garlic and parsley.', 13.99, 'Entree','https://olo-images-live.imgix.net/b8/b808b719f29e47f1b5dada98a72a890f.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=2dcef76a6eb44cbc842a651979603de5');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('NEIGHBORHOOD BURGER', 'A neighborhood classic. Two juicy, all-beef 3.5 oz. patties are seared and stacked with American cheese and smothered with house-made garlic mayo. Served with shredded lettuce and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef.', 15.99, 'Entree','https://olo-images-live.imgix.net/4c/4c565365175945b38a542e95a3645f34.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=3118c72e541b3bd01069f311e1825d50');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('QUESADILLA BURGER', 'Part burger, part quesadilla, all taste. This original burger creation comes piled high with two slices of Pepper Jack cheese, our signature Mexi-ranch sauce, crispy Applewood-smoked bacon, house-made Pico de Gallo and shredded lettuce in a crisp, warm Cheddar quesadilla. Pictured with classic fries. Made with 100% fresh, never frozen ground beef.', 15.99, 'Entree','https://olo-images-live.imgix.net/d2/d2f72928b479490cb93eac35e412a6b4.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=5af5ea49ddf787271e54899d6a942e8c');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CLASSIC BACON CHEESEBURGER', 'Our juicy all-beef patty topped with two slices of American Cheese and two strips of Applewood-smoked bacon. Served with lettuce, tomato, onion and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef.', 14.99, 'Entree','https://olo-images-live.imgix.net/dc/dc18e5a0155445a1a18e2983ec91ec19.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=8310aef0b39c078245d325d3ef89c18b');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CLASSIC CHEESEBURGER', 'Our handcrafted all-beef patty topped with two slices of American cheese. Served with lettuce, tomato, onion and pickles on a Brioche bun. Pictured with classic fries. Made with 100% fresh, never frozen ground beef.', 13.99, 'Entree','https://olo-images-live.imgix.net/27/27fd49d0492a4af8b393f71b85848680.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=51630e8288376752587f8008e9950790');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('THE PRIME RIB DIPPER', 'Thinly sliced prime rib topped with grilled onions and melted American cheese. Served on a toasted Cheddar roll with our house-made herb mayo and French onion Au jus for delectable dipping. Pictured with classic fries.', 15.99, 'Entree','https://olo-images-live.imgix.net/93/9362b5f45bf84b02a1d196b25a00d5a7.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=2a589f8cc345dc0fb59ffc8b88b53914');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CHICKEN FAJITA ROLLUP', 'Juicy chipotle chicken with crisp lettuce, a blend of Cheddar cheeses and house-made pico de gallo wrapped in a tortilla with our Mexi-ranch dipping sauce. Pictured with classic fries.', 12.99, 'Entree','https://olo-images-live.imgix.net/84/84a06764e58f4ffcb08f815e57b2a33d.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=88474781fcffcd2706d6af48bf9e9378');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CLUBHOUSE GRILLE', 'Juicy chipotle chicken with crisp lettuce, a blend of Cheddar cheeses and house-made pico de gallo wrapped in a tortilla with our Mexi-ranch dipping sauce. Pictured with classic fries.', 13.99, 'Entree','https://olo-images-live.imgix.net/cf/cf1b553919854a61a0139f8d6f5fb660.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=4d8dfb902562903a88a2db90de2086c6');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('TRIPLE CHOCOLATE MELTDOWN', 'Warm, rich, fudge-filled chocolate cake drizzled with hot fudge. Served with vanilla ice cream.', 9.99, 'Dessert','https://olo-images-live.imgix.net/9e/9e32e2941b5249e484499a9e08516878.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=7a75bb3ee5fb64091d655a5d8ec73d17');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('BROWNIE BITE', 'The perfect size of a warm dark chocolate brownie with nuts. Served with vanilla ice cream and drizzled with hot fudge.', 8.99, 'Dessert','https://olo-images-live.imgix.net/4f/4f86918021f54c1b859ce7cd0198a4d1.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=2caa041d26002d5bd1d96f4073c66dcf');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ("SIZZLIN' BUTTER PECAN BLONDIE", 'Our famous blondie is sizzled and drizzled with maple cream cheese sauce, then topped with vanilla ice cream and candied pecans.', 7.99, 'Dessert','https://olo-images-live.imgix.net/8d/8dfd2429037d483db6afef91eb8d7fd9.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=e05c1a9aef1a10b9075937399afd5ed0');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('THE CLASSIC COMBO', 'All the classic apps you love - Boneless Wings, Spinach & Artichoke Dip, Chicken Quesadilla and Mozzarella Sticks.', 9.99, 'Appetizer','https://olo-images-live.imgix.net/54/54f9a1045adb4071995815f97697970e.jpeg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=2ac8e9f2737fa23ef343774de6091728');


INSERT INTO MealItems (Name, Description, Price, ItemType, Image)
VALUES ('CHICKEN WONTON TACOS', 'Sweet Asian chile marinated grilled chicken stuffed into crispy wonton shells topped with our signature coleslaw and cilantro.', 9.99, 'Appetizer','https://olo-images-live.imgix.net/65/65d5979d9fd5458682ee5824a3cd44b5.jpg?auto=format%2Ccompress&q=60&cs=tinysrgb&w=1200&h=800&fit=fill&fm=png32&bg=transparent&s=e35c31f3129bc2a83d4fc07a43d4df40');