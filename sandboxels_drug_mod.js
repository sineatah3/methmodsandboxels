// ============================================================================
//  CHEMRESEARCH_V2.JS  –  Educational chemistry expansion for Sandboxels
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
        'CHEMRESEARCH_V2 – EDUCATIONAL MOD\n' +
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

  const rndGrey = (min = 160, max = 240) => {
    const g = Math.floor(Math.random() * (max - min) + min);
    return `#${g.toString(16).padStart(2, '0').repeat(3)}`;
  };

  // --------------------------------------------------------------------------
  // 2.  BOTANICALS (plants + seeds)  –  realistic greens / flower tints
  // --------------------------------------------------------------------------
  const botanicals = {
    cannabis_sativa:    { color: '#3e8948', seed: 'seed_sativa' },
    cannabis_indica:    { color: '#2a5d32', seed: 'seed_indica' },
    cannabis_ruderalis: { color: '#4a7c59', seed: 'seed_ruderalis' },
    papaver_somniferum: { color: '#7b1fa2', seed: 'seed_poppy' },
    coca_boliviana:     { color: '#004d40', seed: 'seed_coca_bol' },
    coca_colombiana:    { color: '#00695c', seed: 'seed_coca_col' },
    ephedra_sinica:     { color: '#827717', seed: 'seed_ephedra' },
    khat:               { color: '#558b2f', seed: 'seed_khat' },
    kratom:             { color: '#33691e', seed: 'seed_kratom' },
    psilocybe_cubensis: { color: '#6d4c41', seed: 'spore_cubensis' },
    iboga:              { color: '#3e2723', seed: 'seed_iboga' },
    salvia_divinorum:   { color: '#004d40', seed: 'seed_salvia' },
    banisteriopsis_caapi:{ color: '#2e7d32', seed: 'seed_caapi' },
  };

  Object.entries(botanicals).forEach(([plant, cfg]) => {
    elements[plant] = {
      color: cfg.color,
      behavior: STURDY,
      category: 'botanicals',
      tempHigh: 200,
      stateHigh: 'dead_plant',
      burn: 85,
      burnTime: 300,
      breakInto: cfg.seed,
      desc: 'Botanical source.  Research use only.'
    };
    elements[cfg.seed] = {
      color: '#8d6e63', // tan seed look
      behavior: PW,
      category: 'botanicals',
      tempHigh: 150,
      stateHigh: 'ash',
      reactions: {
        soil: { elem1: plant, chance: 0.02 },
        water: { elem2: 'wet_soil' }
      },
      desc: 'Seed / spore.  Research use only.'
    };
  });

  // --------------------------------------------------------------------------
  // 3.  RAW BOTANICAL PRODUCTS  –  real colours
  // --------------------------------------------------------------------------
  elements.opium_latex = {
    color: '#4a148c', // deep purple-brown latex
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
    color: '#f9fbe7', // off-white crude
    behavior: PW,
    category: 'raw_alkaloids',
    reactions: {
      gasoline: { elem1: 'coca_paste' },
      kerosene: { elem1: 'coca_paste' }
  elements.cannabis_flower = {
    color: '#66bb6a',
    behavior: PW,
    category: 'botanicals',
    breakInto: ['cannabis_trichomes', 'plant_matter']
  };
  elements.cannabis_trichomes = {
    color: '#e8f5e9', // blond kief
    behavior: PW,
    category: 'raw_alkaloids',
    reactions: {
      butane: { elem1: 'bho' },
      ice_water: { elem1: 'bubble_hash' }
    }
  };

  // --------------------------------------------------------------------------
  // 4.  PRECURSORS & REAGENTS  –  realistic colours
  // --------------------------------------------------------------------------
  const precursors = {
    ephedrine:            '#ffffff', // white micronised
    pseudoephedrine:      '#f5f5f5',
    phenylacetic_acid:    '#e0e0e0',
    p2p:                  '#d7ccc8', // pale yellow oil
    safrole:              '#8d6e63', // amber
    isosafrole:           '#6d4c41',
    piperonal:            '#efebe9',
    anhydrous_ammonia:    '#b3e5fc', // faint blue vapour
    red_phosphorus:       '#d32f2f', // brick red
    lithium:              '#ffcc02', // shiny silver-grey → yellow in air
    sodium_hydroxide:     '#90a4ae', // white micro-beads
    acetone:              '#e1f5fe',
    hydrochloric_acid:    '#ffeb3b', // faint yellow liquid
    sulfuric_acid:        '#ffc107', // oily amber
    acetic_anhydride:     '#ffecb3',
    formaldehyde:         '#f1f8e9',
    methylamine:          '#e0f2f1',
    benzylmagnesium_chloride:'#fff9c4',
    pmk_glycidate:        '#dcedc8',
    bmk_glycidate:        '#c8e6c9',
    nitroethane:          '#ffccbc',
    n_methyl_formamide:   '#e1bee7',
    lysergic_acid:        '#fce4ec',
    ergotamine:           '#f8bbd0',
    thebaine:             '#e1f5fe',
    oripavine:            '#b3e5fc'
  };

  Object.entries(precursors).forEach(([id, col]) => {
    elements[id] = {
      color: col,
      behavior: /acid|anhydride|amide|glycidate/.test(id) ? LIQ : PW,
      category: 'precursors',
      desc: 'Precursor chemical.  Research use only.'
    };
  });

  // --------------------------------------------------------------------------
  // 5.  FINAL COMPOUNDS  –  real-world hues
  // --------------------------------------------------------------------------
  const compounds = {
    methamphetamine:     { sched: 'II', form: 'powder', col: '#ffffff' },
    amphetamine:         { sched: 'II', form: 'powder', col: '#fafafa' },
    mdma:                { sched: 'I',  form: 'crystal', col: '#fff8e1' }, // off-white champagne
    mda:                 { sched: 'I',  form: 'crystal', col: '#ffecb3' },
    mde:                 { sched: 'I',  form: 'crystal', col: '#ffe082' },
    heroin:              { sched: 'I',  form: 'powder', col: '#ffffff' }, // white HCl
    heroin_base:         { sched: 'I',  form: 'powder', col: '#8d6e63' }, // tan base
    morphine:            { sched: 'II', form: 'powder', col: '#f5f5f5' },
    morphine_base:       { sched: 'II', form: 'powder', col: '#bcaaa4' },
    fentanyl:            { sched: 'II', form: 'powder', col: '#ffffff' },
    carfentanil:         { sched: 'II', form: 'powder', col: '#f1f8e9' },
    lsd:                 { sched: 'I',  form: 'blotter', col: '#fff9c4' }, // pale yellow sheet
    psilocybin:          { sched: 'I',  form: 'powder', col: '#ffccbc' }, // light brown
    psilocin:            { sched: 'I',  form: 'powder', col: '#ffab91' },
    mescaline:           { sched: 'I',  form: 'crystal', col: '#ffffff' },
    dmt:                 { sched: 'I',  form: 'crystal', col: '#ffeb3b' }, // yellow needles
    cocaine:             { sched: 'II', form: 'powder', col: '#ffffff' }, // glossy HCl
    crack:               { sched: 'I',  form: 'rock', col: '#d7ccc8' }, // off-white waxy rocks
    coca_paste:          { sched: 'I',  form: 'paste', col: '#8d6e63' },
    pcp:                 { sched: 'II', form: 'liquid', col: '#e0e0e0' },
    ketamine:            { sched: 'III', form: 'crystal', col: '#ffffff' },
    ghb:                 { sched: 'I',  form: 'liquid', col: '#e1f5fe' },
    gbl:                 { sched: 'I',  form: 'liquid', col: '#b3e5fc' },
    bath_salts:          { sched: 'I',  form: 'powder', col: '#ffecb3' },
    spice:               { sched: 'I',  form: 'plant_matter', col: '#689f38' },
    nbome_25i:           { sched: 'I',  form: 'blotter', col: '#fff8e1' },
    nbome_25c:           { sched: 'I',  form: 'blotter', col: '#fff3c4' },
    2c_b:                { sched: 'I',  form: 'crystal', col: '#ffccbc' },
    2c_i:                { sched: 'I',  form: 'crystal', col: '#ffab91' },
    2c_e:                { sched: 'I',  form: 'crystal', col: '#ff8a65' },
    alpha_pvp:           { sched: 'I',  form: 'crystal', col: '#ffffff' },
    methylone:           { sched: 'I',  form: 'crystal', col: '#ffeb3b' },
    mephedrone:          { sched: 'I',  form: 'crystal', col: '#fff9c4' },
    bk_mdma:             { sched: 'I',  form: 'crystal', col: '#fff59d' },
    etizolam:            { sched: 'IV', form: 'powder', col: '#ffffff' },
    flualprazolam:       { sched: 'I',  form: 'powder', col: '#f5f5f5' },
    clonazolam:          { sched: 'I',  form: 'powder', col: '#fafafa' },
    oxycodone:           { sched: 'II', form: 'powder', col: '#ffffff' },
    hydrocodone:         { sched: 'II', form: 'powder', col: '#f5f5f5' },
    hydromorphone:       { sched: 'II', form: 'powder', col: '#fafafa' },
    oxymorphone:         { sched: 'II', form: 'powder', col: '#fff8e1' },
    buprenorphine:       { sched: 'III', form: 'powder', col: '#ffffff' },
    naloxone:            { sched: 'Rx', form: 'powder', col: '#e1f5fe' },
    naltrexone:          { sched: 'Rx', form: 'powder', col: '#b3e5fc' },
    methadone:           { sched: 'II', form: 'powder', col: '#ffffff' },
    tramadol:            { sched: 'IV', form: 'powder', col: '#ffecb3' },
    tapentadol:          { sched: 'II', form: 'powder', col: '#ffe082' },
    dextroamphetamine:   { sched: 'II', form: 'powder', col: '#ffffff' },
    levoamphetamine:     { sched: 'II', form: 'powder', col: '#fafafa' },
    lisdexamfetamine:    { sched: 'II', form: 'powder', col: '#f5f5f5' },
    methylphenidate:     { sched: 'II', form: 'powder', col: '#ffffff' },
    ethylphenidate:      { sched: 'I',  form: 'powder', col: '#ffecb3' },
    modafinil:           { sched: 'IV', form: 'powder', col: '#ffffff' },
    armodafinil:         { sched: 'IV', form: 'powder', col: '#fafafa' },
    ibogaine:            { sched: 'I',  form: 'crystal', col: '#ffccbc' },
    salvinorin_a:        { sched: 'I',  form: 'crystal', col: '#ffab91' },
    scopolamine:         { sched: 'II', form: 'powder', col: '#ffffff' },
    atropine:            { sched: 'II', form: 'powder', col: '#f5f5f5' },
    bho:                 { sched: 'I',  form: 'oil', col: '#827717' }, // honey oil
    bubble_hash:         { sched: 'I',  form: 'powder', col: '#d7ccc8' } // blond hash
  };

  Object.entries(compounds).forEach(([id, cfg]) => {
    elements[id] = {
      color: cfg.col,
      behavior: cfg.form === 'liquid' || cfg.form === 'oil' ? LIQ : PW,
      category: 'research_compounds',
      desc: `Schedule ${cfg.sched} controlled substance.  Research use only.`
    };
  });

  // --------------------------------------------------------------------------
  // 6.  CRACK-COOKING CHAIN  –  now complete
  // --------------------------------------------------------------------------
  // slurry creation
  elements.cocaine.reactions = {
    ...elements.cocaine.reactions,
    'water+baking_soda': { elem1: 'crack_slurry', elem2: null }
  };
  // slurry → crack when heated
  elements.crack_slurry = {
    color: '#fff3e0', // off-white milky
    behavior: LIQ,
    viscosity: 1500,
    category: 'research_compounds',
    tempHigh: 90,
    stateHigh: 'crack',
    desc: 'Cocaine-HCl + NaHCO₃ + H₂O.  Heat ≥ 90 °C → free-base rocks.'
  };
  // optional visual helper: baking-soda
  if (!elements.baking_soda) {
    elements.baking_soda = {
      color: '#fafafa', // arm & hammer white
      behavior: PW,
      category: 'precursors',
      desc: 'Sodium bicarbonate.  Research use only.'
    };
  }

  // --------------------------------------------------------------------------
  // 7.  OTHER EDUCATIONAL REACTIONS (kept from v2)
  // --------------------------------------------------------------------------
  elements.pseudoephedrine.reactions = {
    'red_phosphorus+lithium+anhydrous_ammonia': { elem1: 'methamphetamine' }
  };
  elements.ephedrine.reactions = {
    'methylamine+formaldehyde+hydrogen': { elem1: 'methamphetamine' }
  };
  elements.safrole.reactions = {
    'hydrogen_peroxide+formic_acid': { elem1: 'mdma' }
  };
  elements.morphine_base.reactions = {
    acetic_anhydride: { elem1: 'heroin_base' }
  };
  elements.lysergic_acid.reactions = {
    diethylamine: { elem1: 'lsd' }
  };
  elements.coca_paste.reactions = {
    potassium_permanganate: { elem1: 'cocaine' }
  };
  elements.psilocybin.reactions = {
    lemon_juice: { elem1: 'psilocin' }
  };

  // --------------------------------------------------------------------------
  // 8.  LAB APPARATUS
  // --------------------------------------------------------------------------
  [
    'reaction_flask', 'condenser', 'separatory_funnel', 'buchner_funnel',
    'erlenmeyer_flask', 'round_bottom_flask', 'hot_plate', 'magnetic_stirrer',
    'ph_strip', 'ice_bath', 'oil_bath', 'vacuum_pump', 'sintered_funnel',
    'rotovap', 'lyophilizer'
  ].forEach(id => {
    elements[id] = {
      color: '#9e9e9e',
      behavior: WALL,
      category: 'lab_equipment',
      desc: 'Laboratory glassware.  Research use only.'
    };
  });

  // --------------------------------------------------------------------------
  // 9.  CANNABIS STRAINS (20 realistic greens / purples)
  // --------------------------------------------------------------------------
  const strains = [
    'sour_diesel', 'og_kush', 'girl_scout_cookies', 'blue_dream',
    'granddaddy_purple', 'white_widow', 'jack_herer', 'gorilla_glue',
    'pineapple_express', 'ak_47', 'chemdawg', 'northern_lights',
    'amnesia_haze', 'super_lemon_haze', 'strawberry_cough', 'bubba_kush',
    'purple_haze', 'charlottes_web', 'cbd_shark', 'harlequin'
  ];
  strains.forEach(name => {
    const purple = name.includes('purple') || name.includes('granddaddy');
    elements['flower_' + name] = {
      color: purple ? '#7b1fa2' : '#4caf50',
      behavior: PW,
      category: 'cannabis_strains',
      breakInto: ['cannabis_trichomes', 'plant_matter'],
      desc: `Cannabis strain “${name}”.  Research use only.`
    };
  });

  // --------------------------------------------------------------------------
  // 10.  DEBUG HOOK
  // --------------------------------------------------------------------------
  if (typeof debug !== 'undefined') debug.log('chemresearch_v2.js loaded with realistic textures & crack chain');
})();
