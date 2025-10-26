// ============================================================================
// CHEMRESEARCH_V2_ENHANCED.JS – Enhanced with missing processes
// ============================================================================
/* global elements, behaviors, pixel, settings */

(() => {
'use strict';

// ... (existing code remains unchanged until the reaction section) ...

// --------------------------------------------------------------------------
// 7. REALISTIC REACTION CHAINS WITH PROPER CONDITIONS (ENHANCED)
// --------------------------------------------------------------------------

// Add missing lysergic_acid production from ergot
elements.ergot = {
  color: ['#5d4037', '#4e342e'],
  behavior: STURDY,
  category: 'botanicals',
  state: 'solid',
  density: 850,
  tempHigh: 150,
  stateHigh: 'ash',
  burn: 60,
  burnTime: 280,
  breakInto: 'ergot_seed',
  reactions: {
    ethanol: { elem1: 'lysergic_acid', elem2: null, chance: 0.15, temp1: 25 },
    methanol: { elem1: 'lysergic_acid', elem2: null, chance: 0.12, temp1: 25 }
  },
  desc: 'Ergot fungus - source of lysergic acid'
};

elements.ergot_seed = {
  color: ['#7e57c2', '#673ab7'],
  behavior: PW,
  category: 'botanicals',
  tempHigh: 200,
  stateHigh: 'ash',
  tempLow: -20,
  stateLow: 'frozen_seed',
  state: 'solid',
  density: 1100,
  reactions: {
    wet_soil: { elem1: 'ergot', elem2: null, chance: 0.03, temp1: 20 },
    mud: { elem1: 'ergot', elem2: null, chance: 0.02, temp1: 20 }
  },
  desc: 'Ergot seed - grows in wet soil'
};

// Add to frozen_seed
elements.frozen_seed.stateHigh.push('ergot_seed');

// Add missing reactions for LSD precursors
elements.diethylamine.reactions = {
  ethanol: { 
    elem1: 'diethylamine_solution', 
    elem2: null, 
    chance: 0.2 
  }
};

elements.diethylamine_solution = {
  color: ['#e0f7fa', '#b2ebf2'],
  behavior: LIQ,
  viscosity: 1000,
  category: 'precursors',
  state: 'liquid',
  density: 850,
  tempHigh: 60,
  stateHigh: 'diethylamine_vapor',
  desc: 'Diethylamine in ethanol solution'
};

// Enhanced lysergic_acid reactions
elements.lysergic_acid.reactions = {
  diethylamine: { 
    elem1: 'lsd_precursor', 
    elem2: null, 
    chance: 0.18, 
    temp1: 25 
  },
  diethylamine_solution: { 
    elem1: 'lsd_precursor', 
    elem2: null, 
    chance: 0.25, 
    temp1: 25 
  }
};

elements.lsd_precursor = {
  color: ['#fce4ec', '#f8bbd0'],
  behavior: LIQ,
  viscosity: 1500,
  category: 'precursors',
  state: 'liquid',
  density: 1100,
  tempHigh: 40,
  stateHigh: 'lsd_crystals',
  reactions: {
    hydrochloric_acid: { 
      elem1: 'lsd', 
      elem2: null, 
      chance: 0.3, 
      temp1: 30 
    }
  },
  desc: 'LSD precursor - requires acidification'
};

// Add potassium permanganate production
elements.manganese_ore = {
  color: ['#757575', '#616161'],
  behavior: PW,
  category: 'minerals',
  state: 'solid',
  density: 4800,
  breakInto: 'manganese_dioxide',
  desc: 'Manganese ore - contains manganese dioxide'
};

elements.manganese_dioxide = {
  color: ['#455a64', '#37474f'],
  behavior: PW,
  category: 'precursors',
  state: 'solid',
  density: 5020,
  reactions: {
    potassium_hydroxide: { 
      elem1: 'potassium_manganate', 
      elem2: null, 
      chance: 0.3,
      temp1: 250 
    }
  },
  desc: 'Manganese dioxide - oxidizer precursor'
};

elements.potassium_manganate = {
  color: ['#2e7d32', '#1b5e20'],
  behavior: PW,
  category: 'precursors',
  state: 'solid',
  density: 2780,
  reactions: {
    water: { 
      elem1: 'potassium_permanganate', 
      elem2: null, 
      chance: 0.4,
      temp1: 60 
    },
    carbon_dioxide: { 
      elem1: 'potassium_permanganate', 
      elem2: null, 
      chance: 0.5,
      temp1: 25 
    }
  },
  desc: 'Potassium manganate - intermediate for permanganate'
};

// Complete cocaine production chain
elements.coca_alkaloids.reactions = {
  sulfuric_acid: { 
    elem1: 'cocaine_sulfate', 
    elem2: null, 
    chance: 0.3 
  },
  lime: { 
    elem1: 'cocaine_base', 
    elem2: null, 
    chance: 0.25 
  }
};

// Complete heroin production chain
elements.morphine_base.reactions = {
  acetic_anhydride: { 
    elem1: 'heroin_base', 
    elem2: 'acetic_acid', 
    chance: 0.35, 
    temp1: 85 
  }
};

// Complete cannabis extraction
elements.cannabis_trichomes.reactions = {
  ice_water: { 
    elem1: 'bubble_hash', 
    elem2: null, 
    chance: 0.25 
  },
  butane: { 
    elem1: 'bho', 
    elem2: null, 
    chance: 0.2 
  }
};

// Add missing reaction for stomach acid
elements.hydrochloric_acid.reactions = elements.hydrochloric_acid.reactions || {};
elements.hydrochloric_acid.reactions.water = {
  elem1: 'stomach_acid',
  elem2: null,
  chance: 0.4
};

// Add missing solvent reactions
elements.ethanol.reactions = elements.ethanol.reactions || {};
elements.ethanol.reactions.ammonia_gas = {
  elem1: 'ethylamine',
  elem2: 'water',
  chance: 0.1,
  temp1: 150
};

elements.ethylamine = {
  color: ['#e1f5fe', '#b3e5fc'],
  behavior: LIQ,
  viscosity: 600,
  category: 'precursors',
  state: 'liquid',
  density: 689,
  tempHigh: 17,
  stateHigh: 'ethylamine_gas',
  reactions: {
    ethanol: { 
      elem1: 'diethylamine', 
      elem2: 'water', 
      chance: 0.15,
      temp1: 180 
    }
  },
  desc: 'Ethylamine - precursor to diethylamine'
};

// --------------------------------------------------------------------------
// 18. ADDITIONAL PROCESSES FOR MISSING ITEMS
// --------------------------------------------------------------------------

// Create potassium hydroxide from wood ash
elements.ash.reactions = elements.ash.reactions || {};
elements.ash.reactions.water = {
  elem1: 'potassium_hydroxide_solution',
  elem2: null,
  chance: 0.3
};

elements.potassium_hydroxide_solution = {
  color: ['#f5f5f5', '#e0e0e0'],
  behavior: LIQ,
  viscosity: 1500,
  category: 'precursors',
  state: 'liquid',
  density: 1240,
  tempHigh: 110,
  stateHigh: 'potassium_hydroxide',
  desc: 'Potassium hydroxide solution - caustic'
};

// Complete GHB production
elements.gbl.reactions = {
  sodium_hydroxide: { 
    elem1: 'ghb', 
    elem2: null, 
    chance: 0.4 
  },
  potassium_hydroxide: { 
    elem1: 'ghb', 
    elem2: null, 
    chance: 0.4 
  }
};

// Add reaction for mescaline extraction
elements.peyote = {
  color: ['#4caf50', '#388e3c'],
  behavior: STURDY,
  category: 'botanicals',
  state: 'solid',
  density: 900,
  tempHigh: 160,
  stateHigh: 'ash',
  reactions: {
    ethanol: { 
      elem1: 'mescaline', 
      elem2: null, 
      chance: 0.2 
    },
    methanol: { 
      elem1: 'mescaline', 
      elem2: null, 
      chance: 0.18 
    }
  },
  desc: 'Peyote cactus - source of mescaline'
};

// Add peyote seed
elements.peyote_seed = {
  color: ['#8bc34a', '#7cb342'],
  behavior: PW,
  category: 'botanicals',
  state: 'solid',
  density: 1100,
  reactions: {
    wet_soil: { elem1: 'peyote', elem2: null, chance: 0.02, temp1: 30 },
    mud: { elem1: 'peyote', elem2: null, chance: 0.015, temp1: 30 }
  },
  desc: 'Peyote seed - slow growing cactus'
};

// Add to frozen_seed
elements.frozen_seed.stateHigh.push('peyote_seed');

// Complete DMT production
elements.mimosa_hostilis = {
  color: ['#795548', '#6d4c41'],
  behavior: STURDY,
  category: 'botanicals',
  state: 'solid',
  density: 850,
  tempHigh: 170,
  stateHigh: 'ash',
  reactions: {
    sodium_hydroxide: { 
      elem1: 'dmt_base', 
      elem2: null, 
      chance: 0.25 
    }
  },
  desc: 'Mimosa hostilis - contains DMT'
};

elements.dmt_base = {
  color: ['#fff59d', '#fff176'],
  behavior: PW,
  category: 'precursors',
  state: 'solid',
  density: 1050,
  reactions: {
    solvent_naphtha: { 
      elem1: 'dmt_solution', 
      elem2: null, 
      chance: 0.3 
    }
  },
  desc: 'DMT base - requires solvent extraction'
};

elements.dmt_solution = {
  color: ['#ffecb3', '#ffe082'],
  behavior: LIQ,
  viscosity: 800,
  category: 'precursors',
  state: 'liquid',
  density: 780,
  tempHigh: 65,
  stateHigh: 'dmt',
  desc: 'DMT in solvent - evaporate to crystallize'
};

// --------------------------------------------------------------------------
// 19. FINAL COMPLETION
// --------------------------------------------------------------------------

console.log('✓ ChemResearch v2 Enhanced - ALL ITEMS CREATABLE');
console.log('✓ Added ergot and lysergic acid production');
console.log('✓ Added potassium permanganate synthesis');
console.log('✓ Completed cocaine/heroin production chains');
console.log('✓ Added GHB production from GBL');
console.log('✓ Added mescaline extraction from peyote');
console.log('✓ Added DMT extraction process');
console.log('✓ Added diethylamine synthesis');
console.log('✓ Total processes added: 15+');

})();
