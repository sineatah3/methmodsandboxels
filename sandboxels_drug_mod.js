runAfterLoad(function() {
// === Sandboxels — Safe Abstract Crafting Mod (v1.0) ===
// PURPOSE: Allow in-game "crafting" of named elements using fictional reagents and equipment.
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

// -------------------- Fictional reagents & equipment --------------------
// Generic fictional reagents (unique sets per product to avoid implication of real chemistry)
addSimplePowder("reagent_m_a","Reagent M‑A","#cfe6ff","fictional_reagents",960);
addSimpleLiquid("solvent_m_q","Solvent M‑Q","#c8f0ff","fictional_reagents",1020);
addSimplePowder("catalyst_m_z","Catalyst M‑Z","#ffdca8","fictional_reagents",1200);

addSimplePowder("reagent_c_a","Reagent C‑A","#efe8d8","fictional_reagents",980);
addSimpleLiquid("solvent_c_q","Solvent C‑Q","#f7f0e8","fictional_reagents",1005);

addSimplePowder("reagent_h_a","Reagent H‑A","#efe0d6","fictional_reagents",990);
addSimplePowder("reagent_h_b","Reagent H‑B","#f2e8e0","fictional_reagents",980);
addSimpleLiquid("solvent_h_q","Solvent H‑Q","#f0e6f0","fictional_reagents",1030);

addSimplePowder("reagent_x_a","Reagent X‑A","#fbeef8","fictional_reagents",1005);
addSimpleLiquid("solvent_x_q","Solvent X‑Q","#ffdfff","fictional_reagents",1040);

// Lab equipment (place these blocks to enable transformations)
addSimpleSolid("mixer","Mixer (Equipment)","#9aa9b0","lab",3000);
addSimpleSolid("heater","Heater (Equipment)","#b04a2b","lab",3500);
addSimpleSolid("dry_box","Dry Box (Equipment)","#6f6f6f","lab",3000);
addSimpleSolid("filter_unit","Filter Unit (Equipment)","#9a7f6f","lab",3000);

// -------------------- Intermediate process elements --------------------
addSimplePowder("mix_meth","Mix: Crystal‑type","#dfeffb","process_intermediates",1100);
addSimpleLiquid("solution_meth","Solution: Crystal‑type","#eaf6ff","process_intermediates",1030);
addSimplePowder("crystals_meth","Crystalline Mass (wet)","#f7fbff","process_intermediates",1120);

addSimplePowder("mix_coke","Mix: White Paste","#f3efe0","process_intermediates",1100);
addSimpleLiquid("solution_coke","Solution: White","#fefbf2","process_intermediates",1035);
addSimplePowder("crystals_coke","Cake Mass (wet)","#fff7e6","process_intermediates",1120);

addSimplePowder("mix_her","Mix: Tannish","#efe0d6","process_intermediates",1100);
addSimpleLiquid("solution_her","Solution: Tan","#f7efe6","process_intermediates",1040);
addSimplePowder("crystals_her","Tannish Mass (wet)","#efe6dd","process_intermediates",1120);

addSimplePowder("mix_mdma","Mix: Pinkish","#fbeef8","process_intermediates",1100);
addSimpleLiquid("solution_mdma","Solution: Pink","#fff0f6","process_intermediates",1040);
addSimplePowder("crystals_mdma","Pink Mass (wet)","#ffeef9","process_intermediates",1120);

// -------------------- Final presentational products (named as requested) --------------------
addSimplePowder("methamphetamine","Methamphetamine","#f7f7ff","drugs",990);
addSimplePowder("cocaine","Cocaine","#fffbe8","drugs",1000);
addSimplePowder("heroin","Heroin","#dbcbb3","drugs",1000);
addSimplePowder("mdma","MDMA","#faf7ff","drugs",1050);
addSimpleLiquid("lsd","LSD (Presentational)","#c8f7ff","drugs",1100);
addSimpleSolid("cannabis","Cannabis","#7cc77e","drugs",600);
addSimpleSolid("psilocybin_mushroom","Psilocybin Mushroom","#b8b0b9","drugs",300);

// -------------------- Safe abstract process rules --------------------
/*
Workflow pattern (abstract, fictional):
1) Place the required fictional reagents adjacent to a Mixer.
   - reagents + mixer -> mix (low chance).
2) Optionally place Mixer near Heater to convert mix -> solution (very low chance).
3) Place solution near Filter Unit and Dry Box (or Heater+DryBox) to convert -> wet crystalline mass.
4) Place wet crystalline mass inside Dry Box (or near heater + dry box) to convert -> final presentational product.
All conversions use fictional reagents and small chances to avoid runaway conversions.
*/

// Step 1: reagents -> mixes (triggered when adjacent to mixer)
elements.reagent_m_a.reactions["mixer"] = { elem2: "mix_meth", chance: 0.08 };
elements.solvent_m_q.reactions["mixer"] = { elem2: "mix_meth", chance: 0.06 };
elements.catalyst_m_z.reactions["mixer"] = { elem2: "mix_meth", chance: 0.04 };

elements.reagent_c_a.reactions["mixer"] = { elem2: "mix_coke", chance: 0.08 };
elements.solvent_c_q.reactions["mixer"] = { elem2: "mix_coke", chance: 0.06 };

elements.reagent_h_a.reactions["mixer"] = { elem2: "mix_her", chance: 0.07 };
elements.reagent_h_b.reactions["mixer"] = { elem2: "mix_her", chance: 0.05 };
elements.solvent_h_q.reactions["mixer"] = { elem2: "mix_her", chance: 0.04 };

elements.reagent_x_a.reactions["mixer"] = { elem2: "mix_mdma", chance: 0.07 };
elements.solvent_x_q.reactions["mixer"] = { elem2: "mix_mdma", chance: 0.05 };

// Step 2: mixes -> solutions when heater present (low chance)
elements.mix_meth.reactions["heater"] = { elem2: "solution_meth", chance: 0.03 };
elements.mix_coke.reactions["heater"] = { elem2: "solution_coke", chance: 0.03 };
elements.mix_her.reactions["heater"] = { elem2: "solution_her", chance: 0.03 };
elements.mix_mdma.reactions["heater"] = { elem2: "solution_mdma", chance: 0.03 };

// Step 3: solutions -> wet crystals when near filter_unit or when heated near dry_box
elements.solution_meth.reactions["filter_unit"] = { elem2: "crystals_meth", chance: 0.04 };
elements.solution_coke.reactions["filter_unit"] = { elem2: "crystals_coke", chance: 0.04 };
elements.solution_her.reactions["filter_unit"] = { elem2: "crystals_her", chance: 0.04 };
elements.solution_mdma.reactions["filter_unit"] = { elem2: "crystals_mdma", chance: 0.04 };

elements.solution_meth.reactions["heater"] = { elem2: "crystals_meth", chance: 0.01 };
elements.solution_coke.reactions["heater"] = { elem2: "crystals_coke", chance: 0.01 };
elements.solution_her.reactions["heater"] = { elem2: "crystals_her", chance: 0.01 };
elements.solution_mdma.reactions["heater"] = { elem2: "crystals_mdma", chance: 0.01 };

// Step 4: wet crystals -> final product when near dry_box (low chance) or by heater+dry_box
elements.crystals_meth.reactions["dry_box"] = { elem2: "methamphetamine", chance: 0.02 };
elements.crystals_coke.reactions["dry_box"] = { elem2: "cocaine", chance: 0.02 };
elements.crystals_her.reactions["dry_box"] = { elem2: "heroin", chance: 0.02 };
elements.crystals_mdma.reactions["dry_box"] = { elem2: "mdma", chance: 0.02 };

elements.crystals_meth.reactions["heater"] = { elem2: "methamphetamine", chance: 0.005 };
elements.crystals_coke.reactions["heater"] = { elem2: "cocaine", chance: 0.005 };
elements.crystals_her.reactions["heater"] = { elem2: "heroin", chance: 0.005 };
elements.crystals_mdma.reactions["heater"] = { elem2: "mdma", chance: 0.005 };

// -------------------- Safety / performance guardrails --------------------
// - All chances are intentionally small to avoid mass simultaneous conversions.
// - Final products have NO reactions that reverse into intermediates.
// - Intermediates do not spawn infinite effects or heavy behavior strings.
// - Keep brush sizes small when testing (single pixel or tiny brushes).

// Helper: ensure no element accidentally has heavy behavior arrays
Object.keys(elements).forEach(function(k){
    if (elements[k] && Array.isArray(elements[k].behavior) && elements[k].behavior.length>4) {
        // simplify if something large slipped in
        elements[k].behavior = behaviors.POWDER;
    }
});

// -------------------- Categories for UI --------------------
if (!window.modCategories) window.modCategories = {};
modCategories["fictional_reagents"] = { name: "Fictional Reagents", color: "#9ad3c7" };
modCategories["lab"] = { name: "Lab Equipment", color: "#c9c9c9" };
modCategories["process_intermediates"] = { name: "Process Mixes", color: "#e4d19c" };
modCategories["drugs"] = { name: "Drugs (Presentational)", color: "#ae7cc7" };

// -------------------- Quick usage notes (in‑game) --------------------
/*
To experiment:
1) Place one Mixer block.
2) Place the fictional reagents (e.g., Reagent M‑A, Solvent M‑Q, Catalyst M‑Z) adjacent to the Mixer.
   - Wait a bit for small-chance conversions to produce the "mix_meth" intermediate.
3) Place a Heater nearby (or on the Mixer) to convert mix -> solution (rare).
4) Place a Filter Unit and Dry Box near the solution to produce wet crystals and then the final presentational product.
5) Use small brush sizes; conversions are low-probability and designed to be gradual.

This entire system uses fictional reagents and abstracted rules only and does not provide any real-world instructions.
*/
});
