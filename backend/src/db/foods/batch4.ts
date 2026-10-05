import type { FoodSeed } from "./types";

/** Batch 4: values per 100 g from Indian Food Composition Tables 2017 (NIN, Hyderabad). */
export const foodsBatch4: FoodSeed[] = [
  {
    slug: "banana",
    name: "Banana",
    hindiName: "केला",
    category: "fruits",
    diet: "veg",
    basisLabel: "ripe banana, peeled",
    kcal: 105,
    proteinG: 1.23,
    carbsG: 23.63,
    fatG: 0.33,
    fiberG: 1.94,
    calciumMg: 5.1,
    ironMg: 0.28,
    servings: [
      {
        label: "1 medium banana (≈100 g peeled)",
        grams: 100
      },
      {
        label: "1 small banana (≈70 g peeled)",
        grams: 70
      },
      {
        label: "1 large banana (≈130 g peeled)",
        grams: 130
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E012",
    sourceName: "Banana, ripe, robusta",
    intro: "Banana is an easy, portable source of carbohydrate and potassium. It makes a good pre-workout snack.",
    tips: [
      "Ripe bananas are sweeter, but the calories barely change with ripeness.",
      "A banana with a handful of peanuts or a glass of milk makes a balanced snack.",
      "Size matters: a large banana can have nearly twice the calories of a small one."
    ],
    relatedSlugs: [
      "apple",
      "mango",
      "dates",
      "papaya"
    ],
    compareSlug: "apple"
  },
  {
    slug: "apple",
    name: "Apple",
    hindiName: "सेब",
    category: "fruits",
    diet: "veg",
    basisLabel: "apple, edible portion",
    kcal: 62,
    proteinG: 0.29,
    carbsG: 13.11,
    fatG: 0.64,
    fiberG: 2.59,
    calciumMg: 13.7,
    ironMg: 0.26,
    servings: [
      {
        label: "1 medium apple (≈150 g)",
        grams: 150
      },
      {
        label: "1 small apple (≈100 g)",
        grams: 100
      },
      {
        label: "1 large apple (≈200 g)",
        grams: 200
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E001",
    sourceName: "Apple, big",
    intro: "Apples are low in calories, high in water and a good source of fibre — an easy snack between meals.",
    tips: [
      "Eat the peel — much of the fibre is in it.",
      "A whole apple is more filling than apple juice with the same calories.",
      "Apple slices with a teaspoon of peanut butter make a balanced snack."
    ],
    relatedSlugs: [
      "guava",
      "banana",
      "orange",
      "papaya"
    ],
    compareSlug: "banana"
  },
  {
    slug: "mango",
    name: "Mango",
    hindiName: "आम",
    category: "fruits",
    diet: "veg",
    basisLabel: "ripe mango pulp (Kesar)",
    kcal: 55,
    proteinG: 0.54,
    carbsG: 11.36,
    fatG: 0.57,
    fiberG: 2.02,
    calciumMg: 15.7,
    ironMg: 0.43,
    servings: [
      {
        label: "1 katori sliced mango (≈150 g)",
        grams: 150
      },
      {
        label: "1 medium mango (≈200 g pulp)",
        grams: 200
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E039",
    sourceName: "Mango, ripe, kesar",
    sourceNote: "IFCT 2017 lists several varieties; these values are for ripe Kesar mango. Other varieties are similar.",
    intro: "Mango is India's favourite summer fruit. It's lower in calories than its sweetness suggests, as long as portions stay sensible.",
    tips: [
      "Whole mango slices are more filling than aamras or a mango shake, which often have added sugar.",
      "One katori of mango fits easily into most diets.",
      "Pair with curd or nuts to slow down how fast you eat it."
    ],
    relatedSlugs: [
      "banana",
      "papaya",
      "watermelon",
      "grapes"
    ],
    compareSlug: "banana"
  },
  {
    slug: "guava",
    name: "Guava",
    hindiName: "अमरूद",
    category: "fruits",
    diet: "veg",
    basisLabel: "guava, white flesh",
    kcal: 32,
    proteinG: 1.44,
    carbsG: 5.13,
    fatG: 0.32,
    fiberG: 8.59,
    calciumMg: 18.5,
    ironMg: 0.32,
    servings: [
      {
        label: "1 medium guava (≈100 g)",
        grams: 100
      },
      {
        label: "1 large guava (≈150 g)",
        grams: 150
      },
      {
        label: "1 small guava (≈60 g)",
        grams: 60
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E028",
    sourceName: "Guava, white flesh",
    intro: "Guava is one of the most fibre-rich fruits and very high in vitamin C, with few calories. It's an excellent fruit for fat loss.",
    tips: [
      "Eat it with the skin and seeds for the most fibre.",
      "A sprinkle of chaat masala or black salt adds flavour without calories.",
      "Its fibre makes guava very filling for the calories."
    ],
    relatedSlugs: [
      "apple",
      "papaya",
      "orange",
      "pomegranate"
    ],
    compareSlug: "apple"
  },
  {
    slug: "papaya",
    name: "Papaya",
    hindiName: "पपीता",
    category: "fruits",
    diet: "veg",
    basisLabel: "ripe papaya, edible portion",
    kcal: 24,
    proteinG: 0.42,
    carbsG: 4.61,
    fatG: 0.16,
    fiberG: 2.83,
    calciumMg: 15,
    ironMg: 0.23,
    servings: [
      {
        label: "1 katori papaya cubes (≈150 g)",
        grams: 150
      },
      {
        label: "1 plate (≈250 g)",
        grams: 250
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E049",
    sourceName: "Papaya, ripe",
    intro: "Ripe papaya is one of the lowest-calorie fruits, so you can eat a generous bowl for very few calories.",
    tips: [
      "A full plate of papaya is still under 100 kcal.",
      "Good as a breakfast side or an evening snack.",
      "Add a squeeze of lime to bring out the flavour."
    ],
    relatedSlugs: [
      "watermelon",
      "guava",
      "orange",
      "apple"
    ],
    compareSlug: "watermelon"
  },
  {
    slug: "orange",
    name: "Orange",
    hindiName: "संतरा",
    category: "fruits",
    diet: "veg",
    basisLabel: "orange pulp (segments)",
    kcal: 37,
    proteinG: 0.7,
    carbsG: 7.92,
    fatG: 0.13,
    fiberG: 1.29,
    calciumMg: 19.5,
    ironMg: 0.81,
    servings: [
      {
        label: "1 medium orange (≈130 g segments)",
        grams: 130
      },
      {
        label: "1 glass fresh juice (≈250 g pulp)",
        grams: 250
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E047",
    sourceName: "Orange, pulp",
    intro: "Oranges are juicy, low in calories and a classic source of vitamin C.",
    tips: [
      "A whole orange keeps the fibre; juice drops most of it and is easy to over-drink.",
      "One glass of juice can take two or more oranges.",
      "Kinnow and mosambi are close relatives with similar calories."
    ],
    relatedSlugs: [
      "guava",
      "pomegranate",
      "apple",
      "grapes"
    ],
    compareSlug: "guava"
  },
  {
    slug: "pomegranate",
    name: "Pomegranate",
    hindiName: "अनार",
    category: "fruits",
    diet: "veg",
    basisLabel: "pomegranate seeds (arils)",
    kcal: 55,
    proteinG: 1.33,
    carbsG: 11.58,
    fatG: 0.15,
    fiberG: 2.83,
    calciumMg: 10.7,
    ironMg: 0.31,
    servings: [
      {
        label: "1 katori seeds (≈100 g)",
        grams: 100
      },
      {
        label: "1 medium pomegranate (≈150 g seeds)",
        grams: 150
      },
      {
        label: "2 tablespoons (≈20 g)",
        grams: 20
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E055",
    sourceName: "Pomegranate, maroon seeds",
    intro: "Pomegranate seeds add sweetness and crunch to salads, raita and chaat, for modest calories.",
    tips: [
      "Eat the seeds whole for the fibre; juice removes most of it.",
      "Sprinkle on raita, salads or sprouts.",
      "A whole pomegranate gives roughly one and a half katoris of seeds."
    ],
    relatedSlugs: [
      "guava",
      "orange",
      "grapes",
      "apple"
    ],
    compareSlug: "grapes"
  },
  {
    slug: "watermelon",
    name: "Watermelon",
    hindiName: "तरबूज़",
    category: "fruits",
    diet: "veg",
    basisLabel: "watermelon flesh",
    kcal: 20,
    proteinG: 0.6,
    carbsG: 3.86,
    fatG: 0.16,
    fiberG: 0.7,
    calciumMg: 5.3,
    ironMg: 0.22,
    servings: [
      {
        label: "1 katori cubes (≈150 g)",
        grams: 150
      },
      {
        label: "1 slice (≈280 g)",
        grams: 280
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E065",
    sourceName: "Water melon, dark green (sugar baby)",
    intro: "Watermelon is about 95% water, which makes it the lowest-calorie fruit in this list and very refreshing in summer.",
    tips: [
      "Even a big slice is well under 100 kcal.",
      "Great after a workout in hot weather alongside water.",
      "It's low in protein and fibre, so pair it with a protein snack if it's a whole meal."
    ],
    relatedSlugs: [
      "papaya",
      "mango",
      "grapes",
      "orange"
    ],
    compareSlug: "papaya"
  },
  {
    slug: "dates",
    name: "Dates (Dry)",
    hindiName: "खजूर",
    category: "fruits",
    diet: "veg",
    basisLabel: "dry dates, without seed",
    kcal: 311,
    proteinG: 2.38,
    carbsG: 72.67,
    fatG: 0.35,
    fiberG: 9.1,
    calciumMg: 66.1,
    ironMg: 4.79,
    servings: [
      {
        label: "1 date (≈8 g)",
        grams: 8
      },
      {
        label: "3 dates (≈24 g)",
        grams: 24
      },
      {
        label: "100 g",
        grams: 100
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E018",
    sourceName: "Dates, dry, dark brown",
    intro: "Dates are naturally very sweet and energy-dense — a quick source of carbohydrate before training or to replace sugar in sweets.",
    tips: [
      "Dates have far more calories by weight than fresh fruit — count them, don't graze.",
      "One or two dates before a workout is a simple energy boost.",
      "Blended dates can replace sugar in laddoos and smoothies."
    ],
    relatedSlugs: [
      "banana",
      "jaggery",
      "almonds",
      "walnut"
    ],
    compareSlug: "banana"
  },
  {
    slug: "grapes",
    name: "Grapes",
    hindiName: "अंगूर",
    category: "fruits",
    diet: "veg",
    basisLabel: "green seedless grapes",
    kcal: 54,
    proteinG: 0.62,
    carbsG: 11.81,
    fatG: 0.26,
    fiberG: 1.28,
    calciumMg: 14.2,
    ironMg: 0.24,
    servings: [
      {
        label: "1 katori (≈100 g)",
        grams: 100
      },
      {
        label: "10 grapes (≈50 g)",
        grams: 50
      },
      {
        label: "1 bunch (≈200 g)",
        grams: 200
      }
    ],
    source: "IFCT 2017",
    sourceRef: "E026",
    sourceName: "Grapes, seedless, round, green",
    intro: "Grapes are juicy and sweet with moderate calories. They're easy to over-eat, so portion them into a bowl.",
    tips: [
      "Freeze grapes for a cold summer snack.",
      "A katori of grapes is under 60 kcal.",
      "Raisins are dried grapes — the same calories packed into a much smaller portion."
    ],
    relatedSlugs: [
      "pomegranate",
      "mango",
      "orange",
      "watermelon"
    ],
    compareSlug: "pomegranate"
  }
];
