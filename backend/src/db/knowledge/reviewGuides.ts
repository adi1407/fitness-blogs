import { KNOWLEDGE_HUB_SLUG } from "../../constants/knowledgeContent";
import { TRAINING_LINK } from "./exerciseGuide";
import { a, faq, h2, p, table, ul } from "./programGuides";

/**
 * Long-form bodies for `/reviews` buying guides, keyed by slug. These are
 * criteria-based guides — never claim hands-on product testing.
 */

const REVIEW = (slug: string, name: string) => a(`/reviews/${slug}`, name);

const HUB = [
  p(
    "These buying guides explain how to judge fitness products yourself. Instead of ranking brands, each guide covers what actually matters, what to check on the label or product page, common red flags, and when you don't need the product at all.",
  ),
  h2("How these guides are written"),
  ul([
    "<strong>Criteria, not hype.</strong> We explain the features that make a real difference — protein per serving, sole firmness, belt thickness — and why.",
    "<strong>Evidence first.</strong> Where research exists, such as on protein intake or belt use, the advice follows it. Where it doesn't, we say so.",
    "<strong>No pretend testing.</strong> We don't claim to have lab-tested products. You get a checklist you can apply to any brand, in any price range.",
    "<strong>Need before purchase.</strong> Each guide starts with whether you need the product at all — many people don't.",
  ]),
  h2("Guides available"),
  table(
    ["Guide", "Read it if…"],
    [
      [REVIEW("how-to-choose-protein-powder", "How to choose a protein powder"), "You struggle to hit your protein target from food alone"],
      [REVIEW("how-to-choose-training-shoes", "How to choose training shoes"), "You lift, run, or do both in the same pair of shoes"],
      [REVIEW("lifting-belt-when-and-why", "Lifting belts: when they help"), "You squat or deadlift heavy and wonder whether a belt is worth it"],
    ],
  ),
  h2("Spend on basics first"),
  p(
    `For most people, the biggest results come from consistent training, enough protein, sleep and daily activity — none of which needs a purchase. Before buying anything, make sure the foundations are in place: a ${a("/programs", "structured program")}, enough protein (see ${a(TRAINING_LINK.protein, "how much protein you need to build muscle")}), and a calorie target from the ${a("/calorie-calculator", "calorie calculator")}.`,
    "Educational only. Supplements are not medicines; if you have a medical condition, are pregnant or take medication, speak to a doctor or registered dietitian before using them.",
  ),
].join("");

const PROTEIN_POWDER = [
  h2("Do you need protein powder?"),
  p(
    `Protein powder is a convenient food, not a requirement. If you already hit your daily protein target from meals, it adds nothing extra. It's most useful when your target is high, your appetite is low, you're vegetarian and finding it hard to reach your number, or your schedule makes cooking difficult. Start by working out your target — see ${a(TRAINING_LINK.protein, "how much protein you need to build muscle")} — and compare foods on our ${a("/foods/indian/protein-ranking", "protein ranking")}.`,
  ),
  h2("Types of protein powder"),
  table(
    ["Type", "Protein per 100 g (typical)", "Lactose", "Best for"],
    [
      ["Whey concentrate", "70–80 g", "Some", "Most people; good taste and value"],
      ["Whey isolate", "85–90 g", "Very little", "Lactose-sensitive people; lower carbs and fat"],
      ["Hydrolysed whey", "80–90 g", "Very little", "Rarely needed; costs more"],
      ["Casein", "75–85 g", "Some", "Slow-digesting; thicker shakes"],
      ["Soy isolate", "85–90 g", "None", "Vegans; complete protein"],
      ["Pea, rice or blends", "70–80 g", "None", "Vegans; blends improve the amino acid profile"],
    ],
  ),
  p("Values vary by brand — always check the nutrition table on the pack."),
  h2("What to check on the label"),
  ul([
    "<strong>Protein per serving and per 100 g.</strong> Divide protein by serving weight. A 30 g scoop with 24 g protein is 80% protein — good. A 40 g scoop with 22 g protein is 55% — lots of filler.",
    "<strong>The ingredient list.</strong> The protein source should come first. Short lists are generally better.",
    "<strong>Added amino acids.</strong> Some products add cheap amino acids such as glycine or taurine, which raise the protein number on the label without adding useful protein. Be wary of these near the top of the list.",
    "<strong>Proprietary blends.</strong> Blends that don't show each ingredient's amount make it impossible to know what you're paying for.",
    "<strong>Third-party testing.</strong> Certifications such as Informed Sport or NSF Certified for Sport mean batches are tested for banned substances. They are especially important for competitive athletes.",
    "<strong>Food-safety licence.</strong> In India, check for an FSSAI licence number on the pack.",
  ]),
  h2("Compare cost per gram of protein"),
  p(
    "Price per kilogram is misleading because protein content varies. Instead, work out the cost of 25 g of protein: divide the pack price by its total protein, then multiply by 25.",
  ),
  table(
    ["Example", "Pack", "Protein per 100 g", "Total protein", "Cost of 25 g protein"],
    [
      ["Powder A at ₹2,400", "1 kg", "78 g", "780 g", "about ₹77"],
      ["Powder B at ₹2,000", "1 kg", "60 g", "600 g", "about ₹83"],
    ],
  ),
  p("In this example, the cheaper pack is actually the more expensive protein. For comparison, check what 25 g of protein costs from eggs, paneer, soya chunks or chicken where you live."),
  h2("Red flags"),
  ul([
    "Claims that the powder burns fat, boosts hormones or builds muscle without training.",
    "Prices far below other products with similar protein — counterfeits of popular brands are a known problem.",
    "No batch number, manufacturing date or authenticity check on the pack.",
    "Protein per serving well below 20 g with a large scoop size.",
    "Independent tests of supplements sold in India have found some products containing less protein than labelled, so buy from brands that publish test reports.",
  ]),
  h2("Buying safely"),
  p(
    "Buy from the brand's own website or authorised sellers. Check the seal, the batch number and any authenticity code before using. Start with a small pack to check taste and how your stomach handles it — the best protein powder is one you'll actually use.",
  ),
  h2("For vegetarians and vegans"),
  p(
    `Whey is vegetarian (it comes from milk), so most Indian vegetarians can use it. Vegans and people who avoid dairy can use soy isolate, which is a complete protein, or a pea-rice blend, which combines two plant proteins to cover each other's gaps. Plant proteins often have slightly less protein per scoop and a grittier texture, so blending them with milk alternatives or fruit helps. Before buying, check whether food alone could cover your target — see ${a("/foods/soybean", "soybean")} and ${a("/foods/paneer", "paneer")} nutrition for comparison.`,
  ),
  h2("Common myths"),
  ul([
    "<strong>“Protein powder is a steroid.”</strong> It's a food made from milk, soy or peas. Products contaminated with banned substances are a quality problem, not a feature of protein powder.",
    "<strong>“More protein builds more muscle.”</strong> Beyond your daily target, extra protein adds calories but little extra muscle.",
    "<strong>“You must drink a shake within 30 minutes of training.”</strong> Total daily protein matters far more than precise timing.",
    "<strong>“Mass gainers are better for skinny people.”</strong> Most are protein powder plus a lot of sugar. Adding milk, banana and oats to a normal shake does the same job for less.",
  ]),
  h2("How to use it"),
  p(
    "One scoop (20–30 g protein) a day is enough for most people, either at a meal that's low in protein or after training. Mix it with water or milk, or stir it into curd, oats or a smoothie. Count the scoop towards your daily calorie and protein totals like any other food.",
    "People with kidney disease, and anyone told to limit protein, should speak to a doctor before using protein powder. If dairy upsets your stomach, try an isolate or a plant protein.",
  ),
  faq([
    { q: "Is whey protein safe?", a: "For healthy adults, whey from a reputable brand used in normal amounts is a safe food. The main risks come from contaminated or mislabelled products, which is why third-party testing matters." },
    { q: "Do I need protein powder to build muscle?", a: "No. Food can supply all the protein you need. Powder is simply a convenient way to reach your target." },
    { q: "When should I drink a protein shake?", a: "Total daily protein matters more than timing. A shake after training or with a low-protein breakfast is a practical default." },
    { q: "Can women use protein powder?", a: "Yes. Protein needs depend on body weight and activity, not gender. Women use the same products and the same label checks apply." },
  ]),
].join("");

const SHOES = [
  h2("Why one shoe can't do everything"),
  p(
    "Running shoes and lifting shoes are designed for opposite jobs. Running shoes have soft, thick foam to absorb impact over thousands of steps. Lifting needs a firm, stable base so force goes into the floor rather than into squishy foam. Using a soft running shoe for heavy squats can make you feel unstable, and running in a flat, hard lifting shoe is uncomfortable. Most people who do both need two pairs — or one good compromise shoe.",
  ),
  h2("Types of training shoe"),
  table(
    ["Type", "Sole", "Heel-to-toe drop", "Best for"],
    [
      ["Running shoe", "Soft, thick, cushioned", "Often 6–12 mm", "Running, long walks"],
      ["Cross-training shoe", "Firm, moderately low", "Often 0–6 mm", "Gym classes, general lifting, short cardio"],
      ["Flat minimal shoe", "Thin, hard, flat", "0 mm", "Deadlifts, general lifting"],
      ["Weightlifting shoe", "Rigid with a raised solid heel", "Raised heel, often around 15–20 mm", "Squats and Olympic lifts"],
    ],
  ),
  p("Drop and stack height vary between models, so check the brand's specifications."),
  h2("Choosing a shoe for lifting"),
  ul([
    "<strong>Firm sole.</strong> Press your thumb into the midsole — it should barely give.",
    "<strong>Flat, wide base.</strong> Your foot shouldn't roll inside the shoe when you push sideways.",
    "<strong>Secure fit at the midfoot and heel.</strong> Your heel should not lift when you squat.",
    "<strong>Grippy outsole.</strong> Rubber that holds on gym floors and platforms.",
  ]),
  p(
    `A raised-heel weightlifting shoe can help people who find it hard to squat deep with an upright torso, often because of tight ankles. It's worth considering once you squat regularly; it isn't needed to start. For deadlifts, a flat shoe or flat-soled socks keep you closer to the floor. See our ${a("/exercises/legs/back-squat", "squat guide")} and ${a("/exercises/back/conventional-deadlift", "deadlift guide")} for technique.`,
  ),
  h2("Choosing a shoe for running and walking"),
  ul([
    "<strong>Comfort comes first.</strong> Research suggests that choosing the shoe that feels most comfortable is a reasonable way to pick a running shoe.",
    "<strong>Fit.</strong> Leave about a thumb's width between your longest toe and the end of the shoe.",
    "<strong>Cushioning for the distance.</strong> More cushioning suits longer runs and heavier runners; lighter shoes suit faster, shorter runs.",
    "<strong>Stability features.</strong> Consider them if you've had problems with standard shoes, ideally after advice from a physiotherapist or a specialist shop.",
  ]),
  h2("Fitting tips"),
  ul([
    "Try shoes on later in the day, when your feet are slightly swollen.",
    "Wear the socks you train in.",
    "Walk, jog and do a few squats in the shop if you can.",
    "Buy for your longer foot — most people have one foot slightly bigger than the other.",
    "Don't count on shoes 'breaking in'; they should feel good from the first wear.",
  ]),
  h2("Which shoe for which training"),
  table(
    ["Training", "Good choice", "Avoid"],
    [
      ["Walking for steps", "Comfortable running or walking shoe", "Worn-out shoes with flat foam"],
      ["Running 3+ times a week", "Dedicated running shoe", "Flat lifting shoes"],
      ["General gym training", "Cross-training shoe", "Very soft, high-stack running shoes"],
      ["Heavy squats", "Weightlifting or firm flat shoe", "Soft cushioning"],
      ["HIIT and gym classes", "Cross-training shoe with lateral support", "Shoes that roll on side-to-side moves"],
    ],
  ),
  h2("Common buying mistakes"),
  ul([
    "<strong>Buying on looks alone.</strong> A fashion sneaker often has a soft, unstable sole that is poor for both lifting and running.",
    "<strong>Buying the wrong size online.</strong> Sizing varies between brands — check the size chart and the return policy.",
    "<strong>Using one worn pair for everything.</strong> Old running shoes are especially unstable for lifting.",
    "<strong>Expecting shoes to fix pain.</strong> Persistent foot, knee or hip pain needs a professional assessment, not just new shoes.",
  ]),
  h2("Caring for your shoes"),
  p(
    "Keep training shoes for training so the sole wears more slowly. Let them air-dry away from direct heat after sweaty sessions, and remove the insoles if they get wet. Avoid washing machines — they can weaken the glue and foam.",
  ),
  h2("When to replace them"),
  p(
    "Running shoes are often replaced every 500–800 km, but the real signs are compressed foam, a worn-through outsole, or new aches after runs. Lifting shoes last much longer because the sole isn't compressed by impact; replace them when the sole cracks, the grip wears off or the upper no longer holds your foot.",
  ),
  h2("Budget guide"),
  p(
    "You don't need the most expensive pair. A mid-range cross-trainer covers lifting and gym classes for most people. If you run more than 15–20 km a week, a dedicated running shoe is worth it. Buy weightlifting shoes only once you squat regularly and know you'll use them.",
  ),
  faq([
    { q: "Can I lift in running shoes?", a: "For light weights and machines, yes. For heavy squats and deadlifts, a firmer, flatter shoe gives a more stable base." },
    { q: "Is it OK to deadlift barefoot?", a: "Many gyms don't allow it, but flat-soled shoes or socks give a similar feel. Check your gym's rules." },
    { q: "Do I need shoes for flat feet?", a: "Many people with flat feet train comfortably in normal shoes. If you have pain, see a physiotherapist or podiatrist rather than buying shoes based on online advice." },
  ]),
].join("");

const BELT = [
  h2("What a lifting belt does"),
  p(
    "A lifting belt gives your abdominal muscles something to brace against. When you take a big breath and push your stomach out into the belt, pressure inside the abdomen increases, which helps keep your torso rigid under a heavy load. Studies have shown that belts increase this intra-abdominal pressure, and many lifters can lift a little more weight or do an extra rep with one.",
    "A belt doesn't replace core strength, and it doesn't make poor technique safe. It's a tool for heavy sets, not something to wear for every exercise.",
  ),
  h2("When a belt helps"),
  ul([
    `Heavy sets of ${a("/exercises/legs/back-squat", "squats")}, ${a("/exercises/back/conventional-deadlift", "deadlifts")} and ${a("/exercises/shoulders/overhead-press", "overhead presses")} — roughly 80% of your maximum or heavier.`,
    "Low-rep sets (1–6 reps) where bracing is hardest to maintain.",
    "Once you can already brace well without a belt.",
  ]),
  h2("When you don't need one"),
  ul([
    "Warm-up sets and light sets.",
    "Isolation exercises such as curls, raises and leg extensions.",
    "Machines and most dumbbell work.",
    "Your first months of training — learn to brace without a belt first.",
  ]),
  h2("Types of belt"),
  table(
    ["Type", "Width and thickness", "Fastening", "Best for"],
    [
      ["Powerlifting belt", "10 cm wide all round, 10–13 mm thick", "Prong or lever", "Heavy squats and deadlifts"],
      ["Tapered leather belt", "Wide at the back, narrower at the front", "Prong", "General strength training; comfortable for bending"],
      ["Nylon / velcro belt", "Thinner and flexible", "Velcro", "Olympic lifts, CrossFit-style training, lighter use"],
    ],
  ),
  h2("What to check before buying"),
  ul([
    "<strong>Thickness:</strong> 10 mm suits most lifters and is easier to break in than 13 mm.",
    "<strong>Width:</strong> 10 cm (4 inches) is the most common. A narrower front can be more comfortable if you have a short torso.",
    "<strong>Fastening:</strong> a single prong is simple and adjustable. A lever is quick to put on and take off but needs a screwdriver to adjust the size.",
    "<strong>Sizing:</strong> measure around your waist at belly-button height, over the clothes you train in, and check the brand's size chart. You'll usually wear it around the middle holes.",
    "<strong>Material:</strong> good leather or suede lasts for years. Very cheap belts may stretch or tear.",
  ]),
  h2("How to brace with a belt"),
  p(
    "Put the belt on just above your hip bones, firm but not crushing — you should be able to fit a flat hand between belt and stomach. Before each rep, breathe deep into your stomach and push out against the belt in all directions, front, sides and back. Hold that pressure through the hardest part of the lift, then breathe out at the top. If you can't take a full breath, the belt is too tight.",
  ),
  h2("Breaking in a leather belt"),
  p(
    "Thick leather belts are stiff at first and can dig into your ribs or hips. Wear the belt for warm-up sets for the first couple of weeks, roll it up tightly in both directions when you're not using it, and bend it at the points where it rubs. Most belts soften noticeably within a few weeks.",
  ),
  h2("Common mistakes"),
  ul([
    "<strong>Wearing it too tight.</strong> You need room to push your stomach out into the belt.",
    "<strong>Sucking the stomach in.</strong> Bracing means pushing out, not pulling in.",
    "<strong>Wearing it for every set.</strong> Light sets are a chance to practise bracing without help.",
    "<strong>Buying the thickest belt available.</strong> 13 mm belts are very stiff and rarely necessary outside competitive powerlifting.",
  ]),
  h2("Belts and other lifting gear"),
  table(
    ["Gear", "What it does", "When it's useful"],
    [
      ["Lifting straps", "Help your grip on pulling exercises", "Heavy rows and deadlifts when grip fails before the back"],
      ["Wrist wraps", "Support the wrists on presses", "Heavy pressing if your wrists bend back"],
      ["Knee sleeves", "Keep the knees warm and add slight support", "Comfort on squats; optional"],
      ["Chalk", "Reduces slipping", "Any heavy pulling, if your gym allows it"],
    ],
  ),
  h2("Safety notes"),
  p(
    "Holding your breath under a heavy load raises blood pressure for a short time. If you have high blood pressure, heart disease, a hernia, or you are pregnant, speak to a doctor before heavy belted lifting. Take the belt off between sets.",
  ),
  h2("Keep training your core"),
  p(
    `Use the belt for your heaviest sets and train your trunk without one the rest of the time. Exercises such as the ${a("/exercises/core/plank", "plank")}, ${a("/exercises/core/dead-bug", "dead bug")} and ${a("/exercises/core/pallof-press", "Pallof press")} build the bracing strength a belt relies on.`,
  ),
  faq([
    { q: "Does a belt make your core weaker?", a: "There's little evidence that using a belt for heavy sets weakens the core, especially if you also lift without one and train your trunk directly." },
    { q: "Should beginners wear a lifting belt?", a: "Usually not at first. Learn to brace without one, then add a belt for heavy sets once your technique is consistent." },
    { q: "Lever or prong?", a: "Both work. A prong belt is easier to adjust if your waist size changes; a lever belt is quicker to put on and take off." },
    { q: "Does a belt prevent back injuries?", a: "It's not proven to prevent injuries. It can help you brace on heavy sets, but sensible loads, good technique and gradual progression matter more." },
  ]),
].join("");

export const REVIEW_BODIES: Record<string, string> = {
  [KNOWLEDGE_HUB_SLUG]: HUB,
  "how-to-choose-protein-powder": PROTEIN_POWDER,
  "how-to-choose-training-shoes": SHOES,
  "lifting-belt-when-and-why": BELT,
};
