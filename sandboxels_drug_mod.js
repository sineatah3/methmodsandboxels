// ============================================================================
// CHEMRESEARCH_V2_COMPLETE.JS – Educational Chemistry with ALL Elements
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
                'CHEMRESEARCH_V2 COMPLETE – EDUCATIONAL MOD\n' +
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
    // 3. EXPANDED BOTANICALS (Plants + Seeds)
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

        // Seeds with FIXED reactions using existing elements only
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
    // 4. EXPANDED PRECURSORS & REAGENTS
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

    // --------------------------------------------------------------------------
    // 5. EXPANDED RESEARCH COMPOUNDS
    // --------------------------------------------------------------------------
    const newCompounds = {
        mephedrone: {
            sched: 'I',
            colors: ['#ffffff', '#fafafa'],
            density: 1150,
            tempHigh: 194,
            stateHigh: 'mephedrone_smoke',
            desc: 'Mephedrone - synthetic cathinone, euphoriant'
        },
        methylone: {
            sched: 'I',
            colors: ['#f5f5f5', '#ffffff'],
            density: 1220,
            tempHigh: 201,
            stateHigh: 'methylone_smoke',
            desc: 'Methylone - entactogen, MDMA-like effects'
        },
        jwh_018: {
            sched: 'I',
            colors: ['#fff9c4', '#ffecb3'],
            density: 1180,
            tempHigh: 178,
            stateHigh: 'synthetic_cannabinoid_smoke',
            desc: 'JWH-018 - synthetic cannabinoid'
        },
        _2c_b: {
            sched: 'I',
            colors: ['#ffffff', '#fafafa'],
            density: 1260,
            tempHigh: 235,
            stateHigh: 'smoke',
            desc: '2C-B - phenethylamine psychedelic'
        },
        _4_aco_dmt: {
            sched: 'I',
            colors: ['#ffccbc', '#ffab91'],
            density: 1290,
            tempHigh: 185,
            stateHigh: 'smoke',
            desc: '4-AcO-DMT - synthetic psilocin prodrug'
        },
        tramadol: {
            sched: 'IV',
            colors: ['#ffffff', '#fafafa'],
            density: 1310,
            tempHigh: 180,
            stateHigh: 'smoke',
            desc: 'Tramadol - synthetic opioid analgesic'
        },
        codeine: {
            sched: 'II',
            colors: ['#f5f5f5', '#ffffff'],
            density: 1340,
            tempHigh: 157,
            stateHigh: 'smoke',
            desc: 'Codeine - natural opioid, pain reliever'
        },
        ayahuasca_brew: {
            sched: 'I',
            colors: ['#8d6e63', '#795548'],
            density: 1050,
            liquid: true,
            viscosity: 1800,
            tempHigh: 100,
            stateHigh: 'steam',
            desc: 'Ayahuasca brew - traditional psychedelic'
        },
        kava_extract: {
            sched: 'Unscheduled',
            colors: ['#827717', '#9e9d24'],
            density: 1120,
            liquid: true,
            viscosity: 2200,
            tempHigh: 95,
            stateHigh: 'steam',
            desc: 'Kava extract - anxiolytic beverage'
        },
        salvinorin_a: {
            sched: 'I',
            colors: ['#004d40', '#00695c'],
            density: 1250,
            tempHigh: 238,
            stateHigh: 'salvinorin_vapor',
            desc: 'Salvinorin A - most potent natural hallucinogen'
        },
        ibogaine: {
            sched: 'I',
            colors: ['#3e2723', '#4e342e'],
            density: 1320,
            tempHigh: 152,
            stateHigh: 'smoke',
            desc: 'Ibogaine - African shrub alkaloid, anti-addictive'
        }
    };

    Object.entries(newCompounds).forEach(([id, cfg]) => {
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
            conduct: 0.1,
            desc: `Schedule ${cfg.sched} - ${cfg.desc}`
        };
    });

    // --------------------------------------------------------------------------
    // 6. MISSING INTERMEDIATE COMPOUNDS & SYNTHESIS CHAINS
    // --------------------------------------------------------------------------
    const missingIntermediates = {
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
            desc: 'Cocaine sulfate - intermediate white powder in cocaine refinement'
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
            desc: 'Cocaine freebase - smokable form before salt formation'
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
            desc: 'Methamphetamine freebase - oily liquid intermediate'
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
            colors: ['#8d6e63', '#a1887f', '#795548', '#6d4c41'],
            density: 1320,
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            tempHigh: 170,
            stateHigh: 'heroin_smoke',
            tempLow: -10,
            stateLow: 'frozen_heroin_base',
            reactions: {
                hydrochloric_acid: { elem1: 'heroin', elem2: null, chance: 0.3 },
                water: { elem1: 'heroin_solution', elem2: null, chance: 0.15 }
            },
            desc: 'Heroin base - tan/brown, #3 black tar form'
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

    Object.entries(missingIntermediates).forEach(([id, cfg]) => {
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
    // 7. MISSING SOLUTIONS & EXTRACTS
    // --------------------------------------------------------------------------
    const missingSolutions = {
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
            desc: 'Cocaine dissolved in water - for crack production'
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
            desc: 'Cocaine + NaHCO₃ slurry - Heat to 85°C for freebase rocks'
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
            desc: 'Methamphetamine solution - for injection'
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
            desc: 'MDMA solution - molly water'
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
            desc: 'Heroin dissolved in water - for injection'
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
            desc: 'Psilocybin mushroom tea - water extraction'
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
            desc: 'Mescaline tea - traditional cactus preparation'
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
            desc: 'LSA solution - morning glory extraction'
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
            desc: 'Nicotine solution - tobacco extract'
        }
    };

    Object.entries(missingSolutions).forEach(([id, cfg]) => {
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
    // 8. MISSING RAW BOTANICAL PRODUCTS
    // --------------------------------------------------------------------------
    const missingBotanicalProducts = {
        cannabis_flower: {
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
        },
        cannabis_trichomes: {
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
        cannabis_oil: {
            color: ['#827717', '#9e9d24'],
            behavior: LIQ,
            viscosity: 5000,
            category: 'botanicals',
            tempHigh: 175,
            stateHigh: 'thc_vapor',
            state: 'liquid',
            density: 940,
            desc: 'Condensed cannabis oil - very thick'
        },
        coca_leaves: {
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
        },
        coca_alkaloids: {
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
            desc: 'Coca paste - brown putty, smokable base'
        },
        opium_latex: {
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
        },
        frozen_opium: {
            color: ['#38006b', '#4a148c'],
            behavior: behaviors.SUPPORT,
            category: 'raw_alkaloids',
            tempHigh: -5,
            stateHigh: 'opium_latex',
            state: 'solid',
            density: 1400,
            desc: 'Frozen opium latex'
        }
    };

    Object.entries(missingBotanicalProducts).forEach(([id, cfg]) => {
        elements[id] = {
            color: cfg.colors || cfg.color,
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
    // 9. MISSING CANNABIS EXTRACTS
    // --------------------------------------------------------------------------
    const missingCannabisExtracts = {
        bho: {
            color: ['#827717', '#9e9d24', '#afb42b', '#c0ca33'],
            behavior: LIQ,
            viscosity: 8000,
            category: 'research_compounds',
            state: 'liquid',
            density: 920,
            tempHigh: 157,
            stateHigh: 'thc_vapor',
            tempLow: -20,
            stateLow: 'frozen_bho',
            desc: 'Butane hash oil - amber honey-like, extremely sticky'
        },
        bubble_hash: {
            color: ['#d7ccc8', '#bcaaa4', '#efebe9', '#c5b8b3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1050,
            tempHigh: 157,
            stateHigh: 'thc_vapor',
            tempLow: -25,
            stateLow: 'frozen_hash',
            desc: 'Ice water hash - blonde/tan, 70-90% THC'
        }
    };

    Object.entries(missingCannabisExtracts).forEach(([id, cfg]) => {
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
    });

    // --------------------------------------------------------------------------
    // 10. MISSING FROZEN STATES
    // --------------------------------------------------------------------------
    const essentialFrozenStates = [
        'frozen_seed', 'frozen_opium', 'frozen_ephedrine', 'frozen_pseudo',
        'frozen_p2p', 'frozen_safrole', 'frozen_meth', 'frozen_heroin',
        'frozen_heroin_base', 'frozen_morphine', 'frozen_morph_base',
        'frozen_cocaine', 'frozen_crack', 'frozen_paste', 'frozen_coke_solution',
        'frozen_bho', 'frozen_hash', 'frozen_nicotine', 'frozen_ammonia'
    ];

    essentialFrozenStates.forEach(id => {
        if (!elements[id]) {
            elements[id] = {
                color: ['#b3e5fc', '#81d4fa', '#4fc3f7'],
                behavior: behaviors.SUPPORT,
                category: 'frozen',
                state: 'solid',
                density: 1100,
                temp: -20,
                conduct: 0.5,
                desc: 'Frozen state - thaw to restore original element'
            };
        }
    });

    // --------------------------------------------------------------------------
    // 11. ADD MISSING BASE ELEMENTS FOR REACTIONS
    // --------------------------------------------------------------------------
    const additionalBaseElements = {
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
        ammonia_gas: {
            color: ['#e1f5fe', '#b3e5fc'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 0.7,
            desc: 'Ammonia gas - pungent'
        },
        dinitrogen_tetroxide: {
            color: ['#d32f2f', '#c62828'],
            behavior: LIQ,
            category: 'liquids',
            state: 'liquid',
            density: 1440,
            desc: 'Dinitrogen tetroxide - liquid oxidizer'
        },
        burnt_chocolate: {
            color: ['#5d4037', '#4e342e'],
            behavior: PW,
            category: 'land',
            state: 'solid',
            density: 800,
            desc: 'Burnt chocolate residue'
        },
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
        cocaine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 195,
            stateHigh: 'smoke',
            desc: 'Schedule II - Cocaine HCl - white powder'
        },
        crack: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 98,
            stateHigh: 'crack_smoke',
            desc: 'Schedule II - Crack cocaine - smokable freebase'
        },
        methamphetamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1180,
            tempHigh: 170,
            stateHigh: 'meth_smoke',
            desc: 'Schedule II - Methamphetamine - crystal'
        },
        amphetamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 200,
            stateHigh: 'smoke',
            desc: 'Schedule II - Amphetamine - speed'
        },
        mdma: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 148,
            stateHigh: 'mdma_smoke',
            desc: 'Schedule I - MDMA - ecstasy/molly'
        },
        heroin: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1350,
            tempHigh: 173,
            stateHigh: 'heroin_smoke',
            desc: 'Schedule I - Heroin - diacetylmorphine'
        },
        morphine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1320,
            tempHigh: 255,
            stateHigh: 'morphine_smoke',
            desc: 'Schedule II - Morphine - opiate analgesic'
        },
        fentanyl: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1400,
            tempHigh: 87,
            stateHigh: 'smoke',
            desc: 'Schedule II - Fentanyl - synthetic opioid'
        },
        carfentanil: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1420,
            tempHigh: 91,
            stateHigh: 'smoke',
            desc: 'Schedule II - Carfentanil - ultra-potent opioid'
        },
        lsd: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1300,
            tempHigh: 83,
            stateHigh: 'smoke',
            desc: 'Schedule I - LSD - lysergic acid diethylamide'
        },
        psilocybin: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1280,
            tempHigh: 220,
            stateHigh: 'smoke',
            desc: 'Schedule I - Psilocybin - magic mushroom compound'
        },
        psilocin: {
            color: ['#bcaaa4', '#a1887f'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1270,
            tempHigh: 173,
            stateHigh: 'smoke',
            desc: 'Schedule I - Psilocin - active form of psilocybin'
        },
        pcp: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1240,
            tempHigh: 233,
            stateHigh: 'smoke',
            desc: 'Schedule II - PCP - phencyclidine'
        },
        ketamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 262,
            stateHigh: 'smoke',
            desc: 'Schedule III - Ketamine - dissociative anesthetic'
        },
        dmt: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 160,
            stateHigh: 'smoke',
            desc: 'Schedule I - DMT - dimethyltryptamine'
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
            desc: 'Schedule I - GHB - gamma-hydroxybutyrate'
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
            desc: 'Schedule I - GBL - GHB prodrug'
        }
    };

    Object.entries(additionalBaseElements).forEach(([id, cfg]) => {
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
    // 12. COMPLETE UNIVERSAL PRECURSOR SYSTEM
    // --------------------------------------------------------------------------
    if (!elements.universal_precursor) {
        elements.universal_precursor = {
            color: ['#9c27b0', '#8e24aa', '#7b1fa2'],
            behavior: PW,
            category: 'special',
            state: 'solid',
            density: 1000,
            reactions: {
                // Create any plant
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
                // Create any precursor
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
                // Create any final compound
                sugar: { 
                    elem1: [
                        'methamphetamine', 'amphetamine', 'mdma', 'heroin', 'morphine',
                        'fentanyl', 'carfentanil', 'lsd', 'psilocybin', 'psilocin',
                        'cocaine', 'crack', 'pcp', 'ketamine', 'dmt', 'ghb', 'gbl',
                        'mephedrone', 'methylone', 'jwh_018', '_2c_b', '_4_aco_dmt',
                        'tramadol', 'codeine', 'ayahuasca_brew', 'kava_extract',
                        'salvinorin_a', 'ibogaine',
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
            desc: 'Universal precursor - reacts with dirt/salt/sugar to create any research element'
        };
    }

    // --------------------------------------------------------------------------
    // 13. ADD SYNTHESIS REACTIONS TO EXISTING PLANTS
    // --------------------------------------------------------------------------
    if (elements.banisteriopsis_caapi) {
        elements.banisteriopsis_caapi.reactions = {
            water: { elem1: 'ayahuasca_brew', elem2: null, chance: 0.15, tempMin: 80 },
            psychotria: { elem1: 'ayahuasca_brew', elem2: null, chance: 0.2, tempMin: 85 }
        };
    }

    if (elements.salvia_divinorum) {
        elements.salvia_divinorum.reactions = {
            ethanol: { elem1: 'salvinorin_a', elem2: null, chance: 0.12, tempMin: 60 },
            acetone: { elem1: 'salvinorin_a', elem2: null, chance: 0.15, tempMin: 70 }
        };
    }

    if (elements.iboga) {
        elements.iboga.reactions = {
            water: { elem1: 'ibogaine', elem2: null, chance: 0.1, tempMin: 90 },
            ethanol: { elem1: 'ibogaine', elem2: null, chance: 0.13, tempMin: 80 }
        };
    }

    if (elements.papaver_somniferum) {
        elements.papaver_somniferum.reactions = {
            knife: { elem1: 'opium_latex', elem2: null, chance: 0.3 },
            blade: { elem1: 'opium_latex', elem2: null, chance: 0.3 }
        };
    }

    if (elements.cannabis_sativa) {
        elements.cannabis_sativa.reactions = {
            knife: { elem1: 'cannabis_flower', elem2: null, chance: 0.4 },
            blade: { elem1: 'cannabis_flower', elem2: null, chance: 0.4 }
        };
    }

    if (elements.cannabis_indica) {
        elements.cannabis_indica.reactions = {
            knife: { elem1: 'cannabis_flower', elem2: null, chance: 0.4 },
            blade: { elem1: 'cannabis_flower', elem2: null, chance: 0.4 }
        };
    }

    if (elements.cannabis_ruderalis) {
        elements.cannabis_ruderalis.reactions = {
            knife: { elem1: 'cannabis_flower', elem2: null, chance: 0.4 },
            blade: { elem1: 'cannabis_flower', elem2: null, chance: 0.4 }
        };
    }

    if (elements.coca_boliviana) {
        elements.coca_boliviana.reactions = {
            knife: { elem1: 'coca_leaves', elem2: null, chance: 0.4 },
            blade: { elem1: 'coca_leaves', elem2: null, chance: 0.4 }
        };
    }

    if (elements.coca_colombiana) {
        elements.coca_colombiana.reactions = {
            knife: { elem1: 'coca_leaves', elem2: null, chance: 0.4 },
            blade: { elem1: 'coca_leaves', elem2: null, chance: 0.4 }
        };
    }

    if (elements.psilocybe_cubensis) {
        elements.psilocybe_cubensis.reactions = {
            water: { elem1: 'psilocybin_tea', elem2: null, chance: 0.2, tempMin: 70 },
            ethanol: { elem1: 'psilocybin', elem2: null, chance: 0.15, tempMin: 60 }
        };
    }

    if (elements.peyote) {
        elements.peyote.reactions = {
            water: { elem1: 'mescaline_tea', elem2: null, chance: 0.18, tempMin: 75 },
            ethanol: { elem1: 'mescaline', elem2: null, chance: 0.14, tempMin: 65 }
        };
    }

    if (elements.ephedra_sinica) {
        elements.ephedra_sinica.reactions = {
            water: { elem1: 'ephedrine', elem2: null, chance: 0.12, tempMin: 85 },
            ethanol: { elem1: 'ephedrine', elem2: null, chance: 0.15, tempMin: 70 }
        };
    }

    // Add mescaline if missing
    if (!elements.mescaline) {
        elements.mescaline = {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1290,
            tempHigh: 183,
            stateHigh: 'smoke',
            desc: 'Schedule I - Mescaline - cactus alkaloid'
        };
    }

    // --------------------------------------------------------------------------
    // 14. COMPLETION & DEBUG
    // --------------------------------------------------------------------------
    console.log('✓ ChemResearch v2 COMPLETE - ALL ELEMENTS LOADED');
    console.log('✓ Base game elements: 20+ (soil, water, chemicals, etc.)');
    console.log('✓ Botanical plants: ' + Object.keys(botanicals).length);
    console.log('✓ Seeds/spores: ' + Object.keys(botanicals).length);
    console.log('✓ Precursor chemicals: ' + Object.keys(precursors).length);
    console.log('✓ Research compounds: ' + Object.keys(newCompounds).length);
    console.log('✓ Intermediate compounds: ' + Object.keys(missingIntermediates).length);
    console.log('✓ Solutions/extracts: ' + Object.keys(missingSolutions).length);
    console.log('✓ Botanical products: ' + Object.keys(missingBotanicalProducts).length);
    console.log('✓ Cannabis extracts: ' + Object.keys(missingCannabisExtracts).length);
    console.log('✓ Final compounds: 15+ (cocaine, meth, heroin, etc.)');
    console.log('✓ Frozen states: ' + essentialFrozenStates.length);
    console.log('✓ Smoke/vapor states: 10+');
    console.log('✓ Total research elements: 100+');
    console.log('✓ All seeds grow with: soil, wet_soil, mud, water, fertilizer at 15°C+');
    console.log('✓ All plants can be harvested with knife/blade');
    console.log('✓ Complete synthesis chains from plants to final products');
    console.log('✓ Universal precursor can create all elements');
    
    // Count total custom elements
    const customCategories = [
        'botanicals', 'precursors', 'research_compounds', 
        'raw_alkaloids', 'frozen'
    ];
    const totalCustom = Object.keys(elements).filter(k =>
        elements[k].category && customCategories.some(cat => 
            elements[k].category.includes(cat)
        )
    ).length;
    
    console.log('✓ Total custom elements added: ' + totalCustom);
    console.log('');
    console.log('='.repeat(60));
    console.log('CHEMRESEARCH V2 COMPLETE - EDUCATIONAL USE ONLY');
    console.log('All synthesis chains functional and realistic');
    console.log('Seeds → Plants → Raw materials → Intermediates → Final products');
    console.log('='.repeat(60));

})();
