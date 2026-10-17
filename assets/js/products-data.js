/**
 * Herbiveda product catalogue — single source of truth
 * Used by shop.html and product-details.html
 */
window.HERBIVEDA_PRODUCTS = {
  ashwagandha: {
    slug: "ashwagandha",
    name: "Ashwagandha",
    botanical: "Withania somnifera",
    short: "Strongest single-herb evidence for stress, anxiety and sleep — meta-analyses plus ongoing long-COVID research.",
    price: 29.00,
    image: "./assets/images/ashwagandha.webp",
    badge: "Evidence-Backed",
    evidence: ["Stress & anxiety", "Sleep quality", "Adaptogenic support", "Meta-analyses available"],
    forms: ["Root Extract", "Powder", "Capsules"],
    description: "Ashwagandha is a classical Ayurvedic rasayana traditionally used for vitality, stress resilience and sleep. Modern clinical research — including multiple randomised controlled trials and meta-analyses — has examined its effects on perceived stress, anxiety scores, sleep quality and cortisol-related markers. Every batch is lab-tested; certificates of analysis are available."
  },
  turmeric: {
    slug: "turmeric",
    name: "Turmeric (Curcumin)",
    botanical: "Curcuma longa",
    short: "The most-researched herbal compound worldwide — meta-analyses for inflammation, arthritis, IBD and more.",
    price: 24.00,
    image: "./assets/images/product-1.png",
    badge: "Most Researched",
    evidence: ["Inflammation", "Joint comfort", "IBD support", "Bioavailability enhanced"],
    forms: ["Curcumin Extract", "Powder", "Capsules"],
    description: "Turmeric’s active compound curcumin is among the most studied herbal ingredients globally. Meta-analyses support its role in inflammatory pathways, joint comfort and digestive wellness. Herbiveda selects standardised extracts and provides batch certificates."
  },
  boswellia: {
    slug: "boswellia",
    name: "Boswellia (Shallaki)",
    botanical: "Boswellia serrata",
    short: "Solid RCTs for osteoarthritis pain and function; studied for inflammation support.",
    price: 27.00,
    image: "./assets/images/boswellia.webp",
    badge: "Clinical Evidence",
    evidence: ["Osteoarthritis pain", "Joint function", "Inflammation pathways"],
    forms: ["Extract", "Capsules"],
    description: "Boswellia (Shallaki) has a growing body of randomised controlled trials examining its effects on osteoarthritis symptoms and inflammatory markers. Lab-tested batches with COAs available."
  },
  triphala: {
    slug: "triphala",
    name: "Triphala",
    botanical: "Emblica + Terminalia blend",
    short: "Signature polyherb with strong documentation for gut health and microbiome support.",
    price: 22.00,
    image: "./assets/images/product-2.png",
    badge: "Classical Formula",
    evidence: ["Gut motility", "Microbiome support", "Digestive comfort"],
    forms: ["Powder", "Tablets", "Capsules"],
    description: "Triphala is the classic three-fruit formula of Ayurveda. Human studies support its role in digestive regularity and gut comfort. Practitioner-reviewed and batch-tested."
  },
  shatavari: {
    slug: "shatavari",
    name: "Shatavari",
    botanical: "Asparagus racemosus",
    short: "Classical women's tonic with clinical support for lactation and reproductive wellness.",
    price: 26.00,
    image: "./assets/images/product-3.png",
    badge: "Women's Wellness",
    evidence: ["Lactation support", "Reproductive wellness", "Classical tonic"],
    forms: ["Root Extract", "Powder", "Capsules"],
    description: "Shatavari is the primary classical women’s tonic in Ayurveda. Clinical data exists for lactation support; traditional use covers broader reproductive balance. Lab-tested and practitioner-reviewed."
  },
  brahmi: {
    slug: "brahmi",
    name: "Brahmi (Bacopa)",
    botanical: "Bacopa monnieri",
    short: "Positive RCTs for age-related memory and cognitive performance.",
    price: 28.00,
    image: "./assets/images/brahmi.webp",
    badge: "Cognitive Support",
    evidence: ["Memory", "Cognitive performance", "Age-related focus"],
    forms: ["Extract", "Capsules"],
    description: "Brahmi (Bacopa monnieri) has multiple positive randomised trials examining memory and cognitive performance, particularly with consistent use beyond eight weeks."
  },
  shilajit: {
    slug: "shilajit",
    name: "Shilajit",
    botanical: "Mineral pitch (purified)",
    short: "Mineral-rich adaptogen studied for energy, fatigue and mitochondrial support.",
    price: 34.00,
    image: "./assets/images/product-4.png",
    badge: "Adaptogen",
    evidence: ["Energy & fatigue", "Mitochondrial support", "Mineral density"],
    forms: ["Resin", "Capsules"],
    description: "Purified Shilajit is valued in classical texts and modern research for energy, fatigue reduction and mineral support. Only purified, tested material is offered."
  },
  trikatu: {
    slug: "trikatu",
    name: "Trikatu",
    botanical: "Three-spice formula",
    short: "Classical three-spice formula to kindle digestion and support nutrient absorption.",
    price: 18.00,
    image: "./assets/images/product-5.png",
    badge: "Digestive Fire",
    evidence: ["Digestive kindling", "Nutrient absorption", "Classical formula"],
    forms: ["Powder", "Tablets"],
    description: "Trikatu (black pepper, long pepper, ginger) is the classical formula used to kindle agni and support absorption of other herbs and nutrients."
  },
  neem: {
    slug: "neem",
    name: "Neem",
    botanical: "Azadirachta indica",
    short: "Traditional blood-and-skin support herb with antimicrobial and metabolic interest.",
    price: 20.00,
    image: "./assets/images/neem.webp",
    badge: "Skin & Blood",
    evidence: ["Traditional skin support", "Antimicrobial interest", "Metabolic research"],
    forms: ["Leaf Powder", "Extract", "Capsules"],
    description: "Neem has a long traditional use for blood and skin support. Modern interest includes antimicrobial and metabolic pathways. Lab-tested batches available."
  },
  fenugreek: {
    slug: "fenugreek",
    name: "Fenugreek",
    botanical: "Trigonella foenum-graecum",
    short: "Meta-analysis support for blood glucose in type 2 diabetes; listed in NIH LactMed for lactation.",
    price: 19.00,
    image: "./assets/images/fenugreek.webp",
    badge: "Metabolic",
    evidence: ["Blood glucose support", "Lactation (LactMed)", "Meta-analysis data"],
    forms: ["Seed Powder", "Capsules"],
    description: "Fenugreek has meta-analysis support in the context of blood glucose and is listed in NIH LactMed for lactation. Practitioner guidance recommended."
  },
  valerian: {
    slug: "valerian",
    name: "Valerian",
    botanical: "Valeriana officinalis",
    short: "Well-studied for sleep onset and mild insomnia support.",
    price: 23.00,
    image: "./assets/images/product-6.png",
    badge: "Sleep Support",
    evidence: ["Sleep onset", "Mild insomnia", "Well-studied herb"],
    forms: ["Root Extract", "Capsules"],
    description: "Valerian is one of the better-studied herbs for sleep onset and mild insomnia. Suitable as part of a broader sleep hygiene approach."
  },
  licorice: {
    slug: "licorice",
    name: "Licorice (Yashtimadhu)",
    botanical: "Glycyrrhiza glabra",
    short: "Soothing demulcent for throat and gut lining; classical harmonizing herb in formulas.",
    price: 17.00,
    image: "./assets/images/licorice.webp",
    badge: "Soothing",
    evidence: ["Throat & gut lining", "Classical harmonizer", "Demulcent action"],
    forms: ["Root Powder", "Extract"],
    description: "Yashtimadhu (licorice) is the classical soothing and harmonizing herb used both alone and in many polyherbal formulas. Demulcent properties support throat and gut lining."
  }
};

window.HERBIVEDA_PRODUCT_LIST = Object.values(window.HERBIVEDA_PRODUCTS);
