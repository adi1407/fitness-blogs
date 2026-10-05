import type { FoodSeed } from "./types";

/** Batch 1: values per 100 g from Indian Food Composition Tables 2017 (NIN, Hyderabad). */
export const foodsBatch1: FoodSeed[] = [
  {
    slug: "paneer",
    name: "Paneer",
    hindiName: "पनीर",
    category: "dairy",
    diet: "veg",
    basisLabel: "fresh paneer",
    kcal: 258,
    proteinG: 18.86,
    carbsG: 12.41,
    fatG: 14.78,
    fiberG: 0,
    calciumMg: 476,
    ironMg: 0.9,
    servings: [
      {
        label: "50 g (about 4 cubes)",
        grams: 50
      },
      {
        label: "100 g",
        grams: 100
      },
      {
        label: "200 g pack",
        grams: 200
      }
    ],
    source: "IFCT 2017",
    sourceRef: "L003",
    sourceName: "Paneer",
    intro: "Paneer is one of the richest vegetarian protein sources in an Indian kitchen, with a good amount of calcium too. It is also fairly high in fat, so portion size decides whether it fits a fat-loss plan.",
    tips: [
      "Low-fat (toned milk) paneer has noticeably fewer calories than full-fat — check the pack label.",
      "Grill, air-fry or add to bhurji instead of deep-frying to keep the calories down.",
      "Pair with roti or rice and vegetables for a balanced, high-protein meal."
    ],
    relatedSlugs: [
      "moong-dal",
      "boiled-egg",
      "chicken-breast",
      "kala-chana"
    ],
    compareSlug: "boiled-egg"
  },
  {
    slug: "moong-dal",
    name: "Moong Dal",
    hindiName: "मूंग दाल",
    category: "pulses",
    diet: "veg",
    basisLabel: "dry (uncooked) dal",
    kcal: 326,
    proteinG: 23.88,
    carbsG: 52.59,
    fatG: 1.35,
    fiberG: 9.37,
    calciumMg: 43.1,
    ironMg: 3.93,
    servings: [
      {
        label: "1 katori cooked dal (≈30 g dry)",
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
    sourceRef: "B010",
    sourceName: "Green gram, dal",
    intro: "Split moong dal (yellow, skinless green gram) is light, quick to cook and easy to digest. It has one of the highest protein contents among everyday dals.",
    tips: [
      "Nutrition is listed for dry dal — cooking adds water, not calories. Weigh dal before cooking when tracking.",
      "Moong dal chilla or sprouts make an easy high-protein breakfast.",
      "Dal with rice or roti gives a more complete mix of amino acids."
    ],
    relatedSlugs: [
      "toor-dal",
      "masoor-dal",
      "chana-dal",
      "rajma"
    ],
    compareSlug: "masoor-dal"
  },
  {
    slug: "toor-dal",
    name: "Toor Dal (Arhar)",
    hindiName: "तूर दाल / अरहर",
    category: "pulses",
    diet: "veg",
    basisLabel: "dry (uncooked) dal",
    kcal: 331,
    proteinG: 21.7,
    carbsG: 55.23,
    fatG: 1.56,
    fiberG: 9.06,
    calciumMg: 71.7,
    ironMg: 3.9,
    servings: [
      {
        label: "1 katori cooked dal (≈30 g dry)",
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
    sourceRef: "B021",
    sourceName: "Red gram, dal",
    intro: "Toor dal, also called arhar or red gram, is the everyday dal in much of India — the base of sambar and dal tadka. It's a solid source of plant protein and fibre.",
    tips: [
      "Values are for dry dal. The tadka (ghee or oil) usually adds 40–120 kcal per katori.",
      "Use 1 teaspoon of ghee for tadka instead of a tablespoon to save about 80 kcal.",
      "Sambar adds vegetables and volume for very few extra calories."
    ],
    relatedSlugs: [
      "moong-dal",
      "masoor-dal",
      "chana-dal",
      "rajma"
    ],
    compareSlug: "moong-dal"
  },
  {
    slug: "masoor-dal",
    name: "Masoor Dal",
    hindiName: "मसूर दाल",
    category: "pulses",
    diet: "veg",
    basisLabel: "dry (uncooked) dal",
    kcal: 322,
    proteinG: 24.35,
    carbsG: 52.53,
    fatG: 0.75,
    fiberG: 10.43,
    calciumMg: 44.3,
    ironMg: 7.06,
    servings: [
      {
        label: "1 katori cooked dal (≈30 g dry)",
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
    sourceRef: "B013",
    sourceName: "Lentil dal",
    intro: "Masoor dal (split red lentils) cooks in minutes and is among the highest-protein dals, with good iron content as well.",
    tips: [
      "Values are for dry dal — weigh before cooking for accurate tracking.",
      "Add a squeeze of lemon or eat with vitamin C-rich vegetables to help iron absorption.",
      "Thicker dal means more dal per katori — and more protein and calories."
    ],
    relatedSlugs: [
      "moong-dal",
      "toor-dal",
      "chana-dal",
      "kala-chana"
    ],
    compareSlug: "moong-dal"
  },
  {
    slug: "chana-dal",
    name: "Chana Dal",
    hindiName: "चना दाल",
    category: "pulses",
    diet: "veg",
    basisLabel: "dry (uncooked) dal",
    kcal: 329,
    proteinG: 21.55,
    carbsG: 46.72,
    fatG: 5.31,
    fiberG: 15.15,
    calciumMg: 46.3,
    ironMg: 6.08,
    servings: [
      {
        label: "1 katori cooked dal (≈30 g dry)",
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
    sourceRef: "B001",
    sourceName: "Bengal gram, dal",
    intro: "Chana dal (split Bengal gram) is nutty, filling and very high in fibre. It's also the base of besan (gram flour).",
    tips: [
      "Its high fibre makes chana dal very filling for the calories.",
      "Soak for 1–2 hours to cut cooking time.",
      "Besan chilla is a quick way to use the same legume at breakfast."
    ],
    relatedSlugs: [
      "moong-dal",
      "toor-dal",
      "kala-chana",
      "rajma"
    ],
    compareSlug: "toor-dal"
  },
  {
    slug: "rajma",
    name: "Rajma (Red Kidney Beans)",
    hindiName: "राजमा",
    category: "pulses",
    diet: "veg",
    basisLabel: "dry (uncooked) beans",
    kcal: 299,
    proteinG: 19.91,
    carbsG: 48.61,
    fatG: 1.77,
    fiberG: 16.57,
    calciumMg: 126,
    ironMg: 6.13,
    servings: [
      {
        label: "1 katori cooked rajma (≈40 g dry)",
        grams: 40
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
    sourceRef: "B020",
    sourceName: "Rajmah, red",
    intro: "Rajma is a favourite North Indian comfort food and a good source of protein and fibre. Rajma-chawal is a complete, filling meal.",
    tips: [
      "Always soak and cook rajma thoroughly — undercooked kidney beans can cause stomach upset.",
      "Values are for dry beans; the gravy's oil adds calories on top.",
      "A katori of rajma with a katori of rice is a balanced plate for most people."
    ],
    relatedSlugs: [
      "kala-chana",
      "chana-dal",
      "moong-dal",
      "toor-dal"
    ],
    compareSlug: "kala-chana"
  },
  {
    slug: "kala-chana",
    name: "Kala Chana (Black Chickpeas)",
    hindiName: "काला चना",
    category: "pulses",
    diet: "veg",
    basisLabel: "dry (uncooked) chana",
    kcal: 287,
    proteinG: 18.77,
    carbsG: 39.56,
    fatG: 5.11,
    fiberG: 25.22,
    calciumMg: 150,
    ironMg: 6.78,
    servings: [
      {
        label: "1 katori cooked chana (≈40 g dry)",
        grams: 40
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
    sourceRef: "B002",
    sourceName: "Bengal gram, whole",
    intro: "Kala chana is one of the most fibre-rich foods in Indian cooking, with a good amount of plant protein. It works as a curry, chaat or boiled snack.",
    tips: [
      "Boiled chana chaat with onion, tomato and lemon is a filling, low-oil snack.",
      "Soak overnight and pressure-cook for the best texture.",
      "Its fibre keeps you full — useful when you're in a calorie deficit."
    ],
    relatedSlugs: [
      "rajma",
      "chana-dal",
      "moong-dal",
      "paneer"
    ],
    compareSlug: "rajma"
  },
  {
    slug: "boiled-egg",
    name: "Boiled Egg",
    hindiName: "उबला अंडा",
    category: "eggs",
    diet: "egg",
    basisLabel: "whole boiled egg, without shell",
    kcal: 148,
    proteinG: 13.43,
    carbsG: 0,
    fatG: 10.54,
    fiberG: 0,
    calciumMg: 55.1,
    ironMg: 1.87,
    servings: [
      {
        label: "1 egg (≈45 g without shell)",
        grams: 45
      },
      {
        label: "2 eggs (≈90 g)",
        grams: 90
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "M004",
    sourceName: "Egg, poultry, whole, boiled",
    intro: "Eggs are an affordable, complete protein that's easy to cook and carry. A boiled egg adds no extra oil, so the calories are just the egg.",
    tips: [
      "Most of the protein is in the white; the yolk carries the fat and most vitamins.",
      "Two boiled eggs make a quick 12 g protein snack.",
      "Pair with roti or bread and vegetables for a balanced breakfast."
    ],
    relatedSlugs: [
      "chicken-breast",
      "paneer",
      "moong-dal",
      "kala-chana"
    ],
    compareSlug: "paneer"
  },
  {
    slug: "chicken-breast",
    name: "Chicken Breast",
    hindiName: "चिकन ब्रेस्ट",
    category: "meat-fish",
    diet: "non-veg",
    basisLabel: "raw, skinless chicken breast",
    kcal: 168,
    proteinG: 21.81,
    carbsG: 0,
    fatG: 9,
    fiberG: 0,
    calciumMg: 12.9,
    ironMg: 0.83,
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
    sourceRef: "N003",
    sourceName: "Chicken, poultry, breast, skinless",
    intro: "Skinless chicken breast is one of the leanest, highest-protein foods you can buy, which makes it a staple for muscle building and fat loss.",
    tips: [
      "Values are for raw weight — chicken loses about a quarter of its weight in water when cooked.",
      "Tandoori, grilled or curry with little oil keeps it lean; butter chicken does not.",
      "100 g raw breast gives roughly 22 g of protein."
    ],
    relatedSlugs: [
      "boiled-egg",
      "paneer",
      "moong-dal",
      "kala-chana"
    ],
    compareSlug: "paneer"
  },
  {
    slug: "roti",
    name: "Roti (Chapati)",
    hindiName: "रोटी / चपाती",
    category: "cereals",
    diet: "veg",
    basisLabel: "whole wheat flour (atta)",
    kcal: 320,
    proteinG: 10.57,
    carbsG: 64.17,
    fatG: 1.53,
    fiberG: 11.36,
    calciumMg: 30.9,
    ironMg: 4.1,
    servings: [
      {
        label: "1 medium roti (30 g atta)",
        grams: 30
      },
      {
        label: "1 small phulka (20 g atta)",
        grams: 20
      },
      {
        label: "1 large roti (40 g atta)",
        grams: 40
      },
      {
        label: "100 g atta",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A019",
    sourceName: "Wheat flour, atta",
    sourceNote: "Values are for whole wheat flour (atta). A roti's calories come from the atta used to make it — cooking only removes some water.",
    intro: "Roti made from whole wheat atta is the everyday bread of North India. A plain medium roti is modest in calories; ghee or butter on top is what adds up.",
    tips: [
      "A teaspoon of ghee on a roti adds about 45 kcal.",
      "Count rotis by size — a large roti can have twice the atta of a small phulka.",
      "Mixing atta with besan or ragi adds protein or fibre without changing the routine."
    ],
    relatedSlugs: [
      "moong-dal",
      "paneer",
      "toor-dal",
      "rajma"
    ]
  }
];
