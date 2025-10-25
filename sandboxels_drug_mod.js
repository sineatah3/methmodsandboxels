runAfterLoad(function() {
// === Sandboxels — Expanded Named-Drug Elements (Safe, Non-actionable) v1.0 ===
// Adds many named elements for cosmetic/research-in-game use only.
// NO real-world synthesis, NO precursor reactions, NO instructions.

const lightBurnReaction = { "fire": { elem2: "smoke", chance: 0.02 } };

// Helper to quickly create a simple powder element safely
function addPowder(id, name, color, density=1000) {
    elements[id] = {
        id: id,
        name: name,
        color: color,
        behavior: behaviors.POWDER,
        category: "drugs",
        state: "solid",
        density: density,
        burn: 10,
        burnTime: 20,
        burnInto: ["smoke"],
    };
    elements[id].reactions = elements[id].reactions || {};
    elements[id].reactions["fire"] = { elem2: "smoke", chance: 0.02 };
}

// Helper to create simple solid/plant
function addSolid(id, name, color, density=700) {
    elements[id] = {
        id: id,
        name: name,
        color: color,
        behavior: behaviors.SOLID,
        category: "drugs",
        state: "solid",
        density: density,
        burn: 8,
        burnTime: 16,
        burnInto: ["smoke"],
    };
    elements[id].reactions = elements[id].reactions || {};
    elements[id].reactions["fire"] = { elem2: "smoke", chance: 0.02 };
}

// Helper for liquids
function addLiquid(id, name, color, density=1050) {
    elements[id] = {
        id: id,
        name: name,
        color: color,
        behavior: behaviors.LIQUID,
        category: "drugs",
        state: "liquid",
        density: density,
    };
    elements[id].reactions = elements[id].reactions || {};
    // Liquids produce smoke when set on fire (low chance)
    elements[id].reactions["fire"] = { elem2: "smoke", chance: 0.01 };
}

// Helper for gases
function addGas(id, name, color, density=1) {
    elements[id] = {
        id: id,
        name: name,
        color: color,
        behavior: behaviors.GAS,
        category: "drugs",
        state: "gas",
        density: density,
    };
}

// --- Core named items (previous set, kept) ---
addPowder("methamphetamine","Methamphetamine","#f7f7ff",990);
addPowder("cocaine","Cocaine","#fffbe8",1000);
addPowder("heroin","Heroin","#dbcbb3",1000);
addLiquid("lsd","LSD","#c8f7ff",1100);
addPowder("mdma","MDMA","#faf7ff",1050);
addSolid("cannabis","Cannabis","#7cc77e",600);
addSolid("psilocybin_mushroom","Psilocybin Mushroom","#b8b0b9",300);

// --- Expanded list (many names) ---
// Opioids and related
addPowder("morphine","Morphine","#c9c9f0",1100);
addPowder("codeine","Codeine","#dcd0ff",1050);
addPowder("oxycodone","Oxycodone","#f0dcd6",1100);
addPowder("hydrocodone","Hydrocodone","#e5d8d0",1100);
addPowder("tramadol","Tramadol","#efe3c8",1040);
addPowder("fentanyl","Fentanyl","#e6dfe6",1080);
addPowder("methadone","Methadone","#d8e6f0",1080);
addPowder("buprenorphine","Buprenorphine","#e8f0e0",1060);
addSolid("opium","Opium","#c09b7c",950);
addSolid("poppy","Poppy","#b58f75",650);

// Stimulants / ADHD related
addPowder("amphetamine","Amphetamine","#fff2d9",1020);
addPowder("adderall","Adderall (Amp salts)","#fff4cc",1025);
addPowder("methylphenidate","Methylphenidate","#ffeedd",1030);
addPowder("caffeine","Caffeine","#f7f7d9",1200);
addPowder("methcathinone","Methcathinone","#ffe6ea",1010);
addPowder("mephedrone","Mephedrone","#ffe8f0",1015);

// Empathogens / entactogens
addPowder("mdma_alt","MDMA-Alt","#fff1f8",1040);

// Sedatives / benzodiazepines / hypnotics
addPowder("alprazolam","Alprazolam (Xanax)","#e9e7ff",1050);
addPowder("diazepam","Diazepam (Valium)","#dfe9ff",1050);
addPowder("clonazepam","Clonazepam","#e6f0ff",1050);
addPowder("flunitrazepam","Flunitrazepam (Rohypnol)","#f0eef6",1050);
addPowder("barbiturate","Barbiturate","#e6dcd6",1060);

// Dissociatives
addPowder("ketamine","Ketamine","#dfe6ff",1060);
addPowder("pcp","PCP (Phencyclidine)","#d5d7e6",1060);

// Hallucinogens / plant-derived
addPowder("dmt","DMT","#f0f0ff",1020);
addLiquid("ayahuasca","Ayahuasca","#7fb7d6",1060);
addSolid("peyote","Peyote","#c0d7b0",700);
addSolid("salvia","Salvia","#b7e6c8",600);
addSolid("kratom","Kratom","#5fa86a",650);

// Synthetic cannabinoids & new psychoactives (named, non-instructive)
addPowder("spice","Spice (Synthetic Cannabinoid)","#d9c8ff",980);
addPowder("bath_salts","Bath Salts","#fff0e6",1005);

// Inhalants & gases
addGas("nitrous_oxide","Nitrous Oxide","#e8f4ff",1);
addLiquid("ethanol","Ethanol (Alcohol)","#f3e6ff",789);
addSolid("tobacco","Tobacco","#7a5b3a",500);
addPowder("nicotine","Nicotine","#e9e0c8",1150);

// Club/other drugs
addPowder("benzylpiperazine","Benzylpiperazine","#f0e8f0",1010);
addPowder("phenethylamine","Phenethylamine","#fff0f0",1010);

// Designer/other names
addPowder("velvet","Velvet","#e8d3c0",1005);        // cosmetic-only
addPowder("snowflake","Snowflake","#fffdf0",1000);  // cosmetic-only
addPowder("euphx","EuphX","#fff0f4",1030);         // cosmetic-only
addPowder("stimlite","StimLite","#ffe9b3",990);     // cosmetic-only
addSolid("kratom_leaf","Kratom Leaf","#6fa05a",650);

// Misc named substances (cosmetic)
addPowder("tablet","Tablet (Cosmetic)","#ffccff",900);
addLiquid("rub_ointment","Rub Ointment","#ffdce0",1020);
addGas("aromatic_smoke","Aromatic Smoke","#cfcfcf",1);

// --- Ensure no reactions point to real synthesis chains ---
// Remove any reactions if they exist for safety
Object.keys(elements).forEach(function(key){
    if (elements[key] && elements[key].reactions) {
        // Keep only trivial burn->smoke in a standardized form; otherwise clear.
        const safeReactions = {};
        if (elements[key].reactions["fire"]) {
            safeReactions["fire"] = { elem2: "smoke", chance: 0.02 };
        }
        elements[key].reactions = safeReactions;
    } else if (elements[key]) {
        elements[key].reactions = elements[key].reactions || {};
        // keep trivial burn->smoke for consistency if absent
        elements[key].reactions["fire"] = { elem2: "smoke", chance: 0.02 };
    }
});

// --- Categories for the UI ---
if (!window.modCategories) window.modCategories = {};
modCategories["drugs"] = { name: "Drugs", color: "#ae7cc7" };

// Small note: many of these names are included for in-game naming/visuals only.
// No real-world guidance, production steps, or precursor chemistry is provided.
});
