import {
  DISCLAIMER,
  h2,
  h3,
  ol,
  p,
  table,
  takeaways,
  toolCta,
  ul,
  type IntentArticleDef,
} from "./helpers";

/** Un-numbered on purpose: the boot link pass rewrites them to live numbered URLs. */
const LINK = {
  proteinForMuscle:
    "/blog/muscle-building/muscle-building-nutrition/how-much-protein-to-build-muscle",
  muscleTimeline:
    "/blog/muscle-building/muscle-growth-hypertrophy/how-long-does-it-take-to-build-muscle",
  progressiveOverload:
    "/blog/muscle-building/training-programs/what-is-progressive-overload",
  gymDiet: "/blog/muscle-building/beginner-muscle-building/beginner-gym-diet-plan",
  indianProtein: "/blog/nutrition/protein/best-high-protein-indian-foods",
  proteinTiming: "/blog/nutrition/sports-nutrition/protein-before-or-after-workout",
  water: "/blog/nutrition/hydration/how-much-water-should-you-drink",
};

export const batch8: IntentArticleDef[] = [
  {
    slug: "is-creatine-safe",
    title:
      "Is Creatine Safe? What It Really Does, How to Take It, and the Myths (Kidneys, Hair Loss, Bloating)",
    excerpt:
      "Your trainer swears by it, your mother thinks it’s a steroid, and the internet says it will wreck your kidneys and your hairline. Here’s what decades of research actually say about creatine — and exactly how to take it if you decide to.",
    quickAnswer: `For healthy adults, creatine monohydrate is one of the most studied and safest sports supplements. It isn’t a steroid — your body makes about 1 g a day and it’s found in meat and fish. Taken at 3–5 g a day alongside strength training, it helps you do a few more reps, get stronger, and gain a little more muscle over weeks. Controlled studies haven’t found kidney damage in healthy people, and a 2025 trial found no effect on hair. Expect 1–2 kg of water weight inside the muscle at first. Skip it, or ask a doctor first, if you have kidney disease, diabetes, are pregnant or under 18, or take medicines that affect the kidneys. ${DISCLAIMER}`,
    categorySlug: "muscle-building",
    subcategorySlug: "muscle-building-nutrition",
    primaryKeyword: "is creatine safe",
    metaTitle: "Is Creatine Safe? Benefits, Dosage & Myths | fitlives",
    metaDescription:
      "Is creatine safe for kidneys and hair? What it does, the right dose (3–5 g a day), loading, water weight, and how to buy genuine creatine in India — backed by research.",
    tags: [
      "creatine",
      "creatine monohydrate",
      "supplements",
      "muscle building",
      "strength",
    ],
    topics: ["Strength", "Hypertrophy", "Performance", "Beginner Fitness"],
    featuredImageAlt:
      "Scoop of white creatine monohydrate powder next to a shaker bottle on a gym bench",
    relatedSlugs: [
      "how-much-protein-to-build-muscle",
      "how-long-does-it-take-to-build-muscle",
      "what-is-progressive-overload",
      "beginner-gym-diet-plan",
      "best-high-protein-indian-foods",
    ],
    dayOffset: 9,
    faq: [
      {
        question: "When is the best time to take creatine?",
        answer:
          "Whenever you’ll remember it every day. Creatine works by slowly filling your muscles over weeks, not by giving a boost an hour later, so consistency matters far more than timing. Many people take it with breakfast or after training; both are fine.",
      },
      {
        question: "Do I need a loading phase?",
        answer:
          "No. Loading (about 20 g a day, split into four doses, for 5–7 days) fills your muscles in about a week. Taking 3–5 g a day from the start reaches the same level in about 3–4 weeks, with less water weight and less chance of an upset stomach. Load only if you want the effect sooner.",
      },
      {
        question: "Should I cycle creatine or take breaks?",
        answer:
          "There’s no need to cycle it. Research supports daily use over long periods in healthy adults. If you stop, your muscle creatine drifts back to its normal level over about 4–6 weeks and the extra water weight goes with it — you don’t lose the muscle you built through training.",
      },
      {
        question: "Can women take creatine?",
        answer:
          "Yes. Women respond much like men, and the same 3–5 g a day applies. Creatine doesn’t add “bulk” on its own — any muscle gain comes from training and eating enough protein. Women who are pregnant, trying to conceive, or breastfeeding should ask their doctor first, as there isn’t enough safety research in those groups.",
      },
      {
        question: "Can I mix creatine with whey, milk, or coffee?",
        answer:
          "Yes. Mixing it into a whey shake, milk, curd, juice, or water all work. Unflavoured creatine monohydrate has almost no taste. Coffee is fine for most people too; early research hinted that caffeine might blunt creatine’s effect, but later studies are mixed.",
      },
      {
        question: "What happens if I miss a day?",
        answer:
          "Nothing much. Your muscles stay close to full for days, so just take your normal dose the next day. Don’t double up.",
      },
      {
        question: "Can teenagers take creatine?",
        answer:
          "Research in teenagers is limited. Under 18, the basics — enough food and protein, sleep, and a sensible training programme — deliver far more than any supplement. If a young athlete is considering creatine, involve a parent and a doctor or sports dietitian.",
      },
      {
        question: "Will creatine affect my blood test results?",
        answer:
          "It can raise creatinine, a waste product labs use to estimate kidney function, because creatine naturally breaks down into creatinine. This can make results look slightly worse without any kidney harm. Always tell your doctor you take creatine before a blood test; they may pause it for a few days or use a different kidney test such as cystatin C.",
      },
    ],
    sources: [
      {
        title:
          "Kreider et al. (2017) — ISSN position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
        url: "https://pubmed.ncbi.nlm.nih.gov/28615996/",
        note: "Summary of the evidence on benefits, dosing, and safety",
      },
      {
        title:
          "Antonio et al. (2021) — Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?",
        url: "https://pubmed.ncbi.nlm.nih.gov/33557850/",
        note: "Addresses kidneys, hair, water retention, cramping, and loading myths",
      },
      {
        title: "Hultman et al. (1996) — Muscle creatine loading in men (J Appl Physiol)",
        url: "https://pubmed.ncbi.nlm.nih.gov/8828669/",
        note: "20 g/day for 6 days and 3 g/day for 28 days both raise muscle creatine by about 20%",
      },
      {
        title:
          "Burke et al. (2003) — Effect of creatine and weight training on muscle creatine and performance in vegetarians",
        url: "https://pubmed.ncbi.nlm.nih.gov/14600563/",
        note: "Vegetarians start with lower muscle creatine and gain more from supplementing",
      },
      {
        title:
          "de Souza e Silva et al. (2019) — Effects of creatine supplementation on renal function: a systematic review and meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/31375416/",
        note: "No kidney damage at the doses and durations studied",
      },
      {
        title:
          "Lak et al. (2025) — Does creatine cause hair loss? A 12-week randomized controlled trial",
        url: "https://pubmed.ncbi.nlm.nih.gov/40265319/",
        note: "5 g/day had no effect on DHT or hair density and thickness versus placebo",
      },
      {
        title:
          "van der Merwe et al. (2009) — Three weeks of creatine monohydrate supplementation affects dihydrotestosterone to testosterone ratio in college-aged rugby players",
        url: "https://pubmed.ncbi.nlm.nih.gov/19741313/",
        note: "The single study behind the hair-loss worry; it measured hormones, not hair",
      },
      {
        title:
          "Branch (2003) — Effect of creatine supplementation on body composition and performance: a meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/12945830/",
        note: "Benefits for short, repeated high-intensity efforts; little effect on running or swimming",
      },
      {
        title:
          "Chilibeck et al. (2017) — Creatine supplementation during resistance training in older adults: a meta-analysis",
        url: "https://pubmed.ncbi.nlm.nih.gov/29138605/",
        note: "About 1.4 kg more lean mass and greater strength than training alone",
      },
    ],
    body: [
      p(
        "Arjun is 22, lives in Pune, and has been lifting for five months. His bench press has stalled at 60 kg, and his trainer handed him the answer: “Take creatine. Load 20 grams a day for a week.” He ordered a tub online.",
        "Two days later his mother found it on the kitchen shelf. “Is this a steroid? Beta, this will damage your kidneys.” His cousin, who lost his hair early, added over WhatsApp: “Creatine makes you bald, bro.” Arjun put the tub back in the box and searched: is creatine safe?",
        "Arjun is a composite of the questions we hear most, but the family argument is very real. The good news is that creatine is one of the most researched supplements in sports nutrition, so each of these worries has an actual answer — not just opinions.",
      ),

      h2("What creatine actually is"),
      p(
        "Creatine isn’t a drug or a hormone. It’s a small compound your liver, kidneys, and pancreas make every day — about 1 gram — from three amino acids (arginine, glycine, and methionine). Around 95% of it is stored in your muscles.",
        "Its job is to recharge your muscles’ fastest energy source during short, hard efforts: a heavy set of squats, a sprint, a quick burst on the football field. More stored creatine means your muscles can keep that effort going for a little longer before they tire — often one or two extra reps.",
        "You also get creatine from food, but only from meat and fish. A typical non-vegetarian diet provides roughly 1–2 g a day. A vegetarian diet provides almost none, which matters a lot in India.",
      ),
      table(
        ["Source", "Creatine"],
        [
          ["Your own body", "~1 g per day"],
          ["Non-vegetarian diet (meat, chicken, fish)", "~1–2 g per day"],
          ["Vegetarian or vegan diet", "Close to zero"],
          ["A typical supplement dose", "3–5 g per day"],
        ],
      ),

      h2("What creatine does — and what it doesn’t"),
      p(
        "Creatine doesn’t build muscle by itself. It helps you train a little harder, and the extra training builds the muscle. Without lifting, it does very little.",
      ),
      table(
        ["Claim", "What the research says"],
        [
          ["More strength in the gym", "Yes — small but consistent gains, especially in upper-body lifts"],
          ["More muscle over time", "Yes, alongside strength training. In older adults, about 1.4 kg more lean mass than training alone"],
          ["Extra reps in repeated hard sets", "Yes — its clearest effect"],
          ["Better sprinting and team sports", "Often, for short repeated bursts"],
          ["Better long-distance running or swimming", "Little to no effect"],
          ["Burns fat", "No"],
          ["Works without training", "Not meaningfully"],
        ],
      ),
      p(
        `Think of it as a small multiplier on work you’re already doing. The foundation is still a good programme built on <a href="${LINK.progressiveOverload}">progressive overload</a> and enough protein — see <a href="${LINK.proteinForMuscle}">how much protein you need to build muscle</a>.`,
      ),

      h2("Why vegetarians may benefit the most"),
      p(
        "Because vegetarian diets contain almost no creatine, vegetarians usually start with lower muscle creatine stores. In one controlled study, vegetarians who took creatine during eight weeks of weight training saw bigger increases in muscle creatine, lean mass, and total work than non-vegetarians taking the same supplement.",
        "Creatine monohydrate is usually made synthetically, not from animals, so it generally suits vegetarians. If this matters to you, check the label: some capsule shells are made from gelatin, which is an animal product.",
      ),

      h2("The myths, one by one"),

      h3("“It’s a steroid”"),
      p(
        "No. Anabolic steroids are synthetic versions of testosterone that act as hormones. Creatine is a nutrient your body already makes and stores, and it’s found in ordinary food. It isn’t a hormone, and it isn’t banned by the World Anti-Doping Agency.",
      ),

      h3("“It will damage your kidneys”"),
      p(
        "This is the most common worry, and it mostly comes from a lab-test mix-up. Creatine naturally breaks down into creatinine, and doctors use blood creatinine to estimate how well your kidneys filter. Taking creatine can nudge creatinine up slightly — which looks like a kidney problem on paper even when the kidneys are fine.",
        "When researchers measure kidney function directly, the picture is reassuring. A 2019 systematic review and meta-analysis concluded that creatine supplementation did not cause kidney damage at the doses and durations studied, and position stands from sports-nutrition experts reach the same conclusion for healthy people.",
        "The honest caveat: that evidence is in healthy people. If you already have kidney disease, reduced kidney function, or diabetes, or you regularly take medicines that affect the kidneys, don’t take creatine without your doctor’s advice. And always tell your doctor about it before a blood test.",
      ),

      h3("“It makes you go bald”"),
      p(
        "This worry traces back to a single 2009 study of 20 rugby players. After a week of high-dose loading, their levels of DHT — a hormone linked with male-pattern hair loss — rose. But the study never looked at anyone’s hair, and the result hadn’t been repeated.",
        "In 2025, researchers finally tested it directly. In a 12-week randomised controlled trial, young men took 5 g of creatine or a placebo each day. There were no differences in DHT, in the DHT-to-testosterone ratio, or in hair density, follicle count, or hair thickness.",
        "If you’re genetically prone to hair loss, it will likely happen with or without creatine. If your hairline worries you, speak with a dermatologist — they have treatments that actually work.",
      ),

      h3("“It makes you bloated and fat”"),
      p(
        "Creatine pulls water into your muscles, so the scale often rises by about 1–2 kg in the first week or two — more if you do a loading phase. That’s water inside the muscle, not fat under the skin, and many people find their muscles simply look a little fuller.",
        "A “puffy” or bloated feeling usually comes from taking big doses at once. Staying at 3–5 g a day, or splitting a loading dose into smaller servings, largely avoids it.",
      ),

      h3("“It causes cramps and dehydration”"),
      p(
        `Studies in athletes, including those training in the heat, haven’t found that creatine increases cramping, muscle injuries, or dehydration. You don’t need to drink gallons extra — just drink normally and follow your thirst, with a little more on hot days and training days. For a practical guide, see <a href="${LINK.water}">how much water you should drink</a>.`,
      ),

      h3("“You have to load it and cycle it”"),
      p(
        "Neither is required. Loading just gets you to full stores faster; a steady daily dose gets you to the same place in a few weeks. And there’s no evidence you need to cycle creatine on and off — daily use is what the research supports.",
      ),

      h2("How to take creatine"),
      table(
        ["Approach", "How", "Full muscles in"],
        [
          ["Simple daily dose (recommended)", "3–5 g once a day, every day", "~3–4 weeks"],
          ["Loading phase", "About 20 g a day, split into four 5 g doses, for 5–7 days — then 3–5 g a day", "~1 week"],
        ],
      ),
      ol([
        "<strong>Choose creatine monohydrate.</strong> It’s the form used in almost all the research, and it’s usually the cheapest. Newer forms such as creatine HCl or ethyl ester haven’t been shown to work better.",
        "<strong>Take 3–5 g a day.</strong> Most people do well on 3–5 g; larger, very muscular people tend to use the higher end. Check your scoop size on the label — tubs often include a 3 g or 5 g scoop.",
        "<strong>Take it every day</strong>, including rest days. Timing isn’t important; consistency is.",
        "<strong>Mix it with anything</strong> — water, milk, curd, juice, or your protein shake. Taking it with a meal can help if your stomach is sensitive.",
        "<strong>Keep training and eating well.</strong> Creatine only helps if there’s hard training for it to support.",
      ]),
      p(
        `Pair it with a solid daily routine. Our <a href="${LINK.gymDiet}">beginner gym diet plan</a> covers meals, and <a href="${LINK.proteinTiming}">protein before or after a workout</a> answers the timing question for protein too.`,
      ),

      h2("How to buy genuine creatine in India"),
      p(
        "Creatine itself is cheap and simple, but fake and mislabelled supplements are a real problem in India. A few checks go a long way:",
      ),
      ul([
        "<strong>Buy from the brand’s official website or an authorised seller</strong>, not the cheapest random listing.",
        "<strong>Check for an FSSAI licence number</strong> on the pack, and for imported products, the importer’s details.",
        "<strong>Look for a single ingredient:</strong> creatine monohydrate. Avoid “proprietary blends” that hide the amount.",
        "<strong>Prefer third-party tested products</strong> or recognised raw materials, and brands that let you verify batches with a code or QR check.",
        "<strong>Choose unflavoured</strong> if you can — no added sugar or sweeteners, and easy to mix into anything.",
      ]),

      h2("Who should skip creatine or ask a doctor first"),
      ul([
        "People with kidney disease or reduced kidney function",
        "People with diabetes or high blood pressure that affects the kidneys",
        "Anyone taking medicines that affect the kidneys, including regular use of painkillers such as ibuprofen",
        "Pregnant, trying to conceive, or breastfeeding",
        "Under 18",
        "Anyone with a medical condition or on regular medication — check with your doctor or pharmacist first",
      ]),
      p(
        "If you notice anything unusual after starting — such as persistent stomach upset, swelling in the legs, or changes in how often you pass urine — stop and see a doctor.",
      ),

      h2("What to expect, week by week"),
      table(
        ["When", "What usually happens"],
        [
          ["Week 1", "Scale up by about 0.5–2 kg (water in the muscle). No big change in the gym yet, unless you loaded"],
          ["Weeks 2–4", "Muscles are close to full. Many people notice an extra rep or two on hard sets"],
          ["Months 2–3", "Small, steady strength gains add up; muscle gain slightly ahead of training alone"],
          ["If you stop", "Muscle creatine returns to normal over about 4–6 weeks; the water weight goes with it"],
        ],
      ),
      p(
        `Keep your expectations realistic: creatine adds a little on top of good training. For honest timelines on muscle gain, see <a href="${LINK.muscleTimeline}">how long it takes to build muscle</a>.`,
      ),

      h2("What happened to Arjun"),
      p(
        "Arjun didn’t load. He showed his mother the research, promised to tell his doctor at his next blood test, and bought unflavoured creatine monohydrate from an authorised seller. He took 3 g a day in his morning milk — on rest days too.",
        `Three weeks in, the scale was 1.2 kg higher and his mother was convinced it was fat. By week eight his bench press had moved from 60 kg to 67.5 kg. Creatine didn’t do that alone: he also finally started tracking his lifts and eating enough protein — mostly dal, paneer, curd, and eggs (see our <a href="${LINK.indianProtein}">best high-protein Indian foods</a>). But the extra rep or two on every hard set added up. And his hairline is exactly where it was.`,
      ),
      toolCta(
        "/protein-calculator",
        "protein calculator",
        "Creatine works best alongside enough protein. Find your daily target with the",
      ),

      takeaways([
        "Creatine is a natural compound your body makes and stores in muscle — not a steroid or a hormone.",
        "Taken at 3–5 g a day with strength training, it helps you do more reps, get stronger, and gain a little more muscle.",
        "Research in healthy people hasn’t found kidney damage, and a 2025 trial found no effect on hair — but always tell your doctor before a blood test.",
        "Expect 1–2 kg of water weight in the muscle at first. Loading and cycling are optional.",
        "Buy plain creatine monohydrate from an authorised seller, and check with a doctor first if you have kidney problems, diabetes, are pregnant, or are under 18.",
      ]),
      p(
        `Supplements are the last 5%. Start with the foundation: <a href="${LINK.proteinForMuscle}">how much protein to build muscle</a> and <a href="${LINK.progressiveOverload}">progressive overload</a>. ${DISCLAIMER}`,
      ),
    ].join("\n"),
  },
];
