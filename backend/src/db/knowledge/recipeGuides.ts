import { TRAINING_LINK } from "./exerciseGuide";

/**
 * Long-form recipe guides. Macro rows use per-100 g values from the food database
 * (IFCT 2017) so the card macros, the table and the ingredient list agree.
 */

/** [ingredient label (may contain a link), amount, kcal, protein g] */
type MacroRow = [string, string, number, number];

export type RecipeGuide = {
  quickAnswer: string;
  intro: string;
  macroRows: MacroRow[];
  /** Adds a per-serving row when the table lists a whole batch. */
  perServing?: { label: string; divisor: number };
  macroNote?: string;
  tips: string[];
  swaps: string[];
  mealPrep: string;
  goalFit: string;
  faq: { q: string; a: string }[];
  ingredients: string[];
  steps: string[];
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type RecipeExpansion = Omit<
  RecipeGuide,
  "intro" | "macroRows" | "perServing" | "macroNote" | "tips" | "swaps" | "mealPrep" | "goalFit" | "faq"
> & { bodyHtml: string };

const a = (href: string, text: string) => `<a href="${href}">${text}</a>`;
const food = (slug: string, text: string) => a(`/foods/${slug}`, text);
const round1 = (n: number) => Math.round(n * 10) / 10;

function macroTable(g: RecipeGuide): string {
  const kcal = g.macroRows.reduce((s, r) => s + r[2], 0);
  const protein = g.macroRows.reduce((s, r) => s + r[3], 0);
  const rows = g.macroRows.map(
    ([name, amount, k, p]) => `<tr><td>${name}</td><td>${amount}</td><td>${k}</td><td>${p} g</td></tr>`,
  );
  rows.push(
    `<tr><td><strong>Total</strong></td><td></td><td><strong>${Math.round(kcal)}</strong></td><td><strong>${round1(protein)} g</strong></td></tr>`,
  );
  if (g.perServing) {
    const { label, divisor } = g.perServing;
    rows.push(
      `<tr><td><strong>${label}</strong></td><td></td><td><strong>${Math.round(kcal / divisor)}</strong></td><td><strong>${round1(protein / divisor)} g</strong></td></tr>`,
    );
  }
  return `<table><thead><tr><th>Ingredient</th><th>Amount</th><th>Calories</th><th>Protein</th></tr></thead><tbody>${rows.join("")}</tbody></table>`;
}

export function buildRecipeGuide(g: RecipeGuide): RecipeExpansion {
  const note = [
    `Calculated from Indian Food Composition Tables (IFCT 2017) values in our ${a("/foods/indian", "Indian food database")}. Spices and herbs add negligible calories, and totals are rounded.`,
    g.macroNote,
  ]
    .filter(Boolean)
    .join(" ");

  const bodyHtml = [
    `<h2>Why this recipe works</h2>`,
    `<p>${g.intro}</p>`,
    `<h2>Macros by ingredient</h2>`,
    macroTable(g),
    `<p>${note}</p>`,
    `<h2>Cooking tips</h2>`,
    `<ul>${g.tips.map((t) => `<li>${t}</li>`).join("")}</ul>`,
    `<h2>Swaps and variations</h2>`,
    `<ul>${g.swaps.map((s) => `<li>${s}</li>`).join("")}</ul>`,
    `<h2>Meal prep and storage</h2>`,
    `<p>${g.mealPrep}</p>`,
    `<h2>How it fits your goal</h2>`,
    `<p>${g.goalFit}</p>`,
    `<h2>FAQ</h2>`,
    ...g.faq.map((f) => `<h3>${f.q}</h3><p>${f.a}</p>`),
  ].join("\n");

  return {
    quickAnswer: g.quickAnswer,
    bodyHtml,
    ingredients: g.ingredients,
    steps: g.steps,
    calories: g.calories,
    proteinG: g.proteinG,
    carbsG: g.carbsG,
    fatG: g.fatG,
  };
}

const PROTEIN_TARGET = `${a(TRAINING_LINK.protein, "how much protein you need to build muscle")}`;

const GUIDES: Record<string, RecipeGuide> = {
  "paneer-bhurji-high-protein": {
    quickAnswer:
      "Crumble 150 g paneer into an onion-tomato masala with peas, cumin and turmeric, and scramble for 4–5 minutes. One serving has about 515 kcal and 33 g protein — eat it with one or two rotis.",
    intro: `Paneer bhurji is a one-pan dinner that takes about 15 minutes and uses ingredients most Indian kitchens already have. ${food("paneer", "Paneer")} gives about 19 g of protein per 100 g, and the peas add a little more protein and fibre. Because paneer is also high in fat, the recipe uses a measured 150 g and only one teaspoon of oil, which keeps a filling plate near 500 kcal.`,
    macroRows: [
      [food("paneer", "Paneer"), "150 g", 387, 28.3],
      [food("green-peas", "Green peas"), "50 g", 41, 3.6],
      ["Onion", "60 g", 24, 0.7],
      ["Tomato", "80 g", 16, 0.7],
      ["Oil or ghee", "5 g (1 tsp)", 45, 0],
    ],
    tips: [
      "Add the paneer last and cook it for only 4–5 minutes. Longer cooking makes it dry and rubbery.",
      "Cook the tomato until the oil separates — that's what gives a rich masala without extra fat.",
      "Grate or crumble the paneer by hand so you get small and large pieces, which gives a better texture.",
      "Finish with lemon juice and coriander to brighten the dish without adding calories.",
    ],
    swaps: [
      "<strong>Lower calorie:</strong> use 100 g paneer plus 100 g firm tofu. You keep similar protein for about 100 kcal less.",
      "<strong>More volume:</strong> add 100 g chopped capsicum or spinach for about 25 kcal.",
      `<strong>Egg version:</strong> replace the paneer with 3 eggs — see the ${a("/recipes/egg-bhurji-roti", "egg bhurji recipe")}.`,
      "<strong>Low-fat paneer:</strong> store-bought low-fat paneer cuts the fat roughly in half. Check the label for exact values.",
    ],
    mealPrep:
      "Cook the onion-tomato masala in a larger batch and refrigerate it for up to 3 days. At mealtime, heat one portion of masala and add fresh paneer — it takes 5 minutes. Cooked bhurji keeps for 2 days in the fridge but becomes firmer, so reheat it with a splash of water.",
    goalFit: `For fat loss, eat it with one roti (about 96 kcal per 30 g atta) and a salad. For muscle gain, add two rotis or a bowl of rice. One serving covers about a quarter to a third of most people's daily protein — see ${PROTEIN_TARGET}, or compare paneer with other foods on our ${a("/foods/indian/protein-ranking", "protein ranking")}.`,
    faq: [
      { q: "Is paneer bhurji good for weight loss?", a: "It can be, if you measure the paneer and oil. Paneer is filling and high in protein, but it is also high in fat, so an unmeasured 200–250 g portion with two tablespoons of oil can pass 800 kcal." },
      { q: "Can I make it without onion and garlic?", a: "Yes. Use tomato, ginger, cumin and a pinch of hing (asafoetida). The macros barely change." },
    ],
    ingredients: [
      "150 g paneer, crumbled",
      "60 g onion (1 small), finely chopped",
      "80 g tomato (1 medium), chopped",
      "50 g green peas, fresh or frozen",
      "5 g oil or ghee (1 tsp)",
      "1 tsp cumin seeds, 1/2 tsp turmeric, chilli powder to taste",
      "1 green chilli and 1 tsp grated ginger (optional)",
      "Salt, coriander leaves and lemon juice to finish",
    ],
    steps: [
      "Heat the oil in a non-stick pan and add the cumin seeds.",
      "When they crackle, add the onion and cook for 3–4 minutes until soft.",
      "Add the ginger, chilli, tomato, turmeric, chilli powder and salt. Cook until the tomato breaks down, about 4 minutes.",
      "Stir in the peas with 2 tbsp water and cook for 2 minutes.",
      "Add the crumbled paneer and scramble gently for 4–5 minutes.",
      "Finish with coriander and lemon juice, and serve hot with roti.",
    ],
    calories: 515,
    proteinG: 33,
    carbsG: 33,
    fatG: 28,
  },

  "dal-rice-protein-plate": {
    quickAnswer:
      "Cook 60 g dry masoor dal with a 1-tsp ghee tadka and serve it with 60 g raw rice (about 180 g cooked), 150 g curd and a salad. The plate gives about 560 kcal and 25 g protein.",
    intro: `Dal-rice is the everyday Indian plate, and it works well for fitness goals once the portions are measured. ${food("masoor-dal", "Masoor dal")} brings about 24 g protein per 100 g dry weight plus fibre, rice provides energy for training, and curd adds protein and makes the meal more satisfying. The protein from dal and rice together also complements each other's amino acids.`,
    macroRows: [
      [food("masoor-dal", "Masoor dal (dry)"), "60 g", 193, 14.6],
      [food("rice", "Rice (raw)"), "60 g (about 180 g cooked)", 214, 4.8],
      ["Curd (toned milk)", "150 g", 90, 4.7],
      [food("ghee", "Ghee"), "5 g (1 tsp)", 44, 0],
      ["Cucumber-tomato salad", "100 g", 18, 0.8],
    ],
    macroNote: "Curd uses typical toned-milk values (about 60 kcal and 3.1 g protein per 100 g).",
    tips: [
      "Weigh dal and rice raw. Cooked weights change with water, so raw weights are more reliable.",
      "Make the dal thicker than restaurant dal — a thick dal is more filling per bowl.",
      "Add the tadka at the end so a small amount of ghee gives the most flavour.",
      "Eat the salad and dal first, then the rice. It's an easy way to feel full before the rice runs out.",
    ],
    swaps: [
      `<strong>More protein:</strong> use ${food("moong-dal", "moong dal")} or add 50 g paneer cubes to the dal (about +130 kcal and +9 g protein).`,
      "<strong>Lower carbs:</strong> halve the rice and add 150 g sautéed vegetables.",
      `<strong>Roti instead of rice:</strong> 60 g atta (2 rotis) has similar calories and slightly more protein — see our ${food("roti", "roti nutrition page")}.`,
      "<strong>Dairy-free:</strong> swap curd for a bowl of roasted chana or extra dal.",
    ],
    mealPrep:
      "Cook dal for three days at once and refrigerate it in portioned containers. Rice keeps for up to 2 days if cooled quickly and refrigerated; reheat it until steaming hot. Make the tadka fresh — it takes 2 minutes and is what makes reheated dal taste good.",
    goalFit: `For fat loss, keep the rice at 60 g raw or less and fill the plate with salad. For muscle gain, raise the rice to 80–100 g raw and add a protein side such as eggs or paneer. Need the right portions for your target? Use the ${a("/calorie-calculator", "calorie calculator")}, then see the ${a(TRAINING_LINK.gymDiet, "beginner gym diet plan")}.`,
    faq: [
      { q: "Is dal a complete protein?", a: "On its own, dal is low in methionine, and rice is low in lysine. Eaten together, they cover each other's gaps — which is why dal-rice and dal-roti are such good everyday combinations." },
      { q: "How much protein is in one bowl of dal?", a: "A typical bowl made from 30 g dry dal has about 7 g protein. This recipe uses 60 g dry dal for about 15 g." },
    ],
    ingredients: [
      "60 g masoor or moong dal (dry), rinsed",
      "60 g rice (raw), about 180 g cooked",
      "150 g curd made from toned milk",
      "5 g ghee (1 tsp) for the tadka",
      "1/2 tsp cumin seeds, 2 garlic cloves, 1 dried red chilli",
      "1/4 tsp turmeric, salt to taste",
      "100 g cucumber and tomato for the salad, with lemon and salt",
    ],
    steps: [
      "Pressure-cook the dal with 250 ml water, turmeric and salt for 3 whistles, until soft.",
      "Cook the rice separately with about twice its volume of water.",
      "Heat the ghee in a small pan, add the cumin, sliced garlic and red chilli, and fry for 30–40 seconds.",
      "Pour the tadka over the dal and stir.",
      "Chop the cucumber and tomato and season with lemon and salt.",
      "Plate the rice, dal, curd and salad together.",
    ],
    calories: 560,
    proteinG: 25,
    carbsG: 89,
    fatG: 10,
  },

  "egg-bhurji-roti": {
    quickAnswer:
      "Scramble 3 eggs into a 1-tsp oil onion-tomato masala and eat it with 2 rotis (60 g atta). The plate gives about 475 kcal and 26 g protein.",
    intro: `Eggs are one of the cheapest high-protein foods in India, and bhurji turns them into a proper meal rather than a snack. Three ${food("boiled-egg", "eggs")} give about 18 g of protein, and two whole-wheat rotis add another 6 g plus fibre. It's ready in about 10 minutes, which makes it a good fallback for busy days.`,
    macroRows: [
      [food("boiled-egg", "Whole eggs"), "3 (135 g without shell)", 200, 18.1],
      [food("roti", "Whole-wheat atta"), "60 g (2 rotis)", 192, 6.3],
      ["Onion", "50 g", 20, 0.6],
      ["Tomato", "80 g", 16, 0.7],
      ["Oil", "5 g (1 tsp)", 45, 0],
    ],
    tips: [
      "Take the pan off the heat while the eggs still look slightly wet — they finish cooking on the plate.",
      "Beat the eggs with a pinch of salt before adding them, so they cook evenly.",
      "Use a non-stick pan so one teaspoon of oil is enough.",
      "Make the rotis without ghee on top to save about 45 kcal per teaspoon.",
    ],
    swaps: [
      `<strong>More protein, few extra calories:</strong> add 2 ${food("egg-white", "egg whites")} for about +7 g protein and +30 kcal.`,
      "<strong>More vegetables:</strong> add 50 g capsicum or spinach for volume.",
      `<strong>Vegetarian:</strong> use the ${a("/recipes/paneer-bhurji-high-protein", "paneer bhurji recipe")} instead.`,
      "<strong>Lower carb:</strong> eat it with one roti and a salad.",
    ],
    mealPrep:
      "Egg bhurji is best cooked fresh, but you can chop the onion, tomato and chilli for several days and keep them in a box in the fridge. Roti dough keeps for 2 days refrigerated. Cooked bhurji can be refrigerated for a day and reheated briefly.",
    goalFit: `For fat loss, this is a balanced 475-kcal meal that fits most calorie targets. For muscle gain, add a third roti and a glass of milk. If you're unsure of your daily protein target, see ${PROTEIN_TARGET}.`,
    faq: [
      { q: "Are eggs bad for cholesterol?", a: "For most healthy people, eating eggs in moderate amounts has a small effect on blood cholesterol. If you have high cholesterol or heart disease, ask your doctor how many eggs suit you." },
      { q: "Can I eat egg bhurji every day?", a: "Yes, as part of a varied diet. Rotate it with dal, paneer or chicken meals to get a wider range of nutrients." },
    ],
    ingredients: [
      "3 eggs (about 135 g without shells)",
      "60 g whole-wheat atta for 2 rotis",
      "50 g onion, finely chopped",
      "80 g tomato, chopped",
      "5 g oil (1 tsp)",
      "1 green chilli, 1/4 tsp turmeric, 1/4 tsp chilli powder, salt",
      "Coriander leaves to finish",
    ],
    steps: [
      "Knead the atta with water and a pinch of salt and rest it for 10 minutes.",
      "Heat the oil and cook the onion and green chilli for 2–3 minutes.",
      "Add the tomato, turmeric, chilli powder and salt, and cook until soft.",
      "Pour in the beaten eggs and stir gently over medium heat for 2–3 minutes.",
      "Take the pan off the heat while the eggs are still slightly soft and add coriander.",
      "Roll and cook 2 rotis on a hot tawa and serve them with the bhurji.",
    ],
    calories: 475,
    proteinG: 26,
    carbsG: 46,
    fatG: 20,
  },

  "greek-yogurt-fruit-bowl": {
    quickAnswer:
      "Top 250 g plain Greek yogurt (or hung curd) with half a banana, half an apple and 10 g roasted peanuts. It gives about 360 kcal and 28 g protein, and takes 3 minutes.",
    intro: `A yogurt bowl is one of the fastest ways to get 25+ g of protein without cooking. Greek yogurt is strained, so it has roughly three times the protein of regular curd. Fruit adds carbohydrates and fibre, and a few ${food("peanuts", "peanuts")} add crunch and healthy fats. It works as a breakfast, a post-workout snack or a dessert.`,
    macroRows: [
      ["Plain Greek yogurt (low-fat)", "250 g", 200, 25],
      [food("banana", "Banana"), "60 g (half)", 63, 0.7],
      [food("apple", "Apple"), "75 g (half)", 47, 0.2],
      [food("peanuts", "Roasted peanuts"), "10 g", 52, 2.4],
    ],
    macroNote:
      "Greek yogurt uses typical plain low-fat label values (about 80 kcal and 10 g protein per 100 g); brands vary, so check yours.",
    tips: [
      "Buy plain, unsweetened yogurt. Flavoured versions often add 10–15 g of sugar per cup.",
      "Make hung curd at home by straining regular curd in a muslin cloth in the fridge for 4–6 hours.",
      "Chop the fruit just before eating so it stays fresh and crisp.",
      "Add a pinch of cinnamon or cardamom instead of honey for flavour without calories.",
    ],
    swaps: [
      "<strong>Hung curd:</strong> homemade hung curd from toned milk has less protein than commercial Greek yogurt (roughly 6–8 g per 100 g) — use 300 g to get closer to the same protein.",
      "<strong>Seasonal fruit:</strong> papaya, guava, pomegranate or berries all work. Keep the total around 120–150 g.",
      "<strong>More protein:</strong> stir in half a scoop of unflavoured whey for about +12 g protein.",
      "<strong>Different crunch:</strong> swap peanuts for 10 g almonds, chia or flax seeds.",
    ],
    mealPrep:
      "Portion yogurt into jars for up to 3 days, and keep the fruit and nuts separate so they don't go soggy. Hung curd keeps for 3–4 days in a closed container in the fridge. Assemble the bowl when you're ready to eat.",
    goalFit: `For fat loss, it's a high-protein breakfast that keeps you full for hours. After training, add a whole banana for extra carbohydrates. To see how this fits a full day, try the ${a("/macro-calculator", "macro calculator")} or read ${PROTEIN_TARGET}.`,
    faq: [
      { q: "Is Greek yogurt better than regular curd?", a: "Greek yogurt has more protein per gram because whey is strained out. Regular curd is cheaper and still nutritious — it just takes a bigger bowl to get the same protein." },
      { q: "Is this good before a workout?", a: "It can be, if you eat it 60–90 minutes before training. Some people find dairy heavy right before exercise; if so, have it afterwards instead." },
    ],
    ingredients: [
      "250 g plain low-fat Greek yogurt or hung curd",
      "60 g banana (half a medium banana), sliced",
      "75 g apple (half a medium apple), chopped",
      "10 g roasted peanuts, roughly crushed",
      "A pinch of cinnamon or cardamom (optional)",
      "1 tsp honey, only if you want extra sweetness (about 20 kcal)",
    ],
    steps: [
      "Spoon the yogurt into a bowl and smooth the top.",
      "Slice the banana and chop the apple.",
      "Arrange the fruit on top of the yogurt.",
      "Sprinkle over the crushed peanuts and spice.",
      "Drizzle with honey only if needed, and eat straight away.",
    ],
    calories: 360,
    proteinG: 28,
    carbsG: 36,
    fatG: 11,
  },

  "chicken-stir-fry-veggies": {
    quickAnswer:
      "Sear 170 g sliced chicken breast, stir-fry 200 g mixed vegetables with garlic and 1 tbsp soy sauce, and serve over 50 g raw rice (about 150 g cooked). It gives about 575 kcal and 45 g protein.",
    intro: `This is a simple template for a high-protein meal: a lean protein, a large serving of vegetables and a measured portion of carbohydrates. ${food("chicken-breast", "Chicken breast")} provides most of the protein, the vegetables add volume and fibre, and a light soy-garlic sauce keeps it flavourful without much added fat. It takes about 20 minutes from start to finish.`,
    macroRows: [
      [food("chicken-breast", "Chicken breast (raw)"), "170 g", 286, 37.1],
      ["Mixed vegetables", "200 g", 60, 3.0],
      [food("rice", "Rice (raw)"), "50 g (about 150 g cooked)", 178, 4.0],
      ["Oil", "5 g (1 tsp)", 45, 0],
      ["Light soy sauce", "15 ml (1 tbsp)", 8, 1.0],
    ],
    tips: [
      "Slice the chicken thinly against the grain so it cooks fast and stays tender.",
      "Get the pan very hot before adding the chicken, and don't crowd it — this sears rather than steams it.",
      "Cook the vegetables for only 3–4 minutes so they stay crisp.",
      "Add the soy sauce at the end; it burns quickly and is salty, so taste before adding more salt.",
    ],
    swaps: [
      "<strong>Vegetarian:</strong> use 200 g firm tofu or 120 g paneer. Tofu keeps the calories similar; paneer adds about 100 kcal.",
      "<strong>Millet instead of rice:</strong> foxtail millet or quinoa work well and add a little fibre.",
      "<strong>Lower carb:</strong> skip the rice and double the vegetables for about 400 kcal total.",
      "<strong>Indian flavours:</strong> swap soy for 1 tsp garam masala, lemon and chilli to make a dry chicken-vegetable stir-fry.",
    ],
    mealPrep:
      "This is one of the easiest meals to batch-cook. Make three portions at once and keep them in the fridge for up to 3 days, with the rice in separate containers if possible. Reheat until piping hot. Raw chicken should be cooked within 1–2 days of buying, or frozen.",
    goalFit: `At 45 g protein, a single plate covers a large share of most people's daily target — see ${PROTEIN_TARGET}. For fat loss, keep the rice at 50 g raw or less. For muscle gain, double the rice. For more chicken numbers, see our ${food("chicken-breast", "chicken breast nutrition page")}.`,
    faq: [
      { q: "Should I weigh chicken raw or cooked?", a: "Raw. Chicken loses roughly 25–30% of its weight as water during cooking, so a raw weight gives you more accurate macros." },
      { q: "Which vegetables work best?", a: "Capsicum, broccoli, carrots, beans, cabbage and mushrooms all stir-fry well. Use what's in season." },
    ],
    ingredients: [
      "170 g skinless chicken breast, thinly sliced",
      "200 g mixed vegetables (capsicum, broccoli, carrot, beans)",
      "50 g rice (raw), about 150 g cooked",
      "5 g oil (1 tsp)",
      "15 ml light soy sauce (1 tbsp)",
      "2 garlic cloves and 1 tsp ginger, finely chopped",
      "Black pepper, chilli flakes and spring onion to finish",
    ],
    steps: [
      "Cook the rice and keep it warm.",
      "Season the chicken with pepper and a pinch of salt.",
      "Heat the oil in a wok until very hot and sear the chicken for 4–5 minutes until cooked through. Set it aside.",
      "In the same pan, stir-fry the garlic and ginger for 30 seconds.",
      "Add the vegetables and cook for 3–4 minutes, keeping them crisp.",
      "Return the chicken, add the soy sauce and chilli flakes, and toss for 1 minute.",
      "Serve over the rice and top with spring onion.",
    ],
    calories: 575,
    proteinG: 45,
    carbsG: 50,
    fatG: 21,
  },

  "moong-chilla-stack": {
    quickAnswer:
      "Blend 60 g soaked moong dal into a batter, cook two thin chillas and fill them with 75 g crumbled paneer. The meal gives about 450 kcal and 29 g protein.",
    intro: `Moong dal chillas are savoury lentil pancakes, and they're one of the best vegetarian high-protein breakfasts. ${food("moong-dal", "Moong dal")} gives about 24 g protein per 100 g dry weight and digests easily, and a paneer filling makes it a complete meal. The batter keeps in the fridge, so on weekday mornings it takes about 10 minutes to cook.`,
    macroRows: [
      [food("moong-dal", "Moong dal (dry)"), "60 g", 196, 14.3],
      [food("paneer", "Paneer"), "75 g", 194, 14.1],
      ["Onion, tomato and coriander", "50 g", 15, 0.5],
      ["Oil", "5 g (1 tsp)", 45, 0],
    ],
    tips: [
      "Soak the dal for at least 3–4 hours (or overnight) so it blends to a smooth batter.",
      "Keep the batter like thick pancake batter — too thin and the chilla tears, too thick and it stays raw inside.",
      "Heat the tawa well, spread the batter thin, and flip only once the edges lift easily.",
      "Brush oil on with a spoon or brush rather than pouring it, so one teaspoon covers both chillas.",
    ],
    swaps: [
      "<strong>No paneer:</strong> fill with sautéed vegetables and serve with 150 g curd (about 330 kcal and 20 g protein).",
      "<strong>Besan chilla:</strong> gram flour works too; 60 g besan gives a similar amount of protein.",
      "<strong>Extra protein:</strong> blend 2 tbsp curd into the batter.",
      `<strong>Egg version:</strong> pour a beaten egg over the chilla as it cooks for +6 g protein.`,
    ],
    mealPrep:
      "Batter keeps for 2 days in a closed container in the fridge; stir it before using and add a little water if it thickens. The paneer filling can be prepared for 2 days. Cooked chillas are best eaten fresh but can be refrigerated and reheated on a tawa.",
    goalFit: `For fat loss, two chillas with a vegetable-heavy filling are filling and under 450 kcal. For muscle gain, make three chillas and add a glass of milk. To plan a full day of meals, see the ${a(TRAINING_LINK.gymDiet, "beginner gym diet plan")}.`,
    faq: [
      { q: "Can I make chillas without soaking the dal?", a: "You can use moong dal flour mixed with water, but soaked and blended dal gives a softer, lighter chilla." },
      { q: "Are moong dal chillas good for weight loss?", a: "Yes, if the oil is measured. They are high in protein and fibre, which keeps you full, and two chillas are a moderate amount of calories." },
    ],
    ingredients: [
      "60 g yellow moong dal (dry), soaked for 3–4 hours",
      "75 g paneer, crumbled",
      "50 g onion, tomato and coriander, finely chopped",
      "5 g oil (1 tsp)",
      "1 green chilli, 1/2 inch ginger, 1/2 tsp cumin, salt",
      "Mint chutney to serve",
    ],
    steps: [
      "Drain the soaked dal and blend it with the green chilli, ginger, cumin, salt and about 60 ml water to a thick, pourable batter.",
      "Mix the paneer with the chopped onion, tomato, coriander and a pinch of salt.",
      "Heat a tawa, brush it lightly with oil and pour half the batter. Spread it thin in a circle.",
      "Cook for 2 minutes until the edges lift, then flip and cook for 1 minute more.",
      "Spread half the paneer filling on the chilla and fold it over.",
      "Repeat with the remaining batter and serve with mint chutney.",
    ],
    calories: 450,
    proteinG: 29,
    carbsG: 44,
    fatG: 17,
  },

  "sprout-chaat-bowl": {
    quickAnswer:
      "Toss sprouts from 60 g dry whole moong with onion, tomato, cucumber, lemon, chaat masala and 10 g roasted peanuts. A bowl gives about 305 kcal and 19 g protein.",
    intro: `Sprout chaat is a crunchy, tangy bowl that gives plant protein and fibre without any cooking beyond sprouting. Sprouting makes moong softer and easier to digest, and the raw vegetables add volume for very few calories. It works as a light lunch or a big evening snack instead of fried namkeen.`,
    macroRows: [
      [food("moong-dal", "Whole moong (dry, then sprouted)"), "60 g dry (about 1.5 cups sprouted)", 196, 14.3],
      ["Onion, tomato and cucumber", "150 g", 35, 1.3],
      [food("peanuts", "Roasted peanuts"), "10 g", 52, 2.4],
      ["Curd (optional)", "30 g", 18, 0.9],
      ["Lemon juice and chaat masala", "to taste", 5, 0],
    ],
    macroNote: "Sprout values use dry moong per gram as an approximation; sprouting adds water, not calories.",
    tips: [
      "To sprout: soak whole moong for 8–10 hours, drain, and keep it covered in a warm place for 12–24 hours until short tails appear.",
      "Steam the sprouts for 3–4 minutes if you find raw sprouts hard to digest.",
      "Add lemon and salt just before eating so the vegetables don't go watery.",
      "Rinse sprouts well and refrigerate them once they've sprouted.",
    ],
    swaps: [
      "<strong>More protein:</strong> add 50 g crumbled paneer (+130 kcal, +9 g protein) or a chopped boiled egg.",
      "<strong>Different pulses:</strong> mix sprouted moong with boiled kala chana or sprouted matki.",
      "<strong>Sweet-tangy:</strong> add pomegranate seeds or chopped raw mango.",
      "<strong>Restaurant style:</strong> add a tablespoon of sev only occasionally — 10 g sev is about 55 kcal.",
    ],
    mealPrep:
      "Sprouted moong keeps for 2–3 days in a closed container in the fridge. Chop the vegetables daily, and mix everything just before eating to keep it crunchy.",
    goalFit: `For fat loss, a bowl is filling for around 300 kcal. For muscle gain, add paneer or eggs and eat it alongside a main meal. Walking after meals also helps — see ${a(TRAINING_LINK.walking, "whether walking helps you lose weight")}.`,
    faq: [
      { q: "Are raw sprouts safe to eat?", a: "Raw sprouts can carry bacteria because they grow in warm, moist conditions. Rinse them well, keep them refrigerated and steam them briefly if you are pregnant, elderly or have a weak immune system." },
      { q: "Do sprouts have more protein than regular moong?", a: "Not meaningfully per dry gram. Sprouting adds water and can improve digestibility, but the protein in your bowl comes from how much dry moong you start with." },
    ],
    ingredients: [
      "60 g whole green moong (dry), sprouted — about 1.5 cups",
      "50 g onion, finely chopped",
      "50 g tomato, chopped",
      "50 g cucumber, chopped",
      "10 g roasted peanuts",
      "30 g curd (optional)",
      "Juice of half a lemon, 1/2 tsp chaat masala, salt, green chilli and coriander",
    ],
    steps: [
      "Soak the moong overnight, drain it and let it sprout in a covered bowl for 12–24 hours.",
      "Rinse the sprouts and steam them for 3–4 minutes if you prefer them softer.",
      "Chop the onion, tomato, cucumber, chilli and coriander.",
      "Toss the sprouts with the vegetables, chaat masala and salt.",
      "Add lemon juice, top with the peanuts and a spoon of curd, and serve.",
    ],
    calories: 305,
    proteinG: 19,
    carbsG: 42,
    fatG: 6,
  },

  "peanut-chikki-protein-snack": {
    quickAnswer:
      "Melt 100 g jaggery, stir in 150 g roasted peanuts, press into a tray and cut 16 pieces. Two pieces give about 140 kcal and 5 g protein.",
    intro: `Peanut chikki is a traditional Indian sweet made from just two ingredients. ${food("peanuts", "Peanuts")} provide protein and healthy fats, and ${food("jaggery", "jaggery")} provides quick carbohydrates — which makes chikki a useful pre-workout or hiking snack. It is also calorie-dense, so this recipe portions it into small pieces and lists the macros per two-piece serving.`,
    macroRows: [
      [food("peanuts", "Roasted peanuts"), "150 g", 780, 35.5],
      [food("jaggery", "Jaggery"), "100 g", 354, 1.9],
    ],
    perServing: { label: "Per serving (2 of 16 pieces)", divisor: 8 },
    tips: [
      "Roast the peanuts until golden and rub off the skins for a cleaner flavour.",
      "Cook the jaggery on low heat. It is ready when a drop in cold water turns hard and snaps.",
      "Work fast — mix in the peanuts and press the mixture before it sets.",
      "Grease the tray and rolling pin lightly with a drop of ghee to stop sticking.",
      "Score the pieces while the chikki is still warm; it is hard to cut once cooled.",
    ],
    swaps: [
      "<strong>Til (sesame) chikki:</strong> use sesame seeds instead of peanuts for more calcium.",
      "<strong>Mixed nut:</strong> combine peanuts with almonds or cashews — calories stay similar.",
      "<strong>Higher protein:</strong> pair two pieces with a glass of milk (about 200 ml) for a more balanced snack.",
      "<strong>Less sugar:</strong> use a 2:1 ratio of peanuts to jaggery for a nuttier, less sweet chikki.",
    ],
    mealPrep:
      "Chikki keeps for 2–3 weeks in an airtight container at room temperature. Store pieces in small bags of two so the portion is decided in advance — the easiest way to avoid eating half the batch.",
    goalFit: `Chikki is an energy snack, not a protein food — two pieces give only 5 g protein. It suits training days, long walks and treks. If fat loss is the goal, count it as a treat and keep it to one or two pieces. For a higher-protein snack, see the ${a("/recipes/greek-yogurt-fruit-bowl", "Greek yogurt bowl")} or the ${a("/recipes/sprout-chaat-bowl", "sprout chaat")}.`,
    faq: [
      { q: "Is jaggery healthier than sugar?", a: "Jaggery has small amounts of iron and minerals, but it is still mostly sugar with nearly the same calories. Treat it as sugar when counting calories." },
      { q: "Is chikki good before a workout?", a: "Two pieces 30–60 minutes before training give quick carbohydrates and some fat for steady energy. Eat it earlier if fat upsets your stomach during exercise." },
    ],
    ingredients: [
      "150 g roasted peanuts (about 1 cup), skins removed",
      "100 g jaggery, grated or chopped",
      "1 tbsp water",
      "A pinch of cardamom powder (optional)",
      "A few drops of ghee to grease the tray",
    ],
    steps: [
      "Lightly crush the roasted peanuts, or leave them whole.",
      "Heat the jaggery with the water on low heat, stirring until it melts and bubbles, about 5–7 minutes.",
      "Test a drop in cold water — when it snaps, take the pan off the heat.",
      "Stir in the peanuts and cardamom quickly until coated.",
      "Tip the mixture onto a greased tray and press or roll it to about 1 cm thick.",
      "Score into 16 pieces while warm, cool completely, and break along the lines.",
    ],
    calories: 140,
    proteinG: 5,
    carbsG: 14,
    fatG: 7,
  },
};

export const RECIPE_GUIDES: Record<string, RecipeExpansion> = Object.fromEntries(
  Object.entries(GUIDES).map(([slug, g]) => [slug, buildRecipeGuide(g)]),
);
