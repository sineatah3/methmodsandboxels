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

  const rndGrey = () => {
    const g = Math.floor(Math.random() * 80 + 160);
    return `#${g.toString(16).padStart(2, '0').repeat(3)}`;
  };
  const rndGreen = () => '#' + [0, Math.floor(Math.random() * 100 + 100), 0]
    .map(x => x.toString(16).padStart(2, '0')).join('');
  const lighten = (hex, p) => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * p);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return '#' + ((R << 16) | (G << 8) | B).toString(16).padStart(6, '0');
  };

  // --------------------------------------------------------------------------
  // 2.  BOTANICALS (plants + seeds)  –  fixed seed links
  // --------------------------------------------------------------------------
  const botanicals = {
    cannabis_sativa:    { color: '#2e7d32', seed: 'seed_sativa' },
    cannabis_indica:    { color: '#1b5e20', seed: 'seed_indica' },
    cannabis_ruderalis: { color: '#388e3c', seed: 'seed_ruderalis' },
    papaver_somniferum: { color: '#4a148c', seed: 'seed_poppy' },
    coca_boliviana:     { color: '#004d40', seed: 'seed_coca_bol' },
    coca_colombiana:    { color: '#00695c', seed: 'seed_coca_col' },
    ephedra_sinica:     { color: '#827717', seed: 'seed_ephedra' },
    khat:               { color: '#558b2f', seed: 'seed_khat' },
    kratom:             { color: '#33691e', seed: 'seed_kratom' },
    psilocybe_cubensis: { color: '#5d4037', seed: 'spore_cubensis' },
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
      color: lighten(cfg.color, 40),
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
  // 3.  RAW BOTANICAL PRODUCTS
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

  elements.cannabis_flower = {
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
  const precursors = [
    'ephedrine', 'pseudoephedrine', 'phenylacetic_acid', 'p2p',
    'safrole', 'isosafrole', 'piperonal', 'anhydrous_ammonia',
    'red_phosphorus', 'lithium', 'sodium_hydroxide', 'acetone',
    'hydrochloric_acid', 'sulfuric_acid', 'acetic_anhydride',
    'formaldehyde', 'methylamine', 'benzylmagnesium_chloride',
    'pmk_glycidate', 'bmk_glycidate', 'nitroethane', 'n_methyl_formamide',
    'lysergic_acid', 'ergotamine', 'thebaine', 'oripavine'
  ];
  precursors.forEach(id => {
    elements[id] = {
      color: rndGrey(),
      behavior: /acid|anhydride|amide/.test(id) ? LIQ : PW,
      category: 'precursors',
      desc: 'Precursor chemical.  Research use only.'
    };
  });

  // --------------------------------------------------------------------------
  // 5.  FINAL COMPOUNDS (analogues & RCs included)
  // --------------------------------------------------------------------------
  const compounds = {
    methamphetamine:     { sched: 'II', form: 'powder' },
    amphetamine:         { sched: 'II', form: 'powder' },
    mdma:                { sched: 'I',  form: 'crystal' },
    mda:                 { sched: 'I',  form: 'crystal' },
    mde:                 { sched: 'I',  form: 'crystal' },
    heroin:              { sched: 'I',  form: 'powder' },
    fentanyl:            { sched: 'II', form: 'powder' },
    carfentanil:         { sched: 'II', form: 'powder' },
    sufentanil:          { sched: 'II', form: 'powder' },
    lsd:                 { sched: 'I',  form: 'blotter' },
    psilocybin:          { sched: 'I',  form: 'powder' },
    psilocin:            { sched: 'I',  form: 'powder' },
    mescaline:           { sched: 'I',  form: 'crystal' },
    dmt:                 { sched: 'I',  form: 'crystal' },
    cocaine:             { sched: 'II', form: 'powder' },
    crack:               { sched: 'I',  form: 'rock' },
    coca_paste:          { sched: 'I',  form: 'paste' },
    pcp:                 { sched: 'II', form: 'liquid' },
    ketamine:            { sched: 'III', form: 'crystal' },
    norketamine:         { sched: 'III', form: 'crystal' },
    ghb:                 { sched: 'I',  form: 'liquid' },
    gbl:                 { sched: 'I',  form: 'liquid' },
    bath_salts:          { sched: 'I',  form: 'powder' },
    spice:               { sched: 'I',  form: 'plant_matter' },
    nbome_25i:           { sched: 'I',  form: 'blotter' },
    nbome_25c:           { sched: 'I',  form: 'blotter' },
    2c_b:                { sched: 'I',  form: 'crystal' },
    2c_i:                { sched: 'I',  form: 'crystal' },
    2c_e:                { sched: 'I',  form: 'crystal' },
    alpha_pvp:           { sched: 'I',  form: 'crystal' },
    methylone:           { sched: 'I',  form: 'crystal' },
    mephedrone:          { sched: 'I',  form: 'crystal' },
    bk_mdma:             { sched: 'I',  form: 'crystal' },
    etizolam:            { sched: 'IV', form: 'powder' },
    flualprazolam:       { sched: 'I',  form: 'powder' },
    clonazolam:          { sched: 'I',  form: 'powder' },
    morphine:            { sched: 'II', form: 'powder' },
    codeine:             { sched: 'II', form: 'powder' },
    thebaine_derived:    { sched: 'II', form: 'powder' },
    oxycodone:           { sched: 'II', form: 'powder' },
    hydrocodone:         { sched: 'II', form: 'powder' },
    hydromorphone:       { sched: 'II', form: 'powder' },
    oxymorphone:         { sched: 'II', form: 'powder' },
    buprenorphine:       { sched: 'III', form: 'powder' },
    naloxone:            { sched: 'Rx', form: 'powder' },
    naltrexone:          { sched: 'Rx', form: 'powder' },
    methadone:           { sched: 'II', form: 'powder' },
    tramadol:            { sched: 'IV', form: 'powder' },
    tapentadol:          { sched: 'II', form: 'powder' },
    dextroamphetamine:   { sched: 'II', form: 'powder' },
    levoamphetamine:     { sched: 'II', form: 'powder' },
    lisdexamfetamine:    { sched: 'II', form: 'powder' },
    methylphenidate:     { sched: 'II', form: 'powder' },
    ethylphenidate:      { sched: 'I',  form: 'powder' },
    modafinil:           { sched: 'IV', form: 'powder' },
    armodafinil:         { sched: 'IV', form: 'powder' },
    heroin_base:         { sched: 'I',  form: 'powder' },
    morphine_base:       { sched: 'II', form: 'powder' },
    bho:                 { sched: 'I',  form: 'oil' },
    bubble_hash:         { sched: 'I',  form: 'powder' },
    datura_stramonium:   { sched: 'I',  form: 'powder' },
    scopolamine:         { sched: 'II', form: 'powder' },
    atropine:            { sched: 'II', form: 'powder' },
    ibogaine:            { sched: 'I',  form: 'crystal' },
    salvinorin_a:        { sched: 'I',  form: 'crystal' },
  };

  Object.entries(compounds).forEach(([id, cfg]) => {
    elements[id] = {
      color: rndGrey(),
      behavior: cfg.form === 'liquid' || cfg.form === 'oil' ? LIQ : PW,
      category: 'research_compounds',
      desc: `Schedule ${cfg.sched} controlled substance.  Research use only.`
    };
  });

  // --------------------------------------------------------------------------
  // 6.  EDUCATIONAL REACTIONS (visible in-code)
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
  elements.thebaine_derived.reactions = {
    'methylvinylketone+ hydrogen': { elem1: 'oxycodone' }
  };
  elements.codeine.reactions = {
    'potassium_permanganate': { elem1: 'hydrocodone' }
  };
  elements.lysergic_acid.reactions = {
    diethylamine: { elem1: 'lsd' }
  };
  elements.ergotamine.reactions = {
    'hydrazine+heat': { elem1: 'lysergic_acid' }
  };
  elements.coca_paste.reactions = {
    potassium_permanganate: { elem1: 'cocaine' }
  };
  elements.cocaine.reactions = {
    'baking_soda+water+heat': { elem1: 'crack' }
  };
  elements.psilocybin.reactions = {
    lemon_juice: { elem1: 'psilocin' }
  };
  elements.iboga.reactions = {
    'methanol+filtration': { elem1: 'ibogaine' }
  };
  elements.salvia_divinorum.reactions = {
    'acetone+evaporation': { elem1: 'salvinorin_a' }
  };

  // --------------------------------------------------------------------------
  // 7.  LAB APPARATUS
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
  // 8.  CANNABIS STRAINS (20 examples)
  // --------------------------------------------------------------------------
  const strains = [
    'sour_diesel', 'og_kush', 'girl_scout_cookies', 'blue_dream',
    'granddaddy_purple', 'white_widow', 'jack_herer', 'gorilla_glue',
    'pineapple_express', 'ak_47', 'chemdawg', 'northern_lights',
    'amnesia_haze', 'super_lemon_haze', 'strawberry_cough', 'bubba_kush',
    'purple_haze', 'charlottes_web', 'cbd_shark', 'harlequin'
  ];
  strains.forEach(name => {
    elements['flower_' + name] = {
      color: rndGreen(),
      behavior: PW,
      category: 'cannabis_strains',
      breakInto: ['cannabis_trichomes', 'plant_matter'],
      desc: `Cannabis strain “${name}”.  Research use only.`
    };
  });

  // --------------------------------------------------------------------------
  // 9.  DEBUG HOOK
  // --------------------------------------------------------------------------
  if (typeof debug !== 'undefined') debug.log('chemresearch_v2.js loaded');
})();
