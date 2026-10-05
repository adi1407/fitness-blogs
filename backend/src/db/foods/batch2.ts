import type { FoodSeed } from "./types";

/** Batch 2: values per 100 g from Indian Food Composition Tables 2017 (NIN, Hyderabad). */
export const foodsBatch2: FoodSeed[] = [
  {
    slug: "rice",
    name: "White Rice",
    hindiName: "चावल",
    category: "cereals",
    diet: "veg",
    basisLabel: "raw milled rice",
    kcal: 356,
    proteinG: 7.94,
    carbsG: 78.24,
    fatG: 0.52,
    fiberG: 2.81,
    calciumMg: 7.5,
    ironMg: 0.65,
    servings: [
      {
        label: "1 katori cooked rice (≈50 g raw)",
        grams: 50
      },
      {
        label: "1 plate cooked rice (≈100 g raw)",
        grams: 100
      },
      {
        label: "30 g raw (small portion)",
        grams: 30
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A015",
    sourceName: "Rice, raw, milled",
    intro: "White rice is the staple grain for most of India. It is low in fat and protein and mostly carbohydrate, so the portion size is what decides its calories.",
    tips: [
      "Values are for raw rice. Cooking roughly triples the weight, so 50 g raw makes about 150 g (one katori) cooked.",
      "Measure rice with the same katori every day — it's the easiest way to keep portions steady.",
      "Fill half the plate with dal and sabzi before adding rice to make the meal more filling."
    ],
    relatedSlugs: [
      "brown-rice",
      "roti",
      "poha",
      "moong-dal"
    ],
    compareSlug: "brown-rice"
  },
  {
    slug: "brown-rice",
    name: "Brown Rice",
    hindiName: "ब्राउन राइस",
    category: "cereals",
    diet: "veg",
    basisLabel: "raw brown rice",
    kcal: 354,
    proteinG: 9.16,
    carbsG: 74.8,
    fatG: 1.24,
    fiberG: 4.43,
    calciumMg: 10.9,
    ironMg: 1.02,
    servings: [
      {
        label: "1 katori cooked rice (≈50 g raw)",
        grams: 50
      },
      {
        label: "1 plate cooked rice (≈100 g raw)",
        grams: 100
      },
      {
        label: "30 g raw (small portion)",
        grams: 30
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A013",
    sourceName: "Rice, raw, brown",
    intro: "Brown rice keeps the bran layer that is polished off white rice. Calories are almost the same, but it has more fibre and a little more protein.",
    tips: [
      "Brown rice has about the same calories as white rice — the benefit is the extra fibre, not fewer calories.",
      "Soak for 30–60 minutes before cooking for a softer texture.",
      "Mixing half white and half brown rice is an easy way to start."
    ],
    relatedSlugs: [
      "rice",
      "quinoa",
      "dalia",
      "roti"
    ],
    compareSlug: "rice"
  },
  {
    slug: "poha",
    name: "Poha (Flattened Rice)",
    hindiName: "पोहा",
    category: "cereals",
    diet: "veg",
    basisLabel: "dry poha (rice flakes)",
    kcal: 354,
    proteinG: 7.44,
    carbsG: 76.75,
    fatG: 1.14,
    fiberG: 3.46,
    calciumMg: 9.2,
    ironMg: 4.46,
    servings: [
      {
        label: "1 plate (≈50 g dry poha)",
        grams: 50
      },
      {
        label: "1 katori (≈30 g dry poha)",
        grams: 30
      },
      {
        label: "100 g dry",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A011",
    sourceName: "Rice flakes",
    intro: "Poha is a light, quick breakfast made from flattened rice. On its own it's mostly carbohydrate, so what you add to it shapes the meal.",
    tips: [
      "Values are for dry poha, before oil, peanuts and other additions.",
      "A tablespoon (≈10 g) of peanuts adds about 50 kcal; a teaspoon of oil adds about 45 kcal.",
      "Add peas, vegetables and a side of curd or sprouts to raise protein and fibre."
    ],
    relatedSlugs: [
      "rice",
      "suji",
      "murmura",
      "green-peas"
    ],
    compareSlug: "suji"
  },
  {
    slug: "ragi",
    name: "Ragi (Finger Millet)",
    hindiName: "रागी / नाचनी",
    category: "cereals",
    diet: "veg",
    basisLabel: "whole ragi grain or flour",
    kcal: 321,
    proteinG: 7.16,
    carbsG: 66.82,
    fatG: 1.92,
    fiberG: 11.18,
    calciumMg: 364,
    ironMg: 4.62,
    servings: [
      {
        label: "1 roti (≈30 g ragi flour)",
        grams: 30
      },
      {
        label: "1 bowl ragi porridge (≈25 g flour)",
        grams: 25
      },
      {
        label: "100 g flour",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A010",
    sourceName: "Ragi",
    sourceNote: "IFCT 2017 analyses the whole grain. Flour (atta) milled from the whole grain has practically the same values per 100 g.",
    intro: "Ragi is a millet widely eaten in South India as mudde, roti, dosa or porridge. It is one of the richest grain sources of calcium and is high in fibre.",
    tips: [
      "Ragi is naturally gluten-free.",
      "Its fibre makes ragi roti or porridge more filling than the same calories of white rice.",
      "Mix ragi flour into wheat atta for rotis to add fibre and calcium."
    ],
    relatedSlugs: [
      "jowar",
      "bajra",
      "roti",
      "dalia"
    ],
    compareSlug: "jowar"
  },
  {
    slug: "jowar",
    name: "Jowar (Sorghum)",
    hindiName: "ज्वार",
    category: "cereals",
    diet: "veg",
    basisLabel: "whole jowar grain or flour",
    kcal: 334,
    proteinG: 9.97,
    carbsG: 67.68,
    fatG: 1.73,
    fiberG: 10.22,
    calciumMg: 27.6,
    ironMg: 3.95,
    servings: [
      {
        label: "1 roti / bhakri (≈40 g jowar flour)",
        grams: 40
      },
      {
        label: "1 small roti (≈25 g flour)",
        grams: 25
      },
      {
        label: "100 g flour",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A005",
    sourceName: "Jowar",
    sourceNote: "IFCT 2017 analyses the whole grain. Flour (atta) milled from the whole grain has practically the same values per 100 g.",
    intro: "Jowar is a staple millet in Maharashtra, Karnataka and Gujarat, most often eaten as bhakri. It has similar calories and fibre to wheat atta, without the gluten.",
    tips: [
      "Jowar is naturally gluten-free.",
      "Jowar bhakri tends to be larger and thicker than a wheat roti — weigh the flour once to learn your portion.",
      "Pair with dal, curd or a paneer sabzi to add protein."
    ],
    relatedSlugs: [
      "bajra",
      "ragi",
      "roti",
      "moong-dal"
    ],
    compareSlug: "roti"
  },
  {
    slug: "bajra",
    name: "Bajra (Pearl Millet)",
    hindiName: "बाजरा",
    category: "cereals",
    diet: "veg",
    basisLabel: "whole bajra grain or flour",
    kcal: 348,
    proteinG: 10.96,
    carbsG: 61.78,
    fatG: 5.43,
    fiberG: 11.49,
    calciumMg: 27.4,
    ironMg: 6.42,
    servings: [
      {
        label: "1 roti (≈40 g bajra flour)",
        grams: 40
      },
      {
        label: "1 small roti (≈25 g flour)",
        grams: 25
      },
      {
        label: "100 g flour",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A003",
    sourceName: "Bajra",
    sourceNote: "IFCT 2017 analyses the whole grain. Flour (atta) milled from the whole grain has practically the same values per 100 g.",
    intro: "Bajra is a hardy millet eaten across Rajasthan, Gujarat and Haryana, especially in winter. It's high in fibre and has more fat than most grains.",
    tips: [
      "Bajra is naturally gluten-free.",
      "White butter or ghee on bajra roti is traditional — each teaspoon adds about 45 kcal.",
      "Bajra khichdi with moong dal makes a filling one-pot meal."
    ],
    relatedSlugs: [
      "jowar",
      "ragi",
      "roti",
      "moong-dal"
    ],
    compareSlug: "jowar"
  },
  {
    slug: "suji",
    name: "Suji (Semolina / Rava)",
    hindiName: "सूजी / रवा",
    category: "cereals",
    diet: "veg",
    basisLabel: "dry suji (wheat semolina)",
    kcal: 334,
    proteinG: 11.38,
    carbsG: 68.43,
    fatG: 0.74,
    fiberG: 9.72,
    calciumMg: 29.4,
    ironMg: 2.98,
    servings: [
      {
        label: "1 plate (≈40 g dry suji)",
        grams: 40
      },
      {
        label: "1 tablespoon (≈10 g)",
        grams: 10
      },
      {
        label: "100 g dry",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A022",
    sourceName: "Wheat, semolina",
    intro: "Suji (rava) is coarsely milled wheat used for upma, idli, dosa and halwa. On its own it's moderate in calories — the ghee, oil and sugar in recipes make the difference.",
    tips: [
      "Upma with plenty of vegetables is far lighter than suji halwa made with ghee and sugar.",
      "Suji is made from wheat, so it contains gluten.",
      "Add peas, vegetables or a side of curd to make upma more filling."
    ],
    relatedSlugs: [
      "poha",
      "dalia",
      "roti",
      "green-peas"
    ],
    compareSlug: "poha"
  },
  {
    slug: "dalia",
    name: "Dalia (Broken Wheat)",
    hindiName: "दलिया",
    category: "cereals",
    diet: "veg",
    basisLabel: "dry broken / cracked wheat",
    kcal: 342,
    proteinG: 10.84,
    carbsG: 69.06,
    fatG: 1.45,
    fiberG: 8.81,
    calciumMg: 27.1,
    ironMg: 3.86,
    servings: [
      {
        label: "1 bowl (≈40 g dry dalia)",
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
    sourceRef: "A021",
    sourceName: "Wheat, bulgur",
    sourceNote: "IFCT 2017 lists this as bulgur wheat (cracked wheat), the closest match to dalia in the tables.",
    intro: "Dalia is cracked whole wheat cooked as a savoury khichdi or a sweet porridge. It keeps more of the wheat's fibre than refined flour.",
    tips: [
      "Savoury vegetable dalia with moong dal makes a filling, high-fibre meal.",
      "For sweet dalia, use milk and fruit for sweetness instead of lots of sugar.",
      "Dalia is wheat, so it contains gluten."
    ],
    relatedSlugs: [
      "suji",
      "ragi",
      "brown-rice",
      "moong-dal"
    ],
    compareSlug: "suji"
  },
  {
    slug: "quinoa",
    name: "Quinoa",
    hindiName: "क्विनोआ",
    category: "cereals",
    diet: "veg",
    basisLabel: "dry (uncooked) quinoa",
    kcal: 328,
    proteinG: 13.11,
    carbsG: 53.65,
    fatG: 5.5,
    fiberG: 14.66,
    calciumMg: 198,
    ironMg: 7.51,
    servings: [
      {
        label: "1 katori cooked quinoa (≈45 g dry)",
        grams: 45
      },
      {
        label: "30 g dry",
        grams: 30
      },
      {
        label: "100 g dry",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A009",
    sourceName: "Quinoa",
    intro: "Quinoa is a seed cooked like a grain. It has more protein and fibre than rice, and is often used in place of rice or in upma and salads.",
    tips: [
      "Rinse quinoa well before cooking to remove its bitter coating.",
      "It has more protein than rice, but still far less than dal, paneer or eggs — don't rely on it alone for protein.",
      "Quinoa is naturally gluten-free."
    ],
    relatedSlugs: [
      "brown-rice",
      "rice",
      "dalia",
      "moong-dal"
    ],
    compareSlug: "brown-rice"
  },
  {
    slug: "murmura",
    name: "Murmura (Puffed Rice)",
    hindiName: "मुरमुरा",
    category: "cereals",
    diet: "veg",
    basisLabel: "puffed rice",
    kcal: 362,
    proteinG: 7.47,
    carbsG: 77.68,
    fatG: 1.62,
    fiberG: 2.56,
    calciumMg: 15.1,
    ironMg: 4.55,
    servings: [
      {
        label: "1 cup (≈15 g)",
        grams: 15
      },
      {
        label: "1 bowl bhel (≈30 g murmura)",
        grams: 30
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "A012",
    sourceName: "Rice puffed",
    intro: "Murmura is very light and airy, so a big bowl weighs little. That makes it a popular snack base for bhel and chivda.",
    tips: [
      "By weight it has the same calories as rice — it just takes up much more space.",
      "Bhel with onion, tomato, sprouts and chutney is a light snack; sev and fried chivda add a lot more.",
      "Add roasted chana or peanuts for some protein."
    ],
    relatedSlugs: [
      "poha",
      "rice",
      "peanuts",
      "kala-chana"
    ],
    compareSlug: "poha"
  }
];
