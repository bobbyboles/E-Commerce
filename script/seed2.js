const {
    db,
    models: { User, Product, Cart },
} = require("../server/db");
const _ = require("lodash");
const { faker } = require("@faker-js/faker");
const { times } = require("lodash");

async function seed() {
    await db.sync(); 
    console.log("db synced!");


        // Begin Real Seed Data
        //SNES Start
        await Product.create({
            productName: 'Super Nintendo Console',
            category: 'snes',
            stockQuantity: 30,
            description: '16-bit home video game console developed by Nintendo that was released in 1990 in Japan and South Korea, 1991 in North America. This state of the art console provides stunning graphics, responsive controls, and a decent length of cord! When the game malfunctions simply remove the cartridge, blow the dust out, and re-insert forcefully! ',
            price: 200.00,
            imageUrl: 'https://www.lukiegames.com/assets/images/SNES/snessys01gr_p_0xp4xq.jpg'
        });

        await Product.create({
            productName: 'Super Nintendo Controller',
            category: 'snes',
            stockQuantity: 25,
            description: ' home video game controller developed by Nintendo that was released in 1990 in Japan and South Korea, 1991 in North America, 1992 in Europe and Oceania, and 1993 in South America.',
            price: 25.00,
            imageUrl: 'https://i5.walmartimages.com/asr/aced8da5-2c15-4f89-8d54-6c8363712733_1.2f1c4a61e0de94efaa954f5d243f99ff.jpeg'
        });

        await Product.create({
            productName: 'Donkey Kong Country',
            category: 'snes',
            stockQuantity: 10,
            description: 'In this action-packed platformer -- the first to use ACM computer modeling for amazing character and background detail -- King K. Rool and his Kremlings have stolen Donkey Kongs banana hoard, and now its up to Donkey Kong and Diddy Kong to get it back!',
            price: 35.00,
            imageUrl: 'http://1.bp.blogspot.com/-uK8p9JXNQqk/T14x02Q7-jI/AAAAAAAADyk/I3qI8frfwK8/s1600/Donkey+Kong+Country.png'
        });

        await Product.create({
            productName: 'Donkey Kong Country 2',
            category: 'snes',
            stockQuantity: 15,
            description: 'This second installment of the Donkey Kong Country revolves around Diddy Kong and his girlfriend, Dixie Kong, who attempt to rescue Donkey Kong after he is abducted by King K. Rool. The game is set on "Crocodile Isle", in which there are eight worlds of varying environments, totaling to 52 levels.',
            price: 35.00,
            imageUrl: 'https://4.bp.blogspot.com/-d0kT4GgcALU/WrGzVj9op-I/AAAAAAAAHT0/J9oP-rjV5UMVCR_zJjwc1khdFIihFj-lQCLcBGAs/s1600/DKC2+cover.jpg'
        });
        
        await Product.create({
            productName: 'Donkey Kong Country 3',
            category: 'snes',
            stockQuantity: 20,
            description: 'Revisit Donkey Kong Island and join the Kong family for their latest adventure. The Kremlings have a mysterious new leader named KAOS and are up to their usual mischief, even capturing Donkey Kong and Diddy Kong. Now its up to Dixie Kong and the newest Kong, a giant infant named Kiddy, to rescue the two missing apes.',
            price: 40.00,
            imageUrl: 'https://images.launchbox-app.com/fba1ed2e-30fa-47ba-9e6a-267ff2784dfa.jpg'
        });

        await Product.create({
            productName: 'Kirby Superstar',
            category: 'snes',
            stockQuantity: 5,
            description: 'Dream Land is under siege again! That awful King Dedede is at it again - hes stolen all the food in Dream Land! Its up to Kirby to get it back and ultimately save Popstar from being taken over! Help Kirby work through EIGHT challenging games filled with action and adventure.',
            price: 45.00,
            imageUrl: 'https://i.ytimg.com/vi/lkS7wXuIwig/maxresdefault.jpg'
        });

        await Product.create({
            productName: 'Madden 97',
            category: 'snes',
            stockQuantity: 12,
            description: 'Madden NFL™ 97 reloads with an arsenal of new and classic features to field the most complete Madden ever.',
            price: 25.00,
            imageUrl: 'https://images.launchbox-app.com/9ab51031-9cbc-4368-bb0b-739c3b0ed094.png'
        });

        await Product.create({
            productName: 'Mortal Kombat',
            category: 'snes',
            stockQuantity: 17,
            description: 'The #1 arcade hit is here: from Sub-Zero, Rayden and the rest of the Kombat Warriors to the grueling endurance and intense mirror matches! Execute bone-shattering combos and ferocious finishing moves! Defeat the half human dragon Goro, and destroy the shape-changing Shang Tsung to become the Supreme Mortal Kombat Warrior!',
            price: 20.00,
            imageUrl: 'https://www.lukiegames.com/assets/images/SNES/snes_mortal_kombat_p_tsvlpu.jpg'
        });

        await Product.create({
            productName: 'Street Fighter 2',
            category: 'snes',
            stockQuantity: 5,
            description: 'The introductory edition of Capcoms genre-defining fighting game is ported to the Super NES system as one of the most anticipated and popular console releases of all time. Two-player combat, all of the characters as well as all four bosses, every one of the classic stages and music themes - the arcade great came home with this version.',
            price: 80.00,
            imageUrl: 'https://i.pinimg.com/originals/96/9e/70/969e70ea8d42c9abcd20d964acb40c5c.jpg'
        });

        await Product.create({
            productName: 'Super Mario World',
            category: 'snes',
            stockQuantity: 7,
            description: 'Marios off on his biggest adventure ever, and this time hes brought along a friend. Yoshi the dinosaur teams up with Mario to battle Bowser, who has kidnapped Princess Toadstool once again. Guide Mario and Yoshi through nine peril-filled worlds to the final showdown in Bowsers castle. Use Marios new powers and Yoshis voracious monster-gobbling appetite as you explore 96 levels filled with dangerous new monsters and traps. Climb mountains and cross rivers, and descend into subterranean depths. Destroy the seven Koopa castles and find keys to gain entrance to hidden levels. Discover more warps and thrilling bonus worlds than ever before!',
            price: 85.00,
            imageUrl: 'https://3.bp.blogspot.com/-m628T0N1u14/TsH4k_73NoI/AAAAAAAAAfk/5dkcu9FhMi4/s1600/Super_Mario_World_Box.png'
        });
        //END SNES
        
        // BEGIN PS3
        await Product.create({
            productName: 'Playstation 3 Console',
            category: 'ps3',
            stockQuantity: 26,
            description: 'The PlayStation 3 is a home video game console developed by Sony Interactive Entertainment. If you had a social life before then you will no longer have to worry about that anymore! Complete with a wireless controller for greater range when rage quitting after hard losses! The successor to the PlayStation 2, it is part of the PlayStation brand of consoles. It was first released on November 11, 2006, in Japan, November 17, 2006, in North America, and March 23, 2007, in Europe and Australia.',
            price: 285.00,
            imageUrl: 'http://www.laaudiofile.com/images/ps3_60gb.jpg'
        });

        await Product.create({
            productName: 'Playstation 3 Controller',
            category: 'ps3',
            stockQuantity: 31,
            description: 'Playstation 3 Dualshock controller. With wireless connection at the press of a button, this replacement controller is sure to make an impact while leaving your console safely in place after those frustrating online losses! New and improved durability designed to withstand even the biggest squad wipes on C.O.D!',
            price: 50.00,
            imageUrl: 'https://n3.sdlcdn.com/imgs/b/j/v/Sony-PlayStation-3-Dualshock-3-SDL009463255-3-81925.jpg'
        });

        await Product.create({
            productName: 'Red Dead Redemption',
            category: 'ps3',
            stockQuantity: 9,
            description: 'Red Dead Redemption is a Western epic, set at the turn of the 20th century when the lawless and chaotic badlands began to give way to the expanding reach of government and the spread of the Industrial Age. When federal agents threaten his family, former outlaw John Marston is forced to pick up his guns and hunt down the gang of criminals he once called friends. Experience Marstons journey across the sprawling expanses of the American West and Mexico as he fights to bury his blood-stained past and seek a new future for himself and his family.',
            price: 55.00,
            imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/062fceab-dd60-438b-adb7-88f55526ae36/d6zwqka-6d65abd8-6fb9-4573-b425-922ef7ef0724.jpg/v1/fill/w_826,h_967,q_75,strp/red_dead_redemption_ps3_cover_variation_2_by_domestrialization-d6zwqka.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8wNjJmY2VhYi1kZDYwLTQzOGItYWRiNy04OGY1NTUyNmFlMzYvZDZ6d3FrYS02ZDY1YWJkOC02ZmI5LTQ1NzMtYjQyNS05MjJlZjdlZjA3MjQuanBnIiwid2lkdGgiOiI8PTgyNiIsImhlaWdodCI6Ijw9OTY3In1dXX0.LnQkLpIGX2WyuRX9kuBt0rZ0PgQzm-JyC5M-AbQNcrA'
        });

        await Product.create({
            productName: 'Resident Evil 5',
            category: 'ps3',
            stockQuantity: 19,
            description: 'The biohazard threat has not ended: Just when it seemed that the menace of Resident Evil had been destroyed, along comes a new terror to send shivers down players spines. Experience the thrill and terror all over again with Resident Evil 5 for PS3. Featuring Chris Redfield of the original Resident Evil and Sheva Alomar, a West African agent of the Bioterrorism Security Assessment Alliance (BSAA), this sci-fi survival game is staged in a remote desert colony packed with hordes of fast-moving, quick-thinking enemies that represent a whole new breed of evil',
            price: 65.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/186228-resident-evil-5-gold-edition-playstation-3-front-cover.jpg'
        });

        await Product.create({
            productName: 'Rock Band',
            category: 'ps3',
            stockQuantity: 27,
            description: 'Get ready to rock with this Guitar Hero spinoff. Featuring a 4 person band set up, you and 3 buddies can now play together while smoking weed in your mothers basement and coming up with excuses to give your boss for missing work again!',
            price: 35.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/110450-rock-band-playstation-3-front-cover.jpg'
        });

        await Product.create({
            productName: 'Sims 3',
            category: 'ps3',
            stockQuantity: 6,
            description: 'Create Sims with unique personalities, fulfill their desires, and control their lives within a living neighborhood. Unlock all-new Karma Powers and unleash them on your Sims: help your Sim “get lucky,” bless them with “instant beauty” or curse them with an “epic fail.” From character creation and customization tools, to persistent online access and the ability to share content with the larger The Sims community, The Sims 3 allows players to craft the lives of their Sims, like never before. Choose whether or not to fulfill your Sims destinies by making their wishes come true, or letting their dreams die.',
            price: 15.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/241730-the-sims-3-playstation-3-front-cover.jpg'
        });

        await Product.create({
            productName: 'UFC Undisputed',
            category: 'ps3',
            stockQuantity: 21,
            description: 'Dislike someone elses face? CHANGE IT! Increase the fullness of their lips and cheekbones with your bare hands!',
            price: 19.00,
            imageUrl: 'http://media.ign.com/ps3/image/object/876/876981/UFC09_US_ESRB_PS3.jpg'
        });

        await Product.create({
            productName: 'Uncharted Drakes Fortune',
            category: 'ps3',
            stockQuantity: 13,
            description: 'Treasure hunter Nathan "Nate" Drake (Nolan North), accompanied by reporter Elena Fisher (Emily Rose), recovers the coffin of his self-proclaimed ancestor Sir Francis Drake, having located it from coordinates inscribed on a family heirloom: a ring Nate wears around his neck.[10] The coffin contains Sir Francis Drakes diary, which gives the location of El Dorado. Pirates attack and destroy Nates boat, but Nates friend and mentor Victor "Sully" Sullivan (Richard McGonagle) rescues the two in his seaplane. Fearing Elenas reporting will attract potential rivals, Nate and Sully abandon her at a dock.',
            price: 10.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/108696-uncharted-drake-s-fortune-playstation-3-front-cover.jpg'
        });

        await Product.create({
            productName: 'Uncharted 2 Among Thieves',
            category: 'ps3',
            stockQuantity: 43,
            description: 'Uncharted 2: Among Thieves is a 2009 action-adventure game developed by Naughty Dog and published by Sony Computer Entertainment. It is the second game in the Uncharted series and was released in October 2009 for PlayStation 3',
            price: 20.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/210927-uncharted-2-among-thieves-playstation-3-front-cover.jpg'
        });

        await Product.create({
            productName: 'Uncharted 2 Among Thieves',
            category: 'ps3',
            stockQuantity: 8,
            description: 'Two years after the events of the previous game, treasure hunters Nathan "Nate" Drake (Nolan North) and Victor "Sully" Sullivan (Richard McGonagle) meet with Talbot (Robin Atkin Downes) in London, who is interested in purchasing Nates ring, inherited from Sir Francis Drake. The duo accuses Talbot of using counterfeit banknotes, and a fight ensues. They are subdued by Talbots cohort, Charlie Cutter (Graham McTavish), and Talbots employer, Katherine Marlowe (Rosalind Ayres), who steals Drakes ring. Cutter shoots Nate and Sully.',
            price: 30.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/326288-uncharted-3-drake-s-deception-game-of-the-year-edition-playstation-3-front-cover.jpg'
        });
        // END PS3

        // BEGIN WII
        await Product.create({
            productName: 'Wii Console',
            category: 'wii',
            stockQuantity: 8,
            description: 'Introducing motion controlled gaming from Nintendo. Package includes Wii console, 1 controller (batteries not included), 1 unused retention strap, and 1 replacement flat screen tv (also not included).',
            price: 350.00,
            imageUrl: 'https://cdn1.bigcommerce.com/server4000/a642e/products/18712/images/31128/__28131.1537914606.1280.1280.jpg?c=2'
        });

        await Product.create({
            productName: 'Wii Controller',
            category: 'wii',
            stockQuantity: 80,
            description: 'The TT (Tv Torpedo) is designed to be durable and eliminate the pain of replacing both a flat screen tv AND a controller on the same day! The silicon cover is not to protect the TT its to minimize the damage done BY the TT. The optional retention strap can be adjusted for an inconvenient sharing experience or even disregarded all together! Rated slightly safer than Lawn Darts!',
            price: 60.00,
            imageUrl: 'https://ae01.alicdn.com/kf/HLB1zrjbX.zrK1RjSspmq6AOdFXaW/Remote-Controller-Wireless-GamePad-Wii-Joystick-Silicone-Case-for-Nintendo-Wii-Game.jpg'
        });

        await Product.create({
            productName: 'Cabelas Dangerous Hunts',
            category: 'wii',
            stockQuantity: 6,
            description: 'Cabelas Dangerous Hunts 2009 puts the player in the shoes of Flint Abrahams, a famous hunter who travels around the world in search of hunting challenges. The player spends much time exploring the wilderness looking for traces of prey. Because they can be hard to make out, a Hunters Sense is included to reduce the world to grayscales and make animals stand out. The game however maintains an arcade approach and lets the player shoot everything in his way, without regard for a patient approach.',
            price: 15.00,
            imageUrl: 'https://i.pinimg.com/474x/cd/7c/ad/cd7cad40d1335ab0dc8ba0b9c5dfeb63---video-xbox-games.jpg'
        });

        await Product.create({
            productName: 'GoldenEye 007',
            category: 'wii',
            stockQuantity: 60,
            description: 'This version of GoldenEye 007 takes the concept behind the original N64 exclusive and moves not only the gameplay forward to the modern era, but also fast-forwards the Bond franchise to the new guy. Pierce Brosnans Bond will likely forever remain an N64 exclusive, as Daniel Craigs Bond takes the reigns. This GoldenEye isnt so much a remake or a port as it is, as Hollywood says when spinning a "remake," a reboot of the classic title.',
            price: 75.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/206870-goldeneye-007-wii-front-cover.jpg'
        });

        await Product.create({
            productName: 'Guitar Hero World Tour',
            category: 'wii',
            stockQuantity: 19,
            description: 'Guitar Hero: World Tour is the fourth main game in the series and brings a major change to the concept. Following the release of Rock Band that built on the Guitar Hero concept but added additional instruments, World Tour introduces these as well to allow players to play together simultaneously as a real band. Next to the guitar that was the main peripheral for the previous titles, the bundled edition of the game adds a microphone for the vocal parts and drums for percussion.',
            price: 25.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/215373-guitar-hero-world-tour-wii-front-cover.jpg'
        });

        await Product.create({
            productName: 'Mario Party 8',
            category: 'wii',
            stockQuantity: 30,
            description: 'Ever got into a fist fight over a video game? That might change after you get your rightful title of winner taken from you at the last second by a person you thought was your friend! Enrage your friends by teaming up against one person and use all your purchases from the in game store against them. This game is specifically designed to bring out the anger in the nicest of individuals!',
            price: 20.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/215373-guitar-hero-world-tour-wii-front-cover.jpg'
        });

        await Product.create({
            productName: 'Monopoly Streets',
            category: 'wii',
            stockQuantity: 13,
            description: 'MONOPOLY Streets has everything you love about the board game, presented as a street level tour of Mr. MONOPOLY’s fully animated world. Engage in a head-to-head race to build the greatest city and accumulate the most wealth. Play against your friends live and online or be matched up against players with similar skills from around the world! New features, such as property auctions, add new excitement to the classic play. From the cheap motels on Baltic Avenue to the luxurious Boardwalk suites, there is excitement around every corner in this remade classic.',
            price: 10.00,
            imageUrl: 'https://www.reference-gaming.com/assets/media/product/15595/monopoly-streets-wii.jpg?format=product-cover-large&k=1461754449'
        });

        await Product.create({
            productName: 'Super Mario Bros',
            category: 'wii',
            stockQuantity: 53,
            description: 'Princess Peach has been kidnapped! Again! Everyone was celebrating the Princess birthday when a giant birthday cake arrived... but then Bowser Jr. and the seven Koopalings popped out and kidnapped her! Mario, Luigi and two Toads make chase to rescue her once more. Will they succeed?',
            price: 45.00,
            imageUrl: 'https://www.reference-gaming.com/assets/media/product/15595/monopoly-streets-wii.jpg?format=product-cover-large&k=1461754449'
        });

        await Product.create({
            productName: 'Wii Sports',
            category: 'wii',
            stockQuantity: 58,
            description: 'A variety of games on one disc that is sure to get you swinging that controller while not wearing the retention strap. Might get that excuse youve been looking for to go buy a bigger tv!',
            price: 5.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/188448-wii-sports-wii-front-cover.jpg'
        });

        await Product.create({
            productName: 'Zelda Twilight Princess',
            category: 'wii',
            stockQuantity: 8,
            description: 'Twilight Princess is the first Legend of Zelda game for the Wii and also the last for GameCube. At first, Link is a simple farm boy, whose tasks consist of herding goats to watching children in Ordon village, Links hometown. One day, Link is asked by the mayor to run an errand in Castle Town, but things suddenly go wrong…',
            price: 55.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/75153-the-legend-of-zelda-twilight-princess-wii-front-cover.jpg'
        });
        // END WII

        // BEGIN XBOX
        await Product.create({
            productName: 'Xbox Series X',
            category: 'xbox',
            stockQuantity: 80,
            description: 'Xbox Series X/S are backwards-compatible with nearly all Xbox One-compatible games and accessories (including Xbox 360 and original Xbox games that were made backward-compatible with Xbox One), with the ability for games to automatically benefit from performance and visual improvements enabled by the newer hardware. At launch, Microsoft encouraged a "soft" transition between generations similar to PC gaming, offering the "Smart Delivery" framework to allow publishers to freely and automatically provide upgraded versions of Xbox One titles with optimizations for Xbox Series X/S. Publishers are not required to use Smart Delivery, and may publish Xbox Series X/S-exclusive titles if they so choose. Developers such as EA do not use Smart Delivery and prefer to sell separate Xbox One and Xbox Series X/S versions.',
            price: 850.00,
            imageUrl: 'https://www.elgiganten.dk/image/dv_web_D180001002520756/218667/xbox-series-x-1-tb-sort.jpg?$fullsize$'
        });

        await Product.create({
            productName: 'Xbox Elite Controller',
            category: 'xbox',
            stockQuantity: 40,
            description: 'Experience the Xbox Elite Wireless Controller Series 2 featuring adjustable-tension thumbsticks, wrap-around rubberized grip, and shorter hair trigger locks. Enjoy limitless customization with interchangeable components and exclusive button mapping options in the Xbox Accessories app. Save up to 3 custom profiles on the controller and switch between them on the fly. Swap thumbstick toppers, D-pads, and paddles to tailor your controller to your preferred gaming style. Stay in the game with up to 40 hours of rechargeable battery life and refined components that are built to last. Use Xbox Wireless, Bluetooth, or the included USB-C cable to play across Xbox Series X|S, Xbox One, and Windows. Compatible with Xbox Series X|S, Xbox One, and Windows 10/11 devices.',
            price: 150.00,
            imageUrl: 'https://media.gamestop.com/i/gamestop/10178670_ALT03/Microsoft-Xbox-Elite-Black-Series-2-Wireless-Controller?$pdp$'
        });

        await Product.create({
            productName: 'Battlefield 3',
            category: 'xbox',
            stockQuantity: 20,
            description: 'Battlefield 3 is the direct sequel to 2005s Battlefield 2 and is the 11th overall entry in the Battlefield franchise. Powered by the Frostbite 2 engine, Battlefield 3 aims to provide the fast paced, team oriented online multiplayer the series has made its name upon while also providing the first true single player campaign in a numbered Battlefield game, and for the first time in any Battlefield game numbered or not is a cooperative mode.',
            price: 50.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/238417-battlefield-3-xbox-360-front-cover.jpg'
        });

        await Product.create({
            productName: 'Conker Live Reloaded',
            category: 'xbox',
            stockQuantity: 10,
            description: 'Conker: Live & Reloaded is a combination of frantic online multiplayer action and a single-player mode, which is a remake of the original Conkers Bad Fur Day for Nintendo 64 with more detailed and technologically advanced graphics, as well as re-recorded music.',
            price: 15.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/455176-conker-live-reloaded-xbox-front-cover.jpg'
        });

        await Product.create({
            productName: 'Duke Nukem 3D',
            category: 'xbox',
            stockQuantity: 100,
            description: 'The Game.Com version of Duke Nukem 3D plays more like a dungeon crawler rather than an FPS due to Game.Coms hardware limitations. The player can only move Duke forward, backwards, strafe left or right, one screen at a time. By pressing B or C the player can turn Duke to shoot left or right, but cant turn him to face that direction and move.',
            price: 75.00,
            imageUrl: 'https://i5.walmartimages.com/asr/8d60d5e5-2551-4888-a4f0-7af9aee817d7_1.bcab92f000e614c293667774fa6edb32.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff'
        });

        await Product.create({
            productName: 'Farming Simulator 17',
            category: 'xbox',
            stockQuantity: 15,
            description: 'Take on the role of a modern farmer in Farming Simulator 17! Immerse yourself in a huge open world loaded with new content: new environment, vehicles, animals, crops and gameplay mechanics! Explore farming possibilities over hundreds of acres of land, including a detailed new North American environment. Drive over 250 authentic farming vehicles and equipment from over 75 manufacturers, including new brands such as Challenger, Fendt, Valtra or Massey Ferguson.',
            price: 70.00,
            imageUrl: 'https://www.gamereleasedates.net/images/covers/xboxone/cover-xboxone-farming-simulator-17.jpg'
        });

        await Product.create({
            productName: 'Fight Night Round 5',
            category: 'xbox',
            stockQuantity: 11,
            description: 'Fight Night Round 5 is (as the name would suggest) Electronic Arts 5th entry into the boxing series. This time around, you have over 40 athletes to choose from from a variety of eras and weight classes, including Evander Holyfield, Floyd Mayweather, and (most notably) Mike Tyson and Mohammad Ali.',
            price: 65.00,
            imageUrl: 'https://roundbyroundboxing.com/wp-content/uploads/2016/09/Fight-Night-Cover.png'
        });

        await Product.create({
            productName: 'GTA 5',
            category: 'xbox',
            stockQuantity: 110,
            description: 'Grand Theft Auto V takes place five years after Grand Theft Auto IV and is now set in Los Santos. It centers around three protagonists: Michael, Trevor, and Franklin. New to the series is that the player can switch between the three characters on the fly. They each have different missions, lives, and personalities. They also often come together, especially for heists, a complex type of mission where a large operation needs to be planned and executed by determining a strategy and hiring additional henchmen.',
            price: 60.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/458865-grand-theft-auto-v-xbox-360-front-cover.jpg'
        });

        await Product.create({
            productName: 'Splinter Cell Blacklist',
            category: 'xbox',
            stockQuantity: 150,
            description: 'Tom Clancys Splinter Cell: Blacklist is the 6th official installment in the Splinter Cell video game series. It is Ubisoft Torontos first released game, and the sequel to 2010s Splinter Cell: Conviction. It is the first Splinter Cell in which Michael Ironside is no longer the voice actor for Sam Fisher.',
            price: 90.00,
            imageUrl: 'https://www.mobygames.com/images/covers/l/569864-tom-clancy-s-splinter-cell-blacklist-xbox-360-front-cover.jpg'
        });

        await Product.create({
            productName: 'Trials Evolution',
            category: 'xbox',
            stockQuantity: 40,
            description: 'Trials Evolution is a 2.5D platform racing game and the successor to Trials HD. Players control a motorcycle rider while traversing over every increasingly difficult obstacles moving from left to right. New to this version is curved movement with swerves in additional to the regular movement. The game comes with the same editor the development team used to create the games content, and users can create their own track scenarios using it. User created tracks can be uploaded and shared with anyone on Xbox LIVE using the Track Central feature.',
            price: 40.00,
            imageUrl: 'https://images.pricerunner.com/product/600x600/1795546256/Trials-Evolution.jpg?c=0.7'
        });
        
        // END XBOX
        
        //End Real Seed Data

        await User.create({
            username: 'admin' , 
            password: "password",
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            address: faker.address
                .streetAddress()
                .concat(
                    " ",
                    faker.address.cityName(),
                    " ",
                    faker.address.state(),
                    " ",
                    faker.address.zipCode()
                ),
            phone: faker.phone.number(),
            isAdmin: true
        })
        await Cart.create({
            userId:1,
            productId:1,
            quantity:1,
            completed: false
        })
}

async function runSeed() {
    console.log("seeding...");
    try {
        seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    }
}

if (module === require.main) {
    runSeed();
}

module.exports = seed;
