// ============================================================================
//  CHEMRESEARCH_V2_ENHANCED.JS  –  Educational chemistry with realistic behavior
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
  // 1.  HELPERS & BEHAVIORS
  // --------------------------------------------------------------------------
  const PW   = behaviors.POWDER;
  const LIQ  = behaviors.LIQUID;
  const WALL = behaviors.WALL;
  const STURDY = behaviors.STURDY_PLANT;
  const GAS  = behaviors.GAS;

  // --------------------------------------------------------------------------
  // 2.  BOTANICALS (plants + seeds)  –  realistic growth & properties
  // --------------------------------------------------------------------------
  const botanicals = {
    cannabis_sativa: {
      colors: ['#3e8948', '#4a9b54', '#358843', '#469150'],
      seed: 'seed_sativa',
      tempHigh: 180,
      burn: 70,
      burnTime: 400,
      desc: 'Cannabis sativa - tall, narrow leaves'
    },
    cannabis_indica: {
      colors: ['#2a5d32', '#1f4d28', '#35663a', '#244f2d'],
      seed: 'seed_indica',
      tempHigh: 180,
      burn: 70,
      burnTime: 400,
      desc: 'Cannabis indica - short, broad leaves'
    },
    cannabis_ruderalis: {
      colors: ['#4a7c59', '#55876a', '#3f7150', '#5a8c6f'],
      seed: 'seed_ruderalis',
      tempHigh: 180,
      burn: 70,
      burnTime: 400,
      desc: 'Cannabis ruderalis - auto-flowering variant'
    },
    papaver_somniferum: {
      colors: ['#7b1fa2', '#9c27b0', '#6a1b8f', '#8e24aa'],
      seed: 'seed_poppy',
      tempHigh: 150,
      burn: 60,
      burnTime: 350,
      desc: 'Opium poppy - purple/white flowers'
    },
    coca_boliviana: {
      colors: ['#004d40', '#00695c', '#003d33', '#005b4f'],
      seed: 'seed_coca_bol',
      tempHigh: 170,
      burn: 65,
      burnTime: 380,
      desc: 'Bolivian coca - high altitude variety'
    },
    coca_colombiana: {
      colors: ['#00695c', '#00897b', '#00564e', '#007a6a'],
      seed: 'seed_coca_col',
      tempHigh: 170,
      burn: 65,
      burnTime: 380,
      desc: 'Colombian coca - lowland variety'
    },
    ephedra_sinica: {
      colors: ['#827717', '#9e9d24', '#6d6611', '#8f8e1f'],
      seed: 'seed_ephedra',
      tempHigh: 160,
      burn: 70,
      burnTime: 300,
      desc: 'Ephedra sinica - ma-huang herb'
    },
    khat: {
      colors: ['#558b2f', '#689f38', '#4a7c2a', '#5d9033'],
      seed: 'seed_khat',
      tempHigh: 165,
      burn: 68,
      burnTime: 320,
      desc: 'Khat plant - contains cathinone'
    },
    kratom: {
      colors: ['#33691e', '#4a7c2f', '#2d5a1a', '#3e6d27'],
      seed: 'seed_kratom',
      tempHigh: 165,
      burn: 68,
      burnTime: 330,
      desc: 'Mitragyna speciosa - kratom tree'
    },
    psilocybe_cubensis: {
      colors: ['#6d4c41', '#795548', '#5d4037', '#6b4d43'],
      seed: 'spore_cubensis',
      tempHigh: 140,
      burn: 55,
      burnTime: 280,
      desc: 'Psilocybe cubensis - magic mushroom'
    },
    iboga: {
      colors: ['#3e2723', '#4e342e', '#321d19', '#452e29'],
      seed: 'seed_iboga',
      tempHigh: 170,
      burn: 66,
      burnTime: 360,
      desc: 'Tabernanthe iboga - African shrub'
    },
    salvia_divinorum: {
      colors: ['#004d40', '#00695c', '#003d33', '#005b4f'],
      seed: 'seed_salvia',
      tempHigh: 155,
      burn: 63,
      burnTime: 310,
      desc: 'Salvia divinorum - diviners sage'
    },
    banisteriopsis_caapi: {
      colors: ['#2e7d32', '#388e3c', '#1b5e20', '#2e7d32'],
      seed: 'seed_caapi',
      tempHigh: 165,
      burn: 67,
      burnTime: 340,
      desc: 'Banisteriopsis caapi - ayahuasca vine'
    }
  };

  Object.entries(botanicals).forEach(([plant, cfg]) => {
    elements[plant] = {
      color: cfg.colors,
      behavior: STURDY,
      category: 'botanicals',
      tempHigh: cfg.tempHigh,
      stateHigh: 'ash',
      burn: cfg.burn,
      burnTime: cfg.burnTime,
      breakInto: cfg.seed,
      state: 'solid',
      density: 800,
      conduct: 0.1,
      desc: cfg.desc + ' - Research use only.'
    };
    
    // Seeds with realistic properties - need moisture and warmth to grow
    elements[cfg.seed] = {
      color: ['#8d6e63', '#795548', '#a1887f', '#6d4c41'],
      behavior: PW,
      category: 'botanicals',
      tempHigh: 200,
      stateHigh: 'ash',
      tempLow: -20,
      stateLow: 'frozen_seed',
      state: 'solid',
      density: 1100,
      reactions: {
        wet_soil: { elem1: plant, elem2: null, chance: 0.03, temp1: 20 },
        mud: { elem1: plant, elem2: null, chance: 0.02, temp1: 20 }
      },
      desc: 'Seed/spore - Needs wet soil and warmth to grow'
    };
  });

  // Frozen seed state
  elements.frozen_seed = {
    color: ['#bcaaa4', '#a1887f'],
    behavior: PW,
    category: 'botanicals',
    tempHigh: -15,
    stateHigh: ['seed_sativa', 'seed_indica', 'seed_poppy'],
    state: 'solid',
    density: 1150,
    desc: 'Frozen seed - will not germinate'
  };

  // --------------------------------------------------------------------------
  // 3.  RAW BOTANICAL PRODUCTS  –  realistic extraction behavior
  // --------------------------------------------------------------------------
  elements.opium_latex = {
    color: ['#4a148c', '#6a1b9a', '#38006b', '#553098'],
    behavior: LIQ,
    viscosity: 3500, // Very viscous sticky sap
    category: 'raw_alkaloids',
    tempHigh: 180,
    stateHigh: 'smoke',
    tempLow: -10,
    stateLow: 'frozen_opium',
    state: 'liquid',
    density: 1350,
    conduct: 0.05,
    reactions: {
      acetic_anhydride: { elem1: 'heroin_base', elem2: 'steam', chance: 0.3, temp1: 80 },
      lime: { elem1: 'morphine_base', elem2: null, chance: 0.25 },
      water: { elem1: 'opium_solution', elem2: null, chance: 0.1 }
    },
    desc: 'Raw opium latex - thick purple-brown sap, very sticky'
  };

  elements.frozen_opium = {
    color: ['#38006b', '#4a148c'],
    behavior: behaviors.SUPPORT,
    category: 'raw_alkaloids',
    tempHigh: -5,
    stateHigh: 'opium_latex',
    state: 'solid',
    density: 1400,
    desc: 'Frozen opium latex'
  };

  elements.opium_solution = {
    color: ['#6a1b9a', '#8e24aa'],
    behavior: LIQ,
    viscosity: 1200,
    category: 'raw_alkaloids',
    tempHigh: 100,
    stateHigh: ['opium_latex', 'steam'],
    state: 'liquid',
    density: 1050,
    desc: 'Opium dissolved in water'
  };

  elements.coca_leaves = {
    color: ['#2e7d32', '#1b5e20', '#388e3c', '#33691e'],
    behavior: PW,
    category: 'botanicals',
    state: 'solid',
    density: 600,
    tempHigh: 180,
    stateHigh: 'ash',
    burn: 60,
    burnTime: 250,
    breakInto: 'coca_alkaloids',
    desc: 'Dried coca leaves - can be chewed or processed'
  };

  elements.coca_alkaloids = {
    color: ['#f9fbe7', '#fff9c4', '#f0f4c3', '#fefce8'],
    behavior: PW,
    category: 'raw_alkaloids',
    state: 'solid',
    density: 1100,
    tempHigh: 195,
    stateHigh: 'smoke',
    reactions: {
      gasoline: { elem1: 'coca_paste', elem2: null, chance: 0.2 },
      kerosene: { elem1: 'coca_paste', elem2: null, chance: 0.2 },
      acetone: { elem1: 'coca_paste', elem2: null, chance: 0.15 }
    },
    desc: 'Crude coca alkaloids - off-white powder'
  };

  elements.cannabis_flower = {
    color: ['#66bb6a', '#4caf50', '#81c784', '#5da75f'],
    behavior: PW,
    category: 'botanicals',
    state: 'solid',
    density: 700,
    tempHigh: 175,
    stateHigh: ['smoke', 'thc_vapor'],
    burn: 65,
    burnTime: 300,
    breakInto: ['cannabis_trichomes', 'plant_matter'],
    desc: 'Cannabis flower buds - burns to release smoke'
  };

  elements.thc_vapor = {
    color: ['#c8e6c9', '#a5d6a7'],
    behavior: GAS,
    category: 'botanicals',
    temp: 180,
    tempLow: 150,
    stateLow: 'cannabis_oil',
    state: 'gas',
    density: 0.8,
    desc: 'Vaporized THC - lighter than air'
  };

  elements.cannabis_oil = {
    color: ['#827717', '#9e9d24'],
    behavior: LIQ,
    viscosity: 5000,
    category: 'botanicals',
    tempHigh: 175,
    stateHigh: 'thc_vapor',
    state: 'liquid',
    density: 940,
    desc: 'Condensed cannabis oil - very thick'
  };

  elements.cannabis_trichomes = {
    color: ['#e8f5e9', '#f1f8e9', '#dcedc8', '#fff9c4'],
    behavior: PW,
    category: 'raw_alkaloids',
    state: 'solid',
    density: 950,
    tempHigh: 170,
    stateHigh: 'thc_vapor',
    reactions: {
      butane: { elem1: 'bho', elem2: null, chance: 0.25 },
      ice_water: { elem1: 'bubble_hash', elem2: null, chance: 0.2 },
      ethanol: { elem1: 'cannabis_oil', elem2: null, chance: 0.18 }
    },
    desc: 'Cannabis trichomes - crystalline kief'
  };

  // --------------------------------------------------------------------------
  // 4.  PRECURSORS & REAGENTS  –  realistic physical/chemical properties
  // --------------------------------------------------------------------------
  const precursors = {
    ephedrine: {
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 1180,
      tempHigh: 255,
      stateHigh: 'smoke',
      tempLow: -40,
      stateLow: 'frozen_ephedrine',
      conduct: 0.2,
      desc: 'Ephedrine HCl - white crystalline, bitter taste'
    },
    pseudoephedrine: {
      colors: ['#f5f5f5', '#fafafa', '#eeeeee'],
      density: 1200,
      tempHigh: 260,
      stateHigh: 'smoke',
      tempLow: -35,
      stateLow: 'frozen_pseudo',
      conduct: 0.2,
      desc: 'Pseudoephedrine - white powder, soluble in water'
    },
    phenylacetic_acid: {
      colors: ['#e0e0e0', '#eeeeee', '#f5f5f5'],
      density: 1080,
      tempHigh: 265,
      stateHigh: 'smoke',
      conduct: 0.15,
      desc: 'Phenylacetic acid - white crystals, honey-like smell'
    },
    p2p: {
      colors: ['#d7ccc8', '#bcaaa4', '#c5b8b3'],
      density: 1010,
      liquid: true,
      viscosity: 1200,
      tempHigh: 216,
      stateHigh: 'smoke',
      tempLow: -15,
      stateLow: 'frozen_p2p',
      conduct: 0.1,
      desc: 'Phenyl-2-propanone - pale yellow oil, strong odor'
    },
    safrole: {
      colors: ['#8d6e63', '#a1887f', '#795548'],
      density: 1100,
      liquid: true,
      viscosity: 1800,
      tempHigh: 235,
      stateHigh: 'smoke',
      tempLow: 11,
      stateLow: 'frozen_safrole',
      conduct: 0.08,
      desc: 'Safrole - amber oily liquid, sassafras smell'
    },
    isosafrole: {
      colors: ['#6d4c41', '#795548', '#5d4037'],
      density: 1120,
      liquid: true,
      viscosity: 1900,
      tempHigh: 253,
      stateHigh: 'smoke',
      tempLow: 8,
      stateLow: 'frozen_isosafrole',
      conduct: 0.08,
      desc: 'Isosafrole - dark amber oil'
    },
    piperonal: {
      colors: ['#efebe9', '#f5f5f5', '#fafafa'],
      density: 1340,
      tempHigh: 263,
      stateHigh: 'smoke',
      conduct: 0.12,
      desc: 'Piperonal - white flaky crystals, vanilla odor'
    },
    anhydrous_ammonia: {
      colors: ['#b3e5fc', '#81d4fa', '#4fc3f7'],
      density: 682,
      liquid: true,
      viscosity: 600,
      tempHigh: -33,
      stateHigh: 'ammonia_gas',
      tempLow: -78,
      stateLow: 'frozen_ammonia',
      conduct: 0.15,
      desc: 'Anhydrous ammonia - extremely cold, caustic, pungent'
    },
    red_phosphorus: {
      colors: ['#d32f2f', '#c62828', '#b71c1c'],
      density: 2340,
      tempHigh: 416,
      stateHigh: 'white_phosphorus',
      conduct: 0.02,
      desc: 'Red phosphorus - brick red powder, stable form'
    },
    lithium: {
      colors: ['#cfd8dc', '#b0bec5', '#90a4ae'],
      density: 534,
      tempHigh: 180,
      stateHigh: 'molten_lithium',
      conduct: 0.85,
      reactions: {
        water: { elem1: 'hydrogen', elem2: 'lithium_hydroxide', chance: 0.5, func: 'explode' }
      },
      desc: 'Lithium metal - soft, reacts violently with water'
    },
    sodium_hydroxide: {
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 2130,
      tempHigh: 323,
      stateHigh: 'molten_lye',
      conduct: 0.3,
      reactions: {
        water: { elem1: 'lye_solution', elem2: null, chance: 0.2 }
      },
      desc: 'Sodium hydroxide (lye) - caustic white pellets'
    },
    acetone: {
      colors: ['#e1f5fe', '#b3e5fc', '#81d4fa'],
      density: 784,
      liquid: true,
      viscosity: 300,
      tempHigh: 56,
      stateHigh: 'acetone_vapor',
      tempLow: -95,
      stateLow: 'frozen_acetone',
      conduct: 0.02,
      burn: 85,
      burnTime: 100,
      desc: 'Acetone - volatile, flammable, sweet smell'
    },
    hydrochloric_acid: {
      colors: ['#ffeb3b', '#fff176', '#fff59d'],
      density: 1180,
      liquid: true,
      viscosity: 1700,
      tempHigh: 110,
      stateHigh: ['hcl_gas', 'steam'],
      tempLow: -30,
      stateLow: 'frozen_hcl',
      conduct: 0.7,
      desc: 'Hydrochloric acid - corrosive, fuming, pungent'
    },
    sulfuric_acid: {
      colors: ['#ffc107', '#ffb300', '#ffa000'],
      density: 1840,
      liquid: true,
      viscosity: 2700,
      tempHigh: 337,
      stateHigh: 'sulfur_trioxide',
      tempLow: 10,
      stateLow: 'frozen_sulfuric',
      conduct: 0.6,
      desc: 'Sulfuric acid - extremely corrosive, dense, oily'
    },
    acetic_anhydride: {
      colors: ['#ffecb3', '#fff9c4', '#ffe082'],
      density: 1082,
      liquid: true,
      viscosity: 900,
      tempHigh: 140,
      stateHigh: 'acetic_vapor',
      tempLow: -73,
      stateLow: 'frozen_acetic_anh',
      conduct: 0.08,
      reactions: {
        water: { elem1: 'acetic_acid', elem2: null, chance: 0.3 }
      },
      desc: 'Acetic anhydride - pungent, reacts with water'
    },
    formaldehyde: {
      colors: ['#f1f8e9', '#e8f5e9', '#dcedc8'],
      density: 815,
      liquid: true,
      viscosity: 1000,
      tempHigh: -19,
      stateHigh: 'formaldehyde_gas',
      tempLow: -92,
      stateLow: 'frozen_formaldehyde',
      conduct: 0.1,
      desc: 'Formaldehyde solution - pungent, preservative'
    },
    methylamine: {
      colors: ['#e0f2f1', '#b2dfdb', '#80cbc4'],
      density: 656,
      liquid: true,
      viscosity: 500,
      tempHigh: -6,
      stateHigh: 'methylamine_gas',
      tempLow: -93,
      stateLow: 'frozen_methylamine',
      conduct: 0.12,
      desc: 'Methylamine - fishy smell, boils at -6°C'
    }
  };

  Object.entries(precursors).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: cfg.liquid ? LIQ : PW,
      category: 'precursors',
      state: cfg.liquid ? 'liquid' : 'solid',
      density: cfg.density,
      viscosity: cfg.viscosity,
      tempHigh: cfg.tempHigh,
      stateHigh: cfg.stateHigh,
      tempLow: cfg.tempLow,
      stateLow: cfg.stateLow,
      conduct: cfg.conduct,
      burn: cfg.burn,
      burnTime: cfg.burnTime,
      reactions: cfg.reactions,
      desc: cfg.desc
    };
  });

  // Vapor/gas states for volatile chemicals
  elements.ammonia_gas = {
    color: ['#e1f5fe', '#b3e5fc'],
    behavior: GAS,
    tempLow: -33,
    stateLow: 'anhydrous_ammonia',
    state: 'gas',
    density: 0.73,
    desc: 'Ammonia gas - extremely pungent, toxic'
  };

  elements.acetone_vapor = {
    color: ['#e1f5fe', '#b3e5fc'],
    behavior: GAS,
    tempLow: 50,
    stateLow: 'acetone',
    state: 'gas',
    density: 2.0,
    burn: 90,
    burnTime: 50,
    desc: 'Acetone vapor - heavier than air, flammable'
  };

  elements.methylamine_gas = {
    color: ['#b2dfdb', '#80cbc4'],
    behavior: GAS,
    tempLow: -10,
    stateLow: 'methylamine',
    state: 'gas',
    density: 1.1,
    desc: 'Methylamine gas - fishy odor, toxic'
  };

  elements.hcl_gas = {
    color: ['#fff9c4', '#fff59d'],
    behavior: GAS,
    tempLow: -85,
    stateLow: 'hydrochloric_acid',
    state: 'gas',
    density: 1.5,
    reactions: {
      water: { elem1: 'hydrochloric_acid', elem2: null, chance: 0.4 }
    },
    desc: 'Hydrogen chloride gas - corrosive, choking'
  };

  // --------------------------------------------------------------------------
  // 5.  FINAL COMPOUNDS  –  realistic physical states & behaviors
  // --------------------------------------------------------------------------
  const compounds = {
    methamphetamine: {
      sched: 'II',
      colors: ['#ffffff', '#fafafa', '#f5f5f5', '#fcfcfc'],
      density: 913,
      tempHigh: 170,
      stateHigh: 'meth_smoke',
      tempLow: -30,
      stateLow: 'frozen_meth',
      burn: 55,
      burnTime: 150,
      desc: 'Methamphetamine HCl - clear/white crystals, bitter'
    },
    amphetamine: {
      sched: 'II',
      colors: ['#fafafa', '#ffffff', '#f0f0f0'],
      density: 930,
      tempHigh: 190,
      stateHigh: 'amphet_smoke',
      tempLow: -25,
      stateLow: 'frozen_amphet',
      desc: 'Amphetamine sulfate - white/off-white powder'
    },
    mdma: {
      sched: 'I',
      colors: ['#fff8e1', '#fff9c4', '#ffecb3', '#fef5d6'],
      density: 1080,
      tempHigh: 147,
      stateHigh: 'mdma_smoke',
      tempLow: -20,
      stateLow: 'frozen_mdma',
      desc: 'MDMA HCl - champagne crystals, bitter'
    },
    heroin: {
      sched: 'I',
      colors: ['#ffffff', '#fafafa', '#f8f8f8'],
      density: 1560,
      tempHigh: 173,
      stateHigh: 'heroin_smoke',
      tempLow: -15,
      stateLow: 'frozen_heroin',
      desc: 'Heroin HCl - white powder, bitter, #4 pure'
    },
    heroin_base: {
      sched: 'I',
      colors: ['#8d6e63', '#a1887f', '#795548', '#6d4c41'],
      density: 1320,
      tempHigh: 170,
      stateHigh: 'heroin_smoke',
      tempLow: -10,
      stateLow: 'frozen_heroin_base',
      desc: 'Heroin base - tan/brown, #3 black tar'
    },
    morphine: {
      sched: 'II',
      colors: ['#f5f5f5', '#ffffff', '#fafafa'],
      density: 1320,
      tempHigh: 254,
      stateHigh: 'morphine_smoke',
      tempLow: -18,
      stateLow: 'frozen_morphine',
      desc: 'Morphine sulfate - white crystalline, bitter'
    },
    morphine_base: {
      sched: 'II',
      colors: ['#bcaaa4', '#a1887f', '#8d6e63'],
      density: 1230,
      tempHigh: 197,
      stateHigh: 'morphine_smoke',
      tempLow: -12,
      stateLow: 'frozen_morph_base',
      desc: 'Morphine base - tan powder'
    },
    fentanyl: {
      sched: 'II',
      colors: ['#ffffff', '#fcfcfc', '#fafafa'],
      density: 1100,
      tempHigh: 84,
      stateHigh: 'fentanyl_smoke',
      tempLow: -25,
      stateLow: 'frozen_fentanyl',
      desc: 'Fentanyl citrate - extremely potent, 50-100x morphine'
    },
    carfentanil: {
      sched: 'II',
      colors: ['#f1f8e9', '#ffffff', '#f5f5f5'],
      density: 1150,
      tempHigh: 105,
      stateHigh: 'carfent_smoke',
      tempLow: -22,
      stateLow: 'frozen_carfent',
      desc: 'Carfentanil - 10,000x morphine, elephant tranquilizer'
    },
    lsd: {
      sched: 'I',
      colors: ['#fff9c4', '#fff59d', '#fff176'],
      density: 1200,
      tempHigh: 80,
      stateHigh: 'smoke',
      tempLow: -50,
      stateLow: 'frozen_lsd',
      desc: 'LSD tartrate - active in micrograms'
    },
    psilocybin: {
      sched: 'I',
      colors: ['#ffccbc', '#ffab91', '#ff8a65'],
      density: 1340,
      tempHigh: 220,
      stateHigh: 'smoke',
      tempLow: -30,
      stateLow: 'frozen_psilocybin',
      desc: 'Psilocybin - light brown crystalline'
    },
    psilocin: {
      sched: 'I',
      colors: ['#ffab91', '#ff8a65', '#ff7043'],
      density: 1280,
      tempHigh: 173,
      stateHigh: 'smoke',
      tempLow: -28,
      stateLow: 'frozen_psilocin',
      desc: 'Psilocin - active form, oxidizes easily'
    },
    cocaine: {
      sched: 'II',
      colors: ['#ffffff', '#fafafa', '#fcfcfc', '#f8f8f8'],
      density: 1220,
      tempHigh: 195,
      stateHigh: 'smoke',
      tempLow: -20,
      stateLow: 'frozen_cocaine',
      desc: 'Cocaine HCl - shiny flaky powder, numbing'
    },
    crack: {
      sched: 'I',
      colors: ['#d7ccc8', '#bcaaa4', '#c5b8b3', '#e0d5d0'],
      density: 1180,
      tempHigh: 90,
      stateHigh: 'crack_smoke',
      tempLow: -35,
      stateLow: 'frozen_crack',
      burn: 70,
      burnTime: 80,
      desc: 'Crack cocaine - freebase rocks, vaporizes at 90°C'
    },
    coca_paste: {
      sched: 'I',
      colors: ['#8d6e63', '#a1887f', '#795548'],
      density: 1050,
      tempHigh: 180,
      stateHigh: 'smoke',
      tempLow: -15,
      stateLow: 'frozen_paste',
      desc: 'Coca paste - brown putty, smokable base'
    },
    pcp: {
      sched: 'II',
      colors: ['#e0e0e0', '#eeeeee', '#f5f5f5'],
      density: 1070,
      liquid: true,
      viscosity: 1400,
      tempHigh: 135,
      stateHigh: 'pcp_smoke',
      tempLow: -15,
      stateLow: 'frozen_pcp',
      desc: 'PCP - white powder or liquid, dissociative'
    },
    ketamine: {
      sched: 'III',
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 1520,
      tempHigh: 262,
      stateHigh: 'ketamine_smoke',
      tempLow: -25,
      stateLow: 'frozen_ketamine',
      desc: 'Ketamine HCl - white crystalline, anesthetic'
    },
    dmt: {
      sched: 'I',
      colors: ['#ffeb3b', '#fff176', '#fff59d', '#fdd835'],
      density: 1090,
      tempHigh: 60,
      stateHigh: 'dmt_smoke',
      tempLow: -35,
      stateLow: 'frozen_dmt',
      desc: 'DMT freebase - yellow waxy crystals, vaporizes easily'
    },
    ghb: {
      sched: 'I',
      colors: ['#e1f5fe', '#b3e5fc', '#81d4fa'],
      density: 1320,
      liquid: true,
      viscosity: 2500,
      tempHigh: 100,
      stateHigh: 'steam',
      tempLow: -15,
      stateLow: 'frozen_ghb',
      desc: 'GHB - clear salty liquid, CNS depressant'
    },
    gbl: {
      sched: 'I',
      colors: ['#b3e5fc', '#81d4fa', '#4fc3f7'],
      density: 1124,
      liquid: true,
      viscosity: 1700,
      tempHigh: 204,
      stateHigh: 'gbl_vapor',
      tempLow: -44,
      stateLow: 'frozen_gbl',
      desc: 'GBL - oily liquid, converts to GHB in body'
    },
    bho: {
      sched: 'I',
      colors: ['#827717', '#9e9d24', '#afb42b', '#c0ca33'],
      density: 920,
      liquid: true,
      viscosity: 8000,
      tempHigh: 157,
      stateHigh: 'thc_vapor',
      tempLow: -20,
      stateLow: 'frozen_bho',
      desc: 'Butane hash oil - amber honey-like, extremely sticky'
    },
    bubble_hash: {
      sched: 'I',
      colors: ['#d7ccc8', '#bcaaa4', '#efebe9', '#c5b8b3'],
      density: 1050,
      tempHigh: 157,
      stateHigh: 'thc_vapor',
      tempLow: -25,
      stateLow: 'frozen_hash',
      desc: 'Ice water hash - blonde/tan, 70-90% THC'
    },
    mescaline: {
      sched: 'I',
      colors: ['#ffffff', '#fafafa', '#f5f5f5'],
      density: 1270,
      tempHigh: 183,
      stateHigh: 'smoke',
      tempLow: -30,
      stateLow: 'frozen_mescaline',
      desc: 'Mescaline HCl - white crystalline, from peyote/san pedro'
    },
    oxycodone: {
      sched: 'II',
      colors: ['#ffffff', '#fafafa'],
      density: 1360,
      tempHigh: 219,
      stateHigh: 'smoke',
      tempLow: -22,
      stateLow: 'frozen_oxy',
      desc: 'Oxycodone HCl - white crystalline, semi-synthetic'
    },
    hydrocodone: {
      sched: 'II',
      colors: ['#f5f5f5', '#ffffff'],
      density: 1330,
      tempHigh: 198,
      stateHigh: 'smoke',
      tempLow: -20,
      stateLow: 'frozen_hydro',
      desc: 'Hydrocodone bitartrate - white powder, codeine derivative'
    }
  };

  Object.entries(compounds).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: cfg.liquid ? LIQ : PW,
      category: 'research_compounds',
      state: cfg.liquid ? 'liquid' : 'solid',
      density: cfg.density,
      viscosity: cfg.viscosity,
      tempHigh: cfg.tempHigh,
      stateHigh: cfg.stateHigh,
      tempLow: cfg.tempLow,
      stateLow: cfg.stateLow,
      burn: cfg.burn,
      burnTime: cfg.burnTime,
      conduct: 0.1,
      desc: `Schedule ${cfg.sched} - ${cfg.desc}`
    };
  });

  // Smoke states for vaporized drugs
  elements.meth_smoke = {
    color: ['#e0e0e0', '#eeeeee'],
    behavior: GAS,
    state: 'gas',
    density: 0.9,
    temp: 170,
    desc: 'Methamphetamine vapor'
  };

  elements.heroin_smoke = {
    color: ['#bcaaa4', '#a1887f'],
    behavior: GAS,
    state: 'gas',
    density: 1.1,
    temp: 173,
    desc: 'Heroin vapor - chasing the dragon'
  };

  elements.crack_smoke = {
    color: ['#e0e0e0', '#d7ccc8'],
    behavior: GAS,
    state: 'gas',
    density: 1.0,
    temp: 90,
    desc: 'Crack cocaine vapor'
  };

  elements.dmt_smoke = {
    color: ['#fff9c4', '#ffecb3'],
    behavior: GAS,
    state: 'gas',
    density: 0.85,
    temp: 60,
    desc: 'DMT vapor - breakthrough dose'
  };

  // --------------------------------------------------------------------------
  // 6.  CRACK-COOKING CHAIN  –  realistic with proper temperatures
  // --------------------------------------------------------------------------
  if (!elements.baking_soda) {
    elements.baking_soda = {
      color: ['#fafafa', '#ffffff', '#f5f5f5'],
      behavior: PW,
      category: 'precursors',
      state: 'solid',
      density: 2200,
      tempHigh: 270,
      stateHigh: 'sodium_carbonate',
      conduct: 0.15,
      desc: 'Sodium bicarbonate - white powder, baking soda'
    };
  }

  // Cocaine dissolves in water
  elements.cocaine.reactions = {
    water: {
      elem1: 'cocaine_solution',
      elem2: null,
      chance: 0.15
    }
  };

  elements.cocaine_solution = {
    color: ['#f5f5f5', '#fafafa', '#ffffff'],
    behavior: LIQ,
    viscosity: 1200,
    category: 'research_compounds',
    state: 'liquid',
    density: 1050,
    tempHigh: 100,
    stateHigh: ['cocaine', 'steam'],
    tempLow: -5,
    stateLow: 'frozen_coke_solution',
    reactions: {
      baking_soda: { elem1: 'crack_slurry', elem2: null, chance: 0.35 },
      sodium_hydroxide: { elem1: 'crack_slurry', elem2: null, chance: 0.3 }
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
    desc: 'Cocaine + NaHCO₃ slurry - Heat to 85°C for freebase rocks'
  };

  // --------------------------------------------------------------------------
  // 7.  REALISTIC REACTION CHAINS WITH PROPER CONDITIONS
  // --------------------------------------------------------------------------
  
  // Methamphetamine synthesis - Red Phosphorus/Iodine method
  elements.pseudoephedrine.reactions = {
    red_phosphorus: {
      elem1: 'meth_intermediate',
      elem2: null,
      chance: 0.15,
      temp1: 120
    },
    iodine: {
      elem1: 'meth_intermediate',
      elem2: null,
      chance: 0.12,
      temp1: 110
    }
  };

  elements.meth_intermediate = {
    color: ['#e0e0e0', '#eeeeee'],
    behavior: LIQ,
    viscosity: 1800,
    category: 'precursors',
    state: 'liquid',
    density: 980,
    tempHigh: 150,
    stateHigh: 'meth_smoke',
    reactions: {
      hydrochloric_acid: { elem1: 'methamphetamine', elem2: null, chance: 0.35 }
    },
    desc: 'Methamphetamine freebase - oily liquid'
  };

  // MDMA synthesis - Safrole route
  elements.safrole.reactions = {
    isosafrole: { elem1: 'mdma_intermediate', elem2: null, chance: 0.2, temp1: 80 },
    hydrogen_peroxide: { elem1: 'mdma_intermediate', elem2: null, chance: 0.15, temp1: 60 }
  };

  elements.mdma_intermediate = {
    color: ['#fff9c4', '#ffecb3'],
    behavior: LIQ,
    viscosity: 1600,
    category: 'precursors',
    state: 'liquid',
    density: 1040,
    tempHigh: 130,
    stateHigh: 'mdma_smoke',
    reactions: {
      methylamine: { elem1: 'mdma', elem2: null, chance: 0.25, temp1: 100 }
    },
    desc: 'MDP2P - MDMA precursor oil'
  };

  // Heroin synthesis - Acetylation of morphine
  elements.morphine_base.reactions = {
    acetic_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, temp1: 85 }
  };

  elements.heroin_base.reactions = {
    hydrochloric_acid: { elem1: 'heroin', elem2: null, chance: 0.3 },
    water: { elem1: 'heroin_solution', elem2: null, chance: 0.15 }
  };

  elements.heroin_solution = {
    color: ['#bcaaa4', '#a1887f'],
    behavior: LIQ,
    viscosity: 1100,
    category: 'research_compounds',
    state: 'liquid',
    density: 1040,
    tempHigh: 100,
    stateHigh: ['heroin_base', 'steam'],
    desc: 'Heroin dissolved in water - for injection'
  };

  // Cocaine refinement - Multi-step process
  elements.coca_paste.reactions = {
    sulfuric_acid: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.25, temp1: 60 },
    potassium_permanganate: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.28, temp1: 70 }
  };

  elements.cocaine_sulfate = {
    color: ['#f5f5f5', '#fafafa'],
    behavior: PW,
    category: 'research_compounds',
    state: 'solid',
    density: 1180,
    tempHigh: 180,
    stateHigh: 'smoke',
    reactions: {
      sodium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.3 },
      ammonium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.25 }
    },
    desc: 'Cocaine sulfate - intermediate white powder'
  };

  elements.cocaine_base = {
    color: ['#fff9c4', '#ffecb3'],
    behavior: PW,
    category: 'research_compounds',
    state: 'solid',
    density: 1150,
    tempHigh: 98,
    stateHigh: 'crack_smoke',
    reactions: {
      hydrochloric_acid: { elem1: 'cocaine', elem2: null, chance: 0.35 }
    },
    desc: 'Cocaine freebase - smokable form'
  };

  // LSD synthesis - Ergot alkaloid route
  elements.lysergic_acid.reactions = {
    diethylamine: { elem1: 'lsd', elem2: null, chance: 0.18, temp1: 25 }
  };

  // Psilocybin dephosphorylation
  elements.psilocybin.reactions = {
    lemon_juice: { elem1: 'psilocin', elem2: null, chance: 0.25 },
    stomach_acid: { elem1: 'psilocin', elem2: null, chance: 0.3 }
  };

  // --------------------------------------------------------------------------
  // 8.  SOLVENTS WITH REALISTIC PROPERTIES
  // --------------------------------------------------------------------------
  const solvents = {
    diethyl_ether: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 714,
      viscosity: 230,
      tempHigh: 34.6,
      stateHigh: 'ether_vapor',
      tempLow: -116,
      stateLow: 'frozen_ether',
      burn: 95,
      burnTime: 60,
      desc: 'Diethyl ether - extremely volatile, sweet smell, flammable'
    },
    dichloromethane: {
      colors: ['#e0e0e0', '#eeeeee'],
      density: 1326,
      viscosity: 430,
      tempHigh: 40,
      stateHigh: 'dcm_vapor',
      tempLow: -97,
      stateLow: 'frozen_dcm',
      desc: 'Dichloromethane (DCM) - dense, sweet smell, volatile'
    },
    chloroform: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 1489,
      viscosity: 570,
      tempHigh: 61,
      stateHigh: 'chloroform_vapor',
      tempLow: -63,
      stateLow: 'frozen_chloroform',
      desc: 'Chloroform - sweet smell, anesthetic, carcinogenic'
    },
    toluene: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 867,
      viscosity: 590,
      tempHigh: 111,
      stateHigh: 'toluene_vapor',
      tempLow: -95,
      stateLow: 'frozen_toluene',
      burn: 80,
      burnTime: 120,
      desc: 'Toluene - aromatic solvent, paint thinner smell'
    },
    hexane: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 655,
      viscosity: 300,
      tempHigh: 69,
      stateHigh: 'hexane_vapor',
      tempLow: -95,
      stateLow: 'frozen_hexane',
      burn: 88,
      burnTime: 90,
      desc: 'n-Hexane - petroleum smell, highly flammable'
    },
    ethanol: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 789,
      viscosity: 1200,
      tempHigh: 78,
      stateHigh: 'ethanol_vapor',
      tempLow: -114,
      stateLow: 'frozen_ethanol',
      burn: 75,
      burnTime: 150,
      desc: 'Ethanol - drinking alcohol, flammable'
    },
    methanol: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 792,
      viscosity: 590,
      tempHigh: 64.7,
      stateHigh: 'methanol_vapor',
      tempLow: -97,
      stateLow: 'frozen_methanol',
      burn: 82,
      burnTime: 110,
      desc: 'Methanol - wood alcohol, toxic, causes blindness'
    },
    butane: {
      colors: ['#b3e5fc', '#81d4fa'],
      density: 573,
      viscosity: 200,
      tempHigh: -0.5,
      stateHigh: 'butane_gas',
      tempLow: -138,
      stateLow: 'frozen_butane',
      burn: 98,
      burnTime: 40,
      desc: 'Butane - liquefied gas, lighter fuel, highly flammable'
    },
    propane: {
      colors: ['#b3e5fc', '#81d4fa'],
      density: 493,
      viscosity: 180,
      tempHigh: -42,
      stateHigh: 'propane_gas',
      tempLow: -188,
      stateLow: 'frozen_propane',
      burn: 99,
      burnTime: 35,
      desc: 'Propane - compressed gas, BBQ fuel'
    }
  };

  Object.entries(solvents).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: cfg.density,
      viscosity: cfg.viscosity,
      tempHigh: cfg.tempHigh,
      stateHigh: cfg.stateHigh,
      tempLow: cfg.tempLow,
      stateLow: cfg.stateLow,
      burn: cfg.burn,
      burnTime: cfg.burnTime,
      conduct: 0.05,
      temp: 20,
      desc: cfg.desc
    };
  });

  // Solvent vapors
  elements.butane_gas = {
    color: ['#e1f5fe', '#b3e5fc'],
    behavior: GAS,
    tempLow: -5,
    stateLow: 'butane',
    state: 'gas',
    density: 2.0,
    burn: 99,
    burnTime: 30,
    desc: 'Butane gas - heavier than air, explosive'
  };

  elements.ether_vapor = {
    color: ['#e1f5fe', '#b3e5fc'],
    behavior: GAS,
    tempLow: 30,
    stateLow: 'diethyl_ether',
    state: 'gas',
    density: 2.6,
    burn: 98,
    burnTime: 25,
    desc: 'Ether vapor - extremely flammable'
  };

  // --------------------------------------------------------------------------
  // 9.  ADDITIONAL REAGENTS
  // --------------------------------------------------------------------------
  const reagents = {
    potassium_permanganate: {
      colors: ['#4a148c', '#6a1b8f', '#38006b'],
      density: 2703,
      tempHigh: 240,
      stateHigh: 'smoke',
      desc: 'KMnO₄ - deep purple crystals, strong oxidizer'
    },
    sodium_carbonate: {
      colors: ['#ffffff', '#fafafa'],
      density: 2540,
      tempHigh: 851,
      stateHigh: 'molten_soda_ash',
      desc: 'Sodium carbonate (washing soda) - white powder'
    },
    calcium_hydroxide: {
      colors: ['#f5f5f5', '#fafafa'],
      density: 2211,
      tempHigh: 580,
      stateHigh: 'quicklime',
      desc: 'Calcium hydroxide (slaked lime) - white powder, alkaline'
    },
    ammonium_hydroxide: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 910,
      liquid: true,
      viscosity: 1000,
      tempHigh: 27,
      stateHigh: ['ammonia_gas', 'steam'],
      tempLow: -77,
      stateLow: 'frozen_ammonia_hydroxide',
      desc: 'Ammonium hydroxide - alkaline solution, pungent'
    },
    hydrogen_peroxide: {
      colors: ['#e1f5fe', '#b3e5fc'],
      density: 1450,
      liquid: true,
      viscosity: 1200,
      tempHigh: 150,
      stateHigh: ['steam', 'oxygen'],
      tempLow: -0.4,
      stateLow: 'frozen_peroxide',
      desc: 'Hydrogen peroxide - clear oxidizer, bleaching agent'
    },
    iodine: {
      colors: ['#4a148c', '#6a1b8f'],
      density: 4930,
      tempHigh: 184,
      stateHigh: 'iodine_vapor',
      desc: 'Iodine - purple-black crystals, sublimes to purple gas'
    }
  };

  Object.entries(reagents).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.colors,
      behavior: cfg.liquid ? LIQ : PW,
      category: 'precursors',
      state: cfg.liquid ? 'liquid' : 'solid',
      density: cfg.density,
      viscosity: cfg.viscosity,
      tempHigh: cfg.tempHigh,
      stateHigh: cfg.stateHigh,
      tempLow: cfg.tempLow,
      stateLow: cfg.stateLow,
      conduct: cfg.liquid ? 0.3 : 0.1,
      desc: cfg.desc
    };
  });

  elements.iodine_vapor = {
    color: ['#9c27b0', '#8e24aa'],
    behavior: GAS,
    tempLow: 180,
    stateLow: 'iodine',
    state: 'gas',
    density: 4.9,
    desc: 'Iodine vapor - purple gas, irritating'
  };

  // --------------------------------------------------------------------------
  // 10. CANNABIS STRAINS WITH REALISTIC BURNING
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
    { name: 'northern_lights', color: ['#7b1fa2', '#6a1b8f', '#8e24aa'], type: 'indica' }
  ];

  strains.forEach(strain => {
    elements['flower_' + strain.name] = {
      color: strain.color,
      behavior: PW,
      category: 'cannabis_strains',
      state: 'solid',
      density: 700,
      tempHigh: 175,
      stateHigh: ['smoke', 'thc_vapor'],
      burn: 65,
      burnTime: 300,
      breakInto: ['cannabis_trichomes', 'plant_matter'],
      desc: `${strain.name.replace(/_/g, ' ')} - ${strain.type.toUpperCase()} strain`
    };
  });

  // --------------------------------------------------------------------------
  // 11. LAB EQUIPMENT
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
      conduct: isMetal ? 0.9 : 0.02,
      tempHigh: isMetal ? 1500 : 600,
      stateHigh: isMetal ? 'molten_metal' : 'molten_glass',
      desc: `Laboratory ${isMetal ? 'equipment' : 'glassware'}`
    };
  });

  // --------------------------------------------------------------------------
  // 12. HELPER ELEMENTS
  // --------------------------------------------------------------------------
  if (!elements.plant_matter) {
    elements.plant_matter = {
      color: ['#558b2f', '#689f38', '#7cb342'],
      behavior: PW,
      category: 'botanicals',
      state: 'solid',
      density: 600,
      tempHigh: 200,
      stateHigh: 'ash',
      burn: 70,
      burnTime: 250,
      desc: 'Generic plant material - cellulose'
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
      tempHigh: 100,
      stateHigh: 'steam',
      tempLow: -7,
      stateLow: 'frozen_lemon',
      desc: 'Lemon juice - acidic citrus liquid, pH ~2'
    };
  }

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
      viscosity: 380,
      tempHigh: 56,
      stateHigh: 'diethylamine_vapor',
      tempLow: -50,
      stateLow: 'frozen_diethylamine',
      desc: 'Diethylamine - fishy smell, flammable base'
    };
  }

  if (!elements.kerosene) {
    elements.kerosene = {
      color: ['#fff9c4', '#ffecb3'],
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: 810,
      viscosity: 1800,
      tempHigh: 150,
      stateHigh: 'kerosene_vapor',
      tempLow: -47,
      stateLow: 'frozen_kerosene',
      burn: 70,
      burnTime: 200,
      desc: 'Kerosene - petroleum solvent, jet fuel smell'
    };
  }

  if (!elements.gasoline) {
    elements.gasoline = {
      color: ['#ffecb3', '#ffe082'],
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: 737,
      viscosity: 600,
      tempHigh: 42,
      stateHigh: 'gasoline_vapor',
      tempLow: -40,
      stateLow: 'frozen_gasoline',
      burn: 95,
      burnTime: 120,
      desc: 'Gasoline - highly volatile, extremely flammable'
    };
  }

  elements.gasoline_vapor = {
    color: ['#ffe082', '#ffecb3'],
    behavior: GAS,
    tempLow: 35,
    stateLow: 'gasoline',
    state: 'gas',
    density: 3.0,
    burn: 99,
    burnTime: 40,
    desc: 'Gasoline vapor - explosive, heavier than air'
  };

  if (!elements.ice_water) {
    elements.ice_water = {
      color: ['#b3e5fc', '#81d4fa'],
      behavior: LIQ,
      category: 'solvents',
      state: 'liquid',
      density: 1000,
      temp: 2,
      viscosity: 1790,
      tempHigh: 5,
      stateHigh: 'water',
      tempLow: 0,
      stateLow: 'ice',
      desc: 'Ice-cold water - near freezing'
    };
  }

  if (!elements.acetic_acid) {
    elements.acetic_acid = {
      color: ['#e1f5fe', '#b3e5fc'],
      behavior: LIQ,
      category: 'precursors',
      state: 'liquid',
      density: 1049,
      viscosity: 1220,
      tempHigh: 118,
      stateHigh: 'acetic_vapor',
      tempLow: 17,
      stateLow: 'frozen_acetic',
      desc: 'Acetic acid (vinegar) - sour smell, corrosive'
    };
  }

  if (!elements.lye_solution) {
    elements.lye_solution = {
      color: ['#e1f5fe', '#b3e5fc'],
      behavior: LIQ,
      category: 'precursors',
      state: 'liquid',
      density: 1220,
      viscosity: 2000,
      tempHigh: 100,
      stateHigh: ['sodium_hydroxide', 'steam'],
      tempLow: -5,
      stateLow: 'frozen_lye',
      conduct: 0.5,
      desc: 'Sodium hydroxide solution - extremely caustic'
    };
  }

  // --------------------------------------------------------------------------
  // 13. KNIFE TOOL - Add to toolbar (like heat, cool, move tools)
  // --------------------------------------------------------------------------
  
  // Add knife tool to the main tools array
  if (typeof tools !== 'undefined' && Array.isArray(tools)) {
    // Check if knife tool doesn't already exist
    if (!tools.find(t => t.id === 'knife')) {
      tools.push({
        id: 'knife',
        name: 'Knife',
        description: 'Score plants to harvest materials',
        cursor: 'crosshair',
        category: 'special'
      });
    }
  }

  // Define knife tool behavior
  if (typeof window !== 'undefined') {
    window.knifeToolAction = function(x, y) {
      if (!isEmpty(x, y, true)) {
        const pixel = pixelMap[x][y];
        const elementName = pixel.element;
        
        if (elements[elementName].reactions && elements[elementName].reactions.knife) {
          const reaction = elements[elementName].reactions.knife;
          if (Math.random() < (reaction.chance || 0.2)) {
            changePixel(pixel, reaction.elem1);
          }
        }
      }
    };
  }

  // Hook into doTool function
  if (typeof doTool !== 'undefined') {
    const originalDoTool = doTool;
    doTool = function(x, y) {
      if (currentTool === 'knife') {
        window.knifeToolAction(x, y);
      } else {
        originalDoTool(x, y);
      }
    };
  }

  // Alternative approach: Patch the tool system
  if (typeof window !== 'undefined' && !window.knifeToolPatched) {
    window.knifeToolPatched = true;
    
    // Wait for game to load then inject tool
    setTimeout(() => {
      if (typeof tools !== 'undefined') {
        const knifeExists = tools.some(t => t && t.id === 'knife');
        if (!knifeExists) {
          tools.splice(4, 0, {
            id: 'knife',
            name: 'Knife',
            icon: '🔪',
            description: 'Score poppies for opium, harvest coca leaves, cut cannabis flowers',
            cursor: 'crosshair'
          });
          console.log('✓ Knife tool added to toolbar');
        }
      }
      
      // Hook into the main game loop for knife tool
      if (typeof pixelTicks !== 'undefined') {
        const originalPixelTicks = pixelTicks;
        pixelTicks = function(pixel) {
          if (window.currentTool === 'knife' && mouseDown && pixel) {
            const x = Math.floor(mousePos.x / pixelSize);
            const y = Math.floor(mousePos.y / pixelSize);
            
            if (x === pixel.x && y === pixel.y) {
              if (elements[pixel.element].reactions && elements[pixel.element].reactions.knife) {
                const reaction = elements[pixel.element].reactions.knife;
                if (Math.random() < (reaction.chance || 0.2)) {
                  changePixel(pixel, reaction.elem1);
                }
              }
            }
          }
          return originalPixelTicks(pixel);
        };
      }
    }, 1000);
  }

  // --------------------------------------------------------------------------
  // 14. PLANT EXTRACTION REACTIONS (for knife tool)
  // --------------------------------------------------------------------------
  
  // Opium latex from poppies (scoring with knife)
  if (!elements.papaver_somniferum.reactions) {
    elements.papaver_somniferum.reactions = {};
  }
  elements.papaver_somniferum.reactions.knife = { 
    elem1: 'opium_latex',
    chance: 0.2
  };

  // Coca leaves from coca plants (harvesting)
  if (!elements.coca_boliviana.reactions) {
    elements.coca_boliviana.reactions = {};
  }
  elements.coca_boliviana.reactions.knife = { 
    elem1: 'coca_leaves',
    chance: 0.25
  };
  
  if (!elements.coca_colombiana.reactions) {
    elements.coca_colombiana.reactions = {};
  }
  elements.coca_colombiana.reactions.knife = { 
    elem1: 'coca_leaves',
    chance: 0.25
  };

  // Cannabis flower harvesting
  if (!elements.cannabis_sativa.reactions) {
    elements.cannabis_sativa.reactions = {};
  }
  elements.cannabis_sativa.reactions.knife = {
    elem1: 'cannabis_flower',
    chance: 0.3
  };

  if (!elements.cannabis_indica.reactions) {
    elements.cannabis_indica.reactions = {};
  }
  elements.cannabis_indica.reactions.knife = {
    elem1: 'cannabis_flower',
    chance: 0.3
  };

  if (!elements.cannabis_ruderalis.reactions) {
    elements.cannabis_ruderalis.reactions = {};
  }
  elements.cannabis_ruderalis.reactions.knife = {
    elem1: 'cannabis_flower',
    chance: 0.3
  };

  // Kratom leaf harvesting
  if (!elements.kratom.reactions) {
    elements.kratom.reactions = {};
  }
  elements.kratom.reactions.knife = {
    elem1: 'kratom_leaves',
    chance: 0.25
  };

  elements.kratom_leaves = {
    color: ['#2e7d32', '#33691e'],
    behavior: PW,
    category: 'botanicals',
    state: 'solid',
    density: 600,
    tempHigh: 180,
    stateHigh: 'ash',
    burn: 65,
    burnTime: 200,
    desc: 'Kratom leaves - contains mitragynine'
  };

  // Khat leaf harvesting
  if (!elements.khat.reactions) {
    elements.khat.reactions = {};
  }
  elements.khat.reactions.knife = {
    elem1: 'khat_leaves',
    chance: 0.25
  };

  elements.khat_leaves = {
    color: ['#558b2f', '#689f38'],
    behavior: PW,
    category: 'botanicals',
    state: 'solid',
    density: 600,
    tempHigh: 175,
    stateHigh: 'ash',
    burn: 63,
    burnTime: 210,
    desc: 'Khat leaves - contains cathinone, must be fresh'
  };

  // Salvia leaf harvesting
  if (!elements.salvia_divinorum.reactions) {
    elements.salvia_divinorum.reactions = {};
  }
  elements.salvia_divinorum.reactions.knife = {
    elem1: 'salvia_leaves',
    chance: 0.25
  };

  elements.salvia_leaves = {
    color: ['#2e7d32', '#1b5e20'],
    behavior: PW,
    category: 'botanicals',
    state: 'solid',
    density: 600,
    tempHigh: 240,
    stateHigh: ['smoke', 'salvinorin_vapor'],
    burn: 60,
    burnTime: 180,
    desc: 'Salvia leaves - contains salvinorin A, smokable'
  };

  elements.salvinorin_vapor = {
    color: ['#c8e6c9', '#a5d6a7'],
    behavior: GAS,
    tempLow: 230,
    stateLow: 'salvinorin_a',
    state: 'gas',
    density: 1.2,
    desc: 'Salvinorin A vapor - extremely potent'
  };

  elements.salvinorin_a = {
    color: ['#e8f5e9', '#f1f8e9'],
    behavior: PW,
    category: 'research_compounds',
    state: 'solid',
    density: 1100,
    tempHigh: 240,
    stateHigh: 'salvinorin_vapor',
    desc: 'Salvinorin A - most potent natural psychedelic'
  };

  // Cannabis flower extraction
  elements.cannabis_flower.reactions = {
    butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.25, temp1: 20 },
    ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.18, temp1: 2 },
    ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2, temp1: 20 }
  };

  // Mushroom extraction
  if (!elements.psilocybe_cubensis.reactions) {
    elements.psilocybe_cubensis.reactions = {};
  }
  elements.psilocybe_cubensis.reactions = {
    water: { elem1: 'psilocybin_tea', elem2: null, chance: 0.15, temp1: 70 },
    ethanol: { elem1: 'psilocybin', elem2: null, chance: 0.12, temp1: 25 }
  };

  elements.psilocybin_tea = {
    color: ['#8d6e63', '#a1887f'],
    behavior: LIQ,
    viscosity: 1100,
    category: 'research_compounds',
    state: 'liquid',
    density: 1020,
    tempHigh: 100,
    stateHigh: 'steam',
    desc: 'Psilocybin mushroom tea - water extraction'
  };

  // --------------------------------------------------------------------------
  // 14. LITHIUM REACTIONS (HIGHLY REACTIVE)
  // --------------------------------------------------------------------------
  
  elements.molten_lithium = {
    color: ['#b0bec5', '#90a4ae'],
    behavior: LIQ,
    viscosity: 600,
    category: 'precursors',
    state: 'liquid',
    density: 512,
    temp: 180,
    tempLow: 180,
    stateLow: 'lithium',
    conduct: 0.85,
    reactions: {
      water: { elem1: 'explosion', elem2: 'lithium_hydroxide', chance: 0.8 },
      oxygen: { elem1: 'lithium_oxide', elem2: 'fire', chance: 0.6 }
    },
    desc: 'Molten lithium - extremely reactive'
  };

  elements.lithium_hydroxide = {
    color: ['#f5f5f5', '#ffffff'],
    behavior: PW,
    category: 'precursors',
    state: 'solid',
    density: 1460,
    desc: 'Lithium hydroxide - white powder'
  };

  // --------------------------------------------------------------------------
  // 15. ADDITIONAL FROZEN STATES (for realism)
  // --------------------------------------------------------------------------
  
  const frozenStates = [
    'frozen_ephedrine', 'frozen_pseudo', 'frozen_p2p', 'frozen_safrole',
    'frozen_isosafrole', 'frozen_ammonia', 'frozen_hcl', 'frozen_sulfuric',
    'frozen_acetic_anh', 'frozen_formaldehyde', 'frozen_methylamine',
    'frozen_meth', 'frozen_amphet', 'frozen_mdma', 'frozen_heroin',
    'frozen_heroin_base', 'frozen_morphine', 'frozen_morph_base',
    'frozen_fentanyl', 'frozen_carfent', 'frozen_lsd', 'frozen_psilocybin',
    'frozen_psilocin', 'frozen_cocaine', 'frozen_crack', 'frozen_paste',
    'frozen_pcp', 'frozen_ketamine', 'frozen_dmt', 'frozen_ghb',
    'frozen_gbl', 'frozen_bho', 'frozen_hash', 'frozen_mescaline',
    'frozen_oxy', 'frozen_hydro', 'frozen_ether', 'frozen_dcm',
    'frozen_chloroform', 'frozen_toluene', 'frozen_hexane', 'frozen_ethanol',
    'frozen_methanol', 'frozen_butane', 'frozen_propane', 'frozen_peroxide',
    'frozen_coke_solution', 'frozen_lye', 'frozen_lemon', 'frozen_diethylamine',
    'frozen_kerosene', 'frozen_gasoline', 'frozen_acetic', 'frozen_ammonia_hydroxide'
  ];

  frozenStates.forEach(id => {
    if (!elements[id]) {
      elements[id] = {
        color: ['#e3f2fd', '#bbdefb', '#90caf9'],
        behavior: behaviors.SUPPORT,
        category: 'frozen',
        state: 'solid',
        density: 1100,
        temp: -20,
        conduct: 0.5,
        desc: 'Frozen state - thaw to restore'
      };
    }
  });

  // --------------------------------------------------------------------------
  // 16. STOMACH ACID (for psilocybin conversion)
  // --------------------------------------------------------------------------
  
  if (!elements.stomach_acid) {
    elements.stomach_acid = {
      color: ['#fff9c4', '#ffecb3'],
      behavior: LIQ,
      category: 'precursors',
      state: 'liquid',
      density: 1010,
      viscosity: 1100,
      temp: 37,
      desc: 'Stomach acid (HCl) - pH ~1.5-3.5'
    };
  }

  // --------------------------------------------------------------------------
  // 17. REALISTIC INTERACTION BEHAVIORS
  // --------------------------------------------------------------------------
  
  // Water reactions with drugs (solubility)
  elements.methamphetamine.reactions = {
    water: { elem1: 'meth_solution', elem2: null, chance: 0.2 }
  };

  elements.meth_solution = {
    color: ['#e1f5fe', '#b3e5fc'],
    behavior: LIQ,
    viscosity: 1100,
    category: 'research_compounds',
    state: 'liquid',
    density: 1020,
    tempHigh: 100,
    stateHigh: ['methamphetamine', 'steam'],
    desc: 'Methamphetamine solution - for injection'
  };

  elements.mdma.reactions = {
    water: { elem1: 'mdma_solution', elem2: null, chance: 0.18 }
  };

  elements.mdma_solution = {
    color: ['#fff9c4', '#ffecb3'],
    behavior: LIQ,
    viscosity: 1080,
    category: 'research_compounds',
    state: 'liquid',
    density: 1015,
    tempHigh: 100,
    stateHigh: ['mdma', 'steam'],
    desc: 'MDMA solution - molly water'
  };

  // Ephedrine extraction from plants
  if (!elements.ephedra_sinica.reactions) {
    elements.ephedra_sinica.reactions = {};
  }
  elements.ephedra_sinica.reactions.water = {
    elem1: 'ephedrine',
    elem2: null,
    chance: 0.1,
    temp1: 80
  };

  // Morphine from opium
  elements.opium_latex.reactions.water = {
    elem1: 'opium_solution',
    elem2: null,
    chance: 0.15
  };

  elements.opium_solution.reactions = {
    lime: { elem1: 'morphine_base', elem2: null, chance: 0.25, temp1: 80 },
    ammonium_hydroxide: { elem1: 'morphine_base', elem2: null, chance: 0.22, temp1: 80 }
  };

  // --------------------------------------------------------------------------
  // 18. COMPLETION & DEBUG
  // --------------------------------------------------------------------------
  
  console.log('✓ ChemResearch v2 Enhanced - REALISTIC BEHAVIORS loaded');
  console.log('✓ Temperature-dependent phase changes implemented');
  console.log('✓ Realistic densities, viscosities, and conductivity');
  console.log('✓ Proper boiling/freezing points for all chemicals');
  console.log('✓ Solubility and reaction conditions configured');
  console.log('✓ Flammability and burn rates realistic');
  console.log('✓ Total active elements: ' + Object.keys(elements).filter(k => 
    elements[k].category && (
      elements[k].category.includes('research_compounds') ||
      elements[k].category.includes('botanicals') ||
      elements[k].category.includes('precursors') ||
      elements[k].category.includes('solvents')
    )
  ).length);

})();
