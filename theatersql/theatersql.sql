-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2019 年 09 月 01 日 11:48
-- 伺服器版本: 10.1.37-MariaDB
-- PHP 版本： 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `theatersql`
--

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `realname` varchar(32) NOT NULL,
  `uname` varchar(32) NOT NULL,
  `upwd` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `phone` int(11) NOT NULL,
  `gender` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`id`, `realname`, `uname`, `upwd`, `email`, `phone`, `gender`) VALUES
(1, 'leolin', 'zxc123456', 'ga2006300472', 'bjmw83@gmail.com', 935685456, 1),
(2, '小林', 'test12345', 'ga2006300472', 'bjmwg86@gmail.com', 956321456, 0),
(3, '上恩', 'bjmqfgadasd', 'ga2006300472', 'bjmegrt83@gmail.com', 965321456, 1),
(4, 'leo', 'zxc12345', 'zxc123456', 'bjm586@gmail.com', 956153241, 0);

-- --------------------------------------------------------

--
-- 資料表結構 `movieinfo`
--

CREATE TABLE `movieinfo` (
  `id` int(11) NOT NULL,
  `mname` varchar(128) NOT NULL,
  `mtype` varchar(64) NOT NULL,
  `mcover` varchar(128) NOT NULL,
  `mdirector` varchar(64) NOT NULL,
  `mactor` varchar(128) NOT NULL,
  `mdescription` varchar(512) NOT NULL,
  `mprice` float(6,2) DEFAULT NULL,
  `mopen` tinyint(1) NOT NULL,
  `mcategory` varchar(32) NOT NULL,
  `mlightbox` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `movieinfo`
--

INSERT INTO `movieinfo` (`id`, `mname`, `mtype`, `mcover`, `mdirector`, `mactor`, `mdescription`, `mprice`, `mopen`, `mcategory`, `mlightbox`) VALUES
(1, '在黑暗中說的鬼故事', '懸疑、驚悚、恐怖', '/scarystories/scarystories1.jpg', '安德烈奧多', '麥可加爾薩、柔伊瑪格麗特科萊蒂、奧斯汀亞伯姆、傑維爾伯特、馬克史塔格', '在美國米爾谷小鎮郊外的陰森豪宅內，莎拉將她受盡折磨的人生寫成了一本恐怖故事書。多年後，史黛拉(柔伊瑪格麗特科萊蒂飾)跟她的朋友們來到這棟傳說中的廢棄鬼宅探險，史黛拉發現了故事書並帶回家閱讀，書裡出現了「稻草人哈洛」、「蒼白女」等等各種傳說中的恐怖鬼怪。在她看完第一則故事的隔日，她的朋友湯米(奧斯汀亞伯姆飾)竟離奇失蹤，而史黛拉意外發現恐怖故事的主角也叫湯米！一篇篇驚悚駭人的鬼故事開始逐漸成真…', 200.00, 1, 'recently', 'theaterwebsite/src/assets/img/scarystories'),
(2, '多拉A夢月球探測器', '動畫、冒險', '/doraemon/doraemon1.jpg', '八鍬新之介', '水田山葵、大原惠、嘉數由美、關智一、廣瀨愛麗絲、柳樂優彌、吉田鋼太郎', '「月球探測器」在月亮上捕捉到了白色影子，這則新聞引起熱議，大雄說那是月球上的兔子，結果被大家嘲笑。因此，大雄便用了哆啦A夢的祕密道具「異說俱樂部徽章」，在月球背面做建立了月兔王國。\r\n有一天，不可思議的少年「琉華」轉學到大雄班上，還和大雄一行人一起到月兔王國玩，沒想到卻遭遇到 意料之外的危機……「琉華」究竟來自何處？而隱藏在月亮背後的真相又是？！', 180.00, 1, 'recently', 'theaterwebsite/src/assets/img/doraemon'),
(3, '朵拉與失落的黃金城', '冒險', '/dora/dora1.jpg', '詹姆斯波賓', '伊莎貝拉莫娜、班尼西歐迪特洛、麥可潘納、丹尼特瑞歐、伊娃朗格莉雅', '她一生中大部分時間都在和父母一起探索叢林，卻沒有什麼能讓朵拉（伊莎貝拉莫娜 飾）為她最危險的冒險 - 高中生活做準備。 身為探險家，朵拉將帶領著布茲（她最好的朋友，一隻猴子），迪亞哥（傑佛瑞華伯格 飾），一個神秘的叢林居民（歐亨尼奧德伯茲 飾），還有一群青少年共同參與一場真人實景的冒險旅程。拯救她父母親（麥可潘納和伊娃朗格莉亞 飾）的同時，還要解開失落的黃金城的謎團。', 200.00, 1, 'recently', 'theaterwebsite/src/assets/img/dora'),
(4, '玩具總動員4', '動畫、冒險', '/toystory/toystory1.jpg', '喬許科雷', '湯姆漢克、基努李維、喬登皮爾、克莉絲汀娜漢卓克斯、派翠西亞艾奎特、提摩西達頓、安東尼薩德勒、瓊安庫薩克', '故事發生在安弟離家展開大學生涯，玩具們輾轉來到愛惜玩具的小女孩邦妮家中。某天，邦妮帶來了一個手作新成員「叉奇」加入玩具們，本身為拋棄式餐具的叉奇認為自己不是玩具，而是垃圾，因而引發了不少混亂。在一場冒險旅程之後，胡迪警長與老友牧羊女重逢，發現外面玩具們的世界，遠比他想像的還要巨大……', 250.00, 1, 'classic', 'theaterwebsite/src/assets/img/toystory'),
(5, '從前有個好萊塢', '喜劇、劇情', '/hollywood/hollywood1.jpg', '昆汀塔倫提諾', '李奧納多狄卡皮歐、布萊德彼特、瑪格羅比、提摩西奧利芬、達珂塔芬妮、艾爾帕西諾、提姆羅斯、艾米爾賀許、達米安路易斯、戴蒙賀里曼、寇特羅素、瑪格麗特庫利、詹姆斯馬斯登', '大導昆汀塔倫提諾的最新強片《從前，有個好萊塢...》，故事在1969年瞬息萬變的洛杉磯展開，電視明星瑞克達爾頓（李奧納多狄卡皮歐 飾演）與他長期合作替身搭檔克里夫布茲（布萊德彼特 飾演）如何在逐漸陌生的娛樂圈裡，找到自己的一席之地。昆汀塔倫提諾第九部編劇導演電影，匯集星光閃閃的卡司與交錯的情節，紀念好萊塢不再復返的黃金年代。', 150.00, 1, 'recommend', 'theaterwebsite/src/assets/img/hollywood'),
(6, '復仇者聯盟:終局之戰', '冒險、動作', '/avenger/avenger1.jpg', '安東尼魯索、喬羅素', '布萊德利庫柏、布麗拉森、克里斯漢斯沃、克里斯伊凡、史嘉莉喬韓森、伊凡潔琳莉莉、凱倫吉蘭、喬許布洛林、保羅路德、小勞勃道尼、查維克博斯曼、湯姆霍蘭德、蜜雪兒菲佛、伊莉莎白奧爾森、賽巴斯汀史坦奇威茲、戴夫巴蒂斯塔、蒂妲絲雲頓、傑瑞米雷納、強法洛、葛妮絲派特羅、', '灰飛煙毀後的世界該如何走下去，是否還有逆轉結局的機會？一切都將在此揭曉。', 300.00, 1, 'recommend', 'theaterwebsite/src/assets/img/avenger'),
(7, '普羅米亞', '動畫', '/promare/promare1.jpg', '今石洋之', '松山研一、佐倉綾音、早乙女太一、檜山修之、小西克幸、堺雅人', '因突變而產生能操控火焰的人種「燃燒者」，讓半個世界被大火燒成焦土，陷入前所未見的慘況，在那之後過了30年，當中一群激進份子「瘋狂燃燒者」再次對世界發動攻擊，為了鎮壓「瘋狂燃燒者」引發的火災，普羅米波利斯自治共和國司政官古雷，組織了針對「燃燒者」而設置的高機動救命消防隊「烈焰救火隊」。\r\n效命於「烈焰救火隊」，並擁有滅火之魂的消防隊新人加洛，碰上了被通緝中的縱火恐怖份子、也是「瘋狂燃燒者」首領里歐，兩人發生了激烈的衝突，當兩個熾熱靈魂彼此衝撞，這場對決將迎向什麼結局？', 200.00, 0, 'recently', 'theaterwebsite/src/assets/img/promare'),
(8, '電流大戰', '歷史、傳記、劇情', '/currentwar/currentwar1.jpg', '艾方索戈梅茲雷瓊', '班尼迪克康柏拜區、麥可夏儂、尼可拉斯霍特、湯姆霍蘭德、凱薩琳沃特斯頓', '掌握電的人，就掌握了未來！19世紀，湯瑪斯愛迪生（班尼狄克康柏拜區 飾）點亮電燈，驚艷世界，並認為直流電才是最合適的供電系統，受雇於他的特斯拉（尼可拉斯霍特 飾）設計了交流電力系統，二人各執一方，特斯拉憤而投入喬治威斯汀豪斯（麥可夏儂 飾）創辦的西屋電氣公司。愛迪生和威斯汀豪斯各自擁護直流電和交流電，供電市場的巨大利益衝突、勾心鬥角的商業算計，這場激烈的電流爭霸戰注定改變世界，究竟誰才能實現心目中的光電帝國呢？', 300.00, 1, 'classic', 'theaterwebsite/src/assets/img/currentwar'),
(9, '蜘蛛人離家日', '動作', '/spiderman/spider1.jpg', '瓊華茲', '湯姆霍蘭德、千黛亞、傑克葛倫霍、蔻碧史莫德、山繆傑克森、梅莉莎托梅、強法洛', '蜘蛛人彼得帕克在經歷一連串的激烈事件後，決定暫時卸下自己「鄰家英雄」的身分，跟好友來趟歐洲之旅享受高中生活。然而在彼得遇見神盾局局長尼克福瑞，且答應協助他調查幾宗橫跨城市、造成重大死傷的神祕怪物攻擊事件後，原本美好的旅遊計畫在一夕間全都變了樣? 【關於電影】 索尼影業於2017年上映的《蜘蛛人：離家日》不僅是蜘蛛人回歸漫威宇宙的首部作品，打破多項紀錄創造票房佳績，由湯姆霍蘭德詮釋的全新彼得帕克更獲譽為「影史最棒蜘蛛人」，象徵漫威最受歡迎角色的成功回歸！而最新續作《蜘蛛人：離家日》除原班人馬外，更將有《復仇者聯盟》系列的山繆傑克森與《斷背山》傑克葛倫霍等明星卡司加入陣容，延續這股叫好叫座的聲勢，將於今年7月3日強勢登場！', 250.00, 1, 'recommend', 'theaterwebsite/src/assets/img/spiderman'),
(10, '憤怒鳥二', '動畫', '/angrybird/angrybird1.jpg', '索普范奧爾曼、約翰萊斯', '彼得汀克萊傑、比爾哈德爾、傑森蘇戴西斯、喬許蓋德、李利萊爾豪艾里', '改編自經典遊戲的《憤怒鳥玩電影》於2016年上映後即在全球掀起狂熱，不僅奪下包含美國等超過50國的開片冠軍，累積超過百億台幣的票房佳績，成為影史上改編自電玩的電影票房第二名。延續這波叫好叫座的好評，最新電影《憤怒鳥玩電影2》將於今年暑假再次躍上大銀幕！這一次，這群憤怒又討喜的鳥兒們將帶來更瘋狂、更失控的精彩內容！', 150.00, 1, 'recommend', 'theaterwebsite/src/assets/img/angrybird'),
(11, '驅魔使者', '奇幻/科幻、動作、懸疑、驚悚', '/divinefury/divinefury1.jpg', '金柱煥', '朴敘俊, 安聖基', '失去父親後內心帶著傷痛的MMA格鬥冠軍選手龍厚（朴敘俊 飾），偶然邂逅了驅魔祭司「安神父」（安聖基 飾），他們將攜手對抗讓世界沉淪的強大黑暗勢力……', 180.00, 0, 'recently', 'theaterwebsite/src/assets/img/divinefury'),
(12, '靈異乍現', '懸疑、驚悚、恐怖', '/brightburn/brightburn1.jpg', '大衛亞羅維斯基', '伊莉莎白班克斯、大衛丹曼', '如果來自另個星球的孩子墜毀在地球上，不是成為人類的超級英雄，是否將成為比邪惡更令人畏懼的東西?《靈異乍現》由《星際異攻隊》億萬導演詹姆斯岡恩與靈魂團隊製作，帶來前所未見的內容，重新定義驚悚！', 150.00, 1, 'classic', 'theaterwebsite/src/assets/img/brightburn'),
(13, '玩命關頭特別行動', '冒險、動作、劇情', '/fastandfurious/fastandfurious1.jpg', '大衛雷奇', '巨石強森、傑森史塔森、凡妮莎柯比、伊卓瑞斯艾巴、艾迪馬森', '巨石強森以及傑森史塔森領銜主演的《玩命關頭：特別行動》，他們在這部全新動作片中再度飾演他們各別的角色路克哈柏和戴克蕭', 150.00, 1, 'recommend', 'theaterwebsite/src/assets/img/fastandfurious');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uname` (`uname`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- 資料表索引 `movieinfo`
--
ALTER TABLE `movieinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mname` (`mname`),
  ADD UNIQUE KEY `mcover` (`mcover`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用資料表 AUTO_INCREMENT `movieinfo`
--
ALTER TABLE `movieinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
