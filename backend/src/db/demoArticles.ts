/** Demo articles for local/preview — author = writer, status = published. */
export const DEMO_ARTICLES: Array<{
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  excerpt: string;
  quickAnswer: string;
  body: string;
  tags: string[];
  featuredImage: string;
}> = [
  {
    title: "How Much Protein Do You Need Per Day?",
    slug: "seed-how-much-protein-per-day",
    category: "nutrition",
    subcategory: "protein",
    excerpt:
      "Practical protein targets by body weight and goal — muscle, fat loss, or maintenance.",
    quickAnswer:
      "Most active adults do well with roughly 1.6–2.2 g of protein per kg of body weight, adjusted for goal and appetite.",
    body: `<h2>Why protein targets matter</h2><p>Protein supports muscle repair, satiety, and recovery. Targets are guides, not medical prescriptions — adjust with a professional if you have health conditions.</p><h2>Simple starting ranges</h2><ul><li>General health: ~1.2–1.6 g/kg</li><li>Fat loss while training: ~1.6–2.2 g/kg</li><li>Muscle building: ~1.6–2.2 g/kg with progressive training</li></ul><h2>Next step</h2><p>Use the protein calculator, then build meals around paneer, dal, eggs, curd, or lean meats.</p>`,
    tags: ["protein", "macros"],
    featuredImage:
      "https://images.unsplash.com/photo-1532550907401-a532f99ecef3?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Progressive Overload Explained for Beginners",
    slug: "seed-progressive-overload-beginners",
    category: "muscle-building",
    subcategory: "beginner-muscle-building",
    excerpt:
      "Add challenge over time with weight, reps, or better form — the engine of muscle growth.",
    quickAnswer:
      "Progressive overload means gradually increasing training stress so muscles keep adapting.",
    body: `<h2>What overload looks like</h2><p>You can progress load, reps, sets, range of motion, or tempo. Consistency beats random hard sessions.</p><h2>A simple weekly plan</h2><p>Track your main lifts. When you hit the top of a rep range with good form, add a small amount of weight next session.</p>`,
    tags: ["hypertrophy", "training"],
    featuredImage:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Calorie Deficit Basics Without Extreme Diets",
    slug: "seed-calorie-deficit-basics",
    category: "weight-loss",
    subcategory: "calorie-deficit",
    excerpt:
      "Create a modest energy gap, protect protein and training, and avoid crash diets.",
    quickAnswer:
      "A sustainable deficit is usually ~300–500 kcal below maintenance, not an aggressive crash.",
    body: `<h2>Estimate maintenance</h2><p>Use a TDEE estimate, then reduce intake slightly. Recheck every few weeks based on scale trends and energy.</p><h2>Protect the process</h2><ul><li>Keep protein high enough</li><li>Keep lifting</li><li>Sleep and steps matter</li></ul>`,
    tags: ["fat-loss", "calories"],
    featuredImage:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Indian High-Protein Breakfast Ideas",
    slug: "seed-indian-high-protein-breakfast",
    category: "nutrition",
    subcategory: "meal-planning",
    excerpt:
      "Paneer bhurji, egg preparations, dal, and curd bowls that fit real kitchens.",
    quickAnswer:
      "Build breakfast around eggs, paneer, dal, or curd plus a carb you digest well.",
    body: `<h2>Easy combinations</h2><p>Egg omelette with veggies, paneer scramble, moong dal chilla with curd, or Greek-style yogurt with fruit and nuts.</p><h2>Portion tips</h2><p>Aim for 25–40 g protein at breakfast if it helps you hit your daily target.</p>`,
    tags: ["indian-food", "protein"],
    featuredImage:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "How to Bulk Without Unnecessary Fat Gain",
    slug: "seed-clean-bulk-guide",
    category: "muscle-building",
    subcategory: "bulking",
    excerpt:
      "A small surplus, enough protein, and progressive training beat aggressive dirty bulks.",
    quickAnswer:
      "A lean bulk usually means a small calorie surplus with protein and lifting prioritized.",
    body: `<h2>Surplus size</h2><p>Start near +200–300 kcal and track weekly weight. Adjust if gains stall or fat rises too quickly.</p>`,
    tags: ["bulking", "muscle"],
    featuredImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Walking for Fat Loss: How Many Steps?",
    slug: "seed-walking-steps-fat-loss",
    category: "weight-loss",
    subcategory: "walking-daily-activity",
    excerpt:
      "Daily steps raise energy burn and support adherence without punishing workouts.",
    quickAnswer:
      "Many people improve fat-loss adherence with 7,000–10,000+ steps as a realistic daily target.",
    body: `<h2>Why walking helps</h2><p>It increases NEAT, is joint-friendly, and pairs well with strength training and a deficit.</p>`,
    tags: ["steps", "cardio"],
    featuredImage:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Carbohydrates for Training Performance",
    slug: "seed-carbs-for-training",
    category: "nutrition",
    subcategory: "carbohydrates",
    excerpt:
      "Carbs fuel hard sessions. Timing and portion size depend on your training volume.",
    quickAnswer:
      "Place more carbs around hard training days; keep protein steady every day.",
    body: `<h2>Training days</h2><p>Rice, roti, oats, fruit, and potatoes are practical carb sources around workouts.</p>`,
    tags: ["carbs", "performance"],
    featuredImage:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Recovery Habits That Support Muscle Growth",
    slug: "seed-recovery-muscle-growth",
    category: "muscle-building",
    subcategory: "recovery-muscle-growth",
    excerpt:
      "Sleep, stress, and deloads matter as much as the next PR attempt.",
    quickAnswer:
      "Prioritize 7–9 hours of sleep, manage stress, and schedule easier weeks when progress stalls.",
    body: `<h2>Signals to deload</h2><p>Persistent soreness, poor sleep, and stalled lifts for weeks often mean you need recovery, not more volume.</p>`,
    tags: ["recovery", "sleep"],
    featuredImage:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Intermittent Fasting for Weight Loss: What Matters",
    slug: "seed-intermittent-fasting-basics",
    category: "weight-loss",
    subcategory: "intermittent-fasting",
    excerpt:
      "IF is a scheduling tool. Total calories and protein still decide results.",
    quickAnswer:
      "Intermittent fasting can help some people eat fewer calories, but it is not magic without a deficit.",
    body: `<h2>Who it may help</h2><p>People who prefer fewer eating windows. Skip extreme protocols if energy or training quality drops.</p>`,
    tags: ["fasting", "fat-loss"],
    featuredImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "How to Read a Food Label for Macros",
    slug: "seed-read-food-labels-macros",
    category: "nutrition",
    subcategory: "nutrition-basics",
    excerpt:
      "Serving size, protein, fiber, and added sugars matter more than marketing claims.",
    quickAnswer:
      "Check serving size first, then protein, fiber, and calories per serving you actually eat.",
    body: `<h2>Quick checklist</h2><ul><li>Serving size vs package</li><li>Protein per serving</li><li>Fiber and added sugar</li></ul>`,
    tags: ["labels", "macros"],
    featuredImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Full-Body vs Split Routines for Muscle",
    slug: "seed-full-body-vs-split",
    category: "muscle-building",
    subcategory: "training-programs",
    excerpt:
      "Beginners often thrive on full-body frequency; intermediates may prefer splits.",
    quickAnswer:
      "Choose the routine you can recover from and progress on — frequency and adherence beat perfection.",
    body: `<h2>Beginner tip</h2><p>2–4 full-body sessions weekly with compounds cover most needs.</p>`,
    tags: ["programs", "splits"],
    featuredImage:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Strength Training During a Fat-Loss Phase",
    slug: "seed-strength-training-fat-loss",
    category: "weight-loss",
    subcategory: "strength-training-weight-loss",
    excerpt:
      "Keep lifting in a deficit to protect muscle and improve body composition.",
    quickAnswer:
      "Maintain hard compound lifts, keep protein high, and expect strength to plateau before it crashes.",
    body: `<h2>Programming notes</h2><p>Prioritize compounds, cut junk volume, and track performance honestly.</p>`,
    tags: ["strength", "recomp"],
    featuredImage:
      "https://images.unsplash.com/photo-1434682881908-b43dcb7017cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Hydration Basics for Training Days",
    slug: "seed-hydration-training-days",
    category: "nutrition",
    subcategory: "hydration",
    excerpt:
      "Start hydrated, sip through the session, and replace fluids based on sweat and climate.",
    quickAnswer:
      "Drink regularly through the day; increase fluids around hard training and hot weather.",
    body: `<h2>Practical cues</h2><p>Pale-yellow urine, steady energy, and fewer mid-session headaches are useful signals.</p>`,
    tags: ["hydration"],
    featuredImage:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Common Muscle Building Mistakes to Avoid",
    slug: "seed-muscle-building-mistakes",
    category: "muscle-building",
    subcategory: "muscle-building-mistakes",
    excerpt:
      "Program hopping, low protein, and ego lifting stall progress more than missing a perfect split.",
    quickAnswer:
      "Stick to a plan for months, eat enough protein, and progress load with good technique.",
    body: `<h2>Fix the basics</h2><p>Sleep, protein, progressive overload, and patience outperform constant novelty.</p>`,
    tags: ["mistakes", "hypertrophy"],
    featuredImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Plateaus in Weight Loss: What to Check First",
    slug: "seed-weight-loss-plateaus",
    category: "weight-loss",
    subcategory: "weight-loss-plateaus",
    excerpt:
      "Verify intake, steps, sleep, and scale averages before cutting calories harder.",
    quickAnswer:
      "Most plateaus are adherence, under-estimated calories, or normal water/glycogen noise.",
    body: `<h2>Order of operations</h2><ol><li>Track honestly for 7–14 days</li><li>Increase steps</li><li>Tighten protein</li><li>Then adjust calories</li></ol>`,
    tags: ["plateau", "fat-loss"],
    featuredImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Dietary Fats: How Much Do You Need?",
    slug: "seed-dietary-fats-how-much",
    category: "nutrition",
    subcategory: "dietary-fats",
    excerpt:
      "Fats support hormones and vitamins. Extremely low fat diets are rarely necessary.",
    quickAnswer:
      "Many active adults do well keeping fats around 20–35% of calories from whole-food sources.",
    body: `<h2>Food sources</h2><p>Nuts, seeds, dairy, eggs, oils, and fatty fish can all fit depending on preferences.</p>`,
    tags: ["fats", "macros"],
    featuredImage:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Beginner Hypertrophy: First 12 Weeks",
    slug: "seed-beginner-hypertrophy-12-weeks",
    category: "muscle-building",
    subcategory: "muscle-growth-hypertrophy",
    excerpt:
      "Learn compounds, add reps weekly, eat enough protein, and stay consistent.",
    quickAnswer:
      "A beginner hypertrophy block focuses on compound lifts, progressive reps/load, and recovery.",
    body: `<h2>Sample focus</h2><p>Squat/hinge, press, row/pull, and accessories 2–4 days per week.</p>`,
    tags: ["beginner", "hypertrophy"],
    featuredImage:
      "https://images.unsplash.com/photo-1599058945522-28d272b47b3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Sustainable Weight Loss Habits That Stick",
    slug: "seed-sustainable-weight-loss-habits",
    category: "weight-loss",
    subcategory: "sustainable-weight-loss",
    excerpt:
      "Build routines you can keep after the diet — not a temporary crash plan.",
    quickAnswer:
      "Sustainable fat loss pairs a modest deficit with habits you can maintain at maintenance later.",
    body: `<h2>Habit stack</h2><ul><li>Protein at most meals</li><li>Daily steps</li><li>2–3 lifts weekly</li><li>Sleep window</li></ul>`,
    tags: ["habits", "lifestyle"],
    featuredImage:
      "https://images.unsplash.com/photo-1498837168028-1011b2d1f1b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Pre-Workout Nutrition Without Overthinking",
    slug: "seed-pre-workout-nutrition-simple",
    category: "nutrition",
    subcategory: "pre-workout-nutrition",
    excerpt:
      "A digestible meal with carbs and some protein 1–3 hours before training works for most.",
    quickAnswer:
      "Eat a familiar meal with carbs and protein before hard sessions; keep fats moderate if digestion is sensitive.",
    body: `<h2>Examples</h2><p>Curd and banana, toast and eggs, or rice and dal with a small portion of protein.</p>`,
    tags: ["pre-workout", "performance"],
    featuredImage:
      "https://images.unsplash.com/photo-1482049016681-2f6fad4a4ea4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "How Fiber Supports Fat Loss and Digestion",
    slug: "seed-fiber-fat-loss-digestion",
    category: "nutrition",
    subcategory: "fiber",
    excerpt:
      "Vegetables, dals, and whole grains improve satiety — increase fiber gradually.",
    quickAnswer:
      "Higher fiber intake often improves fullness; raise it slowly and drink enough water.",
    body: `<h2>Food ideas</h2><p>Dal, salads, whole grains, fruit, and vegetables. Add fiber slowly to avoid GI discomfort.</p>`,
    tags: ["fiber", "satiety"],
    featuredImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop",
  },
];
