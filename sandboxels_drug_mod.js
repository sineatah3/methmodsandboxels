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
    // 2. EXPANDED BOTANICALS (Plants + Seeds) – Using Base Game Elements
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
        }
    };

    // First, create all the plant elements
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
    });

    // Then create all the seed elements with proper reactions
    Object.entries(botanicals).forEach(([plant, cfg]) => {
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
                dirt: { elem1: plant, elem2: null, chance: 0.015, tempMin: 15 }
            },
            desc: 'Seed/spore - Needs wet soil and warmth to grow into ' + plant
        };
    });

    // --------------------------------------------------------------------------
    // 3. EXPANDED PRECURSORS & REAGENTS – Using Base Game Elements
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
    // 4. EXPANDED RESEARCH COMPOUNDS – New Psychoactive Substances
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
    // 5. ADD BASE GAME ELEMENTS FOR REACTIONS
    // --------------------------------------------------------------------------
    const baseElements = {
        psychotria: {
            color: ['#2e7d32', '#388e3c'],
            behavior: STURDY,
            category: 'botanicals',
            state: 'solid',
            density: 750,
            tempHigh: 160,
            stateHigh: 'ash',
            burn: 65,
            burnTime: 280,
            desc: 'Psychotria viridis - DMT-containing plant for ayahuasca'
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
        nitrogen_dioxide: {
            color: ['#d32f2f', '#c62828'],
            behavior: GAS,
            category: 'gases',
            state: 'gas',
            density: 1.4,
            tempLow: 21,
            stateLow: 'dinitrogen_tetroxide',
            desc: 'Nitrogen dioxide - brown gas, oxidizer'
        }
    };

    Object.entries(baseElements).forEach(([id, cfg]) => {
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
                burn: cfg.burn,
                burnTime: cfg.burnTime,
                desc: cfg.desc
            };
        }
    });

    // --------------------------------------------------------------------------
    // 6. SYNTHESIS REACTIONS (only if base elements exist)
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

    // --------------------------------------------------------------------------
    // 7. COMPLETION & DEBUG
    // --------------------------------------------------------------------------
    console.log('✓ ChemResearch v2 Enhanced - FIXED VERSION loaded');
    console.log('✓ Fixed seed growing reactions');
    console.log('✓ Seeds now properly grow into their botanical counterparts');
    console.log('✓ Total botanical plants: ' + Object.keys(botanicals).length);
    console.log('✓ Total seeds: ' + Object.keys(botanicals).length);

})();
