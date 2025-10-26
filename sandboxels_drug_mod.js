// ============================================================================
// CHEMRESEARCH_V2_ENHANCED.JS – Educational Chemistry with Realistic Behavior
// MIT Licence – Research / EDU Use Only – No Real-World Instructions
// ============================================================================
/* global elements, behaviors, pixel, settings */

(() => {
    'use strict';

    // --------------------------------------------------------------------------
    // 0. ON-LOAD DISCLAIMER
    // --------------------------------------------------------------------------
    if (typeof window !== 'undefined') {
        window.addEventListener('load', () => {
            alert(
                'CHEMRESEARCH_V2 ENHANCED – EDUCATIONAL MOD\n' +
                'Simulates real-world chemistry including controlled substances.\n' +
                'No real-world instructions are provided. Use responsibly.'
            );
        });
    }

    // --------------------------------------------------------------------------
    // 1. HELPERS & BEHAVIORS
    // --------------------------------------------------------------------------
    const PW = behaviors.POWDER;
    const LIQ = behaviors.LIQUID;
    const WALL = behaviors.WALL;
    const STURDY = behaviors.STURDY_PLANT;
    const GAS = behaviors.GAS;

    // --------------------------------------------------------------------------
    // 2. BOTANICALS (Plants + Seeds) – Realistic Growth & Properties
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
                mud: { elem1: plant, elem2: null, chance: 0.02, temp1: 20 },
                fertilizer: { elem1: plant, elem2: null, chance: 0.05, temp1: 20 }
            },
            desc: 'Seed/spore - Needs wet soil and warmth to grow'
        };
    });

    // --------------------------------------------------------------------------
    // 3. RAW BOTANICAL PRODUCTS – Realistic Extraction Behavior
    // --------------------------------------------------------------------------
    elements.opium_latex = {
        color: ['#4a148c', '#6a1b9a', '#38006b', '#553098'],
        behavior: LIQ,
        viscosity: 3500,
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
            water: { elem1: 'opium_solution', elem2: null, chance: 0.1 },
            knife: { elem1: 'opium_latex', elem2: null, chance: 0.15 }
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
        reactions: {
            lime: { elem1: 'morphine_base', elem2: null, chance: 0.25, temp1: 80 },
            ammonium_hydroxide: { elem1: 'morphine_base', elem2: null, chance: 0.22, temp1: 80 }
        },
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
        reactions: {
            knife: { elem1: 'coca_leaves', elem2: null, chance: 0.2 }
        },
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
        reactions: {
            butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.25, temp1: 20 },
            ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.18, temp1: 2 },
            ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2, temp1: 20 }
        },
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
    // 4. PRECURSORS & REAGENTS – Realistic Physical/Chemical Properties
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
            reactions: {
                hydrogen: { elem1: 'pseudoephedrine', elem2: null, chance: 0.15, temp1: 120 },
                catalyst: { elem1: 'pseudoephedrine', elem2: null, chance: 0.12, temp1: 100 },
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, temp1: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, temp1: 110 }
            },
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
            reactions: {
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, temp1: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, temp1: 110 }
            },
            desc: 'Pseudoephedrine - white powder, soluble in water'
        },
        phenylacetic_acid: {
            colors: ['#e0e0e0', '#eeeeee', '#f5f5f5'],
            density: 1080,
            tempHigh: 265,
            stateHigh: 'smoke',
            conduct: 0.15,
            reactions: {
                acetic_anhydride: { elem1: 'p2p', elem2: null, chance: 0.25, temp1: 120 },
                lead_acetate: { elem1: 'p2p', elem2: null, chance: 0.2, temp1: 100 }
            },
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
            reactions: {
                methylamine: { elem1: 'meth_intermediate', elem2: null, chance: 0.2, temp1: 100 },
                aluminum: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, temp1: 120 }
            },
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
            reactions: {
                isosafrole: { elem1: 'mdma_intermediate', elem2: null, chance: 0.2, temp1: 80 },
                hydrogen_peroxide: { elem1: 'mdma_intermediate', elem2: null, chance: 0.15, temp1: 60 },
                heat: { elem1: 'isosafrole', elem2: null, chance: 0.3, temp1: 200 },
                sulfuric_acid: { elem1: 'isosafrole', elem2: null, chance: 0.25, temp1: 150 },
                hydrogen_peroxide: { elem1: 'mdp2p', elem2: null, chance: 0.15, temp1: 60 },
                formic_acid: { elem1: 'mdp2p', elem2: null, chance: 0.12, temp1: 80 }
            },
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

    // --------------------------------------------------------------------------
    // 5. FINAL COMPOUNDS – Realistic Physical States & Behaviors
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
            reactions: {
                water: { elem1: 'meth_solution', elem2: null, chance: 0.2 }
            },
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
            reactions: {
                water: { elem1: 'mdma_solution', elem2: null, chance: 0.18 }
            },
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
            reactions: {
                hydrochloric_acid: { elem1: 'heroin', elem2: null, chance: 0.3 },
                water: { elem1: 'heroin_solution', elem2: null, chance: 0.15 }
            },
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
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, temp1: 85 }
            },
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
            reactions: {
                carfentanil_precursor: { elem1: 'carfentanil', elem2: null, chance: 0.1, temp1: 100 }
            },
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
            reactions: {
                lemon_juice: { elem1: 'psilocin', elem2: null, chance: 0.25 },
                stomach_acid: { elem1: 'psilocin', elem2: null, chance: 0.3 }
            },
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
            reactions: {
                water: { elem1: 'cocaine_solution', elem2: null, chance: 0.15 }
            },
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
            reactions: {
                sulfuric_acid: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.25, temp1: 60 },
                potassium_permanganate: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.28, temp1: 70 },
                sodium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.2, temp1: 80 },
                potassium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.18, temp1: 80 }
            },
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
            reactions: {
                heat: { elem1: 'gbl', elem2: null, chance: 0.3, temp1: 150 }
            },
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
            reactions: {
                sodium_hydroxide: { elem1: 'ghb', elem2: null, chance: 0.25, temp1: 80 }
            },
            desc: 'GBL - oily liquid, converts to GHB in body'
        },
        bho: {
            sched: 'I',
            colors: ['#827717', '#9e9d24', '#afb42b', '#c0ca
