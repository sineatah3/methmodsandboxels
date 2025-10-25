runAfterLoad(function() {
// === Sandboxels — Safe Abstract Crafting Mod (Extended Drugs v1.1) ===
// PURPOSE: Adds a comprehensive set of fictional drugs and their synthesis pathways for research and experimentation.
// THIS FILE CONTAINS NO REAL-WORLD SYNTHESIS, NO REAL PRECURSORS, AND NO ACTIONABLE INSTRUCTIONS.

// -------------------- Helper factories --------------------
function addSimplePowder(id,name,color,category="drugs",density=1000){
    elements[id] = {
        id: id,
        name: name,
        color: color,
        behavior: behaviors.POWDER,
        category: category,
        state: "solid",
        density: density,
        burn: 8,
        burnTime: 18,
        burnInto: ["smoke"]
    };
    elements[id].reactions = elements[id].reactions || {};
}

function addSimpleLiquid(id,name,color,category="drugs",density=1050){
    elements[id] = {
        id: id,
        name: name,
        color: color,
        behavior: behaviors.LIQUID,
        category: category,
        state: "liquid",
        density: density
    };
    elements[id].reactions = elements[id].reactions || {};
}

function addSimpleSolid(id,name,color,category="drugs",density=800){
    elements[id] = {
        id: id,
        name: name,
        color: color,
        behavior: behaviors.SOLID,
        category: category,
        state: "solid",
        density: density,
        burn: 6,
        burnTime: 14,
        burnInto: ["smoke"]
    };
    elements[id].reactions = elements[id].reactions || {};
}

// -------------------- Fictional reagents --------------------
addSimplePowder("reagent_fent_a","Reagent F-A","#ffe6e6","fictional_reagents",1020);
addSimpleLiquid("solvent_fent_q","Solvent F-Q","#ffcccc","fictional_reagents",1030);

addSimplePowder("reagent_amp_a","Reagent Amp-A","#e6ffe6","fictional_reagents",1000);
addSimpleLiquid("solvent_amp_q","Solvent Amp-Q","#ccffcc","fictional_reagents",1010);

addSimplePowder("reagent_benz_a","Reagent Benz-A","#e6e6ff","fictional_reagents",980);
addSimpleLiquid("solvent_benz_q","Solvent Benz-Q","#ccccff","fictional_reagents",1000);

addSimplePowder("reagent_methadone_a","Reagent Methadone-A","#ffe6cc","fictional_reagents",1010);
addSimpleLiquid("solvent_methadone_q","Solvent Methadone-Q","#ffd9b3","fictional_reagents",1025);

// -------------------- Lab equipment --------------------
addSimpleSolid("mixer","Mixer (Equipment)","#9aa9b0","lab",3000);
addSimpleSolid("heater","Heater (Equipment)","#b04a2b","lab",3500);
addSimpleSolid("dry_box","Dry Box (Equipment)","#6f6f6f","lab",3000);
addSimpleSolid("filter_unit","Filter Unit (Equipment)","#9a7f6f","lab",3000);

// -------------------- Intermediate process elements --------------------
addSimplePowder("mix_fent","Mix: Light Pink","#ffd9d9","process_intermediates",1100);
addSimpleLiquid("solution_fent","Solution: Pink","#ffb3b3","process_intermediates",1035);
addSimplePowder("crystals_fent","Crystalline Mass (wet)","#ff9999","process_intermediates",1120);

addSimplePowder("mix_amp","Mix: Greenish","#d9ffd9","process_intermediates",1100);
addSimpleLiquid("solution_amp","Solution: Green","#b3ffb3","process_intermediates",1035);
addSimplePowder("crystals_amp","Crystalline Mass (wet)","#99ff99","process_intermediates",1120);

addSimplePowder("mix_benz","Mix: Light Blue","#d9d9ff","process_intermediates",1100);
addSimpleLiquid("solution_benz","Solution: Blue","#b3b3ff","process_intermediates",1035);
addSimplePowder("crystals_benz","Crystalline Mass (wet)","#9999ff","process_intermediates",1120);

addSimplePowder("mix_methadone","Mix: Light Orange","#ffe6cc","process_intermediates",1100);
addSimpleLiquid("solution_methadone","Solution: Orange","#ffd9b3","process_intermediates",1035);
addSimplePowder("crystals_methadone","Crystalline Mass (wet)","#ffc799","process_intermediates",1120);

// -------------------- Final presentational products --------------------
addSimplePowder("fentanyl","Fentanyl","#ff4d4d","drugs",1020);
addSimplePowder("amphetamine","Amphetamine","#33cc33","drugs",1000);
addSimplePowder("benzodiazepine","Benzodiazepine","#4d4dff","drugs",990);
addSimplePowder("methadone","Methadone","#ff944d","drugs",1015);

// -------------------- Safe abstract process rules --------------------
// Step 1: reagents -> mixes (adjacent to mixer)
elements.reagent_fent_a.reactions["mixer"] = { elem2: "mix_fent", chance: 0.08 };
elements.solvent_fent_q.reactions["mixer"] = { elem2: "mix_fent", chance: 0.06 };

elements.reagent_amp_a.reactions["mixer"] = { elem2: "mix_amp", chance: 0.08 };
elements.solvent_amp_q.reactions["mixer"] = { elem2: "mix_amp", chance: 0.06 };

elements.reagent_benz_a.reactions["mixer"] = { elem2: "mix_benz", chance: 0.08 };
elements.solvent_benz_q.reactions["mixer"] = { elem2: "mix_benz", chance: 0.06 };

elements.reagent_methadone_a.reactions["mixer"] = { elem2: "mix_methadone", chance: 0.08 };
elements.solvent_methadone_q.reactions["mixer"] = { elem2: "mix_methadone", chance: 0.06 };

// Step 2: mixes -> solutions (heater)
elements.mix_fent.reactions["heater"] = { elem2: "solution_fent", chance: 0.03 };
elements.mix_amp.reactions["heater"] = { elem2: "solution_amp", chance: 0.03 };
elements.mix_benz.reactions["heater"] = { elem2: "solution_benz", chance: 0.03 };
elements.mix_methadone.reactions["heater"] = { elem2: "solution_methadone", chance: 0.03 };

// Step 3: solutions -> wet crystals (filter_unit or heater+dry_box)
elements.solution_fent.reactions["filter_unit"] = { elem2: "crystals_fent", chance: 0.04 };
elements.solution_amp.reactions["filter_unit"] = { elem2: "crystals_amp", chance: 0.04 };
elements.solution_benz.reactions["filter_unit"] = { elem2: "crystals_benz", chance: 0.04 };
elements.solution_methadone.reactions["filter_unit"] = { elem2: "crystals_methadone", chance: 0.04 };

elements.solution_fent.reactions["heater"] = { elem2: "crystals_fent", chance: 0.01 };
elements.solution_amp.reactions["heater"] = { elem2: "crystals_amp", chance: 0.01 };
elements.solution_benz.reactions["heater"] = { elem2: "crystals_benz", chance: 0.01 };
elements.solution_methadone.reactions["heater"] = { elem2: "crystals_methadone", chance: 0.01 };

// Step 4: wet crystals -> final product (dry_box or heater+dry_box)
elements.crystals_fent.reactions["dry_box"] = { elem2: "fentanyl", chance: 0.02 };
elements.crystals_amp.reactions["dry_box"] = { elem2: "amphetamine", chance: 0.02 };
elements.crystals_benz.reactions["dry_box"] = { elem2: "benzodiazepine", chance: 0.02 };
elements.crystals_methadone.reactions["dry_box"] = { elem2: "methadone", chance: 0.02 };

elements.crystals_fent.reactions["heater"] = { elem2: "fentanyl", chance: 0.005 };
elements.crystals_amp.reactions["heater"] = { elem2: "amphetamine", chance: 0.005 };
elements.crystals_benz.reactions["heater"] = { elem2: "benzodiazepine", chance: 0.005 };
elements.crystals_methadone.reactions["heater"] = { elem2: "methadone", chance: 0.005 };

// -------------------- Categories for UI --------------------
if (!window.modCategories) window.modCategories = {};
modCategories["fictional_reagents"] = { name: "Fictional Reagents", color: "#9ad3c7" };
modCategories["lab"] = { name: "Lab Equipment", color: "#c9c9c9" };
modCategories["process_intermediates"] = { name: "Process Mixes", color: "#e4d19c" };
modCategories["drugs"] = { name: "Drugs (Presentational)", color: "#ae7cc7" };

// -------------------- End of Extended Drugs Mod --------------------
});
