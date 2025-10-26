// ============================================================================
//  CHEMRESEARCH_V2_ENHANCED.JS  –  Educational chemistry with realistic textures
//  MIT licence – Research / EDU use only – No real-world instructions
// ============================================================================
/* global elements, behaviors, pixel, settings */

(() => {
  'use strict';

  // --------------------------------------------------------------------------
  // 0.  ON-LOAD DISCLAIMER
  // --------------------------------------------------------------------------
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      alert(
        'CHEMRESEARCH_V2 ENHANCED – EDUCATIONAL MOD\n' +
        'Simulates real-world chemistry including controlled substances.\n' +
        'No real-world instructions are provided.  Use responsibly.'
      );
    });
  }

  // --------------------------------------------------------------------------
  // 1.  HELPERS
  // --------------------------------------------------------------------------
  const PW   = behaviors.POWDER;
  const LIQ  = behaviors.LIQUID;
  const WALL = behaviors.WALL;
  const STURDY = behaviors.STURDY_PLANT;

  // Multi-texture system for realistic variation
  const textureVariant = (colors) => {
    return Array.isArray(colors) ? colors : [colors];
  };

  const getRandomTexture = (colorArray) => {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
  };

  // --------------------------------------------------------------------------
  // 2.  BOTANICALS (plants + seeds)  –  realistic greens with variation
  // --------------------------------------------------------------------------
  const botanicals = {
    cannabis_sativa: {
      colors: ['#3e8948', '#4a9b54', '#358843', '#469150'],
      seed: 'seed_sativa',
      desc: 'Cannabis sativa - tall, narrow leaves'
    },
    cannabis_indica: {
      colors: ['#2a5d32', '#1f4d28', '#35663a', '#244f2d'],
      seed: 'seed_indica',
      desc: 'Cannabis indica - short, broad leaves'
    },
    cannabis_ruderalis: {
      colors: ['#4a7c59', '#55876a', '#3f7150', '#5a8c6f'],
      seed: 'seed_ruderalis',
      desc: 'Cannabis ruderalis - auto-flowering variant'
    },
    papaver_somniferum: {
      colors: ['#7b1fa2', '#9c27b0', '#6a1b8f', '#8e24aa'],
      seed: 'seed_poppy',
      desc: 'Opium poppy - purple/white flowers'
    },
    coca_boliviana: {
      colors: ['#004d40', '#00695c', '#003d33', '#005b4f'],
      seed: 'seed_coca_bol',
      desc: 'Bolivian coca - high altitude variety'
    },
    coca_colombiana: {
      colors: ['#00695c', '#00897b', '#00564e', '#007a6a'],
      seed: 'seed_coca_col',
      desc: 'Colombian coca - lowland variety'
    },
    ephedra_sinica: {
      colors: ['#827717', '#9e9d24', '#6d6611', '#8f8e1f'],
      seed: 'seed_ephedra',
      desc: 'Ephedra sinica - ma-huang herb'
    },
    khat: {
      colors: ['#558b2f', '#689f38', '#4a7c2a', '#5d9033'],
      seed: 'seed_khat',
      desc: 'Khat plant - contains cathinone'
    },
    kratom: {
      colors: ['#33691e', '#4a7c2f', '#2d5a1a', '#3e6d27'],
      seed: 'seed_kratom',
      desc: 'Mitragyna speciosa - kratom tree'
    },
    psilocybe_cubensis: {
      colors: ['#6d4c41', '#795548', '#5d4037', '#6b4d43'],
      seed: 'spore_cubensis',
      desc: 'Psilocybe cubensis - magic mushroom'
    },
    iboga: {
      colors: ['#3e2723', '#4e342e', '#321d19', '#452e29'],
      seed: 'seed_iboga',
      desc: 'Tabernanthe iboga - African shrub'
    },
    salvia_divinorum: {
      colors: ['#004d40', '#00695c', '#003d33', '#005b4f'],
      seed: 'seed_salvia',
      desc: 'Salvia divinorum - diviners sage'
    },
    banisteriopsis_caapi: {
      colors: ['#2e7d32', '#388e3c', '#1b5e20', '#2e7d32'],
      seed: 'seed_caapi',
      desc: 'Banisteriopsis caapi - ayahuasca vine'
    }
  };

  Object.entries(botanicals).forEach(([plant, cfg]) => {
    const plantColors = textureVariant(cfg.colors);
    elements[plant] = {
      color: plantColors,
      behavior: STURDY,
      category: 'botanicals',
      tempHigh: 200,
      stateHigh: 'dead_plant',
      burn: 85,
      burnTime: 300,
      breakInto: cfg.seed,
      state: 'solid',
      density: 1200,
      desc: cfg.desc + ' - Research use only.'
    };
    
    // Seeds with realistic brown variations
    elements[cfg.seed] = {
      color: ['#8d6e63', '#795548', '#a1887f', '#6d4c41'],
      behavior: PW,
      category: 'botanicals',
      tempHigh: 150,
      stateHigh: 'ash',
      state: 'solid',
      density: 1100,
      reactions: {
        soil: { elem1: plant, chance: 0.02 },
        water: { elem2: 'wet_soil', chance: 0.05 }
      },
      desc: 'Seed/spore - Plant in soil with water'
    };
  });

  // --------------------------------------------------------------------------
  // 3.  RAW BOTANICAL PRODUCTS  –  real colours with texture variation
  // --------------------------------------------------------------------------
  elements.opium_latex = {
    color: ['#4a148c', '#6a1b9a', '#38006b', '#553098'],
    behavior: LIQ,
    viscosity: 2500,
    category: 'raw_alkaloids',
    tempHigh: 120,
    stateHigh: 'smoke',
    state: 'liquid',
    density: 1350,
    reactions: {
      acetic_anhydride: { elem1: 'heroin_base', elem2: null, chance: 0.3 },
      lime: { elem1: 'morphine_base', elem2: null, chance: 0.25 }
    },
    desc: 'Raw opium latex - deep purple-brown sap'
  };

  elements.coca_leaves = {
    color: ['#2e7d32', '#1b5e20', '#388e3c', '#33691e'],
    behavior: PW,
    category: 'botanicals',
    state: 'solid',
    density: 800,
    breakInto: 'coca_alkaloids',
    desc: 'Dried coca leaves'
  };

  elements.coca_alkaloids = {
    color: ['#f9fbe7', '#fff9c4', '#f0f4c3', '#fefce8'],
    behavior: PW,
    category: 'raw_alkaloids',
    state: 'solid',
    density: 1100,
    reactions: {
      gasoline: { elem1: 'coca_paste', elem2: null, chance: 0.2 },
      kerosene: { elem1: 'coca_paste', elem2: null, chance: 0.2 }
    },
    desc: 'Crude coca alkaloids - off-white powder'
  };

  elements.cannabis_flower = {
    color: ['#66bb6a', '#4caf50', '#81c784', '#5da75f'],
    behavior: PW,
    category: 'botanicals',
    state: 'solid',
    density: 900,
    breakInto: ['cannabis_trichomes', 'plant_matter'],
    desc: 'Cannabis flower buds'
  };

  elements.cannabis_trichomes = {
    color: ['#e8f5e9', '#f1f8e9', '#dcedc8', '#fff9c4'],
    behavior: PW,
    category: 'raw_alkaloids',
    state: 'solid',
    density: 950,
    reactions: {
      butane: { elem1: 'bho', elem2: null, chance: 0.25 },
      ice_water: { elem1: 'bubble_hash', elem2: null, chance: 0.2 }
    },
    desc: 'Cannabis trichomes - crystalline kief'
  };

  // --------------------------------------------------------------------------
  // 4.  PRECURSORS & REAGENTS  –  realistic colours with variations
  // --------------------------------------------------------------------------
  const precursors = {
    ephedrine: {
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 1180,
      desc: 'Ephedrine HCl - white crystalline'
    },
    pseudoephedrine: {
      colors: ['#f5f5f5', '#fafafa', '#eeeeee'],
      density: 1200,
      desc: 'Pseudoephedrine - white powder'
    },
    phenylacetic_acid: {
      colors: ['#e0e0e0', '#eeeeee', '#f5f5f5'],
      density: 1080,
      desc: 'Phenylacetic acid - white crystals'
    },
    p2p: {
      colors: ['#d7ccc8', '#bcaaa4', '#c5b8b3'],
      density: 1010,
      liquid: true,
      desc: 'Phenyl-2-propanone - pale yellow oil'
    },
    safrole: {
      colors: ['#8d6e63', '#a1887f', '#795548'],
      density: 1100,
      liquid: true,
      desc: 'Safrole - amber oily liquid'
    },
    isosafrole: {
      colors: ['#6d4c41', '#795548', '#5d4037'],
      density: 1120,
      liquid: true,
      desc: 'Isosafrole - dark amber oil'
    },
    piperonal: {
      colors: ['#efebe9', '#f5f5f5', '#fafafa'],
      density: 1340,
      desc: 'Piperonal - white flaky crystals'
    },
    anhydrous_ammonia: {
      colors: ['#b3e5fc', '#81d4fa', '#4fc3f7'],
      density: 682,
      liquid: true,
      desc: 'Anhydrous ammonia - colorless compressed gas'
    },
    red_phosphorus: {
      colors: ['#d32f2f', '#c62828', '#b71c1c'],
      density: 2340,
      desc: 'Red phosphorus - brick red powder'
    },
    lithium: {
      colors: ['#cfd8dc', '#b0bec5', '#90a4ae'],
      density: 534,
      desc: 'Lithium metal - silvery soft metal'
    },
    sodium_hydroxide: {
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 2130,
      desc: 'Sodium hydroxide - white pellets'
    },
    acetone: {
      colors: ['#e1f5fe', '#b3e5fc', '#81d4fa'],
      density: 784,
      liquid: true,
      desc: 'Acetone - clear volatile liquid'
    },
    hydrochloric_acid: {
      colors: ['#ffeb3b', '#fff176', '#fff59d'],
      density: 1180,
      liquid: true,
      desc: 'Hydrochloric acid - pale yellow fuming liquid'
    },
    sulfuric_acid: {
      colors: ['#ffc107', '#ffb300', '#ffa000'],
      density: 1840,
      liquid: true,
      desc: 'Sulfuric acid - dense oily liquid'
    },
    acetic_anhydride: {
      colors: ['#ffecb3', '#fff9c4', '#ffe082'],
      density: 1082,
      liquid: true,
      desc: 'Acetic anhydride - clear pungent liquid'
    },
    formaldehyde: {
      colors: ['#f1f8e9', '#e8f5e9', '#dcedc8'],
      density: 815,
      liquid: true,
      desc: 'Formaldehyde solution - clear liquid'
    },
    methylamine: {
      colors: ['#e0f2f1', '#b2dfdb', '#80cbc4'],
      density: 656,
      liquid: true,
      desc: 'Methylamine - colorless gas/liquid'
    },
    benzylmagnesium_chloride: {
      colors: ['#fff9c4', '#fff59d', '#fff176'],
      density: 1050,
      liquid: true,
      desc: 'Grignard reagent - pale solution'
    },
    pmk_glycidate: {
      colors: ['#dcedc8', '#c5e1a5', '#aed581'],
      density: 1120,
      liquid: true,
      desc: 'PMK glycidate - pale yellow oil'
    },
    bmk_glycidate: {
      colors: ['#c8e6c9', '#a5d6a7', '#81c784'],
      density: 1100,
      liquid: true,
      desc: 'BMK glycidate - pale oil'
    },
    nitroethane: {
      colors: ['#ffccbc', '#ffab91', '#ff8a65'],
      density: 1052,
      liquid: true,
      desc: 'Nitroethane - pale liquid'
    },
    n_methyl_formamide: {
      colors: ['#e1bee7', '#ce93d8', '#ba68c8'],
      density: 1011,
      liquid: true,
      desc: 'N-Methylformamide - clear liquid'
    },
    lysergic_acid: {
      colors: ['#fce4ec', '#f8bbd0', '#f48fb1'],
      density: 1230,
      desc: 'Lysergic acid - pale crystalline'
    },
    ergotamine: {
      colors: ['#f8bbd0', '#f48fb1', '#f06292'],
      density: 1350,
      desc: 'Ergotamine - crystalline alkaloid'
    },
    thebaine: {
      colors: ['#e1f5fe', '#b3e5fc', '#81d4fa'],
      density: 1310,
      desc: 'Thebaine - white crystalline'
    },
    oripavine: {
      colors: ['#b3e5fc', '#81d4fa', '#4fc3f7'],
      density: 1280,
      desc: 'Oripavine - crystalline alkaloid'
    }
  };

  Object.entries(precursors).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: cfg.liquid ? LIQ : PW,
      category: 'precursors',
      state: cfg.liquid ? 'liquid' : 'solid',
      density: cfg.density,
      viscosity: cfg.liquid ? (cfg.density > 1200 ? 2000 : 1000) : undefined,
      desc: cfg.desc
    };
  });

  // --------------------------------------------------------------------------
  // 5.  FINAL COMPOUNDS  –  real-world hues with crystal/powder variations
  // --------------------------------------------------------------------------
  const compounds = {
    methamphetamine: {
      sched: 'II',
      colors: ['#ffffff', '#fafafa', '#f5f5f5', '#fcfcfc'],
      density: 913,
      desc: 'Methamphetamine HCl - clear/white crystals'
    },
    amphetamine: {
      sched: 'II',
      colors: ['#fafafa', '#ffffff', '#f0f0f0'],
      density: 930,
      desc: 'Amphetamine sulfate - white/off-white powder'
    },
    mdma: {
      sched: 'I',
      colors: ['#fff8e1', '#fff9c4', '#ffecb3', '#fef5d6'],
      density: 1080,
      desc: 'MDMA HCl - champagne/tan crystals'
    },
    mda: {
      sched: 'I',
      colors: ['#ffecb3', '#ffe082', '#ffd54f'],
      density: 1065,
      desc: 'MDA - tan crystalline'
    },
    mde: {
      sched: 'I',
      colors: ['#ffe082', '#ffd54f', '#ffca28'],
      density: 1050,
      desc: 'MDE - amber crystals'
    },
    heroin: {
      sched: 'I',
      colors: ['#ffffff', '#fafafa', '#f8f8f8'],
      density: 1560,
      desc: 'Heroin HCl - white powder (southeast asian)'
    },
    heroin_base: {
      sched: 'I',
      colors: ['#8d6e63', '#a1887f', '#795548', '#6d4c41'],
      density: 1320,
      desc: 'Heroin base - tan/brown powder (mexican black tar)'
    },
    morphine: {
      sched: 'II',
      colors: ['#f5f5f5', '#ffffff', '#fafafa'],
      density: 1320,
      desc: 'Morphine sulfate - white crystalline'
    },
    morphine_base: {
      sched: 'II',
      colors: ['#bcaaa4', '#a1887f', '#8d6e63'],
      density: 1230,
      desc: 'Morphine base - tan powder'
    },
    fentanyl: {
      sched: 'II',
      colors: ['#ffffff', '#fcfcfc', '#fafafa'],
      density: 1100,
      desc: 'Fentanyl citrate - white powder (extremely potent)'
    },
    carfentanil: {
      sched: 'II',
      colors: ['#f1f8e9', '#ffffff', '#f5f5f5'],
      density: 1150,
      desc: 'Carfentanil - off-white powder (elephant tranquilizer)'
    },
    lsd: {
      sched: 'I',
      colors: ['#fff9c4', '#fff59d', '#fff176'],
      density: 1200,
      desc: 'LSD tartrate - pale yellow crystals'
    },
    psilocybin: {
      sched: 'I',
      colors: ['#ffccbc', '#ffab91', '#ff8a65'],
      density: 1340,
      desc: 'Psilocybin - light brown crystalline'
    },
    psilocin: {
      sched: 'I',
      colors: ['#ffab91', '#ff8a65', '#ff7043'],
      density: 1280,
      desc: 'Psilocin - orange-brown crystals'
    },
    mescaline: {
      sched: 'I',
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 1270,
      desc: 'Mescaline HCl - white crystalline'
    },
    dmt: {
      sched: 'I',
      colors: ['#ffeb3b', '#fff176', '#fff59d', '#fdd835'],
      density: 1090,
      desc: 'DMT freebase - yellow waxy crystals'
    },
    cocaine: {
      sched: 'II',
      colors: ['#ffffff', '#fafafa', '#fcfcfc', '#f8f8f8'],
      density: 1220,
      desc: 'Cocaine HCl - shiny white flaky powder'
    },
    crack: {
      sched: 'I',
      colors: ['#d7ccc8', '#bcaaa4', '#c5b8b3', '#e0d5d0'],
      density: 1180,
      desc: 'Crack cocaine - off-white waxy rocks'
    },
    coca_paste: {
      sched: 'I',
      colors: ['#8d6e63', '#a1887f', '#795548'],
      density: 1050,
      desc: 'Coca paste - brown putty-like base'
    },
    pcp: {
      sched: 'II',
      colors: ['#e0e0e0', '#eeeeee', '#f5f5f5'],
      density: 1070,
      liquid: true,
      desc: 'PCP - white powder or clear liquid'
    },
    ketamine: {
      sched: 'III',
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 1520,
      desc: 'Ketamine HCl - white crystalline powder'
    },
    ghb: {
      sched: 'I',
      colors: ['#e1f5fe', '#b3e5fc', '#81d4fa'],
      density: 1320,
      liquid: true,
      desc: 'GHB - clear salty liquid'
    },
    gbl: {
      sched: 'I',
      colors: ['#b3e5fc', '#81d4fa', '#4fc3f7'],
      density: 1124,
      liquid: true,
      desc: 'GBL - clear oily liquid'
    },
    bath_salts: {
      sched: 'I',
      colors: ['#ffecb3', '#ffe082', '#fff9c4'],
      density: 980,
      desc: 'Synthetic cathinones - tan/white crystals'
    },
    spice: {
      sched: 'I',
      colors: ['#689f38', '#7cb342', '#8bc34a'],
      density: 850,
      desc: 'Synthetic cannabinoids on plant matter'
    },
    bho: {
      sched: 'I',
      colors: ['#827717', '#9e9d24', '#afb42b', '#c0ca33'],
      density: 920,
      liquid: true,
      desc: 'Butane hash oil - amber honey-like concentrate'
    },
    bubble_hash: {
      sched: 'I',
      colors: ['#d7ccc8', '#bcaaa4', '#efebe9', '#c5b8b3'],
      density: 1050,
      desc: 'Ice water hash - blonde/tan powder'
    },
    oxycodone: {
      sched: 'II',
      colors: ['#ffffff', '#fafafa'],
      density: 1360,
      desc: 'Oxycodone HCl - white crystalline'
    },
    hydrocodone: {
      sched: 'II',
      colors: ['#f5f5f5', '#ffffff'],
      density: 1330,
      desc: 'Hydrocodone bitartrate - white powder'
    }
  };

  Object.entries(compounds).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: cfg.liquid ? LIQ : PW,
      category: 'research_compounds',
      state: cfg.liquid ? 'liquid' : 'solid',
      density: cfg.density,
      viscosity: cfg.liquid ? 1500 : undefined,
      desc: `Schedule ${cfg.sched} - ${cfg.desc}`
    };
  });

  // --------------------------------------------------------------------------
  // 6.  CRACK-COOKING CHAIN  –  complete with realistic temperatures
  // --------------------------------------------------------------------------
  if (!elements.baking_soda) {
    elements.baking_soda = {
      color: ['#fafafa', '#ffffff', '#f5f5f5'],
      behavior: PW,
      category: 'precursors',
      state: 'solid',
      density: 2200,
      desc: 'Sodium bicarbonate - white powder'
    };
  }

  // Cocaine + water + baking soda → slurry
  elements.cocaine.reactions = {
    water: {
      elem1: 'cocaine_solution',
      elem2: null,
      chance: 0.1
    }
  };

  elements.cocaine_solution = {
    color: ['#f5f5f5', '#fafafa', '#ffffff'],
    behavior: LIQ,
    viscosity: 1200,
    category: 'research_compounds',
    state: 'liquid',
    density: 1050,
    reactions: {
      baking_soda: { elem1: 'crack_slurry', elem2: null, chance: 0.3 }
    },
    desc: 'Cocaine dissolved in water'
  };

  elements.crack_slurry = {
    color: ['#fff3e0', '#ffecb3', '#ffe082'],
    behavior: LIQ,
    viscosity: 2000,
    category: 'research_compounds',
    state: 'liquid',
    density: 1100,
    tempHigh: 85,
    stateHigh: 'crack',
    temp: 20,
    desc: 'Cocaine + NaHCO₃ slurry - Heat to 85°C to precipitate freebase'
  };

  // --------------------------------------------------------------------------
  // 7.  REALISTIC REACTION CHAINS
  // --------------------------------------------------------------------------
  
  // Methamphetamine synthesis routes
  elements.pseudoephedrine.reactions = {
    red_phosphorus: {
      elem1: 'meth_intermediate',
      elem2: null,
      chance: 0.15
    }
  };

  elements.meth_intermediate = {
    color: ['#e0e0e0', '#eeeeee'],
    behavior: LIQ,
    viscosity: 1800,
    category: 'precursors',
    state: 'liquid',
    density: 980,
    reactions: {
      hydrochloric_acid: { elem1: 'methamphetamine', elem2: null, chance: 0.3 }
    },
    desc: 'Methamphetamine freebase intermediate'
  };

  // MDMA synthesis
  elements.safrole.reactions = {
    isosafrole: { elem1: 'mdma_intermediate', elem2: null, chance: 0.2 }
  };

  elements.mdma_intermediate = {
    color: ['#fff9c4', '#ffecb3'],
    behavior: LIQ,
    viscosity: 1600,
    category: 'precursors',
    state: 'liquid',
    density: 1040,
    reactions: {
      methylamine: { elem1: 'mdma', elem2: null, chance: 0.25 }
    },
    desc: 'MDP2P intermediate for MDMA'
  };

  // Heroin synthesis
  elements.morphine_base.reactions = {
    acetic_anhydride: { elem1: 'heroin_base', elem2: null, chance: 0.3 }
  };

  elements.heroin_base.reactions = {
    hydrochloric_acid: { elem1: 'heroin', elem2: null, chance: 0.25 }
  };

  // Cocaine refinement
  elements.coca_paste.reactions = {
    sulfuric_acid: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.2 },
    potassium_permanganate: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.25 }
  };

  elements.cocaine_sulfate = {
    color: ['#f5f5f5', '#fafafa'],
    behavior: PW,
    category: 'research_compounds',
    state: 'solid',
    density: 1180,
    reactions: {
      sodium_hydroxide: { elem1: 'cocaine', elem2: null, chance: 0.25 }
    },
    desc: 'Cocaine sulfate intermediate'
  };

  // LSD synthesis
  elements.lysergic_acid.reactions = {
    diethylamine: { elem1: 'lsd', elem2: null, chance: 0.15 }
  };

  // Psilocybin extraction
  elements.psilocybin.reactions = {
    lemon_juice: { elem1: 'psilocin', elem2: null, chance: 0.2 }
  };

  // --------------------------------------------------------------------------
  // 8.  LAB APPARATUS with realistic glass colors
  // --------------------------------------------------------------------------
  const labEquipment = [
    'reaction_flask', 'condenser', 'separatory_funnel', 'buchner_funnel',
    'erlenmeyer_flask', 'round_bottom_flask', 'hot_plate', 'magnetic_stirrer',
    'ph_strip', 'ice_bath', 'oil_bath', 'vacuum_pump', 'sintered_funnel',
    'rotovap', 'lyophilizer', 'distillation_column', 'reflux_condenser'
  ];

  labEquipment.forEach(id => {
    const isMetal = ['hot_plate', 'magnetic_stirrer', 'vacuum_pump'].includes(id);
    elements[id] = {
      color: isMetal ? ['#616161', '#757575', '#9e9e9e'] : ['#e0e0e0', '#eeeeee', '#f5f5f5'],
      behavior: WALL,
      category: 'lab_equipment',
      state: 'solid',
      density: isMetal ? 7800 : 2500,
      desc: `Laboratory ${isMetal ? 'equipment' : 'glassware'}`
    };
  });

  // --------------------------------------------------------------------------
  // 9.  CANNABIS STRAINS with realistic flower colors
  // --------------------------------------------------------------------------
  const strains = [
    { name: 'sour_diesel', color: ['#66bb6a', '#4caf50', '#5da75f'], type: 'sativa' },
    { name: 'og_kush', color: ['#7cb342', '#689f38', '#558b2f'], type: 'hybrid' },
    { name: 'girl_scout_cookies', color: ['#7b1fa2', '#6a1b8f', '#4a148c'], type: 'hybrid' },
    { name: 'blue_dream', color: ['#5c6bc0', '#3f51b5', '#3949ab'], type: 'hybrid' },
    { name: 'granddaddy_purple', color: ['#7b1fa2', '#6a1b8f', '#4a148c'], type: 'indica' },
    { name: 'white_widow', color: ['#e8f5e9', '#c8e6c9', '#a5d6a7'], type: 'hybrid' },
    { name: 'jack_herer', color: ['#66bb6a', '#4caf50', '#43a047'], type: 'sativa' },
    { name: 'gorilla_glue', color: ['#558b2f', '#689f38', '#7cb342'], type: 'hybrid' },
    { name: 'pineapple_express', color: ['#fdd835', '#c0ca33', '#afb42b'], type: 'hybrid' },
    { name: 'ak_47', color: ['#8bc34a', '#7cb342', '#689f38'], type: 'hybrid' },
    { name: 'chemdawg', color: ['#558b2f', '#689f38', '#7cb342'], type: 'hybrid' },
    { name: 'northern_lights', color: ['#7b1fa2', '#6a1b8f', '#8e24aa'], type: 'indica' },
    { name: 'amnesia_haze', color: ['#fdd835', '#c0ca33', '#afb42b'], type: 'sativa' },
    { name: 'super_lemon_haze', color: ['#ffeb3b', '#fdd835', '#c0ca33'], type: 'sativa' },
    { name: 'strawberry_cough', color: ['#ef5350', '#e53935', '#c62828'], type: 'sativa' },
    { name: 'bubba_kush', color: ['#4a148c', '#6a1b8f', '#7b1fa2'], type: 'indica' },
    { name: 'purple_haze', color: ['#7b1fa2', '#9c27b0', '#8e24aa'], type: 'sativa' },
    { name: 'charlottes_web', color: ['#66bb6a', '#4caf50', '#43a047'], type: 'cbd' },
    { name: 'cbd_shark', color: ['#558b2f', '#689f38', '#7cb342'], type: 'cbd' },
    { name: 'harlequin', color: ['#fdd835', '#c0ca33', '#afb42b'], type: 'cbd' }
  ];

  strains.forEach(strain => {
    elements['flower_' + strain.name] = {
      color: strain.color,
      behavior: PW,
      category: 'cannabis_strains',
      state: 'solid',
      density: 900,
      tempHigh: 180,
      stateHigh: 'smoke',
      burn: 75,
      burnTime: 200,
      breakInto: ['cannabis_trichomes', 'plant_matter'],
      desc: `${strain.name.replace(/_/g, ' ')} - ${strain.type.toUpperCase()} strain`
    };
  });

  // --------------------------------------------------------------------------
  // 10. ADDITIONAL REALISTIC ELEMENTS
  // --------------------------------------------------------------------------
  
  // Solvents with proper colors
  const solvents = {
    diethyl_ether: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 714,
      desc: 'Diethyl ether - volatile clear liquid'
    },
    dichloromethane: {
      colors: ['#e0e0e0', '#eeeeee'],
      density: 1326,
      desc: 'Dichloromethane - clear dense solvent'
    },
    chloroform: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 1489,
      desc: 'Chloroform - clear heavy liquid'
    },
    toluene: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 867,
      desc: 'Toluene - clear aromatic solvent'
    },
    hexane: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 655,
      desc: 'n-Hexane - clear volatile liquid'
    },
    ethanol: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 789,
      desc: 'Ethanol - clear alcohol'
    },
    methanol: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 792,
      desc: 'Methanol - clear toxic alcohol'
    },
    butane: {
      colors: ['#b3e5fc', '#81d4fa'],
      density: 573,
      desc: 'Butane - compressed gas'
    },
    propane: {
      colors: ['#b3e5fc', '#81d4fa'],
      density: 493,
      desc: 'Propane - compressed gas'
    }
  };

  Object.entries(solvents).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: cfg.density,
      viscosity: 800,
      temp: 20,
      tempLow: cfg.density < 600 ? -50 : -100,
      stateLow: 'ice',
      desc: cfg.desc
    };
  });

  // Bases and acids
  const reagents = {
    potassium_permanganate: {
      colors: ['#4a148c', '#6a1b8f', '#38006b'],
      density: 2703,
      desc: 'KMnO₄ - deep purple crystals (oxidizer)'
    },
    sodium_carbonate: {
      colors: ['#ffffff', '#fafafa'],
      density: 2540,
      desc: 'Sodium carbonate - white powder'
    },
    calcium_hydroxide: {
      colors: ['#f5f5f5', '#fafafa'],
      density: 2211,
      desc: 'Calcium hydroxide (lime) - white powder'
    },
    ammonium_hydroxide: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 910,
      liquid: true,
      desc: 'Ammonium hydroxide - clear alkaline solution'
    },
    hydrogen_peroxide: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 1450,
      liquid: true,
      desc: 'Hydrogen peroxide - clear oxidizer'
    },
    sodium_hypochlorite: {
      colors: ['#fff9c4', '#ffecb3'],
      density: 1210,
      liquid: true,
      desc: 'Sodium hypochlorite (bleach) - pale yellow liquid'
    }
  };

  Object.entries(reagents).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: cfg.liquid ? LIQ : PW,
      category: 'precursors',
      state: cfg.liquid ? 'liquid' : 'solid',
      density: cfg.density,
      viscosity: cfg.liquid ? 1200 : undefined,
      desc: cfg.desc
    };
  });

  // Additional refined opioids
  const opioids = {
    codeine: {
      colors: ['#ffffff', '#fafafa'],
      density: 1320,
      desc: 'Codeine - white crystalline (Schedule II/III)'
    },
    dihydrocodeine: {
      colors: ['#f5f5f5', '#ffffff'],
      density: 1300,
      desc: 'Dihydrocodeine - white powder (Schedule II)'
    },
    oxymorphone: {
      colors: ['#fff8e1', '#ffecb3'],
      density: 1380,
      desc: 'Oxymorphone - pale powder (Schedule II)'
    },
    hydromorphone: {
      colors: ['#fafafa', '#ffffff'],
      density: 1400,
      desc: 'Hydromorphone - white crystalline (Schedule II)'
    },
    buprenorphine: {
      colors: ['#ffffff', '#fafafa'],
      density: 1270,
      desc: 'Buprenorphine - white powder (Schedule III)'
    },
    methadone: {
      colors: ['#ffffff', '#f5f5f5'],
      density: 1090,
      desc: 'Methadone HCl - white crystalline (Schedule II)'
    }
  };

  Object.entries(opioids).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: PW,
      category: 'research_compounds',
      state: 'solid',
      density: cfg.density,
      desc: cfg.desc
    };
  });

  // Designer drugs / research chemicals
  const researchChems = {
    '2c_b': {
      colors: ['#ffccbc', '#ffab91'],
      density: 1180,
      desc: '2C-B - pink/tan powder (Schedule I)'
    },
    '2c_i': {
      colors: ['#ffab91', '#ff8a65'],
      density: 1160,
      desc: '2C-I - orange powder (Schedule I)'
    },
    '2c_e': {
      colors: ['#ff8a65', '#ff7043'],
      density: 1140,
      desc: '2C-E - orange/red powder (Schedule I)'
    },
    '25i_nbome': {
      colors: ['#fff8e1', '#ffecb3'],
      density: 1200,
      desc: '25I-NBOMe - pale powder (Schedule I)'
    },
    '25c_nbome': {
      colors: ['#ffecb3', '#ffe082'],
      density: 1190,
      desc: '25C-NBOMe - tan powder (Schedule I)'
    },
    alpha_pvp: {
      colors: ['#ffffff', '#fafafa'],
      density: 1050,
      desc: 'α-PVP (flakka) - white crystals (Schedule I)'
    },
    mephedrone: {
      colors: ['#fff9c4', '#fff59d'],
      density: 1020,
      desc: 'Mephedrone (4-MMC) - pale crystals (Schedule I)'
    },
    methylone: {
      colors: ['#ffeb3b', '#fff176'],
      density: 1010,
      desc: 'Methylone (bk-MDMA) - yellow crystals (Schedule I)'
    },
    etizolam: {
      colors: ['#ffffff', '#fafafa'],
      density: 1340,
      desc: 'Etizolam - white powder (Schedule IV)'
    },
    flualprazolam: {
      colors: ['#f5f5f5', '#fafafa'],
      density: 1360,
      desc: 'Flualprazolam - off-white powder (Schedule I)'
    },
    clonazolam: {
      colors: ['#fafafa', '#ffffff'],
      density: 1350,
      desc: 'Clonazolam - white powder (Schedule I)'
    }
  };

  Object.entries(researchChems).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: PW,
      category: 'research_compounds',
      state: 'solid',
      density: cfg.density,
      desc: cfg.desc
    };
  });

  // Plant materials
  if (!elements.plant_matter) {
    elements.plant_matter = {
      color: ['#558b2f', '#689f38', '#7cb342'],
      behavior: PW,
      category: 'botanicals',
      state: 'solid',
      density: 800,
      tempHigh: 200,
      stateHigh: 'ash',
      burn: 80,
      burnTime: 250,
      desc: 'Generic plant material'
    };
  }

  if (!elements.lemon_juice) {
    elements.lemon_juice = {
      color: ['#fff9c4', '#fff59d'],
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: 1030,
      viscosity: 1100,
      desc: 'Lemon juice - acidic citrus liquid'
    };
  }

  // Missing helper reagents
  if (!elements.lime) {
    elements.lime = elements.calcium_hydroxide;
  }

  if (!elements.diethylamine) {
    elements.diethylamine = {
      color: ['#e0f2f1', '#b2dfdb'],
      behavior: LIQ,
      category: 'precursors',
      state: 'liquid',
      density: 707,
      viscosity: 900,
      desc: 'Diethylamine - clear amine solvent'
    };
  }

  if (!elements.kerosene) {
    elements.kerosene = {
      color: ['#fff9c4', '#ffecb3'],
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: 810,
      viscosity: 1500,
      desc: 'Kerosene - pale petroleum solvent'
    };
  }

  if (!elements.gasoline) {
    elements.gasoline = {
      color: ['#ffecb3', '#ffe082'],
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: 737,
      viscosity: 800,
      burn: 95,
      burnTime: 150,
      desc: 'Gasoline - volatile petroleum fuel'
    };
  }

  if (!elements.ice_water) {
    elements.ice_water = {
      color: ['#b3e5fc', '#81d4fa'],
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: 1000,
      temp: 2,
      viscosity: 1200,
      desc: 'Ice-cold water'
    };
  }

  // --------------------------------------------------------------------------
  // 11. ENHANCED REACTIONS WITH PROPER CONDITIONS
  // --------------------------------------------------------------------------
  
  // Opium latex extraction from poppies
  if (!elements.papaver_somniferum.reactions) {
    elements.papaver_somniferum.reactions = {};
  }
  elements.papaver_somniferum.reactions.knife = { elem1: 'opium_latex', elem2: null, chance: 0.15 };

  // Coca leaf crushing
  if (!elements.coca_boliviana.reactions) {
    elements.coca_boliviana.reactions = {};
  }
  elements.coca_boliviana.reactions.water = { elem1: 'coca_leaves', elem2: null, chance: 0.1 };
  
  if (!elements.coca_colombiana.reactions) {
    elements.coca_colombiana.reactions = {};
  }
  elements.coca_colombiana.reactions.water = { elem1: 'coca_leaves', elem2: null, chance: 0.1 };

  // Cannabis extraction improvements
  elements.cannabis_flower.reactions = {
    butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.2 },
    ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.15 }
  };

  // Potassium permanganate oxidation for cocaine (already covered above in coca_paste.reactions)

  // --------------------------------------------------------------------------
  // 12. DEBUG AND COMPLETION
  // --------------------------------------------------------------------------
  console.log('✓ ChemResearch v2 Enhanced loaded successfully');
  console.log('✓ Multi-texture system active');
  console.log('✓ Realistic densities and viscosities implemented');
  console.log('✓ Complete synthesis chains configured');
  console.log('✓ Total elements added: ' + Object.keys(elements).filter(k => 
    elements[k].category && elements[k].category.includes('research_compounds') ||
    elements[k].category && elements[k].category.includes('botanicals') ||
    elements[k].category && elements[k].category.includes('precursors')
  ).length);

})();
