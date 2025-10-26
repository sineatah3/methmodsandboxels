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
                'Please dont use this stuff in real life i do not condone using drugs.'
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
    // 2. FIX MISSING BASE ELEMENTS FIRST - PREVENT UNKNOWN ERRORS
    // --------------------------------------------------------------------------
    
    // Ensure all base game elements exist to prevent "unknown element" errors
    const essentialBaseElements = {
        // Base game elements that might be referenced
        plant_matter: {
            color: ['#8bc34a', '#7cb342'],
            behavior: PW,
            category: 'life',
            state: 'solid',
            density: 600,
            tempHigh: 200,
            stateHigh: 'ash'
        },
        soil: {
            color: ['#8d6e63', '#795548', '#6d4c41'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 1200,
            desc: 'Soil - basic planting medium'
        },
        wet_soil: {
            color: ['#7b5e57', '#6d4c41', '#5d4037'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 1400,
            desc: 'Wet soil - moist planting medium'
        },
        mud: {
            color: ['#6d4c41', '#5d4037', '#4e342e'],
            behavior: LIQ,
            category: 'land',
            state: 'liquid',
            density: 1600,
            viscosity: 5000,
            desc: 'Mud - water-saturated soil'
        },
        fertilizer: {
            color: ['#fff9c4', '#ffecb3', '#ffe082'],
            behavior: PW,
            category: 'tools',
            state: 'solid',
            density: 900,
            desc: 'Fertilizer - promotes plant growth'
        },
        baking_soda: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1100
        },
        lime: {
            color: ['#f5f5f5', '#eeeeee'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1150
        },
        gasoline: {
            color: ['#ffeb3b', '#fdd835'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 750
        },
        kerosene: {
            color: ['#fff59d', '#fff176'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 800
        },
        butane: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.6
        },
        ice_water: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1000,
            temp: 0
        },
        ethanol: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 789
        },
        hydrogen: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.09
        },
        catalyst: {
            color: ['#ffccbc', '#ffab91'],
            behavior: PW,
            category: 'tools',
            state: 'solid',
            density: 1200
        },
        red_phosphorus: {
            color: ['#d32f2f', '#c62828'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1100
        },
        iodine: {
            color: ['#6a1b9a', '#7b1fa2'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1260
        },
        bromine: {
            color: ['#d32f2f', '#c62828'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1310
        },
        methylation: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.9
        },
        steam: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.6
        },
        ash: {
            color: ['#9e9e9e', '#757575'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 700
        },
        smoke: {
            color: ['#9e9e9e', '#757575'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8
        }
    };

    Object.entries(essentialBaseElements).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                temp: cfg.temp,
                tempHigh: cfg.tempHigh,
                stateHigh: cfg.stateHigh,
                desc: cfg.desc || `${id} - base game element`
            };
        }
    });

    // --------------------------------------------------------------------------
    // 3. CREATE ALL PLANTS FIRST (before seeds)
    // --------------------------------------------------------------------------
    
    const plantDefinitions = {
        cannabis_sativa: {
            colors: ['#3e8948', '#4a9b54', '#358843', '#469150'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 70,
            burnTime: 400,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Cannabis sativa - tall, narrow leaves - Research use only.'
        },
        cannabis_indica: {
            colors: ['#2a5d32', '#1f4d28', '#35663a', '#244f2d'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 70,
            burnTime: 400,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Cannabis indica - short, broad leaves - Research use only.'
        },
        cannabis_ruderalis: {
            colors: ['#4a7c59', '#55876a', '#3f7150', '#5a8c6f'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 70,
            burnTime: 400,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Cannabis ruderalis - auto-flowering variant - Research use only.'
        },
        papaver_somniferum: {
            colors: ['#7b1fa2', '#9c27b0', '#6a1b8f', '#8e24aa'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 150,
            stateHigh: 'ash',
            burn: 60,
            burnTime: 350,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Opium poppy - purple/white flowers - Research use only.'
        },
        coca_boliviana: {
            colors: ['#004d40', '#00695c', '#003d33', '#005b4f'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 170,
            stateHigh: 'ash',
            burn: 65,
            burnTime: 380,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Bolivian coca - high altitude variety - Research use only.'
        },
        coca_colombiana: {
            colors: ['#00695c', '#00897b', '#00564e', '#007a6a'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 170,
            stateHigh: 'ash',
            burn: 65,
            burnTime: 380,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Colombian coca - lowland variety - Research use only.'
        },
        ephedra_sinica: {
            colors: ['#827717', '#9e9d24', '#6d6611', '#8f8e1f'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 160,
            stateHigh: 'ash',
            burn: 70,
            burnTime: 300,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Ephedra sinica - ma-huang herb - Research use only.'
        },
        khat: {
            colors: ['#558b2f', '#689f38', '#4a7c2a', '#5d9033'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 165,
            stateHigh: 'ash',
            burn: 68,
            burnTime: 320,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Khat plant - contains cathinone - Research use only.'
        },
        kratom: {
            colors: ['#33691e', '#4a7c2f', '#2d5a1a', '#3e6d27'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 165,
            stateHigh: 'ash',
            burn: 68,
            burnTime: 330,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Mitragyna speciosa - kratom tree - Research use only.'
        },
        psilocybe_cubensis: {
            colors: ['#6d4c41', '#795548', '#5d4037', '#6b4d43'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 140,
            stateHigh: 'ash',
            burn: 55,
            burnTime: 280,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Psilocybe cubensis - magic mushroom - Research use only.'
        },
        iboga: {
            colors: ['#3e2723', '#4e342e', '#321d19', '#452e29'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 170,
            stateHigh: 'ash',
            burn: 66,
            burnTime: 360,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Tabernanthe iboga - African shrub - Research use only.'
        },
        salvia_divinorum: {
            colors: ['#004d40', '#00695c', '#003d33', '#005b4f'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 155,
            stateHigh: 'ash',
            burn: 63,
            burnTime: 310,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Salvia divinorum - diviners sage - Research use only.'
        },
        banisteriopsis_caapi: {
            colors: ['#2e7d32', '#388e3c', '#1b5e20', '#2e7d32'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 165,
            stateHigh: 'ash',
            burn: 67,
            burnTime: 340,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Banisteriopsis caapi - ayahuasca vine - Research use only.'
        },
        peyote: {
            colors: ['#7cb342', '#689f38', '#558b2f'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 160,
            stateHigh: 'ash',
            burn: 65,
            burnTime: 320,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Peyote cactus - contains mescaline - Research use only.'
        },
        morning_glory: {
            colors: ['#5c6bc0', '#3f51b5', '#3949ab'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 155,
            stateHigh: 'ash',
            burn: 60,
            burnTime: 280,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Morning glory - contains LSA - Research use only.'
        },
        tobacco: {
            colors: ['#2e7d32', '#388e3c', '#43a047'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 170,
            stateHigh: 'ash',
            burn: 75,
            burnTime: 350,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Tobacco plant - contains nicotine - Research use only.'
        },
        coffee: {
            colors: ['#8d6e63', '#795548', '#6d4c41'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 165,
            stateHigh: 'ash',
            burn: 70,
            burnTime: 300,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Coffee plant - contains caffeine - Research use only.'
        },
        psychotria: {
            colors: ['#2e7d32', '#388e3c'],
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: 160,
            stateHigh: 'ash',
            burn: 65,
            burnTime: 280,
            state: 'solid',
            density: 800,
            conduct: 0.1,
            desc: 'Psychotria viridis - DMT-containing plant for ayahuasca - Research use only.'
        }
    };

    // Create all plants FIRST
    Object.entries(plantDefinitions).forEach(([plant, cfg]) => {
        elements[plant] = {
            color: cfg.colors,
            behavior: cfg.behavior,
            category: cfg.category,
            tempHigh: cfg.tempHigh,
            stateHigh: cfg.stateHigh,
            burn: cfg.burn,
            burnTime: cfg.burnTime,
            state: cfg.state,
            density: cfg.density,
            conduct: cfg.conduct,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 4. CREATE SEEDS WITH WORKING REACTIONS (plants exist now)
    // --------------------------------------------------------------------------
    
    const seedDefinitions = {
        seed_sativa: {
            plant: 'cannabis_sativa',
            desc: 'Cannabis sativa seed - Needs soil and warmth (18°C+) to grow'
        },
        seed_indica: {
            plant: 'cannabis_indica', 
            desc: 'Cannabis indica seed - Needs soil and warmth (18°C+) to grow'
        },
        seed_ruderalis: {
            plant: 'cannabis_ruderalis',
            desc: 'Cannabis ruderalis seed - Auto-flowering, needs soil and warmth (16°C+) to grow'
        },
        seed_poppy: {
            plant: 'papaver_somniferum',
            desc: 'Opium poppy seed - Needs soil and warmth (15°C+) to grow'
        },
        seed_coca_bol: {
            plant: 'coca_boliviana',
            desc: 'Bolivian coca seed - Needs soil and warmth (20°C+) to grow'
        },
        seed_coca_col: {
            plant: 'coca_colombiana',
            desc: 'Colombian coca seed - Needs soil and warmth (22°C+) to grow'
        },
        seed_ephedra: {
            plant: 'ephedra_sinica',
            desc: 'Ephedra seed - Needs soil and warmth (18°C+) to grow'
        },
        seed_khat: {
            plant: 'khat',
            desc: 'Khat seed - Needs soil and warmth (20°C+) to grow'
        },
        seed_kratom: {
            plant: 'kratom',
            desc: 'Kratom seed - Needs soil and warmth (22°C+) to grow'
        },
        spore_cubensis: {
            plant: 'psilocybe_cubensis',
            desc: 'Psilocybe cubensis spore - Needs soil and warmth (24°C+) to grow'
        },
        seed_iboga: {
            plant: 'iboga',
            desc: 'Iboga seed - Needs soil and warmth (20°C+) to grow'
        },
        seed_salvia: {
            plant: 'salvia_divinorum',
            desc: 'Salvia seed - Needs soil and warmth (18°C+) to grow'
        },
        seed_caapi: {
            plant: 'banisteriopsis_caapi',
            desc: 'Ayahuasca vine seed - Needs soil and warmth (20°C+) to grow'
        },
        seed_peyote: {
            plant: 'peyote',
            desc: 'Peyote seed - Needs soil and warmth (18°C+) to grow'
        },
        seed_morning_glory: {
            plant: 'morning_glory',
            desc: 'Morning glory seed - Needs soil and warmth (16°C+) to grow'
        },
        seed_tobacco: {
            plant: 'tobacco',
            desc: 'Tobacco seed - Needs soil and warmth (18°C+) to grow'
        },
        seed_coffee: {
            plant: 'coffee',
            desc: 'Coffee seed - Needs soil and warmth (20°C+) to grow'
        },
        seed_psychotria: {
            plant: 'psychotria',
            desc: 'Psychotria seed - Needs soil and warmth (20°C+) to grow'
        }
    };

    // Create seeds with reactions that reference EXISTING plants
    Object.entries(seedDefinitions).forEach(([seed, cfg]) => {
        elements[seed] = {
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
                soil: { elem1: cfg.plant, elem2: null, chance: 0.04, tempMin: 15 },
                wet_soil: { elem1: cfg.plant, elem2: null, chance: 0.06, tempMin: 15 },
                mud: { elem1: cfg.plant, elem2: null, chance: 0.08, tempMin: 15 },
                water: { elem1: cfg.plant, elem2: null, chance: 0.03, tempMin: 15 },
                fertilizer: { elem1: cfg.plant, elem2: null, chance: 0.10, tempMin: 15 },
                // Add heat as backup method
                heat: { elem1: cfg.plant, elem2: null, chance: 0.5, tempMin: 25 }
            },
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 5. ADD BREAKINTO PROPERTIES TO PLANTS (after seeds exist)
    // --------------------------------------------------------------------------
    
    // Now add breakInto properties to plants since seeds exist
    Object.entries(seedDefinitions).forEach(([seed, cfg]) => {
        if (elements[cfg.plant]) {
            elements[cfg.plant].breakInto = seed;
        }
    });

    // --------------------------------------------------------------------------
    // 6. EXPANDED PRECURSORS & REAGENTS – Using Base Game Elements
    // --------------------------------------------------------------------------
    const precursors = {
        // Existing precursors
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
        
        // NEW: Additional precursors using base game elements
        nicotine: {
            colors: ['#f5f5f5', '#e0e0e0'],
            density: 1010,
            liquid: true,
            viscosity: 2500,
            tempHigh: 247,
            stateHigh: 'nicotine_vapor',
            tempLow: -79,
            stateLow: 'frozen_nicotine',
            reactions: {
                tobacco: { elem1: 'nicotine', elem2: 'plant_matter', chance: 0.15, tempMin: 80 },
                water: { elem1: 'nicotine_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Nicotine - oily liquid, highly addictive'
        },
        
        caffeine: {
            colors: ['#ffffff', '#fafafa'],
            density: 1230,
            tempHigh: 238,
            stateHigh: 'smoke',
            reactions: {
                coffee: { elem1: 'caffeine', elem2: 'plant_matter', chance: 0.12, tempMin: 90 },
                tea: { elem1: 'caffeine', elem2: 'plant_matter', chance: 0.08, tempMin: 85 }
            },
            desc: 'Caffeine - white powder, stimulant'
        },
        
        lsa: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1280,
            tempHigh: 180,
            stateHigh: 'smoke',
            reactions: {
                morning_glory: { elem1: 'lsa', elem2: 'plant_matter', chance: 0.1, tempMin: 70 },
                ethanol: { elem1: 'lsa_solution', elem2: null, chance: 0.15 }
            },
            desc: 'Lysergic acid amide - morning glory alkaloid'
        },
        
        theobromine: {
            colors: ['#f5f5f5', '#ffffff'],
            density: 1340,
            tempHigh: 290,
            stateHigh: 'smoke',
            reactions: {
                cocoa: { elem1: 'theobromine', elem2: null, chance: 0.18, tempMin: 100 },
                chocolate: { elem1: 'theobromine', elem2: 'fat', chance: 0.15, tempMin: 80 }
            },
            desc: 'Theobromine - chocolate alkaloid, stimulant'
        },
        
        // Chemical precursors using base elements
        ammonia: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 682,
            liquid: true,
            viscosity: 600,
            tempHigh: -33,
            stateHigh: 'ammonia_gas',
            tempLow: -78,
            stateLow: 'frozen_ammonia',
            reactions: {
                nitrogen: { elem1: 'ammonia', elem2: null, chance: 0.1, tempMin: 400 },
                hydrogen: { elem1: 'ammonia', elem2: null, chance: 0.12, tempMin: 450 }
            },
            desc: 'Ammonia - pungent gas, important precursor'
        },
        
        nitric_acid: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1510,
            liquid: true,
            viscosity: 1200,
            tempHigh: 83,
            stateHigh: 'nitrogen_dioxide',
            reactions: {
                ammonia: { elem1: 'nitric_acid', elem2: null, chance: 0.15, tempMin: 200 },
                nitrogen_dioxide: { elem1: 'nitric_acid', elem2: null, chance: 0.18, tempMin: 150 }
            },
            desc: 'Nitric acid - strong oxidizing acid'
        },
        
        glycerol: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1261,
            liquid: true,
            viscosity: 1500,
            tempHigh: 290,
            stateHigh: 'steam',
            reactions: {
                fat: { elem1: 'glycerol', elem2: 'fatty_acid', chance: 0.2, tempMin: 100 },
                oil: { elem1: 'glycerol', elem2: null, chance: 0.15, tempMin: 120 }
            },
            desc: 'Glycerol - sweet, viscous liquid'
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
            conduct: cfg.conduct || 0.1,
            burn: cfg.burn,
            burnTime: cfg.burnTime,
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // [REST OF YOUR ORIGINAL CODE REMAINS THE SAME - sections 7-14]
    // ... (all the intermediate compounds, solutions, botanical products, etc.)

    // --------------------------------------------------------------------------
    // 15. COMPLETION & DEBUG
    // --------------------------------------------------------------------------
    console.log('✓ ChemResearch v2 Enhanced - FIXED SEED GROWTH VERSION loaded');
    console.log('✓ FIXED: All plants created BEFORE seeds to prevent unknown errors');
    console.log('✓ FIXED: Seed reactions now properly reference existing plants');
    console.log('✓ Added 18 botanical plants with WORKING seeds');
    console.log('✓ Cannabis seeds now properly grow into cannabis plants');
    console.log('✓ Growth methods: soil, wet_soil, mud, water, fertilizer, or heat');
    console.log('✓ Test with: seed_sativa + soil + water (or heat to 25°C+)');
    
    // Test if key elements exist
    console.log('✓ Element check - cannabis_sativa:', !!elements.cannabis_sativa);
    console.log('✓ Element check - seed_sativa:', !!elements.seed_sativa);
    console.log('✓ Element check - soil:', !!elements.soil);
    console.log('✓ Element check - water:', !!elements.water);

})();
