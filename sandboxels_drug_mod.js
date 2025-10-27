// ============================================================================
// CHEMRESEARCH_V2_COMPLETE_FIXED.JS – Educational Chemistry with ALL Elements
// MIT Licence – Research / EDU Use Only – No Real-World Instructions
// ============================================================================
/* global elements, behaviors, pixel, settings, changePixel */

(() => {
    'use strict';

    // --------------------------------------------------------------------------
    // 1. HELPERS & BEHAVIORS - FIXED REFERENCE ISSUES
    // --------------------------------------------------------------------------
    const PW = behaviors.POWDER;
    const LIQ = behaviors.LIQUID;
    const WALL = behaviors.WALL;
    const STURDY = behaviors.STURDY_PLANT;
    const GAS = behaviors.GAS;
    const SUPPORT = behaviors.SUPPORT;

    // --------------------------------------------------------------------------
    // 2. FIX MISSING BASE ELEMENTS FIRST - PREVENT UNKNOWN ERRORS
    // --------------------------------------------------------------------------
    
    const essentialBaseElements = {
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
        acetone: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 784
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
    // 3. ADD ALL VAPOR/SMOKE ELEMENTS FIRST
    // --------------------------------------------------------------------------
    const vaporElements = {
        mephedrone_smoke: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Mephedrone vapor'
        },
        methylone_smoke: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Methylone vapor'
        },
        synthetic_cannabinoid_smoke: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Synthetic cannabinoid vapor'
        },
        salvinorin_vapor: {
            color: ['#004d40', '#00695c'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Salvinorin A vapor'
        },
        nicotine_vapor: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Nicotine vapor'
        },
        crack_smoke: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Crack cocaine vapor'
        },
        meth_smoke: {
            color: ['#e0e0e0', '#eeeeee'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Methamphetamine vapor'
        },
        mdma_smoke: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'MDMA vapor'
        },
        heroin_smoke: {
            color: ['#8d6e63', '#a1887f'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Heroin vapor'
        },
        morphine_smoke: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Morphine vapor'
        },
        thc_vapor: {
            color: ['#c8e6c9', '#a5d6a7'],
            behavior: GAS,
            category: 'botanicals',
            temp: 180,
            tempLow: 150,
            stateLow: 'cannabis_oil',
            state: 'gas',
            density: 0.8,
            desc: 'Vaporized THC - lighter than air'
        },
        nitrogen_dioxide: {
            color: ['#d32f2f', '#c62828'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 1.4,
            tempLow: 21,
            stateLow: 'dinitrogen_tetroxide',
            desc: 'Nitrogen dioxide - brown gas, oxidizer'
        },
        ammonia_gas: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.7,
            desc: 'Ammonia gas - pungent'
        }
    };

    Object.entries(vaporElements).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                temp: cfg.temp,
                tempLow: cfg.tempLow,
                stateLow: cfg.stateLow,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 4. ADD ALL CHEMICAL REAGENTS
    // --------------------------------------------------------------------------
    const chemicalReagents = {
        sodium_hydroxide: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1130,
            desc: 'Sodium hydroxide - caustic base'
        },
        ammonium_hydroxide: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 910,
            desc: 'Ammonium hydroxide - aqueous ammonia'
        },
        hydrochloric_acid: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1049,
            desc: 'Hydrochloric acid - strong acid'
        },
        sulfuric_acid: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1840,
            viscosity: 2400,
            desc: 'Sulfuric acid - highly corrosive'
        },
        acetic_anhydride: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1080,
            desc: 'Acetic anhydride - acetylating agent'
        },
        methylamine: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.7,
            desc: 'Methylamine - amine precursor'
        },
        potassium_permanganate: {
            color: ['#6a1b9a', '#7b1fa2'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1270,
            desc: 'Potassium permanganate - strong oxidizer'
        },
        sodium_carbonate: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1120,
            desc: 'Sodium carbonate - washing soda'
        },
        potassium_carbonate: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1140,
            desc: 'Potassium carbonate - potash'
        },
        acetic_acid: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1049,
            desc: 'Acetic acid - vinegar acid'
        },
        fatty_acid: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 900,
            desc: 'Fatty acid - from fat breakdown'
        },
        nitrogen: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Nitrogen gas - inert'
        },
        dinitrogen_tetroxide: {
            color: ['#d32f2f', '#c62828'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1440,
            desc: 'Dinitrogen tetroxide - liquid oxidizer'
        },
        tea: {
            color: ['#8d6e63', '#795548'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1005,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'Tea - contains caffeine'
        },
        cocoa: {
            color: ['#8d6e63', '#795548'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1450,
            tempHigh: 200,
            stateHigh: 'ash',
            desc: 'Cocoa powder - contains theobromine'
        },
        chocolate: {
            color: ['#8d6e63', '#795548'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1320,
            viscosity: 3000,
            tempHigh: 35,
            stateHigh: 'burnt_chocolate',
            desc: 'Chocolate - contains theobromine and fat'
        },
        fat: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 900,
            viscosity: 2500,
            tempHigh: 205,
            stateHigh: 'smoke',
            desc: 'Fat - lipid material'
        },
        oil: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 920,
            viscosity: 800,
            tempHigh: 300,
            stateHigh: 'smoke',
            desc: 'Plant oil - triglyceride source'
        },
        burnt_chocolate: {
            color: ['#5d4037', '#4e342e'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 800,
            desc: 'Burnt chocolate residue'
        }
    };

    Object.entries(chemicalReagents).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                tempHigh: cfg.tempHigh,
                stateHigh: cfg.stateHigh,
                tempLow: cfg.tempLow,
                stateLow: cfg.stateLow,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 5. EXPANDED BOTANICALS (Plants + Seeds)
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
        },
        peyote: {
            colors: ['#7cb342', '#689f38', '#558b2f'],
            seed: 'seed_peyote',
            tempHigh: 160,
            burn: 65,
            burnTime: 320,
            desc: 'Peyote cactus - contains mescaline'
        },
        morning_glory: {
            colors: ['#5c6bc0', '#3f51b5', '#3949ab'],
            seed: 'seed_morning_glory',
            tempHigh: 155,
            burn: 60,
            burnTime: 280,
            desc: 'Morning glory - contains LSA'
        },
        tobacco: {
            colors: ['#2e7d32', '#388e3c', '#43a047'],
            seed: 'seed_tobacco',
            tempHigh: 170,
            burn: 75,
            burnTime: 350,
            desc: 'Tobacco plant - contains nicotine'
        },
        coffee: {
            colors: ['#8d6e63', '#795548', '#6d4c41'],
            seed: 'seed_coffee',
            tempHigh: 165,
            burn: 70,
            burnTime: 300,
            desc: 'Coffee plant - contains caffeine'
        },
        psychotria: {
            colors: ['#2e7d32', '#388e3c'],
            seed: 'seed_psychotria',
            tempHigh: 160,
            burn: 65,
            burnTime: 280,
            desc: 'Psychotria viridis - DMT-containing plant for ayahuasca'
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

        // Seeds
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
                soil: { elem1: plant, elem2: null, chance: 0.04, tempMin: 15 },
                wet_soil: { elem1: plant, elem2: null, chance: 0.06, tempMin: 15 },
                mud: { elem1: plant, elem2: null, chance: 0.08, tempMin: 15 },
                water: { elem1: plant, elem2: null, chance: 0.03, tempMin: 15 },
                fertilizer: { elem1: plant, elem2: null, chance: 0.10, tempMin: 15 }
            },
            desc: 'Seed/spore - Needs soil and warmth (15°C+) to grow'
        };
    });

    // --------------------------------------------------------------------------
    // 6. PRECURSORS & REAGENTS
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
                water: { elem1: 'tea', elem2: null, chance: 0.15 }
            },
            desc: 'Caffeine - white powder, stimulant'
        },
        lsa: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1280,
            tempHigh: 180,
            stateHigh: 'smoke',
            reactions: {
                ethanol: { elem1: 'lsa_solution', elem2: null, chance: 0.15 }
            },
            desc: 'Lysergic acid amide - morning glory alkaloid'
        },
        theobromine: {
            colors: ['#f5f5f5', '#ffffff'],
            density: 1340,
            tempHigh: 290,
            stateHigh: 'smoke',
            desc: 'Theobromine - chocolate alkaloid, stimulant'
        },
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
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 7. INTERMEDIATE COMPOUNDS
    // --------------------------------------------------------------------------
    const intermediates = {
        cocaine_sulfate: {
            colors: ['#f5f5f5', '#fafafa'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1180,
            tempHigh: 180,
            stateHigh: 'smoke',
            reactions: {
                sodium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.3 },
                ammonium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.25 }
            },
            desc: 'Cocaine sulfate - intermediate white powder'
        },
        cocaine_base: {
            colors: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1150,
            tempHigh: 98,
            stateHigh: 'crack_smoke',
            reactions: {
                hydrochloric_acid: { elem1: 'cocaine', elem2: null, chance: 0.35 }
            },
            desc: 'Cocaine freebase - smokable form'
        },
        meth_intermediate: {
            colors: ['#e0e0e0', '#eeeeee'],
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
        },
        mdma_intermediate: {
            colors: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            viscosity: 1600,
            category: 'precursors',
            state: 'liquid',
            density: 1040,
            tempHigh: 130,
            stateHigh: 'mdma_smoke',
            reactions: {
                methylamine: { elem1: 'mdma', elem2: null, chance: 0.25, tempMin: 100 }
            },
            desc: 'MDP2P - MDMA precursor oil'
        },
        heroin_base: {
            colors: ['#8d6e63', '#a1887f', '#795548'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1320,
            tempHigh: 170,
            stateHigh: 'heroin_smoke',
            tempLow: -10,
            stateLow: 'frozen_heroin_base',
            reactions: {
                hydrochloric_acid: { elem1: 'heroin', elem2: null, chance: 0.3 },
                water: { elem1: 'heroin_solution', elem2: null, chance: 0.15 }
            },
            desc: 'Heroin base - tan/brown #3 form'
        },
        morphine_base: {
            colors: ['#bcaaa4', '#a1887f', '#8d6e63'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1230,
            tempHigh: 197,
            stateHigh: 'morphine_smoke',
            tempLow: -12,
            stateLow: 'frozen_morph_base',
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 }
            },
            desc: 'Morphine base - tan powder before acetylation'
        }
    };

    Object.entries(intermediates).forEach(([id, cfg]) => {
        elements[id] = {
            color: cfg.colors,
            behavior: cfg.behavior,
            category: cfg.category,
            state: cfg.state,
            density: cfg.density,
            viscosity: cfg.viscosity,
            tempHigh: cfg.tempHigh,
            stateHigh: cfg.stateHigh,
            tempLow: cfg.tempLow,
            stateLow: cfg.stateLow,
            conduct: 0.1,
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 8. BOTANICAL PRODUCTS
    // --------------------------------------------------------------------------
    const botanicalProducts = {
        cannabis_flower: {
            color: ['#66bb6a', '#4caf50', '#81c784'],
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
                butane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.25 },
                ice_water: { elem1: 'bubble_hash', elem2: 'plant_matter', chance: 0.18 },
                ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2 }
            },
            desc: 'Cannabis flower buds'
        },
        cannabis_trichomes: {
            color: ['#e8f5e9', '#f1f8e9', '#dcedc8'],
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
        },
        cannabis_oil: {
            color: ['#827717', '#9e9d24'],
            behavior: LIQ,
            viscosity: 5000,
            category: 'botanicals',
            tempHigh: 175,
            stateHigh: 'thc_vapor',
            state: 'liquid',
            density: 940,
            desc: 'Cannabis oil - very thick'
        },
        coca_leaves: {
            color: ['#2e7d32', '#1b5e20', '#388e3c'],
            behavior: PW,
            category: 'botanicals',
            state: 'solid',
            density: 600,
            tempHigh: 180,
            stateHigh: 'ash',
            burn: 60,
            burnTime: 250,
            breakInto: 'coca_alkaloids',
            desc: 'Dried coca leaves'
        },
        coca_alkaloids: {
            color: ['#f9fbe7', '#fff9c4', '#f0f4c3'],
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
            desc: 'Crude coca alkaloids'
        },
        coca_paste: {
            colors: ['#8d6e63', '#a1887f', '#795548'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1050,
            tempHigh: 180,
            stateHigh: 'smoke',
            tempLow: -15,
            stateLow: 'frozen_paste',
            reactions: {
                sulfuric_acid: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.25, tempMin: 60 },
                potassium_permanganate: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.28, tempMin: 70 },
                sodium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.2, tempMin: 80 },
                potassium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.18, tempMin: 80 }
            },
            desc: 'Coca paste - brown putty'
        },
        opium_latex: {
            color: ['#4a148c', '#6a1b9a', '#38006b'],
            behavior: LIQ,
            viscosity: 3500,
            category: 'raw_alkaloids',
            tempHigh: 180,
            stateHigh: 'smoke',
            tempLow: -10,
            stateLow: 'frozen_opium',
            state: 'liquid',
            density: 1350,
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'steam', chance: 0.3, tempMin: 80 },
                lime: { elem1: 'morphine_base', elem2: null, chance: 0.25 },
                water: { elem1: 'opium_solution', elem2: null, chance: 0.1 }
            },
            desc: 'Raw opium latex - purple-brown sap'
        },
        bho: {
            color: ['#827717', '#9e9d24', '#afb42b'],
            behavior: LIQ,
            viscosity: 8000,
            category: 'research_compounds',
            state: 'liquid',
            density: 920,
            tempHigh: 157,
            stateHigh: 'thc_vapor',
            tempLow: -20,
            stateLow: 'frozen_bho',
            desc: 'Butane hash oil - amber honey-like'
        },
        bubble_hash: {
            color: ['#d7ccc8', '#bcaaa4', '#efebe9'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1050,
            tempHigh: 157,
            stateHigh: 'thc_vapor',
            tempLow: -25,
            stateLow: 'frozen_hash',
            desc: 'Ice water hash - blonde/tan'
        }
    };

    Object.entries(botanicalProducts).forEach(([id, cfg]) => {
        elements[id] = {
            color: cfg.color,
            behavior: cfg.behavior,
            category: cfg.category,
            state: cfg.state,
            density: cfg.density,
            viscosity: cfg.viscosity,
            tempHigh: cfg.tempHigh,
            stateHigh: cfg.stateHigh,
            tempLow: cfg.tempLow,
            stateLow: cfg.stateLow,
            temp: cfg.temp,
            conduct: cfg.conduct || 0.1,
            burn: cfg.burn,
            burnTime: cfg.burnTime,
            breakInto: cfg.breakInto,
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 9. SOLUTIONS & EXTRACTS
    // --------------------------------------------------------------------------
    const solutions = {
        cocaine_solution: {
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
        },
        crack_slurry: {
            color: ['#fff3e0', '#ffecb3', '#ffe082'],
            behavior: LIQ,
            viscosity: 2000,
            category: 'research_compounds',
            state: 'liquid',
            density: 1100,
            tempHigh: 85,
            stateHigh: 'crack',
            temp: 20,
            desc: 'Cocaine + NaHCO₃ slurry - Heat to 85°C'
        },
        meth_solution: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            viscosity: 1100,
            category: 'research_compounds',
            state: 'liquid',
            density: 1020,
            tempHigh: 100,
            stateHigh: ['methamphetamine', 'steam'],
            desc: 'Methamphetamine solution'
        },
        mdma_solution: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            viscosity: 1080,
            category: 'research_compounds',
            state: 'liquid',
            density: 1015,
            tempHigh: 100,
            stateHigh: ['mdma', 'steam'],
            desc: 'MDMA solution'
        },
        heroin_solution: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: LIQ,
            viscosity: 1100,
            category: 'research_compounds',
            state: 'liquid',
            density: 1040,
            tempHigh: 100,
            stateHigh: ['heroin_base', 'steam'],
            desc: 'Heroin dissolved in water'
        },
        opium_solution: {
            color: ['#6a1b9a', '#8e24aa'],
            behavior: LIQ,
            viscosity: 1200,
            category: 'raw_alkaloids',
            state: 'liquid',
            density: 1050,
            tempHigh: 100,
            stateHigh: ['opium_latex', 'steam'],
            reactions: {
                lime: { elem1: 'morphine_base', elem2: null, chance: 0.25, tempMin: 80 },
                ammonium_hydroxide: { elem1: 'morphine_base', elem2: null, chance: 0.22, tempMin: 80 }
            },
            desc: 'Opium dissolved in water'
        },
        psilocybin_tea: {
            color: ['#8d6e63', '#a1887f'],
            behavior: LIQ,
            viscosity: 1100,
            category: 'research_compounds',
            state: 'liquid',
            density: 1020,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'Psilocybin mushroom tea'
        },
        mescaline_tea: {
            color: ['#e8f5e9', '#c8e6c9'],
            behavior: LIQ,
            viscosity: 1100,
            category: 'research_compounds',
            state: 'liquid',
            density: 1020,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'Mescaline tea'
        },
        lsa_solution: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: LIQ,
            viscosity: 1050,
            category: 'research_compounds',
            state: 'liquid',
            density: 1010,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'LSA solution'
        },
        nicotine_solution: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: LIQ,
            viscosity: 1000,
            category: 'research_compounds',
            state: 'liquid',
            density: 1005,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'Nicotine solution'
        }
    };

    Object.entries(solutions).forEach(([id, cfg]) => {
        elements[id] = {
            color: cfg.color,
            behavior: cfg.behavior,
            category: cfg.category,
            state: cfg.state,
            density: cfg.density,
            viscosity: cfg.viscosity,
            tempHigh: cfg.tempHigh,
            stateHigh: cfg.stateHigh,
            tempLow: cfg.tempLow,
            stateLow: cfg.stateLow,
            temp: cfg.temp,
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 10. FINAL COMPOUNDS (WITH ALL FIXED REACTIONS)
    // --------------------------------------------------------------------------
    const finalCompounds = {
        cocaine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 195,
            stateHigh: 'smoke',
            reactions: {
                water: { elem1: 'cocaine_solution', elem2: null, chance: 0.2 },
                baking_soda: { elem1: 'crack_slurry', elem2: null, chance: 0.25 },
                sodium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.3 }
            },
            desc: 'Schedule II - Cocaine HCl'
        },
        crack: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 98,
            stateHigh: 'crack_smoke',
            desc: 'Schedule II - Crack cocaine'
        },
        methamphetamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1180,
            tempHigh: 170,
            stateHigh: 'meth_smoke',
            reactions: {
                water: { elem1: 'meth_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Schedule II - Methamphetamine'
        },
        amphetamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 200,
            stateHigh: 'smoke',
            desc: 'Schedule II - Amphetamine'
        },
        mdma: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 148,
            stateHigh: 'mdma_smoke',
            reactions: {
                water: { elem1: 'mdma_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Schedule I - MDMA'
        },
        heroin: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1350,
            tempHigh: 173,
            stateHigh: 'heroin_smoke',
            reactions: {
                water: { elem1: 'heroin_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Schedule I - Heroin'
        },
        morphine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1320,
            tempHigh: 255,
            stateHigh: 'morphine_smoke',
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.3, tempMin: 85 }
            },
            desc: 'Schedule II - Morphine'
        },
        psilocybin: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1280,
            tempHigh: 220,
            stateHigh: 'smoke',
            reactions: {
                water: { elem1: 'psilocybin_tea', elem2: null, chance: 0.15, tempMin: 80 }
            },
            desc: 'Schedule I - Psilocybin'
        },
        psilocin: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1270,
            tempHigh: 173,
            stateHigh: 'smoke',
            reactions: {
                psilocybin: { elem1: 'psilocin', elem2: null, chance: 0.2, tempMin: 70 }
            },
            desc: 'Schedule I - Psilocin'
        },
        mescaline: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1290,
            tempHigh: 183,
            stateHigh: 'smoke',
            reactions: {
                water: { elem1: 'mescaline_tea', elem2: null, chance: 0.15, tempMin: 80 }
            },
            desc: 'Schedule I - Mescaline'
        },
        lsd: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1300,
            tempHigh: 83,
            stateHigh: 'smoke',
            desc: 'Schedule I - LSD'
        },
        dmt: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 160,
            stateHigh: 'smoke',
            desc: 'Schedule I - DMT'
        },
        fentanyl: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1400,
            tempHigh: 87,
            stateHigh: 'smoke',
            desc: 'Schedule II - Fentanyl'
        },
        carfentanil: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1420,
            tempHigh: 91,
            stateHigh: 'smoke',
            desc: 'Schedule II - Carfentanil'
        },
        pcp: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1240,
            tempHigh: 233,
            stateHigh: 'smoke',
            desc: 'Schedule II - PCP'
        },
        ketamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 262,
            stateHigh: 'smoke',
            desc: 'Schedule III - Ketamine'
        },
        ghb: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            viscosity: 1800,
            category: 'research_compounds',
            state: 'liquid',
            density: 1120,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'Schedule I - GHB'
        },
        gbl: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            viscosity: 1500,
            category: 'research_compounds',
            state: 'liquid',
            density: 1130,
            tempHigh: 204,
            stateHigh: 'steam',
            desc: 'Schedule I - GBL'
        },
        codeine: {
            color: ['#f5f5f5', '#ffffff'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1340,
            tempHigh: 157,
            stateHigh: 'smoke',
            reactions: {
                morphine: { elem1: 'codeine', elem2: null, chance: 0.15, tempMin: 80 }
            },
            desc: 'Schedule II - Codeine'
        },
        mephedrone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 194,
            stateHigh: 'mephedrone_smoke',
            desc: 'Schedule I - Mephedrone'
        },
        methylone: {
            color: ['#f5f5f5', '#ffffff'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1220,
            tempHigh: 201,
            stateHigh: 'methylone_smoke',
            desc: 'Schedule I - Methylone'
        },
        jwh_018: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1180,
            tempHigh: 178,
            stateHigh: 'synthetic_cannabinoid_smoke',
            desc: 'Schedule I - JWH-018'
        },
        _2c_b: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1260,
            tempHigh: 235,
            stateHigh: 'smoke',
            desc: 'Schedule I - 2C-B'
        },
        _4_aco_dmt: {
            color: ['#ffccbc', '#ffab91'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1290,
            tempHigh: 185,
            stateHigh: 'smoke',
            desc: 'Schedule I - 4-AcO-DMT'
        },
        tramadol: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1310,
            tempHigh: 180,
            stateHigh: 'smoke',
            desc: 'Schedule IV - Tramadol'
        },
        ayahuasca_brew: {
            color: ['#8d6e63', '#795548'],
            behavior: LIQ,
            viscosity: 1800,
            category: 'research_compounds',
            state: 'liquid',
            density: 1050,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'Schedule I - Ayahuasca brew'
        },
        kava_extract: {
            color: ['#827717', '#9e9d24'],
            behavior: LIQ,
            viscosity: 2200,
            category: 'research_compounds',
            state: 'liquid',
            density: 1120,
            tempHigh: 95,
            stateHigh: 'steam',
            desc: 'Unscheduled - Kava extract'
        },
        salvinorin_a: {
            color: ['#004d40', '#00695c'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 238,
            stateHigh: 'salvinorin_vapor',
            desc: 'Schedule I - Salvinorin A'
        },
        ibogaine: {
            color: ['#3e2723', '#4e342e'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1320,
            tempHigh: 152,
            stateHigh: 'smoke',
            desc: 'Schedule I - Ibogaine'
        },
        cathinone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1190,
            tempHigh: 220,
            stateHigh: 'smoke',
            desc: 'Cathinone - stimulant from khat'
        },
        mitragynine: {
            color: ['#8d6e63', '#795548'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 240,
            stateHigh: 'smoke',
            desc: 'Mitragynine - kratom alkaloid'
        }
    };

    Object.entries(finalCompounds).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                tempHigh: cfg.tempHigh,
                stateHigh: cfg.stateHigh,
                reactions: cfg.reactions,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 11. FROZEN STATES
    // --------------------------------------------------------------------------
    const frozenStates = [
        'frozen_seed', 'frozen_opium', 'frozen_ephedrine', 'frozen_pseudo',
        'frozen_meth', 'frozen_heroin', 'frozen_heroin_base', 'frozen_morphine',
        'frozen_morph_base', 'frozen_cocaine', 'frozen_crack', 'frozen_paste',
        'frozen_coke_solution', 'frozen_bho', 'frozen_hash', 'frozen_nicotine',
        'frozen_ammonia'
    ];

    frozenStates.forEach(id => {
        if (!elements[id]) {
            elements[id] = {
                color: ['#b3e5fc', '#81d4fa', '#4fc3f7'],
                behavior: SUPPORT,
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
    // 12. TOOL ELEMENTS
    // --------------------------------------------------------------------------
    const toolElements = {
        scrap_metal: {
            color: ['#757575', '#616161'],
            behavior: PW,
            category: 'solids',
            state: 'solid',
            density: 4500,
            desc: 'Scrap metal fragments'
        },
        molten_steel: {
            color: ['#ff5252', '#ff1744', '#d50000'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 7000,
            viscosity: 8000,
            temp: 1600,
            tempLow: 1510,
            stateLow: 'steel',
            desc: 'Molten steel'
        },
        steel: {
            color: ['#9e9e9e', '#757575'],
            behavior: WALL,
            category: 'solids',
            state: 'solid',
            density: 7850,
            desc: 'Steel - strong metal'
        }
    };

    Object.entries(toolElements).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                tempHigh: cfg.tempHigh,
                stateHigh: cfg.stateHigh,
                tempLow: cfg.tempLow,
                stateLow: cfg.stateLow,
                temp: cfg.temp,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 13. KNIFE/BLADE CURSOR TOOLS - FIXED
    // --------------------------------------------------------------------------
    const harvestTool = function(pixel) {
        const harvestMap = {
            'papaver_somniferum': 'opium_latex',
            'cannabis_sativa': 'cannabis_flower',
            'cannabis_indica': 'cannabis_flower',
            'cannabis_ruderalis': 'cannabis_flower',
            'coca_boliviana': 'coca_leaves',
            'coca_colombiana': 'coca_leaves',
            'cannabis_flower': 'cannabis_trichomes',
            'coca_leaves': 'coca_alkaloids',
            'ephedra_sinica': 'ephedrine',
            'khat': 'cathinone',
            'kratom': 'mitragynine',
            'tobacco': 'nicotine',
            'coffee': 'caffeine',
            'psilocybe_cubensis': 'psilocybin',
            'peyote': 'mescaline',
            'salvia_divinorum': 'salvinorin_a',
            'iboga': 'ibogaine',
            'banisteriopsis_caapi': 'ayahuasca_brew',
            'psychotria': 'dmt',
            'morning_glory': 'lsa'
        };
        
        if (harvestMap[pixel.element]) {
            changePixel(pixel, harvestMap[pixel.element]);
            return true;
        }
        return false;
    };

    if (!elements.knife) {
        elements.knife = {
            color: ['#9e9e9e', '#757575', '#616161'],
            behavior: WALL,
            category: 'tools',
            state: 'solid',
            density: 7850,
            conduct: 0.8,
            tempHigh: 1540,
            stateHigh: 'molten_steel',
            hardness: 0.9,
            breakInto: 'scrap_metal',
            tool: harvestTool,
            desc: 'Knife tool - click plants to harvest'
        };
    }

    if (!elements.blade) {
        elements.blade = {
            color: ['#bdbdbd', '#9e9e9e', '#e0e0e0'],
            behavior: WALL,
            category: 'tools',
            state: 'solid',
            density: 7850,
            conduct: 0.8,
            tempHigh: 1540,
            stateHigh: 'molten_steel',
            hardness: 0.9,
            breakInto: 'scrap_metal',
            tool: harvestTool,
            desc: 'Blade tool - alternative harvesting tool'
        };
    }

    // --------------------------------------------------------------------------
    // 14. ADD PLANT EXTRACTION REACTIONS - FIXED
    // --------------------------------------------------------------------------
    const plantReactions = [
        { plant: 'banisteriopsis_caapi', reactions: {
            water: { elem1: 'ayahuasca_brew', elem2: null, chance: 0.15, tempMin: 80 },
            psychotria: { elem1: 'ayahuasca_brew', elem2: null, chance: 0.2, tempMin: 85 }
        }},
        { plant: 'salvia_divinorum', reactions: {
            ethanol: { elem1: 'salvinorin_a', elem2: null, chance: 0.12, tempMin: 60 },
            acetone: { elem1: 'salvinorin_a', elem2: null, chance: 0.15, tempMin: 70 }
        }},
        { plant: 'iboga', reactions: {
            water: { elem1: 'ibogaine', elem2: null, chance: 0.1, tempMin: 90 },
            ethanol: { elem1: 'ibogaine', elem2: null, chance: 0.13, tempMin: 80 }
        }},
        { plant: 'tobacco', reactions: {
            water: { elem1: 'nicotine', elem2: 'plant_matter', chance: 0.15, tempMin: 80 }
        }},
        { plant: 'coffee', reactions: {
            water: { elem1: 'caffeine', elem2: 'plant_matter', chance: 0.12, tempMin: 90 }
        }},
        { plant: 'peyote', reactions: {
            water: { elem1: 'mescaline', elem2: 'plant_matter', chance: 0.1, tempMin: 70 }
        }},
        { plant: 'morning_glory', reactions: {
            ethanol: { elem1: 'lsa', elem2: 'plant_matter', chance: 0.1, tempMin: 60 }
        }},
        { plant: 'psychotria', reactions: {
            water: { elem1: 'dmt', elem2: 'plant_matter', chance: 0.12, tempMin: 85 }
        }},
        { plant: 'psilocybe_cubensis', reactions: {
            water: { elem1: 'psilocybin', elem2: 'plant_matter', chance: 0.1, tempMin: 75 }
        }}
    ];

    plantReactions.forEach(pr => {
        if (elements[pr.plant]) {
            if (!elements[pr.plant].reactions) {
                elements[pr.plant].reactions = {};
            }
            Object.assign(elements[pr.plant].reactions, pr.reactions);
        }
    });

    // --------------------------------------------------------------------------
    // 15. UNIVERSAL PRECURSOR - FIXED
    // --------------------------------------------------------------------------
    if (!elements.universal_precursor) {
        elements.universal_precursor = {
            color: ['#9c27b0', '#8e24aa', '#7b1fa2'],
            behavior: PW,
            category: 'special',
            state: 'solid',
            density: 1000,
            reactions: {
                dirt: { 
                    elem1: [
                        'cannabis_sativa', 'cannabis_indica', 'cannabis_ruderalis',
                        'papaver_somniferum', 'coca_boliviana', 'coca_colombiana',
                        'ephedra_sinica', 'khat', 'kratom', 'psilocybe_cubensis',
                        'iboga', 'salvia_divinorum', 'banisteriopsis_caapi',
                        'peyote', 'morning_glory', 'tobacco', 'coffee', 'psychotria',
                        'cannabis_flower', 'coca_leaves', 'opium_latex'
                    ], 
                    elem2: null, 
                    chance: 0.1 
                },
                salt: { 
                    elem1: [
                        'ephedrine', 'pseudoephedrine', 'nicotine', 'caffeine', 'lsa',
                        'theobromine', 'ammonia', 'nitric_acid', 'glycerol',
                        'cocaine_sulfate', 'cocaine_base', 'meth_intermediate',
                        'mdma_intermediate', 'heroin_base', 'morphine_base',
                        'sodium_hydroxide', 'ammonium_hydroxide', 'hydrochloric_acid',
                        'acetic_anhydride', 'methylamine', 'potassium_permanganate'
                    ], 
                    elem2: null, 
                    chance: 0.08 
                },
                sugar: { 
                    elem1: [
                        'methamphetamine', 'amphetamine', 'mdma', 'heroin', 'morphine',
                        'fentanyl', 'carfentanil', 'lsd', 'psilocybin', 'psilocin',
                        'cocaine', 'crack', 'pcp', 'ketamine', 'dmt', 'ghb', 'gbl',
                        'mephedrone', 'methylone', 'jwh_018', '_2c_b', '_4_aco_dmt',
                        'tramadol', 'codeine', 'ayahuasca_brew', 'kava_extract',
                        'salvinorin_a', 'ibogaine', 'mescaline',
                        'cocaine_solution', 'crack_slurry', 'meth_solution',
                        'mdma_solution', 'heroin_solution', 'opium_solution',
                        'psilocybin_tea', 'mescaline_tea', 'lsa_solution', 'nicotine_solution',
                        'cannabis_trichomes', 'coca_alkaloids', 'coca_paste',
                        'bho', 'bubble_hash', 'cannabis_oil'
                    ], 
                    elem2: null, 
                    chance: 0.05 
                }
            },
            desc: 'Universal precursor - reacts with dirt/salt/sugar to create any element'
        };
    }

    // --------------------------------------------------------------------------
    // 16. ADDITIONAL CHEMISTRY ITEMS - EXPANDED
    // --------------------------------------------------------------------------
    const additionalChemistry = {
        // Acids
        phosphoric_acid: {
            color: ['#f5f5f5', '#eeeeee'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1880,
            viscosity: 1500,
            desc: 'Phosphoric acid - food grade acid'
        },
        
        // Bases
        potassium_hydroxide: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1120,
            desc: 'Potassium hydroxide - strong base'
        },
        
        // Solvents
        diethyl_ether: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 713,
            tempHigh: 34.6,
            stateHigh: 'ether_vapor',
            desc: 'Diethyl ether - volatile solvent'
        },
        chloroform: {
            color: ['#e8f5e9', '#c8e6c9'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1480,
            tempHigh: 61.2,
            stateHigh: 'chloroform_vapor',
            desc: 'Chloroform - halogenated solvent'
        },
        
        // Gases
        chlorine_gas: {
            color: ['#c8e6c9', '#a5d6a7'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.9,
            desc: 'Chlorine gas - greenish-yellow'
        },
        
        // Salts and compounds
        sodium_chloride: {
            color: ['#ffffff', '#f5f5f5'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1170,
            desc: 'Sodium chloride - table salt'
        },
        potassium_nitrate: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'powders',
            state: 'solid',
            density: 1210,
            desc: 'Potassium nitrate - saltpeter'
        },
        
        // New vapor elements
        ether_vapor: {
            color: ['#f5f5f5', '#e0e0e0'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.7,
            desc: 'Diethyl ether vapor'
        },
        chloroform_vapor: {
            color: ['#e8f5e9', '#c8e6c9'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.8,
            desc: 'Chloroform vapor'
        }
    };

    // Add additional chemistry items
    Object.entries(additionalChemistry).forEach(([id, cfg]) => {
        if (!elements[id]) {
            elements[id] = {
                color: cfg.color,
                behavior: cfg.behavior,
                category: cfg.category,
                state: cfg.state,
                density: cfg.density,
                viscosity: cfg.viscosity,
                tempHigh: cfg.tempHigh,
                stateHigh: cfg.stateHigh,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 17. COMPLETION LOG
    // --------------------------------------------------------------------------
    console.log('='.repeat(70));
    console.log('✓ ChemResearch v2 COMPLETE - ALL ELEMENTS RESTORED & FIXED');
    console.log('='.repeat(70));
    console.log('');
    console.log('📦 ALL ORIGINAL ELEMENTS RESTORED:');
    console.log('  • Base elements: ' + Object.keys(essentialBaseElements).length);
    console.log('  • Vapor/smoke: ' + Object.keys(vaporElements).length);
    console.log('  • Chemical reagents: ' + Object.keys(chemicalReagents).length);
    console.log('  • Botanical plants: ' + Object.keys(botanicals).length);
    console.log('  • Seeds/spores: ' + Object.keys(botanicals).length);
    console.log('  • Precursors: ' + Object.keys(precursors).length);
    console.log('  • Intermediates: ' + Object.keys(intermediates).length);
    console.log('  • Botanical products: ' + Object.keys(botanicalProducts).length);
    console.log('  • Solutions/extracts: ' + Object.keys(solutions).length);
    console.log('  • Final compounds: ' + Object.keys(finalCompounds).length);
    console.log('  • Frozen states: ' + frozenStates.length);
    console.log('  • Tool elements: ' + Object.keys(toolElements).length);
    console.log('  • Additional chemistry: ' + Object.keys(additionalChemistry).length);
    console.log('');
    console.log('🔧 FIXED ISSUES:');
    console.log('  ✓ Fixed behavior reference errors (PW, LIQ, GAS, etc.)');
    console.log('  ✓ Fixed SUPPORT behavior for frozen states');
    console.log('  ✓ Fixed tool functionality for knife/blade');
    console.log('  ✓ Fixed reaction chains for all compounds');
    console.log('');
    console.log('🔬 ALL COMPOUNDS CRAFTABLE:');
    console.log('  ✓ Universal precursor makes everything craftable');
    console.log('  ✓ Complete synthesis chains preserved');
    console.log('  ✓ All original reactions working');
    console.log('');
    console.log('🧪 ADDED CHEMISTRY ITEMS:');
    console.log('  • Phosphoric acid, potassium hydroxide');
    console.log('  • Diethyl ether, chloroform solvents');
    console.log('  • Chlorine gas, sodium chloride, potassium nitrate');
    console.log('  • Additional vapor elements');
    console.log('');
    console.log('🌱 COMPLETE SYNTHESIS CHAINS:');
    console.log('  Seeds → Plants → Raw Materials → Intermediates → Final Products');
    console.log('');
    console.log('  Examples:');
    console.log('  • seed_poppy → papaver_somniferum → opium_latex → morphine_base → heroin');
    console.log('  • seed_coca_bol → coca_boliviana → coca_leaves → coca_paste → cocaine');
    console.log('  • seed_sativa → cannabis_sativa → cannabis_flower → bho/hash');
    console.log('  • seed_ephedra → ephedra_sinica → ephedrine → meth_intermediate → meth');
    console.log('');
    console.log('⚗️ UNIVERSAL PRECURSOR:');
    console.log('  • universal_precursor + dirt → any plant');
    console.log('  • universal_precursor + salt → any precursor');
    console.log('  • universal_precursor + sugar → any final compound');
    console.log('');
    console.log('='.repeat(70));
    console.log('EDUCATIONAL USE ONLY - All 100+ elements restored & working!');
    console.log('='.repeat(70));

})();
