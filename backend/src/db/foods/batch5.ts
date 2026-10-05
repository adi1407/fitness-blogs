import type { FoodSeed } from "./types";

/** Batch 5: values per 100 g from Indian Food Composition Tables 2017 (NIN, Hyderabad). */
export const foodsBatch5: FoodSeed[] = [
  {
    slug: "potato",
    name: "Potato",
    hindiName: "आलू",
    category: "vegetables",
    diet: "veg",
    basisLabel: "raw potato, peeled",
    kcal: 70,
    proteinG: 1.54,
    carbsG: 14.89,
    fatG: 0.23,
    fiberG: 1.71,
    calciumMg: 9.5,
    ironMg: 0.57,
    servings: [
      {
        label: "1 medium potato (≈150 g)",
        grams: 150
      },
      {
        label: "1 small potato (≈80 g)",
        grams: 80
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "F006",
    sourceName: "Potato, brown skin, big",
    intro: "Potato is a starchy vegetable that's actually moderate in calories. Frying, butter and cream are what make potato dishes heavy.",
    tips: [
      "Boiled or roasted potato has far fewer calories than the same amount fried.",
      "Aloo sabzi made with a teaspoon of oil is a reasonable side; aloo paratha with butter is not light.",
      "Count potato as a carb portion alongside rice or roti, not as a vegetable serving."
    ],
    relatedSlugs: [
      "sweet-potato",
      "green-peas",
      "spinach",
      "rice"
    ],
    compareSlug: "sweet-potato"
  },
  {
    slug: "sweet-potato",
    name: "Sweet Potato",
    hindiName: "शकरकंद",
    category: "vegetables",
    diet: "veg",
    basisLabel: "raw sweet potato",
    kcal: 109,
    proteinG: 1.33,
    carbsG: 24.25,
    fatG: 0.26,
    fiberG: 3.99,
    calciumMg: 27.5,
    ironMg: 0.35,
    servings: [
      {
        label: "1 medium sweet potato (≈130 g)",
        grams: 130
      },
      {
        label: "100 g",
        grams: 100
      },
      {
        label: "200 g",
        grams: 200
      }
    ],
    source: "IFCT 2017",
    sourceRef: "F013",
    sourceName: "Sweet potato, brown skin",
    intro: "Sweet potato (shakarkand) is a popular winter street snack. It has more calories and fibre than regular potato.",
    tips: [
      "Roasted shakarkand chaat with lemon and chaat masala is a light, filling snack.",
      "It has more fibre than potato but also more calories per 100 g.",
      "Orange-fleshed varieties are rich in beta-carotene."
    ],
    relatedSlugs: [
      "potato",
      "banana",
      "green-peas",
      "spinach"
    ],
    compareSlug: "potato"
  },
  {
    slug: "spinach",
    name: "Spinach (Palak)",
    hindiName: "पालक",
    category: "vegetables",
    diet: "veg",
    basisLabel: "raw spinach leaves",
    kcal: 24,
    proteinG: 2.14,
    carbsG: 2.05,
    fatG: 0.64,
    fiberG: 2.38,
    calciumMg: 82.3,
    ironMg: 2.95,
    servings: [
      {
        label: "1 cup raw leaves (≈30 g)",
        grams: 30
      },
      {
        label: "1 katori cooked palak (≈150 g raw)",
        grams: 150
      },
      {
        label: "100 g raw",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "C033",
    sourceName: "Spinach",
    intro: "Spinach is very low in calories and adds vitamins, minerals and volume to meals. It shrinks a lot when cooked.",
    tips: [
      "A big bunch of spinach cooks down to a small bowl — the calories stay tiny.",
      "Palak paneer gets most of its calories from the paneer, cream and oil, not the spinach.",
      "Add lemon or tomato to help your body absorb the iron in spinach."
    ],
    relatedSlugs: [
      "green-peas",
      "paneer",
      "potato",
      "moong-dal"
    ],
    compareSlug: "green-peas"
  },
  {
    slug: "green-peas",
    name: "Green Peas (Matar)",
    hindiName: "हरी मटर",
    category: "vegetables",
    diet: "veg",
    basisLabel: "fresh green peas, shelled",
    kcal: 81,
    proteinG: 7.25,
    carbsG: 11.88,
    fatG: 0.13,
    fiberG: 6.32,
    calciumMg: 28.2,
    ironMg: 1.58,
    servings: [
      {
        label: "1 katori (≈80 g)",
        grams: 80
      },
      {
        label: "2 tablespoons (≈25 g)",
        grams: 25
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "D061",
    sourceName: "Peas, fresh",
    intro: "Green peas have more protein and fibre than most vegetables. They're an easy way to bulk up poha, upma, pulao and sabzis.",
    tips: [
      "Frozen peas have very similar nutrition to fresh ones.",
      "Matar paneer combines two protein sources in one dish.",
      "Add a handful to poha or upma for extra protein and fibre."
    ],
    relatedSlugs: [
      "spinach",
      "potato",
      "paneer",
      "poha"
    ],
    compareSlug: "spinach"
  },
  {
    slug: "almonds",
    name: "Almonds",
    hindiName: "बादाम",
    category: "nuts-seeds",
    diet: "veg",
    basisLabel: "raw almonds",
    kcal: 609,
    proteinG: 18.41,
    carbsG: 3.04,
    fatG: 58.49,
    fiberG: 13.06,
    calciumMg: 228,
    ironMg: 4.59,
    servings: [
      {
        label: "10 almonds (≈12 g)",
        grams: 12
      },
      {
        label: "1 handful (≈30 g)",
        grams: 30
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "H001",
    sourceName: "Almond",
    intro: "Almonds are rich in healthy fats, vitamin E and fibre. They're nutritious but energy-dense, so a small handful goes a long way.",
    tips: [
      "Soaked almonds have the same calories as raw ones.",
      "Pre-portion a handful instead of eating from the pack.",
      "Almonds have less protein than peanuts, despite their reputation."
    ],
    relatedSlugs: [
      "walnut",
      "cashew",
      "peanuts",
      "dates"
    ],
    compareSlug: "peanuts"
  },
  {
    slug: "peanuts",
    name: "Peanuts (Groundnut)",
    hindiName: "मूंगफली",
    category: "nuts-seeds",
    diet: "veg",
    basisLabel: "raw peanuts",
    kcal: 520,
    proteinG: 23.65,
    carbsG: 17.27,
    fatG: 39.63,
    fiberG: 10.38,
    calciumMg: 54,
    ironMg: 3.44,
    servings: [
      {
        label: "1 handful (≈30 g)",
        grams: 30
      },
      {
        label: "1 tablespoon (≈10 g)",
        grams: 10
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "H012",
    sourceName: "Ground nut",
    intro: "Peanuts are the most affordable high-protein nut in India, with more protein than almonds or cashews. Like all nuts, they're high in calories.",
    tips: [
      "Roasted chana and peanuts make a cheap, filling, high-protein snack.",
      "Peanut butter has about the same calories per gram as peanuts — 1 tablespoon is roughly 90–100 kcal.",
      "Fried, salted peanuts and namkeen add oil and salt on top."
    ],
    relatedSlugs: [
      "almonds",
      "cashew",
      "kala-chana",
      "walnut"
    ],
    compareSlug: "almonds"
  },
  {
    slug: "cashew",
    name: "Cashew Nuts (Kaju)",
    hindiName: "काजू",
    category: "nuts-seeds",
    diet: "veg",
    basisLabel: "raw cashew nuts",
    kcal: 583,
    proteinG: 18.78,
    carbsG: 25.46,
    fatG: 45.2,
    fiberG: 3.86,
    calciumMg: 34,
    ironMg: 5.95,
    servings: [
      {
        label: "10 cashews (≈15 g)",
        grams: 15
      },
      {
        label: "1 handful (≈30 g)",
        grams: 30
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "H005",
    sourceName: "Cashew nut",
    intro: "Cashews are creamy and slightly sweet, and are used to make rich gravies. They have more carbohydrate and less fibre than other nuts.",
    tips: [
      "Cashew paste is why many restaurant gravies are so high in calories.",
      "A handful of cashews is around 175 kcal.",
      "Roasted, salted or masala cashews often have added oil."
    ],
    relatedSlugs: [
      "almonds",
      "walnut",
      "peanuts",
      "khoa"
    ],
    compareSlug: "almonds"
  },
  {
    slug: "walnut",
    name: "Walnuts (Akhrot)",
    hindiName: "अखरोट",
    category: "nuts-seeds",
    diet: "veg",
    basisLabel: "shelled walnuts",
    kcal: 671,
    proteinG: 14.92,
    carbsG: 10.14,
    fatG: 64.27,
    fiberG: 5.39,
    calciumMg: 105,
    ironMg: 3.21,
    servings: [
      {
        label: "1 walnut (2 halves, ≈5 g)",
        grams: 5
      },
      {
        label: "1 handful (≈30 g)",
        grams: 30
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "H021",
    sourceName: "Walnut",
    intro: "Walnuts are the richest common nut in plant omega-3 fat (ALA). They're also the most calorie-dense nut in this list.",
    tips: [
      "Two or three walnuts a day is a sensible portion.",
      "Add chopped walnuts to oats, curd or salads.",
      "Store in the fridge — their fats go rancid quickly."
    ],
    relatedSlugs: [
      "almonds",
      "cashew",
      "peanuts",
      "dates"
    ],
    compareSlug: "almonds"
  },
  {
    slug: "ghee",
    name: "Ghee",
    hindiName: "घी",
    category: "fats-sweeteners",
    diet: "veg",
    basisLabel: "ghee (clarified butter)",
    kcal: 884,
    proteinG: 0,
    carbsG: 0,
    fatG: 100,
    fiberG: 0,
    calciumMg: 0,
    ironMg: 0,
    servings: [
      {
        label: "1 teaspoon (≈5 g)",
        grams: 5
      },
      {
        label: "1 tablespoon (≈14 g)",
        grams: 14
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "T013",
    sourceName: "Ghee",
    sourceNote: "IFCT 2017 does not list energy for this food; calories are calculated from its fat, protein and carbohydrate values using IFCT energy factors.",
    intro: "Ghee is pure fat, so it's the most calorie-dense food in Indian cooking. It adds flavour, and small amounts fit any diet when measured.",
    tips: [
      "Use a measuring teaspoon — a free pour is often 2–3 teaspoons.",
      "One teaspoon on a roti adds about 45 kcal; a tablespoon in dal tadka adds about 125.",
      "Ghee and cooking oil have almost the same calories per gram."
    ],
    relatedSlugs: [
      "jaggery",
      "khoa",
      "roti",
      "toor-dal"
    ]
  },
  {
    slug: "jaggery",
    name: "Jaggery (Gur)",
    hindiName: "गुड़",
    category: "fats-sweeteners",
    diet: "veg",
    basisLabel: "cane jaggery",
    kcal: 354,
    proteinG: 1.85,
    carbsG: 84.87,
    fatG: 0.16,
    fiberG: 0,
    calciumMg: 107,
    ironMg: 4.63,
    servings: [
      {
        label: "1 small piece (≈10 g)",
        grams: 10
      },
      {
        label: "1 teaspoon grated (≈5 g)",
        grams: 5
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "I001",
    sourceName: "Jaggery, cane",
    intro: "Jaggery (gur) is unrefined cane sugar. It keeps small amounts of minerals, but nutritionally it's still sugar.",
    tips: [
      "Jaggery has almost as many calories as white sugar — swapping one for the other doesn't save calories.",
      "A small piece after meals is a reasonable sweet treat.",
      "If you have diabetes, treat jaggery like sugar and ask your doctor or dietitian how much fits."
    ],
    relatedSlugs: [
      "dates",
      "ghee",
      "khoa",
      "peanuts"
    ]
  }
];
