// ============================================================================
// CHEMRESEARCH_V3_MASSIVELY_EXPANDED.JS – Maximum Chemistry Elements
// MIT Licence – Research / EDU Use Only – No Real-World Instructions
// VERSION 3.0 - ALL research compounds now craftable + 200+ new elements
// ============================================================================
/* global elements, behaviors, pixel, settings, changePixel */

(() => {
    'use strict';

    // --------------------------------------------------------------------------
    // 1. HELPERS & BEHAVIORS
    // --------------------------------------------------------------------------
    const PW = behaviors.POWDER;
    const LIQ = behaviors.LIQUID;
    const WALL = behaviors.WALL;
    const STURDY = behaviors.STURDY_PLANT;
    const GAS = behaviors.GAS;
    const SUPPORT = behaviors.SUPPORT;

    // --------------------------------------------------------------------------
    // 2. ESSENTIAL BASE ELEMENTS
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
    // 3. VAPOR/SMOKE ELEMENTS - EXPANDED
    // --------------------------------------------------------------------------
    const vaporElements = {
        mephedrone_smoke: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Mephedrone vapor' },
        methylone_smoke: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Methylone vapor' },
        synthetic_cannabinoid_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Synthetic cannabinoid vapor' },
        salvinorin_vapor: { color: ['#004d40', '#00695c'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Salvinorin A vapor' },
        nicotine_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Nicotine vapor' },
        crack_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Crack cocaine vapor' },
        meth_smoke: { color: ['#e0e0e0', '#eeeeee'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Methamphetamine vapor' },
        mdma_smoke: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'MDMA vapor' },
        heroin_smoke: { color: ['#8d6e63', '#a1887f'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Heroin vapor' },
        morphine_smoke: { color: ['#bcaaa4', '#a1887f'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Morphine vapor' },
        thc_vapor: { color: ['#c8e6c9', '#a5d6a7'], behavior: GAS, category: 'botanicals', temp: 180, tempLow: 150, stateLow: 'cannabis_oil', state: 'gas', density: 0.8, desc: 'Vaporized THC' },
        nitrogen_dioxide: { color: ['#d32f2f', '#c62828'], behavior: GAS, category: 'gases', state: 'gas', density: 1.4, tempLow: 21, stateLow: 'dinitrogen_tetroxide', desc: 'Nitrogen dioxide' },
        ammonia_gas: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.7, desc: 'Ammonia gas' },
        pcp_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'PCP vapor' },
        ketamine_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Ketamine vapor' },
        dmt_vapor: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'DMT vapor' },
        fentanyl_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Fentanyl vapor' },
        lsd_vapor: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'LSD vapor' }
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
    // 4. MASSIVE CHEMICAL REAGENTS EXPANSION
    // --------------------------------------------------------------------------
    const chemicalReagents = {
        // Core acids
        sodium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1130, desc: 'Sodium hydroxide - caustic base' },
        ammonium_hydroxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 910, desc: 'Ammonium hydroxide' },
        hydrochloric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1049, desc: 'Hydrochloric acid' },
        sulfuric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1840, viscosity: 2400, desc: 'Sulfuric acid' },
        acetic_anhydride: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1080, desc: 'Acetic anhydride' },
        methylamine: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.7, desc: 'Methylamine' },
        potassium_permanganate: { color: ['#6a1b9a', '#7b1fa2'], behavior: PW, category: 'powders', state: 'solid', density: 1270, desc: 'Potassium permanganate' },
        sodium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1120, desc: 'Sodium carbonate' },
        potassium_carbonate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1140, desc: 'Potassium carbonate' },
        acetic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1049, desc: 'Acetic acid' },
        fatty_acid: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 900, desc: 'Fatty acid' },
        nitrogen: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.8, desc: 'Nitrogen gas' },
        dinitrogen_tetroxide: { color: ['#d32f2f', '#c62828'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1440, desc: 'Dinitrogen tetroxide' },
        
        // Food/beverage chemistry
        tea: { color: ['#8d6e63', '#795548'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1005, tempHigh: 100, stateHigh: 'steam', desc: 'Tea' },
        cocoa: { color: ['#8d6e63', '#795548'], behavior: PW, category: 'powders', state: 'solid', density: 1450, tempHigh: 200, stateHigh: 'ash', desc: 'Cocoa powder' },
        chocolate: { color: ['#8d6e63', '#795548'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1320, viscosity: 3000, tempHigh: 350, stateHigh: 'burnt_chocolate', desc: 'Chocolate' },
        fat: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 900, viscosity: 2500, tempHigh: 205, stateHigh: 'smoke', desc: 'Fat' },
        oil: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 920, viscosity: 800, tempHigh: 300, stateHigh: 'smoke', desc: 'Plant oil' },
        burnt_chocolate: { color: ['#5d4037', '#4e342e'], behavior: PW, category: 'land', state: 'solid', density: 800, desc: 'Burnt chocolate residue' },
        
        // NEW: Expanded organic solvents
        toluene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 867, desc: 'Toluene - aromatic solvent' },
        benzene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 879, desc: 'Benzene - aromatic hydrocarbon' },
        xylene: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 860, desc: 'Xylene - industrial solvent' },
        hexane: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 655, desc: 'Hexane - extraction solvent' },
        methanol: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 792, desc: 'Methanol - wood alcohol' },
        isopropanol: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 786, desc: 'Isopropanol - rubbing alcohol' },
        dichloromethane: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1326, desc: 'Dichloromethane - DCM' },
        chloroform: { color: ['#e8f5e9', '#c8e6c9'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1480, desc: 'Chloroform' },
        diethyl_ether: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 713, desc: 'Diethyl ether' },
        
        // NEW: More acids and bases
        phosphoric_acid: { color: ['#f5f5f5', '#eeeeee'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1880, viscosity: 1500, desc: 'Phosphoric acid' },
        nitric_acid: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1510, viscosity: 1200, desc: 'Nitric acid' },
        formic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1220, desc: 'Formic acid' },
        citric_acid: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1665, desc: 'Citric acid' },
        oxalic_acid: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1900, desc: 'Oxalic acid' },
        potassium_hydroxide: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1120, desc: 'Potassium hydroxide' },
        calcium_hydroxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1220, desc: 'Calcium hydroxide - slaked lime' },
        
        // NEW: Salts and oxidizers
        sodium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1170, desc: 'Sodium chloride - table salt' },
        potassium_nitrate: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1210, desc: 'Potassium nitrate' },
        sodium_nitrate: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1270, desc: 'Sodium nitrate' },
        ammonium_nitrate: { color: ['#ffffff', '#fafafa'], behavior: PW, category: 'powders', state: 'solid', density: 1725, desc: 'Ammonium nitrate' },
        calcium_chloride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1150, desc: 'Calcium chloride' },
        magnesium_sulfate: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1120, desc: 'Magnesium sulfate - Epsom salt' },
        
        // NEW: Organics and reagents
        formaldehyde: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1083, desc: 'Formaldehyde solution' },
        phenol: { color: ['#ffccbc', '#ffab91'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1070, desc: 'Phenol - carbolic acid' },
        aniline: { color: ['#8d6e63', '#795548'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1022, desc: 'Aniline - aromatic amine' },
        pyridine: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 982, desc: 'Pyridine' },
        piperidine: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 862, desc: 'Piperidine' },
        lithium_aluminum_hydride: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 917, desc: 'LiAlH4 - reducing agent' },
        sodium_borohydride: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 1074, desc: 'NaBH4 - reducing agent' },
        
        // NEW: Gases
        chlorine_gas: { color: ['#c8e6c9', '#a5d6a7'], behavior: GAS, category: 'gases', state: 'gas', density: 0.9, desc: 'Chlorine gas' },
        carbon_dioxide: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 1.5, desc: 'Carbon dioxide' },
        carbon_monoxide: { color: ['#f5f5f5', '#e0e0e0'], behavior: GAS, category: 'gases', state: 'gas', density: 1.0, desc: 'Carbon monoxide' },
        sulfur_dioxide: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 2.2, desc: 'Sulfur dioxide' },
        hydrogen_sulfide: { color: ['#fff9c4', '#ffecb3'], behavior: GAS, category: 'gases', state: 'gas', density: 1.2, desc: 'Hydrogen sulfide' },
        propane: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 1.5, desc: 'Propane gas' },
        ethylene: { color: ['#e1f5fe', '#b3e5fc'], behavior: GAS, category: 'gases', state: 'gas', density: 0.9, desc: 'Ethylene gas' },
        
        // NEW: Specialty chemicals
        glycerol: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1261, viscosity: 1500, desc: 'Glycerol' },
        ethylene_glycol: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1113, desc: 'Ethylene glycol' },
        propylene_glycol: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1036, desc: 'Propylene glycol' },
        dimethylformamide: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 944, desc: 'DMF - polar solvent' },
        dimethyl_sulfoxide: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1100, desc: 'DMSO - aprotic solvent' },
        tetrahydrofuran: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 889, desc: 'THF - cyclic ether' },
        
        // NEW: Additional reagents
        ammonia: { color: ['#e1f5fe', '#b3e5fc'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 682, viscosity: 600, desc: 'Liquid ammonia' },
        thionyl_chloride: { color: ['#fff9c4', '#ffecb3'], behavior: LIQ, category: 'liquids', state: 'liquid', density: 1638, desc: 'Thionyl chloride' },
        phosphorus_pentoxide: { color: ['#ffffff', '#f5f5f5'], behavior: PW, category: 'powders', state: 'solid', density: 2390, desc: 'P2O5 - desiccant' },
        sodium_metal: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 968, desc: 'Sodium metal' },
        lithium_metal: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 534, desc: 'Lithium metal' },
        palladium_catalyst: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 1200, desc: 'Palladium on carbon' },
        platinum_catalyst: { color: ['#9e9e9e', '#757575'], behavior: PW, category: 'powders', state: 'solid', density: 1200, desc: 'Platinum catalyst' }
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
                tempHigh: cfg.tempHigh ? cfg.tempHigh + 100 : undefined, // INCREASED by 100°C if defined
                stateHigh: cfg.stateHigh,
                tempLow: cfg.tempLow,
                stateLow: cfg.stateLow,
                burn: 0, // DISABLED burning for all reagents
                burnTime: 0,
                conduct: 0.03, // REDUCED heat transfer
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
            desc: 'Psychotria viridis - DMT-containing plant'
        }
    };

    Object.entries(botanicals).forEach(([plant, cfg]) => {
        elements[plant] = {
            color: cfg.colors,
            behavior: STURDY,
            category: 'botanicals',
            tempHigh: cfg.tempHigh,
            stateHigh: 'ash',
            burn: 5, // REDUCED from 60-75 to 5
            burnTime: 800, // INCREASED from 280-400 to 800
            burnInto: 'ash', // Changed from breakInto to burnInto
            breakInto: cfg.seed,
            state: 'solid',
            density: 800,
            conduct: 0.05, // REDUCED from 0.1 to slow heat transfer
            desc: cfg.desc + ' - Research use only.'
        };

        // Seeds
        elements[cfg.seed] = {
            color: ['#8d6e63', '#795548', '#a1887f', '#6d4c41'],
            behavior: PW,
            category: 'botanicals',
            tempHigh: 300, // INCREASED from 200 to 300
            stateHigh: 'ash',
            tempLow: -20,
            stateLow: 'frozen_seed',
            state: 'solid',
            density: 1100,
            burn: 0, // DISABLED burning
            burnTime: 0,
            conduct: 0.05, // REDUCED heat transfer
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
    // 6. MASSIVELY EXPANDED PRECURSORS & REAGENTS
    // --------------------------------------------------------------------------
    const precursors = {
        ephedrine: {
            colors: ['#ffffff', '#fafafa', '#f5f5f5'],
            density: 1180,
            tempHigh: 255,
            stateHigh: 'smoke',
            reactions: {
                hydrogen: { elem1: 'pseudoephedrine', elem2: null, chance: 0.15, tempMin: 120 },
                catalyst: { elem1: 'pseudoephedrine', elem2: null, chance: 0.12, tempMin: 100 },
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, tempMin: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, tempMin: 110 },
                lithium_metal: { elem1: 'methamphetamine', elem2: null, chance: 0.2, tempMin: 100 },
                sodium_metal: { elem1: 'methamphetamine', elem2: null, chance: 0.18, tempMin: 100 }
            },
            desc: 'Ephedrine HCl - white crystalline'
        },
        pseudoephedrine: {
            colors: ['#f5f5f5', '#fafafa', '#eeeeee'],
            density: 1200,
            tempHigh: 260,
            stateHigh: 'smoke',
            reactions: {
                red_phosphorus: { elem1: 'meth_intermediate', elem2: null, chance: 0.15, tempMin: 120 },
                iodine: { elem1: 'meth_intermediate', elem2: null, chance: 0.12, tempMin: 110 },
                lithium_metal: { elem1: 'methamphetamine', elem2: null, chance: 0.2, tempMin: 100 }
            },
            desc: 'Pseudoephedrine - white powder'
        },
        nicotine: {
            colors: ['#f5f5f5', '#e0e0e0'],
            density: 1010,
            liquid: true,
            viscosity: 2500,
            tempHigh: 247,
            stateHigh: 'nicotine_vapor',
            reactions: {
                water: { elem1: 'nicotine_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Nicotine - oily liquid'
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
                ethanol: { elem1: 'lsa_solution', elem2: null, chance: 0.15 },
                lithium_aluminum_hydride: { elem1: 'lsd', elem2: null, chance: 0.25, tempMin: 80 }
            },
            desc: 'Lysergic acid amide'
        },
        theobromine: {
            colors: ['#f5f5f5', '#ffffff'],
            density: 1340,
            tempHigh: 290,
            stateHigh: 'smoke',
            desc: 'Theobromine - chocolate alkaloid'
        },
        ammonia: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 682,
            liquid: true,
            viscosity: 600,
            tempHigh: -33,
            stateHigh: 'ammonia_gas',
            reactions: {
                nitrogen: { elem1: 'ammonia', elem2: null, chance: 0.1, tempMin: 400 },
                hydrogen: { elem1: 'ammonia', elem2: null, chance: 0.12, tempMin: 450 }
            },
            desc: 'Ammonia - pungent liquid'
        },
        nitric_acid: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1510,
            liquid: true,
            viscosity: 1200,
            tempHigh: 83,
            stateHigh: 'nitrogen_dioxide',
            reactions: {
                ammonia: { elem1: 'nitric_acid', elem2: null, chance: 0.15, tempMin: 200 }
            },
            desc: 'Nitric acid - strong oxidizer'
        },
        glycerol: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1261,
            liquid: true,
            viscosity: 1500,
            tempHigh: 290,
            stateHigh: 'steam',
            reactions: {
                fat: { elem1: 'glycerol', elem2: 'fatty_acid', chance: 0.2, tempMin: 100 }
            },
            desc: 'Glycerol - sweet, viscous'
        },
        
        // NEW: More precursors for creating research compounds
        phenylacetone: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1015,
            liquid: true,
            viscosity: 1200,
            tempHigh: 216,
            stateHigh: 'smoke',
            reactions: {
                methylamine: { elem1: 'methamphetamine', elem2: null, chance: 0.3, tempMin: 80 },
                ammonia: { elem1: 'amphetamine', elem2: null, chance: 0.25, tempMin: 85 }
            },
            desc: 'P2P - amphetamine precursor'
        },
        safrole: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1096,
            liquid: true,
            viscosity: 1100,
            tempHigh: 234,
            stateHigh: 'smoke',
            reactions: {
                hydrogen: { elem1: 'mdp2p', elem2: null, chance: 0.25, tempMin: 100 },
                potassium_permanganate: { elem1: 'mdp2p', elem2: null, chance: 0.3, tempMin: 90 }
            },
            desc: 'Safrole - MDMA precursor oil'
        },
        mdp2p: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1040,
            liquid: true,
            viscosity: 1600,
            tempHigh: 130,
            stateHigh: 'mdma_smoke',
            reactions: {
                methylamine: { elem1: 'mdma', elem2: null, chance: 0.35, tempMin: 80 },
                ammonia: { elem1: 'mda', elem2: null, chance: 0.3, tempMin: 85 }
            },
            desc: 'MDP2P - MDMA intermediate'
        },
        ergotamine: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1320,
            tempHigh: 213,
            stateHigh: 'smoke',
            reactions: {
                lithium_aluminum_hydride: { elem1: 'lsd', elem2: null, chance: 0.3, tempMin: 70 },
                diethyl_ether: { elem1: 'lsd', elem2: null, chance: 0.25, tempMin: 60 }
            },
            desc: 'Ergotamine - LSD precursor'
        },
        lysergic_acid: {
            colors: ['#ffffff', '#fafafa'],
            density: 1280,
            tempHigh: 240,
            stateHigh: 'smoke',
            reactions: {
                diethyl_ether: { elem1: 'lsd', elem2: null, chance: 0.35, tempMin: 50 },
                thionyl_chloride: { elem1: 'lsd', elem2: null, chance: 0.4, tempMin: 60 }
            },
            desc: 'Lysergic acid - LSD precursor'
        },
        tryptamine: {
            colors: ['#ffffff', '#fafafa'],
            density: 1090,
            tempHigh: 174,
            stateHigh: 'smoke',
            reactions: {
                dimethylformamide: { elem1: 'dmt', elem2: null, chance: 0.3, tempMin: 80 },
                formaldehyde: { elem1: 'dmt', elem2: null, chance: 0.25, tempMin: 90 }
            },
            desc: 'Tryptamine - DMT precursor'
        },
        indole: {
            colors: ['#ffffff', '#fafafa'],
            density: 1175,
            tempHigh: 254,
            stateHigh: 'smoke',
            reactions: {
                formaldehyde: { elem1: 'tryptamine', elem2: null, chance: 0.25, tempMin: 100 }
            },
            desc: 'Indole - tryptamine precursor'
        },
        piperidine_precursor: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 862,
            liquid: true,
            viscosity: 800,
            tempHigh: 106,
            stateHigh: 'smoke',
            reactions: {
                phenylacetone: { elem1: 'pcp', elem2: null, chance: 0.3, tempMin: 80 },
                benzene: { elem1: 'pcp', elem2: null, chance: 0.25, tempMin: 90 }
            },
            desc: 'Piperidine - PCP precursor'
        },
        cyclohexanone: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 948,
            liquid: true,
            viscosity: 1000,
            tempHigh: 156,
            stateHigh: 'smoke',
            reactions: {
                piperidine: { elem1: 'ketamine', elem2: null, chance: 0.3, tempMin: 70 },
                methylamine: { elem1: 'ketamine', elem2: null, chance: 0.25, tempMin: 80 }
            },
            desc: 'Cyclohexanone - ketamine precursor'
        },
        acetic_acid_anhydride: {
            colors: ['#ffffff', '#f5f5f5'],
            density: 1080,
            liquid: true,
            viscosity: 900,
            tempHigh: 140,
            stateHigh: 'smoke',
            reactions: {
                morphine: { elem1: 'heroin', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 },
                morphine_base: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 }
            },
            desc: 'Acetic anhydride - acetylating agent'
        },
        thebaine: {
            colors: ['#bcaaa4', '#a1887f'],
            density: 1300,
            tempHigh: 193,
            stateHigh: 'smoke',
            reactions: {
                hydrogen: { elem1: 'oxycodone', elem2: null, chance: 0.3, tempMin: 100 },
                sodium_borohydride: { elem1: 'hydrocodone', elem2: null, chance: 0.28, tempMin: 90 }
            },
            desc: 'Thebaine - opioid precursor'
        },
        acrylfentanyl_precursor: {
            colors: ['#ffffff', '#fafafa'],
            density: 1150,
            tempHigh: 120,
            stateHigh: 'smoke',
            reactions: {
                aniline: { elem1: 'fentanyl', elem2: null, chance: 0.35, tempMin: 70 },
                phenyl: { elem1: 'carfentanil', elem2: null, chance: 0.3, tempMin: 80 }
            },
            desc: 'Fentanyl precursor'
        },
        cathinone_precursor: {
            colors: ['#ffffff', '#fafafa'],
            density: 1190,
            tempHigh: 220,
            stateHigh: 'smoke',
            reactions: {
                methylamine: { elem1: 'mephedrone', elem2: null, chance: 0.3, tempMin: 80 },
                ethanol: { elem1: 'methylone', elem2: null, chance: 0.28, tempMin: 85 }
            },
            desc: 'Cathinone precursor base'
        },
        gamma_butyrolactone: {
            colors: ['#e1f5fe', '#b3e5fc'],
            density: 1130,
            liquid: true,
            viscosity: 1500,
            tempHigh: 204,
            stateHigh: 'steam',
            reactions: {
                sodium_hydroxide: { elem1: 'ghb', elem2: null, chance: 0.35 },
                water: { elem1: 'ghb', elem2: null, chance: 0.25, tempMin: 80 }
            },
            desc: 'GBL - GHB precursor'
        },
        synthetic_cannabinoid_base: {
            colors: ['#fff9c4', '#ffecb3'],
            density: 1180,
            tempHigh: 178,
            stateHigh: 'synthetic_cannabinoid_smoke',
            reactions: {
                indole: { elem1: 'jwh_018', elem2: null, chance: 0.3, tempMin: 90 }
            },
            desc: 'Synthetic cannabinoid base'
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
            tempHigh: cfg.tempHigh + 100, // INCREASED by 100°C to prevent premature vaporization
            stateHigh: cfg.stateHigh,
            burn: 0, // DISABLED burning for all precursors
            burnTime: 0,
            conduct: 0.03, // REDUCED heat transfer
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
                ammonium_hydroxide: { elem1: 'cocaine_base', elem2: null, chance: 0.25 },
                potassium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.28 }
            },
            desc: 'Cocaine sulfate - intermediate'
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
                hydrochloric_acid: { elem1: 'cocaine', elem2: null, chance: 0.35 },
                acetic_acid: { elem1: 'cocaine', elem2: null, chance: 0.3 }
            },
            desc: 'Cocaine freebase'
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
                hydrochloric_acid: { elem1: 'methamphetamine', elem2: null, chance: 0.35 },
                sulfuric_acid: { elem1: 'methamphetamine', elem2: null, chance: 0.3 }
            },
            desc: 'Methamphetamine freebase'
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
                methylamine: { elem1: 'mdma', elem2: null, chance: 0.25, tempMin: 100 },
                hydrochloric_acid: { elem1: 'mdma', elem2: null, chance: 0.3 }
            },
            desc: 'MDP2P - MDMA precursor'
        },
        heroin_base: {
            colors: ['#8d6e63', '#a1887f', '#795548'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1320,
            tempHigh: 170,
            stateHigh: 'heroin_smoke',
            reactions: {
                hydrochloric_acid: { elem1: 'heroin', elem2: null, chance: 0.3 },
                water: { elem1: 'heroin_solution', elem2: null, chance: 0.15 },
                citric_acid: { elem1: 'heroin', elem2: null, chance: 0.25 }
            },
            desc: 'Heroin base - #3 form'
        },
        morphine_base: {
            colors: ['#bcaaa4', '#a1887f', '#8d6e63'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1230,
            tempHigh: 197,
            stateHigh: 'morphine_smoke',
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 },
                acetic_acid_anhydride: { elem1: 'heroin_base', elem2: 'acetic_acid', chance: 0.35, tempMin: 85 }
            },
            desc: 'Morphine base'
        },
        mda_intermediate: {
            colors: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'precursors',
            state: 'solid',
            density: 1180,
            tempHigh: 187,
            stateHigh: 'smoke',
            reactions: {
                formaldehyde: { elem1: 'mdma', elem2: null, chance: 0.3, tempMin: 80 }
            },
            desc: 'MDA - MDMA precursor'
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
            tempHigh: cfg.tempHigh + 100, // INCREASED by 100°C
            stateHigh: cfg.stateHigh,
            burn: 0, // DISABLED burning
            burnTime: 0,
            conduct: 0.03, // REDUCED heat transfer
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
                ethanol: { elem1: 'cannabis_oil', elem2: 'plant_matter', chance: 0.2 },
                hexane: { elem1: 'bho', elem2: 'plant_matter', chance: 0.28 }
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
            desc: 'Cannabis trichomes - kief'
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
                acetone: { elem1: 'coca_paste', elem2: null, chance: 0.15 },
                toluene: { elem1: 'coca_paste', elem2: null, chance: 0.22 }
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
            reactions: {
                sulfuric_acid: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.25, tempMin: 60 },
                potassium_permanganate: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.28, tempMin: 70 },
                sodium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.2, tempMin: 80 },
                potassium_carbonate: { elem1: 'cocaine_base', elem2: null, chance: 0.18, tempMin: 80 },
                hydrochloric_acid: { elem1: 'cocaine', elem2: null, chance: 0.22, tempMin: 70 }
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
            state: 'liquid',
            density: 1350,
            reactions: {
                acetic_anhydride: { elem1: 'heroin_base', elem2: 'steam', chance: 0.3, tempMin: 80 },
                lime: { elem1: 'morphine_base', elem2: null, chance: 0.25 },
                water: { elem1: 'opium_solution', elem2: null, chance: 0.1 },
                calcium_hydroxide: { elem1: 'morphine_base', elem2: null, chance: 0.28 },
                ammonium_hydroxide: { elem1: 'morphine_base', elem2: null, chance: 0.26 }
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
            desc: 'Butane hash oil - amber'
        },
        bubble_hash: {
            color: ['#d7ccc8', '#bcaaa4', '#efebe9'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1050,
            tempHigh: 157,
            stateHigh: 'thc_vapor',
            desc: 'Ice water hash'
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
            tempHigh: cfg.tempHigh + 80, // INCREASED by 80°C
            stateHigh: cfg.stateHigh,
            conduct: 0.03, // REDUCED heat transfer
            burn: cfg.burn ? 3 : 0, // REDUCED burn chance from 60-65 to 3
            burnTime: cfg.burnTime ? 1000 : 0, // INCREASED burn time to 1000
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
            burn: 0,
            burnTime: 0,
            reactions: {
                baking_soda: { elem1: 'crack_slurry', elem2: null, chance: 0.35 },
                sodium_hydroxide: { elem1: 'crack_slurry', elem2: null, chance: 0.3 },
                sodium_carbonate: { elem1: 'crack_slurry', elem2: null, chance: 0.32 }
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            burn: 0,
            burnTime: 0,
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
            temp: cfg.temp,
            burn: cfg.burn,
            burnTime: cfg.burnTime,
            reactions: cfg.reactions,
            desc: cfg.desc
        };
    });

    // --------------------------------------------------------------------------
    // 10. FINAL COMPOUNDS - MASSIVELY EXPANDED WITH MULTIPLE SYNTHESIS ROUTES
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
            reactions: {
                water: { elem1: 'mdma_solution', elem2: null, chance: 0.2 }
            },
            desc: 'Schedule I - MDMA'
        },
        mda: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1190,
            tempHigh: 187,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            reactions: {
                formaldehyde: { elem1: 'mdma', elem2: null, chance: 0.3, tempMin: 80 }
            },
            desc: 'Schedule I - MDA'
        },
        heroin: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1350,
            tempHigh: 173,
            stateHigh: 'heroin_smoke',
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            stateHigh: 'lsd_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - LSD'
        },
        dmt: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1200,
            tempHigh: 160,
            stateHigh: 'dmt_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - DMT'
        },
        fentanyl: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1400,
            tempHigh: 87,
            stateHigh: 'fentanyl_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Fentanyl'
        },
        carfentanil: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1420,
            tempHigh: 91,
            stateHigh: 'fentanyl_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Carfentanil'
        },
        pcp: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1240,
            tempHigh: 233,
            stateHigh: 'pcp_vapor',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - PCP'
        },
        ketamine: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1250,
            tempHigh: 262,
            stateHigh: 'ketamine_vapor',
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
            reactions: {
                sodium_hydroxide: { elem1: 'ghb', elem2: null, chance: 0.35 },
                water: { elem1: 'ghb', elem2: null, chance: 0.25, tempMin: 80 }
            },
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
            burn: 0, burnTime: 0,
            reactions: {
                morphine: { elem1: 'codeine', elem2: null, chance: 0.15, tempMin: 80 }
            },
            desc: 'Schedule II - Codeine'
        },
        oxycodone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1360,
            tempHigh: 219,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Oxycodone'
        },
        hydrocodone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1340,
            tempHigh: 198,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule II - Hydrocodone'
        },
        mephedrone: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1150,
            tempHigh: 194,
            stateHigh: 'mephedrone_smoke',
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
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
            burn: 0, burnTime: 0,
            reactions: {
                methylamine: { elem1: 'mephedrone', elem2: null, chance: 0.3, tempMin: 80 }
            },
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
            burn: 0, burnTime: 0,
            desc: 'Mitragynine - kratom alkaloid'
        },
        
        // NEW: Additional research compounds with multiple synthesis pathways
        _5_meo_dmt: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1210,
            tempHigh: 160,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - 5-MeO-DMT'
        },
        dxm: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1280,
            tempHigh: 233,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Dextromethorphan - OTC dissociative'
        },
        _3_mmc: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1160,
            tempHigh: 205,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - 3-MMC'
        },
        alpha_pvp: {
            color: ['#fff9c4', '#ffecb3'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1140,
            tempHigh: 198,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - Alpha-PVP (Flakka)'
        },
        mdpv: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1180,
            tempHigh: 210,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - MDPV'
        },
        _2c_i: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1270,
            tempHigh: 238,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - 2C-I'
        },
        _2c_e: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1265,
            tempHigh: 232,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - 2C-E'
        },
        _25i_nbome: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1290,
            tempHigh: 205,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - 25I-NBOMe'
        },
        dob: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1280,
            tempHigh: 228,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - DOB'
        },
        doc: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1275,
            tempHigh: 225,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - DOC'
        },
        dom: {
            color: ['#ffffff', '#fafafa'],
            behavior: PW,
            category: 'research_compounds',
            state: 'solid',
            density: 1270,
            tempHigh: 223,
            stateHigh: 'smoke',
            burn: 0, burnTime: 0,
            desc: 'Schedule I - DOM (STP)'
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
                tempHigh: cfg.tempHigh + 150, // INCREASED by 150°C to prevent accidental vaporization
                stateHigh: cfg.stateHigh,
                burn: 0, // DISABLED - these should NEVER burn
                burnTime: 0,
                conduct: 0.02, // VERY LOW heat transfer
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
    // 13. KNIFE/BLADE CURSOR TOOLS
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
    // 14. PLANT EXTRACTION REACTIONS
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
    // 15. ENHANCED UNIVERSAL PRECURSOR WITH MORE SYNTHESIS ROUTES
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
                        'acetic_anhydride', 'methylamine', 'potassium_permanganate',
                        'phenylacetone', 'safrole', 'mdp2p', 'ergotamine', 'lysergic_acid',
                        'tryptamine', 'indole', 'piperidine_precursor', 'cyclohexanone',
                        'thebaine', 'acrylfentanyl_precursor', 'cathinone_precursor',
                        'gamma_butyrolactone', 'synthetic_cannabinoid_base'
                    ], 
                    elem2: null, 
                    chance: 0.08 
                },
                sugar: { 
                    elem1: [
                        'methamphetamine', 'amphetamine', 'mdma', 'mda', 'heroin', 'morphine',
                        'fentanyl', 'carfentanil', 'lsd', 'psilocybin', 'psilocin',
                        'cocaine', 'crack', 'pcp', 'ketamine', 'dmt', 'ghb', 'gbl',
                        'mephedrone', 'methylone', 'jwh_018', '_2c_b', '_4_aco_dmt',
                        'tramadol', 'codeine', 'oxycodone', 'hydrocodone',
                        'ayahuasca_brew', 'kava_extract', 'salvinorin_a', 'ibogaine', 
                        'mescaline', 'cathinone', 'mitragynine',
                        '_5_meo_dmt', 'dxm', '_3_mmc', 'alpha_pvp', 'mdpv',
                        '_2c_i', '_2c_e', '_25i_nbome', 'dob', 'doc', 'dom',
                        'cocaine_solution', 'crack_slurry', 'meth_solution',
                        'mdma_solution', 'heroin_solution', 'opium_solution',
                        'psilocybin_tea', 'mescaline_tea', 'lsa_solution', 'nicotine_solution',
                        'cannabis_trichomes', 'coca_alkaloids', 'coca_paste',
                        'bho', 'bubble_hash', 'cannabis_oil'
                    ], 
                    elem2: null, 
                    chance: 0.05 
                },
                // NEW: Direct synthesis shortcuts
                water: {
                    elem1: [
                        'cocaine', 'methamphetamine', 'heroin', 'mdma', 'lsd',
                        'psilocybin', 'mescaline', 'dmt', 'ketamine', 'pcp'
                    ],
                    elem2: null,
                    chance: 0.03
                },
                fire: {
                    elem1: [
                        'crack', 'heroin_base', 'cocaine_base', 'methamphetamine',
                        'fentanyl', 'carfentanil'
                    ],
                    elem2: null,
                    chance: 0.04
                }
            },
            desc: 'Universal precursor - reacts with dirt/salt/sugar/water/fire to create any element'
        };
    }

    // --------------------------------------------------------------------------
    // 16. ADD DIRECT SYNTHESIS PATHWAYS FOR ALL RESEARCH COMPOUNDS
    // --------------------------------------------------------------------------
    
    // Add simple water reactions for easy compound creation
    const directSynthesis = {
        phenylacetone: {
            water: { elem1: 'methamphetamine', elem2: null, chance: 0.25, tempMin: 80 },
            ethanol: { elem1: 'amphetamine', elem2: null, chance: 0.22, tempMin: 85 }
        },
        safrole: {
            water: { elem1: 'mdma', elem2: null, chance: 0.25, tempMin: 90 },
            ethanol: { elem1: 'mda', elem2: null, chance: 0.22, tempMin: 85 }
        },
        ergotamine: {
            water: { elem1: 'lsd', elem2: null, chance: 0.3, tempMin: 60 },
            ethanol: { elem1: 'lsd', elem2: null, chance: 0.35, tempMin: 50 }
        },
        lysergic_acid: {
            water: { elem1: 'lsd', elem2: null, chance: 0.4, tempMin: 50 }
        },
        tryptamine: {
            water: { elem1: 'dmt', elem2: null, chance: 0.3, tempMin: 80 },
            ethanol: { elem1: '_5_meo_dmt', elem2: null, chance: 0.28, tempMin: 85 }
        },
        indole: {
            water: { elem1: 'dmt', elem2: null, chance: 0.25, tempMin: 100 },
            methylamine: { elem1: 'dmt', elem2: null, chance: 0.3, tempMin: 90 }
        },
        piperidine_precursor: {
            water: { elem1: 'pcp', elem2: null, chance: 0.3, tempMin: 80 }
        },
        cyclohexanone: {
            water: { elem1: 'ketamine', elem2: null, chance: 0.35, tempMin: 70 }
        },
        thebaine: {
            water: { elem1: 'oxycodone', elem2: null, chance: 0.3, tempMin: 100 },
            ethanol: { elem1: 'hydrocodone', elem2: null, chance: 0.28, tempMin: 90 }
        },
        acrylfentanyl_precursor: {
            water: { elem1: 'fentanyl', elem2: null, chance: 0.35, tempMin: 70 },
            ethanol: { elem1: 'carfentanil', elem2: null, chance: 0.3, tempMin: 80 }
        },
        cathinone_precursor: {
            water: { elem1: 'mephedrone', elem2: null, chance: 0.3, tempMin: 80 },
            ethanol: { elem1: 'methylone', elem2: null, chance: 0.28, tempMin: 85 },
            acetone: { elem1: '_3_mmc', elem2: null, chance: 0.26, tempMin: 90 }
        },
        gamma_butyrolactone: {
            water: { elem1: 'ghb', elem2: null, chance: 0.35 }
        },
        synthetic_cannabinoid_base: {
            water: { elem1: 'jwh_018', elem2: null, chance: 0.3, tempMin: 90 }
        }
    };

    // Apply direct synthesis reactions
    Object.entries(directSynthesis).forEach(([precursor, reactions]) => {
        if (elements[precursor]) {
            if (!elements[precursor].reactions) {
                elements[precursor].reactions = {};
            }
            Object.assign(elements[precursor].reactions, reactions);
        }
    });

    // --------------------------------------------------------------------------
    // 17. ADD ALTERNATE SYNTHESIS ROUTES FOR MAJOR COMPOUNDS
    // --------------------------------------------------------------------------
    
    // Cocaine alternate routes
    if (elements.coca_alkaloids) {
        Object.assign(elements.coca_alkaloids.reactions, {
            hydrochloric_acid: { elem1: 'cocaine', elem2: null, chance: 0.3, tempMin: 70 },
            sulfuric_acid: { elem1: 'cocaine_sulfate', elem2: null, chance: 0.28, tempMin: 60 },
            water: { elem1: 'cocaine_base', elem2: null, chance: 0.15, tempMin: 90 }
        });
    }

    // Methamphetamine alternate routes
    if (elements.ephedra_sinica) {
        Object.assign(elements.ephedra_sinica.reactions || {}, {
            water: { elem1: 'methamphetamine', elem2: null, chance: 0.08, tempMin: 100 }
        });
    }

    // Heroin alternate routes  
    if (elements.papaver_somniferum) {
        Object.assign(elements.papaver_somniferum.reactions || {}, {
            water: { elem1: 'heroin', elem2: null, chance: 0.06, tempMin: 90 },
            acetic_anhydride: { elem1: 'heroin', elem2: null, chance: 0.12, tempMin: 85 }
        });
    }

    // MDMA alternate routes
    if (elements.safrole) {
        Object.assign(elements.safrole.reactions, {
            methylamine: { elem1: 'mdma', elem2: null, chance: 0.35, tempMin: 80 }
        });
    }

    // LSD alternate routes
    if (elements.morning_glory) {
        Object.assign(elements.morning_glory.reactions || {}, {
            water: { elem1: 'lsd', elem2: null, chance: 0.05, tempMin: 80 }
        });
    }

    // Psilocybin alternate routes
    if (elements.psilocybe_cubensis) {
        Object.assign(elements.psilocybe_cubensis.reactions || {}, {
            ethanol: { elem1: 'psilocybin', elem2: null, chance: 0.12, tempMin: 70 }
        });
    }

    // --------------------------------------------------------------------------
    // 18. COMPLETION LOG
    // --------------------------------------------------------------------------
    console.log('🔥 BURN PROTECTION ENABLED:');
    console.log('  ✓ All final compounds: burn disabled, +150°C tempHigh');
    console.log('  ✓ All precursors: burn disabled, +100°C tempHigh');
    console.log('  ✓ All intermediates: burn disabled, +100°C tempHigh');
    console.log('  ✓ All reagents: burn disabled, +100°C tempHigh');
    console.log('  ✓ Botanical products: burn reduced to 3%, +80°C tempHigh');
    console.log('  ✓ Plants: burn reduced from 60-75% to 5%');
    console.log('  ✓ Seeds: burn completely disabled');
    console.log('  ✓ Heat conductivity reduced: 0.1 → 0.02-0.05');
    console.log('  → Elements are now MUCH more resistant to fire and heat!');
    console.log('');
    console.log('='.repeat(80));
    console.log('✓ ChemResearch v3.0 MASSIVELY EXPANDED - 300+ ELEMENTS');
    console.log('='.repeat(80));
    console.log('');
    console.log('📦 ELEMENT COUNTS:');
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
    console.log('');
    console.log('🎯 ALL RESEARCH COMPOUNDS NOW CRAFTABLE:');
    console.log('  ✓ Multiple synthesis pathways for every compound');
    console.log('  ✓ Universal precursor creates EVERYTHING');
    console.log('  ✓ Direct water/fire reactions for quick synthesis');
    console.log('  ✓ Traditional chemistry routes preserved');
    console.log('');
    console.log('🔬 NEW SYNTHESIS SHORTCUTS:');
    console.log('  • universal_precursor + water → major compounds');
    console.log('  • universal_precursor + fire → smokable bases');
    console.log('  • precursor + water → final compound (simplified)');
    console.log('  • plant + water → extracted compound (direct)');
    console.log('');
    console.log('⚗️ EXPANDED CHEMISTRY:');
    console.log('  • 50+ organic solvents (toluene, benzene, xylene, etc.)');
    console.log('  • 30+ acids and bases (phosphoric, nitric, citric, etc.)');
    console.log('  • 20+ salts and oxidizers');
    console.log('  • 15+ specialty reagents (LiAlH4, NaBH4, etc.)');
    console.log('  • 20+ new research compounds (2C-I, 2C-E, DOB, DOC, etc.)');
    console.log('  • 15+ new precursors (phenylacetone, safrole, ergotamine, etc.)');
    console.log('');
    console.log('🌱 COMPLETE SYNTHESIS EXAMPLES:');
    console.log('  COCAINE:');
    console.log('    • coca_leaves → coca_alkaloids → cocaine_paste → cocaine');
    console.log('    • coca_alkaloids + HCl → cocaine (direct)');
    console.log('    • universal_precursor + sugar → cocaine (instant)');
    console.log('');
    console.log('  METHAMPHETAMINE:');
    console.log('    • ephedrine + red_phosphorus → meth_intermediate → meth');
    console.log('    • phenylacetone + methylamine → meth (direct)');
    console.log('    • universal_precursor + sugar → meth (instant)');
    console.log('');
    console.log('  HEROIN:');
    console.log('    • opium_latex → morphine_base → heroin_base → heroin');
    console.log('    • morphine + acetic_anhydride → heroin (direct)');
    console.log('    • universal_precursor + sugar → heroin (instant)');
    console.log('');
    console.log('  LSD:');
    console.log('    • ergotamine → lysergic_acid → lsd');
    console.log('    • lysergic_acid + water → lsd (direct)');
    console.log('    • lsa + LiAlH4 → lsd');
    console.log('    • universal_precursor + sugar → lsd (instant)');
    console.log('');
    console.log('  MDMA:');
    console.log('    • safrole → mdp2p → mdma');
    console.log('    • safrole + methylamine → mdma (direct)');
    console.log('    • universal_precursor + sugar → mdma (instant)');
    console.log('');
    console.log('='.repeat(80));
    console.log('EDUCATIONAL USE ONLY - 300+ elements, everything craftable!');
    console.log('='.repeat(80));

})();
