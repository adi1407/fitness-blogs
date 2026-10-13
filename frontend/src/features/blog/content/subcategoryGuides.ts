/**
 * Evergreen "essentials" copy for blog subcategory hubs, keyed by
 * `${category}/${subcategory}`. Kept out of `blogTaxonomy` so client
 * components that import the taxonomy don't ship this text.
 */

export type SubcategoryGuide = {
  heading: string;
  paragraphs: string[];
  keyPoints: string[];
  links: { href: string; label: string }[];
};

export type SubcategoryFaq = { q: string; a: string };

export const SUBCATEGORY_GUIDES: Record<string, SubcategoryGuide> = {
  "muscle-building/muscle-growth-hypertrophy": {
    heading: "How muscle growth works",
    paragraphs: [
      "Muscle grows when training challenges it with enough tension and your body has the protein, calories and sleep to repair and build. Each hard set sends a signal; the actual growth happens over the following days. Repeat that cycle for months, gradually making sets harder, and muscle size increases.",
      "Progress is fastest in the first year and slows after that. Beginners can often gain noticeable muscle in the first 3–6 months, while experienced lifters may need a year to add what they once gained in a few months. Genetics, age, sleep and diet all change the rate, which is why comparing yourself with others is rarely useful.",
    ],
    keyPoints: [
      "Train each muscle about twice a week with roughly 10–20 hard sets per week.",
      "Take most sets within 1–3 reps of failure — easy sets send a weak signal.",
      "Eat around 1.6 g of protein per kg of body weight per day.",
      "A small calorie surplus speeds growth; a large one mostly adds fat.",
      "Sleep 7–9 hours — recovery is when the growth happens.",
    ],
    links: [
      { href: "/programs", label: "Training programs" },
      { href: "/exercises", label: "Exercise library" },
      { href: "/protein-calculator", label: "Protein calculator" },
      { href: "/muscle-building", label: "Muscle building guide" },
    ],
  },
  "muscle-building/muscle-building-nutrition": {
    heading: "Eating to build muscle: the essentials",
    paragraphs: [
      "Training creates the stimulus for muscle growth, but food supplies the raw materials. The two things that matter most are total daily protein and total daily calories. Meal timing, supplements and specific foods come a distant third.",
      "Indian diets can easily support muscle building. Paneer, curd, dal, soya, eggs, chicken and fish all supply quality protein, and most people simply need to include a protein source at every meal. Spreading protein over 3–4 meals of 25–40 g each is a practical way to reach your total.",
    ],
    keyPoints: [
      "Protein: about 1.6 g per kg of body weight per day suits most lifters.",
      "Calories: a surplus of about 200–300 kcal a day supports a lean gain.",
      "Carbohydrates fuel hard training — rice, roti, oats and fruit all work.",
      "Creatine monohydrate is the best-researched supplement for strength and muscle.",
      "Weigh yourself weekly and aim to gain roughly 0.25–0.5% of body weight per week.",
    ],
    links: [
      { href: "/protein-calculator", label: "Protein calculator" },
      { href: "/macro-calculator", label: "Macro calculator" },
      { href: "/foods/indian/protein-ranking", label: "Indian foods ranked by protein" },
      { href: "/recipes", label: "High-protein recipes" },
    ],
  },
  "muscle-building/training-programs": {
    heading: "What makes a training program work",
    paragraphs: [
      "Every effective program has the same core: it trains each muscle often enough, uses enough hard sets, and gets harder over time. That last part — progressive overload — is what separates a program from a random workout. You add reps, then weight, and you track it so you know what to beat next time.",
      "The best program is the one you can follow for months. Choose based on how many days you can train consistently, your experience level and the equipment you have. Beginners usually do best with three full-body sessions a week; intermediate lifters often move to an upper / lower split.",
    ],
    keyPoints: [
      "Start with compound lifts: squat, hinge, push and pull.",
      "Log every working set — weight and reps.",
      "Add reps first, then weight, in small steps.",
      "Run a program for at least 8–12 weeks before changing it.",
      "Take an easier week every 4–8 weeks, or whenever fatigue builds up.",
    ],
    links: [
      { href: "/programs/beginner-3-day-full-body", label: "Beginner 3-day full body" },
      { href: "/programs/upper-lower-4-day", label: "Upper / lower 4-day split" },
      { href: "/programs/home-minimal-equipment", label: "Home training plan" },
      { href: "/one-rep-max-calculator", label: "One-rep max calculator" },
    ],
  },
  "muscle-building/beginner-muscle-building": {
    heading: "Your first months in the gym",
    paragraphs: [
      "As a beginner, almost any sensible plan works — as long as you show up consistently. Your first job is learning technique on a handful of basic exercises and building the habit of training three times a week. Strength often rises quickly in the first months, partly because your nervous system is learning the movements.",
      "Keep things simple: a full-body plan, enough protein, enough sleep, and steady progress in the weights you lift. Most early mistakes come from doing too much too soon, changing programs constantly, or ignoring food.",
    ],
    keyPoints: [
      "Train 3 days a week with full-body sessions.",
      "Learn the squat, hinge, press and row with light weights first.",
      "Eat protein at every meal and aim for your daily target.",
      "Expect some soreness in the first two weeks — it settles quickly.",
      "Judge progress by your training log and photos, not by the mirror each day.",
    ],
    links: [
      { href: "/programs/beginner-3-day-full-body", label: "Beginner 3-day full body" },
      { href: "/training", label: "Training fundamentals" },
      { href: "/exercises", label: "Exercise library" },
      { href: "/calorie-calculator", label: "Calorie calculator" },
    ],
  },

  "weight-loss/fat-loss-basics": {
    heading: "How fat loss works",
    paragraphs: [
      "You lose fat when your body uses more energy than you eat over weeks and months — a calorie deficit. Specific foods, meal timing and exercises can make a deficit easier or harder to keep, but they can't replace it. Your body also decides where it loses fat from; you can't target belly fat with crunches.",
      "A sustainable approach combines a moderate deficit, high protein, strength training to keep muscle, and daily walking. Expect the scale to move up and down day to day because of water; the weekly average is what tells you whether fat loss is happening.",
    ],
    keyPoints: [
      "Aim to lose about 0.5–1% of body weight per week.",
      "Keep protein high (around 1.6 g per kg) to protect muscle.",
      "Strength train 2–4 times a week.",
      "Walk daily — steps add up to a meaningful calorie burn.",
      "Track your weekly average weight and waist measurement.",
    ],
    links: [
      { href: "/calorie-deficit-calculator", label: "Calorie deficit calculator" },
      { href: "/steps-to-calories-calculator", label: "Steps to calories calculator" },
      { href: "/weight-loss", label: "Weight loss guide" },
      { href: "/recipes", label: "High-protein recipes" },
    ],
  },
  "weight-loss/calorie-deficit": {
    heading: "Setting a calorie deficit you can sustain",
    paragraphs: [
      "Start by estimating your maintenance calories — the amount that keeps your weight stable. A calculator gives a starting point; your real weight trend over 2–3 weeks tells you whether it's accurate. Then eat roughly 300–500 kcal a day below maintenance for steady fat loss.",
      "Bigger deficits feel attractive but usually backfire: hunger rises, training suffers, and more of the weight lost can come from muscle. A moderate deficit you can keep for 12 weeks beats an aggressive one you abandon after two.",
    ],
    keyPoints: [
      "Find maintenance first, then subtract 300–500 kcal per day.",
      "Weigh food for a few weeks to learn real portion sizes.",
      "Count cooking oil — 1 tablespoon is about 120 kcal.",
      "Re-check your target after every 4–5 kg lost.",
      "If weight hasn't moved in 3–4 weeks, review your tracking before cutting more.",
    ],
    links: [
      { href: "/tdee-calculator", label: "TDEE calculator" },
      { href: "/calorie-deficit-calculator", label: "Calorie deficit calculator" },
      { href: "/nutrition/calories", label: "Calories guide" },
      { href: "/foods/indian", label: "Indian food calories" },
    ],
  },
  "weight-loss/weight-loss-nutrition": {
    heading: "Choosing foods that make a deficit easier",
    paragraphs: [
      "No single food causes or prevents weight loss — total calories decide that. But some foods make a deficit much easier because they're filling for their calories. Protein-rich foods, vegetables, dals, fruit and whole grains keep you full; fried snacks, sweets and sugary drinks pack a lot of calories into a small amount.",
      "Indian staples work well in a deficit when portions are measured. Rice and roti are both fine; the amount matters more than the choice. Paneer is filling but calorie-dense, while curd, dal and egg whites give protein for fewer calories.",
    ],
    keyPoints: [
      "Build each meal around a protein source.",
      "Fill half the plate with vegetables or salad.",
      "Measure rice, roti and oil rather than eyeballing them.",
      "Swap fried snacks for roasted chana, sprouts or fruit.",
      "Drink water or unsweetened tea instead of sugary drinks.",
    ],
    links: [
      { href: "/foods/indian", label: "Indian food database" },
      { href: "/foods/indian/protein-ranking", label: "Foods ranked by protein" },
      { href: "/recipes", label: "High-protein recipes" },
      { href: "/macro-calculator", label: "Macro calculator" },
    ],
  },
  "weight-loss/diet-meal-planning": {
    heading: "Building a weight-loss meal plan",
    paragraphs: [
      "A good meal plan is built from foods you already eat, portioned to fit your calorie target. Start by splitting your daily calories across 3–4 meals, put a protein source in each, and fill the rest with vegetables and a measured portion of grains. Repeat the meals you like — variety matters less than consistency.",
      "Planning ahead removes most daily decisions. Cooking dal, sprouts or a masala base in batches means a balanced meal takes minutes on busy days.",
    ],
    keyPoints: [
      "Pick your daily calorie target first, then plan meals to fit it.",
      "Aim for 25–40 g protein per main meal.",
      "Keep two or three go-to breakfasts and dinners on rotation.",
      "Batch-cook dal, sabzi bases and chilla batter.",
      "Plan one flexible meal a week so the plan doesn't feel rigid.",
    ],
    links: [
      { href: "/calorie-calculator", label: "Calorie calculator" },
      { href: "/recipes", label: "High-protein recipes" },
      { href: "/foods/indian", label: "Indian food database" },
      { href: "/macro-calculator", label: "Macro calculator" },
    ],
  },
  "weight-loss/walking-daily-activity": {
    heading: "Why daily steps matter for weight loss",
    paragraphs: [
      "Walking is the easiest way to raise the calories you burn without adding much hunger or fatigue. A brisk 30–45 minute walk can burn roughly 120–250 kcal depending on your body weight and pace, and those calories add up across a week. Everyday movement — standing, climbing stairs, doing chores — often varies by hundreds of calories between people.",
      "Walking also supports heart health, mood and recovery from training. Pair it with a moderate calorie deficit and strength training for the best results.",
    ],
    keyPoints: [
      "Find your current daily average, then add 1,000–2,000 steps.",
      "Walk after meals — even 10 minutes helps.",
      "Use stairs, phone-call walks and short errands on foot.",
      "Incline walking raises the burn without running.",
      "Consistency beats occasional very long walks.",
    ],
    links: [
      { href: "/steps-to-calories-calculator", label: "Steps to calories calculator" },
      { href: "/exercises/cardio/zone-2-incline-walk", label: "Incline walking guide" },
      { href: "/weight-loss", label: "Weight loss guide" },
      { href: "/calorie-deficit-calculator", label: "Calorie deficit calculator" },
    ],
  },
  "weight-loss/intermittent-fasting": {
    heading: "Intermittent fasting, in brief",
    paragraphs: [
      "Intermittent fasting limits when you eat — for example, a 16:8 schedule with an 8-hour eating window. It can help with weight loss mainly because a shorter window makes it easier to eat less overall. In studies that match calories, fasting generally produces similar fat loss to a regular calorie deficit.",
      "It suits some people and not others. If skipping breakfast feels natural, fasting can be a simple structure. If it leads to overeating later, low energy for training or an unhealthy focus on food, a regular meal pattern works just as well.",
    ],
    keyPoints: [
      "Total calories still decide fat loss.",
      "Eat enough protein inside your eating window.",
      "Drink water, black coffee or plain tea while fasting.",
      "Not suitable during pregnancy or for people with a history of eating disorders.",
      "People with diabetes or on medication should speak to a doctor first.",
    ],
    links: [
      { href: "/calorie-calculator", label: "Calorie calculator" },
      { href: "/protein-calculator", label: "Protein calculator" },
      { href: "/weight-loss", label: "Weight loss guide" },
      { href: "/recipes", label: "High-protein recipes" },
    ],
  },
  "weight-loss/weight-loss-plateaus": {
    heading: "Breaking a weight-loss plateau",
    paragraphs: [
      "Weight loss is rarely a straight line. Water retention from salty meals, hard workouts, stress or the menstrual cycle can hide fat loss for one to two weeks. A real plateau is when your weekly average weight and waist measurement haven't changed for three to four weeks.",
      "When that happens, check the basics before cutting calories further. Portions tend to creep up, weekend eating adds up, and daily steps often fall as you diet. As you lose weight, your maintenance calories also drop, so your old deficit gets smaller.",
    ],
    keyPoints: [
      "Compare weekly averages, not single weigh-ins.",
      "Re-weigh portions for a week to check your tracking.",
      "Count oils, drinks, snacks and weekends.",
      "Check that your daily steps haven't fallen.",
      "Only then reduce calories by about 100–200 kcal a day.",
    ],
    links: [
      { href: "/tdee-calculator", label: "TDEE calculator" },
      { href: "/calorie-deficit-calculator", label: "Calorie deficit calculator" },
      { href: "/steps-to-calories-calculator", label: "Steps to calories calculator" },
      { href: "/weight-loss", label: "Weight loss guide" },
    ],
  },
  "weight-loss/weight-loss-myths": {
    heading: "Separating myths from evidence",
    paragraphs: [
      "Weight-loss advice is full of rules that sound convincing but don't hold up: no rice after dark, no fruit because of sugar, fat-burning drinks, or spot-reducing belly fat with crunches. Most of these persist because they sometimes lead people to eat less overall — not because the specific rule matters.",
      "The evidence points to a few consistent principles: a sustained calorie deficit, enough protein, regular activity and habits you can keep. When you hear a new rule, ask whether it changes total calories, protein or activity. If it doesn't, it probably won't change your results.",
    ],
    keyPoints: [
      "No single food makes you gain or lose fat on its own.",
      "Eating late doesn't cause weight gain if total calories are the same.",
      "Detox teas and fat-burner pills are not a substitute for a deficit.",
      "You can't choose where you lose fat from.",
      "Slow, steady loss is more likely to last.",
    ],
    links: [
      { href: "/weight-loss", label: "Weight loss guide" },
      { href: "/nutrition/calories", label: "Calories guide" },
      { href: "/calorie-calculator", label: "Calorie calculator" },
      { href: "/foods/indian", label: "Indian food database" },
    ],
  },

  "nutrition/calories-energy": {
    heading: "Calories and energy balance",
    paragraphs: [
      "Your body burns energy in three main ways: keeping you alive at rest (BMR), digesting food, and movement — both exercise and everyday activity. Together these make up your total daily energy expenditure (TDEE). Eat about the same as your TDEE and your weight stays stable; eat less and you lose weight; eat more and you gain.",
      "Calculators estimate these numbers from your age, sex, height, weight and activity level, but they can be off by a few hundred calories. Use the estimate as a starting point, then adjust based on what your weight actually does over two to three weeks.",
    ],
    keyPoints: [
      "BMR is usually the largest part of daily calorie burn.",
      "Everyday activity varies far more between people than exercise does.",
      "Track your weight trend to check any calculator estimate.",
      "Protein, carbohydrates and fat give 4, 4 and 9 kcal per gram.",
      "Food labels and databases are estimates — consistency matters more than precision.",
    ],
    links: [
      { href: "/bmr-calculator", label: "BMR calculator" },
      { href: "/tdee-calculator", label: "TDEE calculator" },
      { href: "/nutrition/calories", label: "Calories guide" },
      { href: "/foods/indian", label: "Indian food calories" },
    ],
  },
  "nutrition/protein": {
    heading: "Protein: how much and from where",
    paragraphs: [
      "Protein helps you build and keep muscle, keeps you full, and supports recovery. The minimum recommended intake for adults is about 0.8 g per kg of body weight, but people who strength train or are losing weight usually benefit from more — around 1.2–2.0 g per kg.",
      "Many Indian diets fall short of this, especially vegetarian ones built around cereals. The fix is simple: add a protein source to every meal. Dal, curd, paneer, soya, eggs, chicken and fish all count, and protein powder can fill gaps when needed.",
    ],
    keyPoints: [
      "Aim for 1.2–2.0 g per kg of body weight if you train.",
      "Spread protein across 3–4 meals of 25–40 g each.",
      "Combine dal with rice or roti to improve protein quality.",
      "Soya and paneer are among the richest vegetarian sources.",
      "People with kidney disease should follow their doctor's protein advice.",
    ],
    links: [
      { href: "/protein-calculator", label: "Protein calculator" },
      { href: "/foods/indian/protein-ranking", label: "Indian foods ranked by protein" },
      { href: "/nutrition/protein", label: "Protein guide" },
      { href: "/recipes", label: "High-protein recipes" },
    ],
  },
  "nutrition/dietary-fats": {
    heading: "Fats in an Indian diet",
    paragraphs: [
      "Fat is essential: it helps you absorb vitamins A, D, E and K, supports hormone production, and makes food satisfying. The issue is calorie density — at 9 kcal per gram, fats add up quickly, especially cooking oil and ghee that are rarely measured.",
      "Most guidelines suggest getting most of your fat from unsaturated sources such as nuts, seeds, mustard oil, groundnut oil and fish, and limiting saturated fat from ghee, butter and fried foods. Ghee in small amounts can fit a healthy diet; the total amount matters most.",
    ],
    keyPoints: [
      "Fat should typically be around 20–35% of daily calories.",
      "Measure oil and ghee with a spoon — 1 tsp is about 40–45 kcal.",
      "Rotate cooking oils rather than relying on one.",
      "Limit deep-fried snacks and avoid trans fats (vanaspati).",
      "Include nuts, seeds and, if you eat it, fish regularly.",
    ],
    links: [
      { href: "/foods/ghee", label: "Ghee nutrition" },
      { href: "/foods/peanuts", label: "Peanuts nutrition" },
      { href: "/macro-calculator", label: "Macro calculator" },
      { href: "/nutrition", label: "Nutrition guide" },
    ],
  },
  "nutrition/hydration": {
    heading: "Staying hydrated",
    paragraphs: [
      "Water needs vary with body size, temperature, activity and diet. A common reference is about 2.7 litres a day for women and 3.7 litres for men from all drinks and food combined — but in Indian summers or with heavy training, you may need more. Food usually provides around a fifth of daily water.",
      "For most healthy people, thirst and urine colour are reliable guides. Pale-yellow urine generally means you're drinking enough. During long or hot workouts, sip water regularly and consider electrolytes if you sweat heavily.",
    ],
    keyPoints: [
      "Drink regularly through the day rather than all at once.",
      "Add 400–800 ml per hour of exercise, more in heat.",
      "Tea, milk, buttermilk and water-rich foods all count.",
      "Dark urine, headaches and fatigue can be signs of low intake.",
      "People with kidney or heart conditions should follow medical advice on fluids.",
    ],
    links: [
      { href: "/water-intake-calculator", label: "Water intake calculator" },
      { href: "/nutrition", label: "Nutrition guide" },
      { href: "/calorie-calculator", label: "Calorie calculator" },
      { href: "/foods/indian", label: "Indian food database" },
    ],
  },
  "nutrition/sports-nutrition": {
    heading: "Eating around training",
    paragraphs: [
      "For most people, what you eat across the whole day matters far more than what you eat in the hour around training. Get your daily calories and protein right first. Timing becomes useful fine-tuning — helping you train harder and recover better — once the basics are in place.",
      "A meal with carbohydrates and some protein 1–3 hours before training gives energy without discomfort. Afterwards, a normal meal with protein within a few hours supports recovery. Athletes training more than once a day or for long sessions benefit most from careful timing.",
    ],
    keyPoints: [
      "Daily protein and calories come first.",
      "Eat a carb-and-protein meal 1–3 hours before training.",
      "Have a protein-containing meal within a few hours after.",
      "Hydrate before, during and after long or hot sessions.",
      "Creatine and caffeine are among the few well-supported performance supplements.",
    ],
    links: [
      { href: "/protein-calculator", label: "Protein calculator" },
      { href: "/macro-calculator", label: "Macro calculator" },
      { href: "/recipes", label: "High-protein recipes" },
      { href: "/water-intake-calculator", label: "Water intake calculator" },
    ],
  },
};

export const SUBCATEGORY_FAQS: Record<string, SubcategoryFaq[]> = {
  "muscle-building/muscle-growth-hypertrophy": [
    { q: "How much muscle can a beginner gain?", a: "It varies widely, but many beginners gain noticeably in their first year when they train consistently and eat enough protein. The rate slows each year after that, which is normal." },
    { q: "Do I need heavy weights to build muscle?", a: "No. Sets of roughly 6–30 reps all build muscle when taken close to failure. Heavier weights mainly build strength; moderate reps are often the most practical for muscle growth." },
  ],
  "muscle-building/muscle-building-nutrition": [
    { q: "Can vegetarians build muscle on an Indian diet?", a: "Yes. Paneer, curd, dal, soya, milk and whey can cover protein needs. Planning a protein source at every meal is the key habit." },
    { q: "Do I need a calorie surplus to build muscle?", a: "A small surplus makes it easier, especially for lean people. Beginners and people with more body fat can still build muscle at maintenance or in a small deficit." },
  ],
  "muscle-building/training-programs": [
    { q: "How many days a week should I train?", a: "Three to four days suits most people. The best number is the one you can keep up every week, because consistency matters more than any single session." },
    { q: "How long should a program last?", a: "Run a program for at least 8–12 weeks. Change it only when progress stalls for several weeks despite good sleep and food, or when your schedule changes." },
  ],
  "muscle-building/beginner-muscle-building": [
    { q: "Should beginners use machines or free weights?", a: "Both work. Machines are easier to learn and safe to push hard; free weights build coordination. Most beginners do well with a mix of the two." },
    { q: "How soon will I see results?", a: "Strength often improves within the first few weeks. Visible muscle changes usually take 2–3 months of consistent training and eating." },
  ],
  "weight-loss/fat-loss-basics": [
    { q: "How fast can I safely lose fat?", a: "About 0.5–1% of your body weight per week is a sustainable rate for most people. Faster loss is harder to keep up and tends to cost more muscle." },
    { q: "Do I need cardio to lose fat?", a: "No, but it helps. A calorie deficit drives fat loss; walking and cardio make that deficit easier to create and are good for your heart." },
  ],
  "weight-loss/calorie-deficit": [
    { q: "Is a 1,200 calorie diet a good idea?", a: "For most adults it's too low to sustain and makes it hard to get enough protein and nutrients. Start with a moderate deficit from your own maintenance calories instead." },
    { q: "Do I have to count calories forever?", a: "No. Tracking for a few weeks teaches you portion sizes. Many people then switch to measuring only a few key items, such as oil, rice and snacks." },
  ],
  "weight-loss/weight-loss-nutrition": [
    { q: "Should I stop eating rice to lose weight?", a: "No. Rice fits a weight-loss diet when the portion is measured. Pair it with dal, vegetables and a protein source to make the meal more filling." },
    { q: "Are fruit sugars bad for weight loss?", a: "Whole fruit is filling, rich in fibre and relatively low in calories. Fruit juice is a different matter — it is easy to drink a lot of calories quickly." },
  ],
  "weight-loss/diet-meal-planning": [
    { q: "How many meals a day should I eat?", a: "Whatever suits your schedule. Two to four meals all work if total calories and protein are right — choose the pattern that keeps you least hungry." },
    { q: "Can I eat out while following a meal plan?", a: "Yes. Choose dishes with a clear protein source, ask for less oil where possible, and go easy on extras such as naan, fried starters and sweet drinks." },
  ],
  "weight-loss/walking-daily-activity": [
    { q: "Is 10,000 steps a day necessary?", a: "No. Health benefits rise steadily as steps increase, even well below 10,000. Aim to increase your own daily average gradually." },
    { q: "Is walking better than running for weight loss?", a: "Running burns more per minute, but walking is easier to do daily and recover from. The best choice is the one you'll do most consistently." },
  ],
  "weight-loss/intermittent-fasting": [
    { q: "Does fasting burn more fat than regular dieting?", a: "When total calories are the same, studies generally show similar fat loss. Fasting is a way to structure eating, not a shortcut." },
    { q: "Can I train while fasting?", a: "Many people can, especially for light or moderate sessions. If you feel weak or dizzy, eat before training or move your eating window." },
  ],
  "weight-loss/weight-loss-plateaus": [
    { q: "Why do I gain weight after one big meal?", a: "Mostly water. Extra salt and carbohydrates make your body hold more water for a day or two. It's not fat, and it passes quickly." },
    { q: "Should I eat more to break a plateau?", a: "Eating at maintenance for a week or two can reduce diet fatigue, but it doesn't speed up your metabolism. Check tracking and activity first." },
  ],
  "weight-loss/weight-loss-myths": [
    { q: "Does eating after 8 pm cause weight gain?", a: "Not by itself. Late eating can lead to extra snacking, but if total calories are the same, the clock doesn't change fat loss." },
    { q: "Do fat-burner supplements work?", a: "Most have little or no evidence, and some contain stimulants that can be unsafe. A calorie deficit, protein and activity do the real work." },
  ],
  "nutrition/calories-energy": [
    { q: "What's the difference between BMR and TDEE?", a: "BMR is the energy you burn at complete rest. TDEE adds digestion and all your movement, so it's the number to use for daily calorie targets." },
    { q: "Are all calories the same?", a: "For energy balance, yes. But foods differ in how filling they are, their protein and their nutrients, which affects how easy it is to stick to a target." },
  ],
  "nutrition/protein": [
    { q: "Is too much protein harmful?", a: "For healthy people, intakes up to about 2 g per kg of body weight are generally considered safe. People with kidney disease should follow their doctor's advice." },
    { q: "Is plant protein as good as animal protein?", a: "Plant proteins can fully meet your needs when you eat a variety, such as dal with rice or roti, and enough in total." },
  ],
  "nutrition/dietary-fats": [
    { q: "Is ghee healthy?", a: "Ghee is mostly saturated fat. Small amounts can fit a balanced diet, but using it freely adds many calories. Measure it with a spoon." },
    { q: "Which cooking oil is best?", a: "No single oil is best. Rotating oils such as mustard, groundnut and rice-bran gives a mix of fatty acids. The amount used matters more than the type." },
  ],
  "nutrition/hydration": [
    { q: "Do tea and coffee dehydrate you?", a: "Not in normal amounts. Tea and coffee count towards your daily fluid intake, although very large amounts of caffeine have other downsides." },
    { q: "Do I need electrolyte drinks?", a: "Usually not for everyday exercise. They can help during long, hot or very sweaty sessions, or when you've lost fluid through illness." },
  ],
  "nutrition/sports-nutrition": [
    { q: "Should I train on an empty stomach?", a: "Light sessions are fine for many people, but performance in harder sessions is often better with a meal or snack 1–3 hours before." },
    { q: "What should I eat after a workout?", a: "A normal meal with protein and carbohydrates within a few hours — for example dal-rice with curd, eggs and roti, or a chicken and rice bowl." },
  ],
};
