// ============================================================================
//  CHEMRESEARCH.JS  –  Educational chemistry expansion for Sandboxels
//  Author:  (your handle)
//  License: MIT – FOR RESEARCH / EDUCATIONAL PURPOSES ONLY
// ============================================================================
/*global elements, behaviors, categories, pixel, settings, debug */

(() => {
  'use strict';

  // --------------------------------------------------------------------------
  // 0.  ON-LOAD DISCLAIMER
  // --------------------------------------------------------------------------
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      alert(
        'CHEMRESEARCH.JS – EDUCATIONAL MOD\n' +
        'This mod simulates real-world chemistry including controlled substances.\n' +
        'No real-world instructions are provided.  Use responsibly.'
      );
    });
  }

  // --------------------------------------------------------------------------
  // 1.  HELPERS
  // --------------------------------------------------------------------------
  const RD = behaviors.RAD_DIFFUSE; // shortcut
  const PW = behaviors.POWDER;
  const LIQ = behaviors.LIQUID;

  // --------------------------------------------------------------------------
  // 2.  PLANTS & BOTANICALS (strains included)
  // --------------------------------------------------------------------------
  const plants = {
    cannabis_sativa:   { color: '#2e7d32', seed: 'cannabis_seed_sativa' },
    cannabis_indica:   { color: '#1b5e20', seed: 'cannabis_seed_indica' },
    cannabis_ruderalis:{ color: '#388e3c', seed: 'cannabis_seed_ruderalis' },
    papaver_somniferum:{ color: '#4a148c', seed: 'poppy_seed' },
    coca_boliviana:    { color: '#004d40', seed: 'coca_seed_boliviana' },
    coca_colombiana:   { color: '#00695c', seed: 'coca_seed_colombiana' },
    ephedra_sinica:    { color: '#827717', seed: 'ephedra_seed' },
    khat:              { color: '#558b2f', seed: 'khat_seed' },
    kratom:            { color: '#33691e', seed: 'kratom_seed' },
    psilocybe_cubensis:{ color: '#5d4037', seed: 'psilocybe_spore' },
    iboga:             { color: '#3e2723', seed: 'iboga_seed' },
    salvia_divinorum:  { color: '#004d40', seed: 'salvia_seed' },
    ayahuasca_vine:    { color: '#2e7d32', seed: 'caapi_seed' },
  };

  Object.entries(plants).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.color,
      behavior: behaviors.STURDY_PLANT,
      category: 'botanicals',
      tempHigh: 200,
      stateHigh: 'dead_plant',
      burn: 85,
      burnTime: 300,
      breakInto: cfg.seed,
      desc: `Botanical source.  Research use only.`
    };
    elements[cfg.seed] = {
      color: lightenColor(cfg.color, 40),
      behavior: PW,
      category: 'botanicals',
      tempHigh: 150,
      stateHigh: 'ash',
      reactions: {
        soil: { elem1: id, chance: 0.02 },
        water: { elem2: 'wet_soil' }
      }
    };
  });

  // --------------------------------------------------------------------------
  // 3.  RESINS / LATEX / RAW ALKALOIDS
  // --------------------------------------------------------------------------
  elements.opium_latex = {
    color: '#6a1b9a',
    behavior: LIQ,
    viscosity: 2000,
    category: 'raw_alkaloids',
    tempHigh: 120,
    stateHigh: 'morphine_vapor',
    reactions: {
      acetic_anhydride: { elem1: 'heroin_base' },
      lime: { elem1: 'morphine_base' }
    }
  };

  elements.coca_leaves = {
    color: '#2e7d32',
    behavior: PW,
    category: 'botanicals',
    breakInto: 'coca_alkaloids'
  };

  elements.coca_alkaloids = {
    color: '#f9fbe7',
    behavior: PW,
    category: 'raw_alkaloids',
    reactions: {
      gasoline: { elem1: 'coca_paste' },
      kerosene: { elem1: 'coca_paste' }
    }
  };

  elements.cannabis_flower_sativa = {
    color: '#66bb6a',
    behavior: PW,
    category: 'botanicals',
    breakInto: ['cannabis_trichomes', 'plant_matter']
  };

  elements.cannabis_trichomes = {
    color: '#e8f5e9',
    behavior: PW,
    category: 'raw_alkaloids',
    reactions: {
      butane: { elem1: 'bho' },
      ice_water: { elem1: 'bubble_hash' }
    }
  };

  // --------------------------------------------------------------------------
  // 4.  PRECURSORS & REAGENTS
  // --------------------------------------------------------------------------
  [
    'ephedrine', 'pseudoephedrine', 'phenylacetic_acid', 'p2p',
    'safrole', 'isosafrole', 'piperonal', 'anhydrous_ammonia',
    'red_phosphorus', 'lithium', 'sodium_hydroxide', 'acetone',
    'hydrochloric_acid', 'sulfuric_acid', 'acetic_anhydride',
    'formaldehyde', 'methylamine', 'benzylmagnesium_chloride'
  ].forEach(id => {
    elements[id] = {
      color: randomGray(),
      behavior: /acid|anhydride/.test(id) ? LIQ : PW,
      category: 'precursors',
      desc: `Precursor chemical.  Research use only.`
    };
  });

  // --------------------------------------------------------------------------
  // 5.  FINAL COMPOUNDS (with scheduling tags)
  // --------------------------------------------------------------------------
  const compounds = {
    methamphetamine:      { sched: 'II', form: 'powder' },
    mdma:                 { sched: 'I',  form: 'crystal' },
    heroin:               { sched: 'I',  form: 'powder' },
    fentanyl:             { sched: 'II', form: 'powder' },
    lsd:                  { sched: 'I',  form: 'blotter' },
    psilocybin:           { sched: 'I',  form: 'powder' },
    mescaline:            { sched: 'I',  form: 'crystal' },
    dmt:                  { sched: 'I',  form: 'crystal' },
    cocaine:              { sched: 'II', form: 'powder' },
    crack:                { sched: 'I',  form: 'rock' },
    pcp:                  { sched: 'II', form: 'liquid' },
    ketamine:             { sched: 'III', form: 'crystal' },
    ghb:                  { sched: 'I',  form: 'liquid' },
    bath_salts:           { sched: 'I',  form: 'powder' },
    spice:                { sched: 'I',  form: 'plant_matter' },
    carfentanil:          { sched: 'II', form: 'powder' },
    nbome:                { sched: 'I',  form: 'blotter' },
  };

  Object.entries(compounds).forEach(([id, cfg]) => {
    elements[id] = {
      color: randomColor(),
      behavior: cfg.form === 'liquid' ? LIQ : PW,
      category: 'research_compounds',
      desc: `Schedule ${cfg.sched} controlled substance.  Research use only.`
    };
  });

  // --------------------------------------------------------------------------
  // 6.  REACTIONS  (simplified, educational)
  // --------------------------------------------------------------------------
  elements.pseudoephedrine.reactions = {
    'red_phosphorus+lithium+anhydrous_ammonia': { elem1: 'methamphetamine' }
  };
  elements.safrole.reactions = {
    'hydrogen_peroxide+formic_acid': { elem1: 'mdma' }
  };
  elements.morphine_base.reactions = {
    acetic_anhydride: { elem1: 'heroin' }
  };
  elements.coca_paste.reactions = {
    potassium_permanganate: { elem1: 'cocaine' }
  };
  elements.lysergic_acid.reactions = {
    diethylamine: { elem1: 'lsd' }
  };
  elements.psilocybin.reacts = {
    lemon_juice: { elem1: 'psilocin' }
  };

  // --------------------------------------------------------------------------
  // 7.  LAB APPARATUS
  // --------------------------------------------------------------------------
  [
    'reaction_flask', 'condenser', 'separatory_funnel', 'buchner_funnel',
    'erlenmeyer_flask', 'round_bottom_flask', 'hot_plate', 'magnetic_stirrer',
    'ph_strip', 'ice_bath', 'oil_bath', 'vacuum_pump'
  ].forEach(id => {
    elements[id] = {
      color: '#9e9e9e',
      behavior: behaviors.WALL,
      category: 'lab_equipment',
      desc: 'Laboratory glassware.  Research use only.'
    };
  });

  // --------------------------------------------------------------------------
  // 8.  STRAIN SYSTEM (cannabis example)
  // --------------------------------------------------------------------------
  const strains = [
    'sour_diesel', 'og_kush', 'girl_scout_cookies', 'blue_dream',
    'granddaddy_purple', 'white_widow', 'jack_herer', 'gorilla_glue'
  ];
  strains.forEach(name => {
    elements['flower_' + name] = {
      color: randomGreen(),
      behavior: PW,
      category: 'cannabis_strains',
      breakInto: ['cannabis_trichomes', 'plant_matter'],
      desc: `Cannabis strain “${name}”.  Research use only.`
    };
  });

  // --------------------------------------------------------------------------
  // 9.  UTILS
  // --------------------------------------------------------------------------
  function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }
  function randomGray() {
    const g = Math.floor(Math.random() * 80 + 160);
    return `#${g.toString(16).repeat(3)}`;
  }
  function randomGreen() {
    return '#' + [0, Math.floor(Math.random() * 100 + 100), 0].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  function lightenColor(hex, percent) {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  debug.log('chemresearch.js loaded – educational chemistry expansion');
})();
