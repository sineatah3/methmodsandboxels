runAfterLoad(function() {
// === Sandboxels Drug Simulation Mod v1.12 ===
// Educational/Research Purposes Only

// --- Precursors and Intermediates ---

elements.pseudoephedrine = {
    id: "pseudoephedrine",
    name: "Pseudoephedrine",
    color: "#c7e6fa",
    behavior: behaviors.POWDER,
    category: "precursors",
    state: "solid",
    density: 1200,
};

elements.red_phosphorus = {
    id: "red_phosphorus",
    name: "Red Phosphorus",
    color: "#b22222",
    behavior: behaviors.POWDER,
    category: "precursors",
    state: "solid",
    density: 2200,
};

elements.iodine = {
    id: "iodine",
    name: "Iodine",
    color: "#6e3b6e",
    behavior: behaviors.POWDER,
    category: "precursors",
    state: "solid",
    density: 4930,
};

elements.hcl = {
    id: "hcl",
    name: "Hydrochloric Acid",
    color: "#e0ffe0",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1200,
};

elements.safrole = {
    id: "safrole",
    name: "Safrole",
    color: "#c2e67f",
    behavior: behaviors.LIQUID,
    category: "precursors",
    state: "liquid",
    density: 1050,
};

elements.mercury_aluminum = {
    id: "mercury_aluminum",
    name: "Mercury-Aluminum Amalgam",
    color: "#c0c0c0",
    behavior: behaviors.SOLID,
    category: "precursors",
    state: "solid",
    density: 4000,
};

elements.coca_leaf = {
    id: "coca_leaf",
    name: "Coca Leaf",
    color: "#4a7c2c",
    behavior: behaviors.SOLID,
    category: "plants",
    state: "solid",
    density: 500,
};

elements.sulfuric_acid = {
    id: "sulfuric_acid",
    name: "Sulfuric Acid",
    color: "#f5e8bc",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1800,
};

elements.sodium_bicarbonate = {
    id: "sodium_bicarbonate",
    name: "Sodium Bicarbonate",
    color: "#e0e0e0",
    behavior: behaviors.POWDER,
    category: "powders",
    state: "solid",
    density: 2200,
};

elements.acetic_anhydride = {
    id: "acetic_anhydride",
    name: "Acetic Anhydride",
    color: "#e5f5fa",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 1080,
};

elements.morphine = {
    id: "morphine",
    name: "Morphine",
    color: "#c9c9f0",
    behavior: behaviors.POWDER,
    category: "precursors",
    state: "solid",
    density: 1100,
};

elements.ergot = {
    id: "ergot",
    name: "Ergot",
    color: "#2f194b",
    behavior: behaviors.SOLID,
    category: "fungi",
    state: "solid",
    density: 1000,
};

elements.diethylamine = {
    id: "diethylamine",
    name: "Diethylamine",
    color: "#d1f5c4",
    behavior: behaviors.LIQUID,
    category: "liquids",
    state: "liquid",
    density: 707,
};

elements.cannabis_plant = {
    id: "cannabis_plant",
    name: "Cannabis Plant",
    color: "#3d7040",
    behavior: behaviors.SOLID,
    category: "plants",
    state: "solid",
    density: 700,
};

elements.mushroom_spores = {
    id: "mushroom_spores",
    name: "Mushroom Spores",
    color: "#e5e5d5",
    behavior: behaviors.POWDER,
    category: "fungi",
    state: "solid",
    density: 100,
};

elements.organic_matter = {
    id: "organic_matter",
    name: "Organic Matter",
    color: "#5b3a1c",
    behavior: behaviors.SOLID,
    category: "soil",
    state: "solid",
    density: 1200,
};

// --- Intermediates ---

elements.meth_intermediate = {
    id: "meth_intermediate",
    name: "Meth Intermediate",
    color: "#b1d1c1",
    behavior: behaviors.POWDER,
    category: "intermediates",
    state: "solid",
    density: 1100,
};

elements.cocaine_paste = {
    id: "cocaine_paste",
    name: "Cocaine Paste",
    color: "#cfcfac",
    behavior: behaviors.PASTE,
    category: "intermediates",
    state: "solid",
    density: 1100,
};

elements.heroin_intermediate = {
    id: "heroin_intermediate",
    name: "Heroin Intermediate",
    color: "#e8e0d6",
    behavior: behaviors.POWDER,
    category: "intermediates",
    state: "solid",
    density: 1100,
};

elements.lsd_intermediate = {
    id: "lsd_intermediate",
    name: "LSD Intermediate",
    color: "#c7f0e7",
    behavior: behaviors.PASTE,
    category: "intermediates",
    state: "solid",
    density: 1100,
};

elements.mdma_intermediate = {
    id: "mdma_intermediate",
    name: "MDMA Intermediate",
    color: "#e5e0f7",
    behavior: behaviors.POWDER,
    category: "intermediates",
    state: "solid",
    density: 1100,
};

// --- Final Substances ---

elements.methamphetamine = {
    id: "methamphetamine",
    name: "Methamphetamine",
    color: "#f7f7ff",
    behavior: [
        "XX|CR:smoke,smoke,smoke|XX",
        "CR:smoke,smoke,smoke|CH|CR:smoke,smoke,smoke",
        "M2|M1|M2"
    ],
    category: "drugs",
    state: "solid",
    density: 990,
    tempHigh: 170,
    stateHigh: "methamphetamine_gas",
    burn: 30,
    burnTime: 40,
    burnInto: ["smoke", "toxic_gas"],
};

elements.methamphetamine_gas = {
    id: "methamphetamine_gas",
    name: "Methamphetamine Gas",
    color: "#e6f2ff",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1,
    tempLow: 169,
    stateLow: "methamphetamine"
};

elements.cocaine = {
    id: "cocaine",
    name: "Cocaine",
    color: "#fffbe8",
    behavior: behaviors.POWDER,
    category: "drugs",
    state: "solid",
    density: 1000,
    burn: 20,
    burnTime: 35,
    burnInto: ["smoke", "toxic_gas"],
};

elements.heroin = {
    id: "heroin",
    name: "Heroin",
    color: "#dbcbb3",
    behavior: behaviors.POWDER,
    category: "drugs",
    state: "solid",
    density: 1000,
    burn: 20,
    burnTime: 35,
    burnInto: ["smoke", "toxic_gas"],
};

elements.lsd = {
    id: "lsd",
    name: "LSD",
    color: "#c8f7ff",
    behavior: behaviors.LIQUID,
    category: "drugs",
    state: "liquid",
    density: 1100,
    tempHigh: 90,
    stateHigh: "lsd_gas",
    burn: 10,
    burnTime: 10,
};

elements.lsd_gas = {
    id: "lsd_gas",
    name: "LSD Gas",
    color: "#d0f8ff",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1,
    tempLow: 89,
    stateLow: "lsd"
};

elements.mdma = {
    id: "mdma",
    name: "MDMA",
    color: "#faf7ff",
    behavior: behaviors.POWDER,
    category: "drugs",
    state: "solid",
    density: 1050,
    burn: 15,
    burnTime: 25,
    burnInto: ["smoke", "toxic_gas"],
};

elements.cannabis = {
    id: "cannabis",
    name: "Cannabis",
    color: "#7cc77e",
    behavior: [
        "XX|CR:smoke,smoke,smoke|XX",
        "CR:smoke,smoke,smoke|CH|CR:smoke,smoke,smoke",
        "M2|M1|M2"
    ],
    category: "drugs",
    state: "solid",
    density: 600,
    burn: 15,
    burnTime: 20,
    burnInto: ["smoke", "toxic_gas"],
};

elements.psilocybin_mushroom = {
    id: "psilocybin_mushroom",
    name: "Psilocybin Mushroom",
    color: "#b8b0b9",
    behavior: behaviors.SOLID,
    category: "fungi",
    state: "solid",
    density: 300,
    burn: 10,
    burnTime: 15,
    burnInto: ["smoke", "toxic_gas"],
};


// --- Reactions: Synthesis Processes ---

// Methamphetamine: Pseudoephedrine + Red Phosphorus + Iodine + HCl + Heat
elements.pseudoephedrine.reactions = {
    "red_phosphorus": { elem2: "meth_intermediate", chance: 0.7 },
    "iodine": { elem2: "meth_intermediate", chance: 0.7 }
};
elements.meth_intermediate.reactions = {
    "hcl": { elem2: "methamphetamine", chance: 0.8 }
};

// Cocaine: Coca Leaf + Sulfuric Acid → Coca Paste + Sodium Bicarbonate + Heat → Cocaine
elements.coca_leaf.reactions = {
    "sulfuric_acid": { elem2: "cocaine_paste", chance: 0.7 }
};
elements.cocaine_paste.reactions = {
    "sodium_bicarbonate": { elem2: "cocaine", chance: 0.7 }
};

// Heroin: Morphine + Acetic Anhydride + Heat → Heroin
elements.morphine.reactions = {
    "acetic_anhydride": { elem2: "heroin", chance: 0.7 }
};

// LSD: Ergot + Diethylamine + Acid → LSD Intermediate + Heat → LSD
elements.ergot.reactions = {
    "diethylamine": { elem2: "lsd_intermediate", chance: 0.6 }
};
elements.lsd_intermediate.reactions = {
    "sulfuric_acid": { elem2: "lsd", chance: 0.6 }
};

// MDMA: Safrole + Acid + (Optional: Mercury-Aluminum) + Heat → MDMA Intermediate → MDMA
elements.safrole.reactions = {
    "hcl": { elem2: "mdma_intermediate", chance: 0.6 },
    "mercury_aluminum": { elem2: "mdma_intermediate", chance: 0.7 }
};
elements.mdma_intermediate.reactions = {
    "hcl": { elem2: "mdma", chance: 0.7 }
};

// Cannabis: Harvested as 'cannabis_plant', can be dried/heated to get 'cannabis'
elements.cannabis_plant.tempHigh = 60;
elements.cannabis_plant.stateHigh = "cannabis";

// Psilocybin Mushrooms: Spores + Organic Matter + Time → Mushroom
elements.mushroom_spores.reactions = {
    "organic_matter": { elem2: "psilocybin_mushroom", chance: 0.4 }
};

// --- Optional: Toxic Gas Element ---

elements.toxic_gas = {
    id: "toxic_gas",
    name: "Toxic Gas",
    color: "#aaffff",
    behavior: behaviors.GAS,
    category: "gases",
    state: "gas",
    density: 1,
};


// --- Categories for the Elements ---
if (!window.modCategories) window.modCategories = {};
modCategories["drugs"] = {
    name: "Drugs (Sim)",
    color: "#ae7cc7"
};
modCategories["precursors"] = {
    name: "Precursors",
    color: "#9ad3c7"
};
modCategories["intermediates"] = {
    name: "Intermediates",
    color: "#e4d19c"
};
modCategories["fungi"] = {
    name: "Fungi",
    color: "#b48ed9"
};
modCategories["plants"] = {
    name: "Plants",
    color: "#7ea974"
};
modCategories["soil"] = {
    name: "Soil/Organic",
    color: "#7e6651"
};
});
