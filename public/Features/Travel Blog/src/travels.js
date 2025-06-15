import DefaultImg from "./assets/Default.png";

import palitonImg from "./assets/travels/s_paliton.jpg";
import salagdoongImg from "./assets/travels/s_salagdoong.jpg";
import tulaposImg from "./assets/travels/s_tulapos.jpg";
import bucafeImg from "./assets/travels/s_bucafe.jpg";
import cantabonImg from "./assets/travels/s_cantabon.jpg";
import cambugahayImg from "./assets/travels/s_cambugahay.jpg";
import laziImg from "./assets/travels/s_lazi.jpg";

import sereneImg from "./assets/travels/o_serene1.jpg";
import sereneStepsImg from "./assets/travels/o_serene2.jpg";
import sereneRoomsImg from "./assets/travels/o_serene3.jpg";
import sereneLowerDeckImg from "./assets/travels/o_serene4.jpg";
import serenePoolImg from "./assets/travels/o_serene5.jpg";
import sereneMessHallImg from "./assets/travels/o_serene6.jpg";
import sereneBarImg from "./assets/travels/o_serene7.jpg";

import bantayanImg from "./assets/travels/b_beach.jpg";
import campSawiImg from "./assets/travels/b_camp.jpg";
import virginImg from "./assets/travels/b_virgin.jpg";

const travels = [
  {
    name: "Default",
    img: DefaultImg,
    tags: " -- ",
    description: " -- ",
    subcategory: [
      {
        1: ` Discover the magic of Siquijor—an island of white-sand beaches,
    waterfalls, and mystical charm. From serene sunsets to hidden wonders,
    its the perfect escape for adventure and relaxation. 🌴✨
    #SiquijorMagic #IslandEscape `,
        2: ` Swim with gentle whale sharks and explore stunning waterfalls in
        Oslob, Cebu. A perfect mix of adventure and nature’s beauty awaits in
        this coastal paradise. 🐋🌊 #OslobAdventure #CebuWonders `,
        3: ` Unwind in Bantayan Island, where powdery white sands, clear waters,
        and laid-back island vibes create the ultimate tropical escape.
        Perfect for beach lovers and peace seekers alike. 🏝️☀️ #BantayanIsland
        #TropicalGetaway `,
      },
    ],
  },
  {
    name: "Paliton Beach",
    img: palitonImg,
    tags: " Resort ",
    description:
      " Golden hour hits different at Paliton Beach | Powdery white sand, swaying palms, and a sunset that feels like magic.  ...View Gallery ",
  },
  {
    name: " Salagdoong Beach ",
    img: salagdoongImg,
    tags: " Resort ",
    description:
      " Crystal-clear waters, cliff dives, and tropical vibes – where adventure meets serenity ...View More ",
  },
  {
    name: "Tulapos Marine Sanctuary",
    img: tulaposImg,
    tags: " Snorkeling and Freediving ",
    description:
      " Take part and experience Diving and swimming across the Barracudas and other variety of protected species ...View Gallery ",
  },
  {
    name: "Bukid Cafe - Bucafe",
    img: bucafeImg,
    tags: " Food and Scenery ",
    description:
      " Sipping local brews with a view | Bukid Café in Siquijor serves up not just coffee, but calm — nestled in the hills with island vibes all around ...View Gallery ",
  },
  {
    name: " Cantabon Cave ",
    img: cantabonImg,
    tags: " Outdoor ",
    description:
      " Step into the heart of Siquijor Explore the raw beauty of Cantabon Cave — a hidden world of shimmering stalactites, underground streams, and adventure beneath the earth. Not all treasures are above ground ...View Gallery ",
  },
  {
    name: " Cambugahay Falls ",
    img: cambugahayImg,
    tags: " Falls ",
    description:
      " Nature’s hidden gem — where jungle vibes, cool waters, and rope swings create the perfect island adventure in Siquijor ...View Gallery ",
  },
  {
    name: " Lazi Church and Convent ",
    img: laziImg,
    tags: " Heritage Building ",
    description:
      " Stepping back in time at Lazi Church and Convent | A beautiful blend of faith, history, and Spanish-era architecture — one of Siquijor’s timeless treasures ...View Gallery ",
  },
  {
    name: "Serene Oasis",
    img: sereneImg,
    tags: " Resort ",
    description:
      "Escape to paradise at Serene Oasis Oslob Where turquoise waters, gentle waves, and tranquil vibes create the perfect backdrop for your dream getaway.",
  },
  {
    name: "Serene Oasis",
    img: sereneStepsImg,
    tags: " Steps ",
    description:
      "Every step is a view worth pausing for Take in the breathtaking beauty of Oslob from the iconic stairs of Serene Oasis.",
  },
  {
    name: "Serene Oasis",
    img: sereneRoomsImg,
    tags: " Room ",
    description:
      "Wake up to serenity Their thoughtfully designed rooms at Serene Oasis offer the perfect blend of comfort, style, and tropical charm.",
  },
  {
    name: "Serene Oasis",
    img: sereneLowerDeckImg,
    tags: " Glamping ",
    description:
      "Under the stars, lulled by the waves Experience magical nights on the lower deck at Serene Oasis — where cozy tent, sea breezes, and unforgettable seaside memories.",
  },
  {
    name: "Serene Oasis",
    img: serenePoolImg,
    tags: " Pool ",
    description:
      "Dive into fun for everyone! From splashes in the kiddie pool to laid-back swims in the main pool, Serene Oasis offers the perfect blend of relaxation and fun.",
  },
  {
    name: "Serene Oasis",
    img: sereneMessHallImg,
    tags: " Mess Hall ",
    description:
      "Good mornings start here! After a refreshing night swim, fuel up at Serene Oasis’ mess hall with their inclusive breakfast buffet.",
  },
  {
    name: "Serene Oasis",
    img: sereneBarImg,
    tags: " Bar ",
    description:
      "Sip, relax, and unwind at the Serene Oasis Bar 🍹🌅 Where every drink comes with a view and every moment feels like vacation.",
  },
  {
    name: "Bantayan",
    img: bantayanImg,
    tags: " Resort ",
    description:
      "Island days, endless escapades - From sunrise rides to secret spots and spontaneous swims, every moment in Bantayan is a memory in the making. Let the adventure begin! #BantayanEscapade #IslandWanderlust #TropicalFreedom",
  },
  {
    name: "Camp Sawi",
    img: campSawiImg,
    tags: " Mangrove Huts ",
    description:
      "From heartbreak to healing - Find peace, laughs, and new beginnings at Camp Sawi — where sunsets, sand, and self-love take center stage. Bantayan vibes never felt this freeing.",
  },
  {
    name: "Virgin Beach",
    img: virginImg,
    tags: " Underground Cove ",
    description:
      "Hidden beneath the surface, beauty awaits - Discover the secret charm of Virgin Beach’s underground cove —  cool stone walls, and mystery meet in a breathtaking coastal hideaway ( mind a capacity of atmost 4 people at a time ). #VirginBeachCove #BantayanSecrets #HiddenParadise",
  },
];

export default travels;
