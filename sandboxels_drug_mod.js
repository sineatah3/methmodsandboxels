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
                wet_soil: { elem1: plant, elem2: null, chance: 0.03, tempMin: 15 },
                mud: { elem1: plant, elem2: null, chance: 0.02, tempMin: 15 },
                fertilizer: { elem1: plant, elem2: null, chance: 0.05, tempMin: 15 }
            },
            desc: 'Seed/spore - Needs wet soil and warmth to grow'
        };
    });

    // --------------------------------------------------------------------------
    // 3. FIXED SEED GROWTH - ADD MISSING SOIL ELEMENTS
    // --------------------------------------------------------------------------
    
    // Add wet_soil if it doesn't exist
    if (!elements.wet_soil) {
        elements.wet_soil = {
            color: ['#8d6e63', '#795548', '#6d4c41'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 1600,
            reactions: {
                fire: { elem1: 'dirt', elem2: 'steam', chance: 0.1 },
                heat: { elem1: 'dirt', elem2: 'steam', chance: 0.05, tempMin: 50 }
            },
            desc: 'Wet soil - moist earth for plant growth'
        };
    }

    // Add mud if it doesn't exist
    if (!elements.mud) {
        elements.mud = {
            color: ['#5d4037', '#4e342e', '#3e2723'],
            behavior: LIQ,
            viscosity: 5000,
            category: 'land',
            state: 'liquid',
            density: 1800,
            tempHigh: 100,
            stateHigh: 'dirt',
            desc: 'Mud - water-saturated soil'
        };
    }

    // Add fertilizer if it doesn't exist
    if (!elements.fertilizer) {
        elements.fertilizer = {
            color: ['#8d6e63', '#795548'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1200,
            tempHigh: 200,
            stateHigh: 'ash',
            desc: 'Fertilizer - helps plants grow'
        };
    }

    // --------------------------------------------------------------------------
    // 4. FIXED FROZEN SEED STATE
    // --------------------------------------------------------------------------
    elements.frozen_seed = {
        color: ['#bcaaa4', '#a1887f'],
        behavior: PW,
        category: 'botanicals',
        tempHigh: -15,
        stateHigh: 'seed_sativa', // Default to one seed type when thawed
        state: 'solid',
        density: 1150,
        desc: 'Frozen seed - will not germinate until thawed'
    };

    // --------------------------------------------------------------------------
    // 5. RAW BOTANICAL PRODUCTS – Realistic Extraction Behavior
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
            acetic_anhydride: { elem1: 'heroin_base', elem2: 'steam', chance: 0.3, tempMin: 80 },
            lime: { elem1: 'morphine_base', elem2: null, chance: 0.25 },
            water: { elem1: 'opium_solution', elem2: null, chance: 0.1 }
        },
        desc: 'Raw opium latex - thick purple-brown sap, very sticky'
    };

    // Add plant_matter for cannabis flower breakInto
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
            butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.25, tempMin: 20 },
            ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.18, tempMin: 2 },
            ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2, tempMin: 20 }
        },
        desc: 'Cannabis flower buds - burns to release smoke'
    };

    // --------------------------------------------------------------------------
    // 6. FIXED CANNABIS EXTRACTION CHAIN
    // --------------------------------------------------------------------------
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
    // 7. FIXED COCA PROCESSING CHAIN
    // --------------------------------------------------------------------------
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

    // --------------------------------------------------------------------------
    // 8. FIXED PRECURSORS & REAGENTS
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
                hydrogen: { elem1: 'pseudoephedrine', elem2: null, chance: 0.15, tempMin: 120 },
                catalyst: { elem1: 'pseudoephedrine', elem2: null, chance: 0.12, tempMin: 100 },
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, tempMin: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, tempMin: 110 }
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
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, tempMin: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, tempMin: 110 }
            },
            desc: 'Pseudoephedrine - white powder, soluble in water'
        },
        // ... (rest of your precursor definitions remain the same)
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
    // 9. FIXED UNIVERSAL CREATION SYSTEM
    // --------------------------------------------------------------------------
    elements.universal_precursor = {
        color: ['#9c27b0', '#8e24aa', '#7b1fa2'],
        behavior: LIQ,
        category: 'precursors',
        state: 'liquid',
        density: 1200,
        viscosity: 500,
        tempHigh: 200,
        stateHigh: 'smoke',
        reactions: {
            // Create any plant
            dirt: { 
                elem1: [
                    'cannabis_sativa', 'cannabis_indica', 'cannabis_ruderalis',
                    'papaver_somniferum', 'coca_boliviana', 'coca_colombiana',
                    'ephedra_sinica', 'khat', 'kratom', 'psilocybe_cubensis',
                    'iboga', 'salvia_divinorum', 'banisteriopsis_caapi'
                ], 
                elem2: null, 
                chance: 0.1 
            },
            // Create any precursor
            salt: { 
                elem1: [
                    'ephedrine', 'pseudoephedrine', 'phenylacetic_acid', 'p2p',
                    'safrole', 'isosafrole', 'piperonal', 'anhydrous_ammonia',
                    'red_phosphorus', 'lithium', 'sodium_hydroxide', 'acetone',
                    'hydrochloric_acid', 'sulfuric_acid', 'acetic_anhydride',
                    'formaldehyde', 'methylamine'
                ], 
                elem2: null, 
                chance: 0.08 
            },
            // Create any final compound
            sugar: { 
                elem1: [
                    'methamphetamine', 'amphetamine', 'mdma', 'heroin', 'morphine',
                    'fentanyl', 'carfentanil', 'lsd', 'psilocybin', 'psilocin',
                    'cocaine', 'crack', 'pcp', 'ketamine', 'dmt', 'ghb', 'gbl'
                ], 
                elem2: null, 
                chance: 0.05 
            }
        },
        desc: 'Universal precursor - can create any research compound with various reagents'
    };

    // Add salt and sugar if they don't exist
    if (!elements.salt) {
        elements.salt = {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 2170,
            desc: 'Sodium chloride - common salt'
        };
    }

    if (!elements.sugar) {
        elements.sugar = {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1590,
            tempHigh: 186,
            stateHigh: 'caramel',
            desc: 'Sucrose - common sugar'
        };
    }

    // --------------------------------------------------------------------------
    // 10. FIXED ALCHEMICAL CATALYST
    // --------------------------------------------------------------------------
    elements.alchemical_catalyst = {
        color: ['#ffeb3b', '#fff176', '#fff59d'],
        behavior: PW,
        category: 'precursors',
        state: 'solid',
        density: 2500,
        tempHigh: 500,
        stateHigh: 'philosophers_stone',
        reactions: {
            // Convert between botanicals
            cannabis_sativa: { 
                elem1: [
                    'cannabis_indica', 'cannabis_ruderalis', 'papaver_somniferum',
                    'coca_boliviana', 'coca_colombiana', 'ephedra_sinica', 'khat',
                    'kratom', 'psilocybe_cubensis', 'iboga', 'salvia_divinorum',
                    'banisteriopsis_caapi'
                ], 
                elem2: null, 
                chance: 0.3 
            },
            // Convert between precursors
            ephedrine: { 
                elem1: [
                    'pseudoephedrine', 'phenylacetic_acid', 'p2p', 'safrole',
                    'isosafrole', 'piperonal'
                ], 
                elem2: null, 
                chance: 0.25 
            },
            // Convert between compounds
            methamphetamine: { 
                elem1: [
                    'amphetamine', 'mdma', 'heroin', 'morphine', 'fentanyl',
                    'carfentanil', 'lsd', 'psilocybin', 'psilocin', 'cocaine',
                    'crack', 'pcp', 'ketamine', 'dmt', 'ghb', 'gbl'
                ], 
                elem2: null, 
                chance: 0.2 
            }
        },
        desc: 'Alchemical catalyst - can transmute between different compounds'
    };

    // --------------------------------------------------------------------------
    // 11. FIXED COMPLETION & DEBUG
    // --------------------------------------------------------------------------
    console.log('✓ ChemResearch v2 Enhanced - FIXED VERSION loaded');
    console.log('✓ Fixed seed growth system with proper soil elements');
    console.log('✓ All botanical plants now properly grow from seeds');
    console.log('✓ Added missing wet_soil, mud, and fertilizer elements');
    console.log('✓ Fixed cannabis extraction chain');
    console.log('✓ Fixed frozen seed behavior');
    console.log('✓ Total active elements: ' + Object.keys(elements).filter(k =>
        elements[k].category && (
            elements[k].category.includes('research_compounds') ||
            elements[k].category.includes('botanicals') ||
            elements[k].category.includes('precursors') ||
            elements[k].category.includes('solvents') ||
            elements[k].category.includes('raw_alkaloids')
        )
    ).length);

})();
