import type { FoodSeed } from "./types";

/** Batch 3: values per 100 g from Indian Food Composition Tables 2017 (NIN, Hyderabad). */
export const foodsBatch3: FoodSeed[] = [
  {
    slug: "cow-milk",
    name: "Cow Milk (Whole)",
    hindiName: "गाय का दूध",
    category: "dairy",
    diet: "veg",
    basisLabel: "whole cow milk",
    kcal: 73,
    proteinG: 3.26,
    carbsG: 4.94,
    fatG: 4.48,
    fiberG: 0,
    calciumMg: 118,
    ironMg: 0.15,
    servings: [
      {
        label: "1 glass (≈200 ml)",
        grams: 200
      },
      {
        label: "1 cup (≈150 ml)",
        grams: 150
      },
      {
        label: "Milk in 1 cup of tea (≈50 ml)",
        grams: 50
      }
    ],
    source: "IFCT 2017",
    sourceRef: "L002",
    sourceName: "Milk, whole, Cow",
    sourceNote: "Values are per 100 g; 100 ml of milk weighs about 103 g, so per-ml figures are very slightly lower.",
    intro: "Whole cow milk gives protein, calcium and some fat in every glass. It has noticeably fewer calories than buffalo milk.",
    tips: [
      "Toned and double-toned milk have less fat and fewer calories than whole milk — check the pack.",
      "A glass of milk gives around 6–7 g of protein.",
      "Milk in 3–4 cups of tea a day adds up — count it if you're tracking calories."
    ],
    relatedSlugs: [
      "buffalo-milk",
      "paneer",
      "khoa",
      "boiled-egg"
    ],
    compareSlug: "buffalo-milk"
  },
  {
    slug: "buffalo-milk",
    name: "Buffalo Milk (Whole)",
    hindiName: "भैंस का दूध",
    category: "dairy",
    diet: "veg",
    basisLabel: "whole buffalo milk",
    kcal: 107,
    proteinG: 3.68,
    carbsG: 8.39,
    fatG: 6.58,
    fiberG: 0,
    calciumMg: 121,
    ironMg: 0.16,
    servings: [
      {
        label: "1 glass (≈200 ml)",
        grams: 200
      },
      {
        label: "1 cup (≈150 ml)",
        grams: 150
      },
      {
        label: "Milk in 1 cup of tea (≈50 ml)",
        grams: 50
      }
    ],
    source: "IFCT 2017",
    sourceRef: "L001",
    sourceName: "Milk, whole, Buffalo",
    sourceNote: "Values are per 100 g; 100 ml of milk weighs about 103 g, so per-ml figures are very slightly lower.",
    intro: "Buffalo milk is thicker and creamier than cow milk, with more fat and calories per glass. It's widely sold as full-cream milk in India.",
    tips: [
      "Switching from buffalo milk to toned milk saves roughly 90–100 kcal per glass.",
      "Its higher fat makes it the usual choice for paneer, ghee and khoa.",
      "If you're gaining weight on purpose, full-cream milk is an easy way to add calories."
    ],
    relatedSlugs: [
      "cow-milk",
      "paneer",
      "khoa",
      "ghee"
    ],
    compareSlug: "cow-milk"
  },
  {
    slug: "khoa",
    name: "Khoa (Mawa)",
    hindiName: "खोया / मावा",
    category: "dairy",
    diet: "veg",
    basisLabel: "khoa (reduced milk solids)",
    kcal: 316,
    proteinG: 16.34,
    carbsG: 16.53,
    fatG: 20.62,
    fiberG: 0,
    calciumMg: 602,
    ironMg: 2.32,
    servings: [
      {
        label: "1 tablespoon (≈15 g)",
        grams: 15
      },
      {
        label: "50 g",
        grams: 50
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "L004",
    sourceName: "Khoa",
    intro: "Khoa is milk slowly simmered until most of the water evaporates. It's the base of many Indian sweets, and it's dense in both fat and calories.",
    tips: [
      "Sweets made from khoa also contain added sugar and ghee, so they have more calories than khoa alone.",
      "A small piece of barfi or peda can be 100–150 kcal.",
      "Paneer gives similar protein with fewer calories if protein is the goal."
    ],
    relatedSlugs: [
      "paneer",
      "buffalo-milk",
      "ghee",
      "jaggery"
    ],
    compareSlug: "paneer"
  },
  {
    slug: "egg-white",
    name: "Egg White (Boiled)",
    hindiName: "अंडे की सफ़ेदी",
    category: "eggs",
    diet: "egg",
    basisLabel: "boiled egg white",
    kcal: 53,
    proteinG: 12.37,
    carbsG: 0,
    fatG: 0.26,
    fiberG: 0,
    calciumMg: 8.1,
    ironMg: 0.15,
    servings: [
      {
        label: "1 egg white (≈30 g)",
        grams: 30
      },
      {
        label: "3 egg whites (≈90 g)",
        grams: 90
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "M005",
    sourceName: "Egg, poultry, white, boiled",
    intro: "Egg white is almost pure protein with practically no fat. It's a common choice when you want to add protein with very few calories.",
    tips: [
      "Whole eggs aren't unhealthy — the yolk adds fat and calories but also most of the vitamins.",
      "A common mix is 1 whole egg plus 2–3 whites for a high-protein, lower-calorie omelette.",
      "Always eat egg whites cooked, not raw."
    ],
    relatedSlugs: [
      "boiled-egg",
      "omelette",
      "chicken-breast",
      "paneer"
    ],
    compareSlug: "boiled-egg"
  },
  {
    slug: "omelette",
    name: "Omelette",
    hindiName: "ऑमलेट",
    category: "eggs",
    diet: "egg",
    basisLabel: "plain egg omelette, as cooked",
    kcal: 170,
    proteinG: 16.53,
    carbsG: 0,
    fatG: 11.6,
    fiberG: 0,
    calciumMg: 53.3,
    ironMg: 2.16,
    servings: [
      {
        label: "2-egg omelette (≈110 g)",
        grams: 110
      },
      {
        label: "1-egg omelette (≈55 g)",
        grams: 55
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "M007",
    sourceName: "Egg, poultry, omlet",
    sourceNote: "IFCT 2017 analysed a plain egg omelette. Extra oil, butter, cheese or fillings will change the values.",
    intro: "An omelette is a quick, filling way to eat eggs. The cooking fat adds calories compared with a boiled egg, but it's still a high-protein breakfast.",
    tips: [
      "Use a non-stick pan and a teaspoon of oil to keep calories close to these values.",
      "Onion, tomato, capsicum and coriander add volume and flavour for very few calories.",
      "A slice of cheese adds roughly 60–100 kcal."
    ],
    relatedSlugs: [
      "boiled-egg",
      "egg-white",
      "paneer",
      "roti"
    ],
    compareSlug: "boiled-egg"
  },
  {
    slug: "chicken-thigh",
    name: "Chicken Thigh",
    hindiName: "चिकन थाई",
    category: "meat-fish",
    diet: "non-veg",
    basisLabel: "raw, skinless chicken thigh",
    kcal: 200,
    proteinG: 18.18,
    carbsG: 0,
    fatG: 14.23,
    fiberG: 0,
    calciumMg: 18.4,
    ironMg: 1.11,
    servings: [
      {
        label: "100 g raw",
        grams: 100
      },
      {
        label: "150 g raw",
        grams: 150
      },
      {
        label: "200 g raw",
        grams: 200
      }
    ],
    source: "IFCT 2017",
    sourceRef: "N002",
    sourceName: "Chicken, poultry, thigh, skinless",
    intro: "Skinless chicken thigh is juicier than breast and still a good protein source, with more fat and calories per 100 g.",
    tips: [
      "Values are for raw weight — chicken loses about a quarter of its weight when cooked.",
      "Leave the skin off to keep fat lower.",
      "Thighs suit curries and tandoori because they stay tender."
    ],
    relatedSlugs: [
      "chicken-breast",
      "mutton",
      "boiled-egg",
      "rohu"
    ],
    compareSlug: "chicken-breast"
  },
  {
    slug: "mutton",
    name: "Mutton (Goat Meat)",
    hindiName: "मटन",
    category: "meat-fish",
    diet: "non-veg",
    basisLabel: "raw goat meat (shoulder)",
    kcal: 188,
    proteinG: 20.33,
    carbsG: 0,
    fatG: 11.94,
    fiberG: 0,
    calciumMg: 6.2,
    ironMg: 1.48,
    servings: [
      {
        label: "100 g raw",
        grams: 100
      },
      {
        label: "150 g raw",
        grams: 150
      },
      {
        label: "200 g raw",
        grams: 200
      }
    ],
    source: "IFCT 2017",
    sourceRef: "O001",
    sourceName: "Goat, shoulder, meat",
    intro: "In India, mutton usually means goat meat. It's rich in protein and iron, with more fat than chicken breast.",
    tips: [
      "Values are for raw meat; curries add oil or ghee on top.",
      "Trim visible fat before cooking to cut calories.",
      "Fat varies by cut — shoulder (shown here) is moderate; ribs are fattier."
    ],
    relatedSlugs: [
      "chicken-thigh",
      "chicken-breast",
      "rohu",
      "prawns"
    ],
    compareSlug: "chicken-thigh"
  },
  {
    slug: "rohu",
    name: "Rohu Fish",
    hindiName: "रोहू मछली",
    category: "meat-fish",
    diet: "non-veg",
    basisLabel: "raw rohu fish",
    kcal: 102,
    proteinG: 19.71,
    carbsG: 0,
    fatG: 2.39,
    fiberG: 0,
    calciumMg: 39.4,
    ironMg: 1.04,
    servings: [
      {
        label: "1 piece (≈75 g raw)",
        grams: 75
      },
      {
        label: "100 g raw",
        grams: 100
      },
      {
        label: "150 g raw",
        grams: 150
      }
    ],
    source: "IFCT 2017",
    sourceRef: "S006",
    sourceName: "Rohu",
    intro: "Rohu is a freshwater fish popular in Bengal, Odisha, Bihar and the North-East. It's lean and high in protein.",
    tips: [
      "Values are for raw fish. Fried fish soaks up oil — steamed, grilled or curry versions stay leaner.",
      "Mustard-based curries are traditional; use a measured amount of oil.",
      "Fish curry with rice is a balanced, high-protein meal."
    ],
    relatedSlugs: [
      "prawns",
      "chicken-breast",
      "mutton",
      "boiled-egg"
    ],
    compareSlug: "chicken-breast"
  },
  {
    slug: "prawns",
    name: "Prawns",
    hindiName: "झींगा",
    category: "meat-fish",
    diet: "non-veg",
    basisLabel: "raw prawn meat (shelled)",
    kcal: 91,
    proteinG: 19.24,
    carbsG: 0,
    fatG: 0.52,
    fiberG: 0,
    calciumMg: 48.6,
    ironMg: 0.78,
    servings: [
      {
        label: "100 g raw (shelled)",
        grams: 100
      },
      {
        label: "150 g raw",
        grams: 150
      },
      {
        label: "50 g raw",
        grams: 50
      }
    ],
    source: "IFCT 2017",
    sourceRef: "S008",
    sourceName: "Prawns, big",
    intro: "Prawns are one of the leanest protein foods: nearly all of their calories come from protein, with very little fat.",
    tips: [
      "Values are for shelled raw prawns.",
      "Cook quickly — prawns turn rubbery when overcooked.",
      "Masala or butter-garlic prawns get most of their calories from the oil or butter."
    ],
    relatedSlugs: [
      "rohu",
      "chicken-breast",
      "egg-white",
      "mutton"
    ],
    compareSlug: "chicken-breast"
  },
  {
    slug: "soybean",
    name: "Soybean",
    hindiName: "सोयाबीन",
    category: "pulses",
    diet: "veg",
    basisLabel: "dry (uncooked) soybean",
    kcal: 377,
    proteinG: 37.8,
    carbsG: 10.16,
    fatG: 19.42,
    fiberG: 22.63,
    calciumMg: 195,
    ironMg: 8.22,
    servings: [
      {
        label: "1 katori cooked soybean (≈30 g dry)",
        grams: 30
      },
      {
        label: "50 g dry",
        grams: 50
      },
      {
        label: "100 g dry",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "B025",
    sourceName: "Soya bean, white",
    intro: "Whole soybean has the highest protein of any pulse — roughly double most dals — along with healthy fats and lots of fibre.",
    tips: [
      "Soya chunks are made from defatted soy flour, so they have more protein and less fat than whole soybean — check the pack label.",
      "Soak overnight and pressure-cook well; soybean takes longer than other dals.",
      "A katori of soybean curry gives about as much protein as two eggs."
    ],
    relatedSlugs: [
      "kala-chana",
      "rajma",
      "paneer",
      "moong-dal"
    ],
    compareSlug: "paneer"
  }
];
