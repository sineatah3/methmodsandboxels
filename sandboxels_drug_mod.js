import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Leaf, Beaker, Pill, Flame, Droplet, Scissors, RotateCcw, Trash2 } from 'lucide-react';

const SynthesisChart = () => {
  const [expandedSections, setExpandedSections] = useState({
    cannabis: true,
    opioids: true,
    cocaine: true,
    meth: true,
    mdma: true,
    psychedelics: true
  });

  // Interactive lab state
  const [inventory, setInventory] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [labLog, setLabLog] = useState([]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addLog = (message) => {
    setLabLog(prev => [...prev, { id: Date.now(), message, time: new Date().toLocaleTimeString() }].slice(-5));
  };

  // Material database
  const materials = {
    // Plants
    'cannabis_flower': { name: 'Cannabis Flower', type: 'plant', color: 'bg-green-200' },
    'papaver_somniferum': { name: 'Opium Poppy', type: 'plant', color: 'bg-purple-200' },
    'coca_plant': { name: 'Coca Plant', type: 'plant', color: 'bg-green-300' },
    'psilocybe_cubensis': { name: 'Psilocybe Mushroom', type: 'plant', color: 'bg-amber-200' },
    
    // Raw extracts
    'opium_latex': { name: 'Opium Latex', type: 'raw', color: 'bg-purple-300' },
    'coca_leaves': { name: 'Coca Leaves', type: 'raw', color: 'bg-green-300' },
    'coca_alkaloids': { name: 'Coca Alkaloids', type: 'raw', color: 'bg-yellow-100' },
    'cannabis_trichomes': { name: 'Cannabis Trichomes', type: 'raw', color: 'bg-lime-100' },
    
    // Intermediates
    'morphine_base': { name: 'Morphine Base', type: 'intermediate', color: 'bg-orange-200' },
    'heroin_base': { name: 'Heroin Base', type: 'intermediate', color: 'bg-orange-300' },
    'coca_paste': { name: 'Coca Paste', type: 'intermediate', color: 'bg-yellow-300' },
    'cocaine_sulfate': { name: 'Cocaine Sulfate', type: 'intermediate', color: 'bg-blue-100' },
    'cocaine_base': { name: 'Cocaine Base', type: 'intermediate', color: 'bg-blue-200' },
    'cocaine_solution': { name: 'Cocaine Solution', type: 'intermediate', color: 'bg-blue-50' },
    'crack_slurry': { name: 'Crack Slurry', type: 'intermediate', color: 'bg-yellow-100' },
    
    // Finals
    'bho': { name: 'BHO', type: 'final', color: 'bg-amber-300' },
    'bubble_hash': { name: 'Bubble Hash', type: 'final', color: 'bg-amber-200' },
    'heroin': { name: 'Heroin HCl', type: 'final', color: 'bg-red-200' },
    'cocaine': { name: 'Cocaine HCl', type: 'final', color: 'bg-red-200' },
    'crack': { name: 'Crack Cocaine', type: 'final', color: 'bg-red-300' },
    'methamphetamine': { name: 'Methamphetamine', type: 'final', color: 'bg-red-200' },
    'mdma': { name: 'MDMA', type: 'final', color: 'bg-red-200' },
    
    // Reagents
    'water': { name: 'Water', type: 'reagent', color: 'bg-blue-50' },
    'butane': { name: 'Butane', type: 'reagent', color: 'bg-cyan-100' },
    'ice_water': { name: 'Ice Water', type: 'reagent', color: 'bg-cyan-200' },
    'ethanol': { name: 'Ethanol', type: 'reagent', color: 'bg-blue-100' },
    'gasoline': { name: 'Gasoline', type: 'reagent', color: 'bg-yellow-200' },
    'sulfuric_acid': { name: 'Sulfuric Acid', type: 'reagent', color: 'bg-orange-300' },
    'sodium_hydroxide': { name: 'Sodium Hydroxide', type: 'reagent', color: 'bg-gray-100' },
    'hydrochloric_acid': { name: 'Hydrochloric Acid', type: 'reagent', color: 'bg-yellow-200' },
    'baking_soda': { name: 'Baking Soda', type: 'reagent', color: 'bg-white' },
    'acetic_anhydride': { name: 'Acetic Anhydride', type: 'reagent', color: 'bg-yellow-100' },
    'lime': { name: 'Lime', type: 'reagent', color: 'bg-gray-200' }
  };

  // Knife reactions
  const knifeReactions = {
    'papaver_somniferum': { produces: 'opium_latex', message: 'Scored poppy pod, collected latex sap' },
    'coca_plant': { produces: 'coca_leaves', message: 'Harvested coca leaves from plant' },
    'cannabis_flower': { produces: 'cannabis_trichomes', message: 'Separated trichomes from flower material' },
    'coca_leaves': { produces: 'coca_alkaloids', message: 'Ground leaves into alkaloid powder' }
  };

  // Chemical reactions
  const reactions = {
    'opium_latex+water': { produces: 'morphine_base', requires: 'heat', message: 'Extracted morphine base with lime' },
    'morphine_base+acetic_anhydride': { produces: 'heroin_base', requires: 'heat', message: 'Acetylated morphine into heroin base' },
    'heroin_base+hydrochloric_acid': { produces: 'heroin', message: 'Converted to heroin HCl salt' },
    'coca_alkaloids+gasoline': { produces: 'coca_paste', message: 'Made coca paste with solvent extraction' },
    'coca_paste+sulfuric_acid': { produces: 'cocaine_sulfate', requires: 'heat', message: 'Refined to cocaine sulfate' },
    'cocaine_sulfate+sodium_hydroxide': { produces: 'cocaine_base', message: 'Basified to cocaine freebase' },
    'cocaine_base+hydrochloric_acid': { produces: 'cocaine', message: 'Converted to cocaine HCl salt' },
    'cocaine+water': { produces: 'cocaine_solution', message: 'Dissolved cocaine in water' },
    'cocaine_solution+baking_soda': { produces: 'crack_slurry', message: 'Added baking soda to solution' },
    'crack_slurry+heat': { produces: 'crack', message: 'Heated slurry to produce crack rocks' },
    'cannabis_flower+butane': { produces: 'bho', message: 'Extracted BHO with butane' },
    'cannabis_flower+ice_water': { produces: 'bubble_hash', message: 'Made bubble hash with ice water' }
  };

  const addToInventory = (materialId) => {
    const material = materials[materialId];
    if (material) {
      setInventory(prev => [...prev, { id: Date.now(), materialId, ...material }]);
      addLog(`Added ${material.name} to inventory`);
    }
  };

  const removeFromInventory = (itemId) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
  };

  const useKnife = (item) => {
    const reaction = knifeReactions[item.materialId];
    if (reaction) {
      removeFromInventory(item.id);
      addToInventory(reaction.produces);
      addLog(`🔪 ${reaction.message}`);
    } else {
      addLog(`⚠️ Knife has no effect on ${item.name}`);
    }
  };

  const combineItems = (item1, item2) => {
    const key1 = `${item1.materialId}+${item2.materialId}`;
    const key2 = `${item2.materialId}+${item1.materialId}`;
    const reaction = reactions[key1] || reactions[key2];
    
    if (reaction) {
      removeFromInventory(item1.id);
      removeFromInventory(item2.id);
      addToInventory(reaction.produces);
      addLog(`⚗️ ${reaction.message}`);
      if (reaction.requires === 'heat') {
        addLog(`🔥 Reaction required heating`);
      }
    } else {
      addLog(`⚠️ No reaction between ${item1.name} and ${item2.name}`);
    }
  };

  const handleItemClick = (item) => {
    if (selectedTool === 'knife') {
      useKnife(item);
      setSelectedTool(null);
    } else if (selectedTool && selectedTool.type === 'item') {
      combineItems(selectedTool.item, item);
      setSelectedTool(null);
    } else {
      setSelectedTool({ type: 'item', item });
    }
  };

  const synthesisPaths = {
    cannabis: {
      title: "Cannabis Extractions",
      icon: <Leaf className="w-5 h-5" />,
      color: "bg-green-100 border-green-500",
      paths: [
        {
          name: "BHO (Butane Hash Oil)",
          steps: [
            { item: "Cannabis Flower", type: "plant" },
            { arrow: "+ Butane (20°C) →", temp: true },
            { item: "BHO + Plant Matter", type: "final", color: "amber honey" }
          ]
        },
        {
          name: "Bubble Hash (Ice Water Hash)",
          steps: [
            { item: "Cannabis Flower", type: "plant" },
            { arrow: "+ Ice Water (2°C) →", temp: true },
            { item: "Bubble Hash + Plant Matter", type: "final", color: "blonde/tan" }
          ]
        },
        {
          name: "Cannabis Oil (RSO)",
          steps: [
            { item: "Cannabis Flower", type: "plant" },
            { arrow: "+ Ethanol (20°C) →", temp: true },
            { item: "Cannabis Oil + Plant Matter", type: "final", color: "dark amber" }
          ]
        },
        {
          name: "THC Vapor (Smoking/Vaping)",
          steps: [
            { item: "Cannabis Flower", type: "plant" },
            { arrow: "Heat to 175°C →", temp: true },
            { item: "THC Vapor + Smoke", type: "vapor" }
          ]
        },
        {
          name: "Cannabis Trichomes (Breaking)",
          steps: [
            { item: "Cannabis Flower", type: "plant" },
            { arrow: "→ Break Into →" },
            { item: "Cannabis Trichomes + Plant Matter", type: "raw", color: "crystalline kief" }
          ]
        }
      ]
    },
    opioids: {
      title: "Opioid Synthesis",
      icon: <Droplet className="w-5 h-5" />,
      color: "bg-purple-100 border-purple-500",
      paths: [
        {
          name: "Opium Latex Extraction",
          steps: [
            { item: "Papaver Somniferum (Opium Poppy)", type: "plant" },
            { arrow: "+ Knife →" },
            { item: "Opium Latex", type: "raw", color: "purple-brown sap" }
          ]
        },
        {
          name: "Morphine Base (from Opium)",
          steps: [
            { item: "Opium Latex", type: "raw" },
            { arrow: "+ Water →" },
            { item: "Opium Solution", type: "intermediate" },
            { arrow: "+ Lime (80°C) →", temp: true },
            { item: "Morphine Base", type: "final", color: "tan powder" }
          ]
        },
        {
          name: "Heroin Base (Black Tar #3)",
          steps: [
            { item: "Morphine Base", type: "intermediate" },
            { arrow: "+ Acetic Anhydride (85°C) →", temp: true },
            { item: "Heroin Base", type: "final", color: "tan/brown" }
          ]
        },
        {
          name: "Heroin HCl (Pure #4)",
          steps: [
            { item: "Heroin Base", type: "intermediate" },
            { arrow: "+ Hydrochloric Acid →" },
            { item: "Heroin HCl", type: "final", color: "white powder" }
          ]
        },
        {
          name: "Direct Heroin from Opium",
          steps: [
            { item: "Opium Latex", type: "raw" },
            { arrow: "+ Acetic Anhydride (80°C) →", temp: true },
            { item: "Heroin Base", type: "final", color: "tan" }
          ]
        },
        {
          name: "Injectable Heroin Solution",
          steps: [
            { item: "Heroin Base", type: "intermediate" },
            { arrow: "+ Water →" },
            { item: "Heroin Solution", type: "final", color: "brown liquid" }
          ]
        }
      ]
    },
    cocaine: {
      title: "Cocaine Synthesis",
      icon: <Beaker className="w-5 h-5" />,
      color: "bg-blue-100 border-blue-500",
      paths: [
        {
          name: "Coca Leaves Extraction",
          steps: [
            { item: "Coca Plant (Boliviana/Colombiana)", type: "plant" },
            { arrow: "+ Knife →" },
            { item: "Coca Leaves", type: "raw", color: "dark green" },
            { arrow: "→ Break Into →" },
            { item: "Coca Alkaloids", type: "raw", color: "off-white powder" }
          ]
        },
        {
          name: "Coca Paste (Smokable Base)",
          steps: [
            { item: "Coca Alkaloids", type: "raw" },
            { arrow: "+ Gasoline/Kerosene →" },
            { item: "Coca Paste", type: "final", color: "brown putty" }
          ]
        },
        {
          name: "Cocaine HCl (Pure Powder)",
          steps: [
            { item: "Coca Paste", type: "intermediate" },
            { arrow: "+ Sulfuric Acid (60°C) →", temp: true },
            { item: "Cocaine Sulfate", type: "intermediate", color: "white" },
            { arrow: "+ Sodium Hydroxide →" },
            { item: "Cocaine Base", type: "intermediate" },
            { arrow: "+ Hydrochloric Acid →" },
            { item: "Cocaine HCl", type: "final", color: "shiny white flakes" }
          ]
        },
        {
          name: "Crack Cocaine (Freebase Rocks)",
          steps: [
            { item: "Cocaine HCl", type: "intermediate" },
            { arrow: "+ Water →" },
            { item: "Cocaine Solution", type: "intermediate" },
            { arrow: "+ Baking Soda →" },
            { item: "Crack Slurry", type: "intermediate", color: "milky" },
            { arrow: "Heat to 85°C →", temp: true },
            { item: "Crack Cocaine", type: "final", color: "off-white rocks" }
          ]
        }
      ]
    },
    meth: {
      title: "Methamphetamine Synthesis",
      icon: <Beaker className="w-5 h-5" />,
      color: "bg-red-100 border-red-500",
      paths: [
        {
          name: "Red Phosphorus Method",
          steps: [
            { item: "Pseudoephedrine", type: "precursor" },
            { arrow: "+ Red Phosphorus (120°C) →", temp: true },
            { item: "Meth Intermediate", type: "intermediate", color: "oily" },
            { arrow: "+ Hydrochloric Acid →" },
            { item: "Methamphetamine HCl", type: "final", color: "clear crystals" }
          ]
        },
        {
          name: "Iodine Method",
          steps: [
            { item: "Pseudoephedrine", type: "precursor" },
            { arrow: "+ Iodine (110°C) →", temp: true },
            { item: "Meth Intermediate", type: "intermediate" },
            { arrow: "+ Hydrochloric Acid →" },
            { item: "Methamphetamine HCl", type: "final", color: "white crystals" }
          ]
        },
        {
          name: "Meth Solution (Injectable)",
          steps: [
            { item: "Methamphetamine", type: "intermediate" },
            { arrow: "+ Water →" },
            { item: "Meth Solution", type: "final" }
          ]
        }
      ]
    },
    mdma: {
      title: "MDMA Synthesis",
      icon: <Pill className="w-5 h-5" />,
      color: "bg-yellow-100 border-yellow-500",
      paths: [
        {
          name: "Safrole Route",
          steps: [
            { item: "Safrole", type: "precursor", color: "amber oil" },
            { arrow: "+ Isosafrole (80°C) →", temp: true },
            { item: "MDMA Intermediate (MDP2P)", type: "intermediate", color: "pale oil" },
            { arrow: "+ Methylamine (100°C) →", temp: true },
            { item: "MDMA (Ecstasy)", type: "final", color: "champagne crystals" }
          ]
        },
        {
          name: "Alternative Safrole Route",
          steps: [
            { item: "Safrole", type: "precursor" },
            { arrow: "+ Hydrogen Peroxide (60°C) →", temp: true },
            { item: "MDMA Intermediate", type: "intermediate" },
            { arrow: "+ Methylamine (100°C) →", temp: true },
            { item: "MDMA", type: "final", color: "tan crystals" }
          ]
        },
        {
          name: "MDMA Solution (Molly Water)",
          steps: [
            { item: "MDMA", type: "intermediate" },
            { arrow: "+ Water →" },
            { item: "MDMA Solution", type: "final", color: "clear liquid" }
          ]
        }
      ]
    },
    psychedelics: {
      title: "Psychedelic Synthesis",
      icon: <Flame className="w-5 h-5" />,
      color: "bg-pink-100 border-pink-500",
      paths: [
        {
          name: "LSD (Lysergic Acid Diethylamide)",
          steps: [
            { item: "Lysergic Acid", type: "precursor", color: "pale pink" },
            { arrow: "+ Diethylamine (25°C) →", temp: true },
            { item: "LSD", type: "final", color: "pale yellow crystals" }
          ]
        },
        {
          name: "Psilocybin Tea",
          steps: [
            { item: "Psilocybe Cubensis", type: "plant", color: "brown mushrooms" },
            { arrow: "+ Water (70°C) →", temp: true },
            { item: "Psilocybin Tea", type: "final", color: "brown liquid" }
          ]
        },
        {
          name: "Psilocybin Extract",
          steps: [
            { item: "Psilocybe Cubensis", type: "plant" },
            { arrow: "+ Ethanol (25°C) →", temp: true },
            { item: "Psilocybin", type: "final", color: "light brown crystals" }
          ]
        },
        {
          name: "Psilocin (Lemon Tek)",
          steps: [
            { item: "Psilocybin", type: "intermediate", color: "light brown" },
            { arrow: "+ Lemon Juice →" },
            { item: "Psilocin", type: "final", color: "orange-brown" }
          ]
        },
        {
          name: "Psilocin (Metabolic Conversion)",
          steps: [
            { item: "Psilocybin", type: "intermediate" },
            { arrow: "+ Stomach Acid →" },
            { item: "Psilocin", type: "final", color: "active form" }
          ]
        },
        {
          name: "DMT Vaporization",
          steps: [
            { item: "DMT Freebase", type: "intermediate", color: "yellow waxy crystals" },
            { arrow: "Heat to 60°C →", temp: true },
            { item: "DMT Smoke", type: "vapor", color: "breakthrough vapor" }
          ]
        }
      ]
    }
  };

  const renderStep = (step) => {
    if (step.arrow) {
      return (
        <div key={Math.random()} className="flex items-center justify-center px-2">
          <span className={`text-sm font-mono ${step.temp ? 'text-red-600 font-semibold' : 'text-gray-600'}`}>
            {step.arrow}
          </span>
        </div>
      );
    }

    const colors = {
      plant: 'bg-green-200 border-green-600',
      raw: 'bg-yellow-200 border-yellow-600',
      precursor: 'bg-blue-200 border-blue-600',
      intermediate: 'bg-orange-200 border-orange-600',
      final: 'bg-red-200 border-red-600',
      vapor: 'bg-purple-200 border-purple-600'
    };

    return (
      <div key={Math.random()} className={`px-3 py-2 rounded-lg border-2 ${colors[step.type]} min-w-fit`}>
        <div className="text-sm font-semibold text-gray-800">{step.item}</div>
        {step.color && <div className="text-xs text-gray-600 italic">({step.color})</div>}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ChemResearch Interactive Synthesis Lab
          </h1>
          <p className="text-gray-600 mb-4">
            Complete synthesis pathways with interactive lab simulator
          </p>
          
          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-200 border-2 border-green-600 rounded"></div>
              <span>Plant Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-200 border-2 border-yellow-600 rounded"></div>
              <span>Raw Extract</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-200 border-2 border-blue-600 rounded"></div>
              <span>Precursor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-orange-200 border-2 border-orange-600 rounded"></div>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-200 border-2 border-red-600 rounded"></div>
              <span>Final Product</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-200 border-2 border-purple-600 rounded"></div>
              <span>Vapor/Gas</span>
            </div>
          </div>
        </div>

        {/* Interactive Lab Simulator */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Beaker className="w-6 h-6" />
            Interactive Lab Simulator
          </h2>
          
          {/* Tool Selection */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Tools:</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTool(selectedTool === 'knife' ? null : 'knife')}
                className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
                  selectedTool === 'knife' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Scissors className="w-4 h-4" />
                Knife
              </button>
              <button
                onClick={() => {
                  setInventory([]);
                  setLabLog([]);
                  setSelectedTool(null);
                  addLog('Lab cleared');
                }}
                className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
              >
                <RotateCcw className="w-4 h-4" />
                Clear Lab
              </button>
            </div>
          </div>

          {/* Material Spawner */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Add Materials:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <button onClick={() => addToInventory('cannabis_flower')} className="px-3 py-2 bg-green-200 rounded-lg text-xs font-semibold hover:bg-green-300">
                Cannabis Flower
              </button>
              <button onClick={() => addToInventory('papaver_somniferum')} className="px-3 py-2 bg-purple-200 rounded-lg text-xs font-semibold hover:bg-purple-300">
                Opium Poppy
              </button>
              <button onClick={() => addToInventory('coca_plant')} className="px-3 py-2 bg-green-300 rounded-lg text-xs font-semibold hover:bg-green-400">
                Coca Plant
              </button>
              <button onClick={() => addToInventory('water')} className="px-3 py-2 bg-blue-100 rounded-lg text-xs font-semibold hover:bg-blue-200">
                Water
              </button>
              <button onClick={() => addToInventory('butane')} className="px-3 py-2 bg-cyan-100 rounded-lg text-xs font-semibold hover:bg-cyan-200">
                Butane
              </button>
              <button onClick={() => addToInventory('gasoline')} className="px-3 py-2 bg-yellow-200 rounded-lg text-xs font-semibold hover:bg-yellow-300">
                Gasoline
              </button>
              <button onClick={() => addToInventory('sulfuric_acid')} className="px-3 py-2 bg-orange-300 rounded-lg text-xs font-semibold hover:bg-orange-400">
                Sulfuric Acid
              </button>
              <button onClick={() => addToInventory('sodium_hydroxide')} className="px-3 py-2 bg-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-300">
                NaOH (Lye)
              </button>
              <button onClick={() => addToInventory('hydrochloric_acid')} className="px-3 py-2 bg-yellow-200 rounded-lg text-xs font-semibold hover:bg-yellow-300">
                HCl Acid
              </button>
              <button onClick={() => addToInventory('baking_soda')} className="px-3 py-2 bg-white border-2 rounded-lg text-xs font-semibold hover:bg-gray-50">
                Baking Soda
              </button>
              <button onClick={() => addToInventory('acetic_anhydride')} className="px-3 py-2 bg-yellow-100 rounded-lg text-xs font-semibold hover:bg-yellow-200">
                Acetic Anhydride
              </button>
              <button onClick={() => addToInventory('lime')} className="px-3 py-2 bg-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-400">
                Lime
              </button>
            </div>
          </div>

          {/* Inventory */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Lab Bench ({inventory.length} items):
            </h3>
            <div className="min-h-24 border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-50">
              {inventory.length === 0 ? (
                <p className="text-gray-400 text-center py-4">Empty - Add materials to begin</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {inventory.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer border-2 ${item.color} ${
                        selectedTool?.type === 'item' && selectedTool.item.id === item.id
                          ? 'border-blue-500 ring-2 ring-blue-300'
                          : 'border-gray-400 hover:border-gray-600'
                      }`}
                    >
                      {item.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromInventory(item.id);
                        }}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-3 h-3 inline" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {selectedTool === 'knife' 
                ? '🔪 Click any item to use knife' 
                : selectedTool?.type === 'item'
                ? `Selected: ${selectedTool.item.name} - Click another item to combine`
                : 'Click items to select, or use knife tool'}
            </p>
          </div>

          {/* Lab Log */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Lab Log:</h3>
            <div className="bg-black text-green-400 rounded-lg p-3 font-mono text-xs h-32 overflow-y-auto">
              {labLog.length === 0 ? (
                <p className="text-gray-500">Awaiting experiments...</p>
              ) : (
                labLog.map(log => (
                  <div key={log.id} className="mb-1">
                    <span className="text-gray-500">[{log.time}]</span> {log.message}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Synthesis Pathways */}
        {Object.entries(synthesisPaths).map(([key, section]) => (
          <div key={key} className="bg-white rounded-xl shadow-lg mb-4 overflow-hidden">
            <button
              onClick={() => toggleSection(key)}
              className={`w-full p-4 ${section.color} border-l-4 flex items-center justify-between hover:opacity-80 transition-opacity`}
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                <span className="text-sm text-gray-600">({section.paths.length} pathways)</span>
              </div>
              {expandedSections[key] ? <ChevronDown /> : <ChevronRight />}
            </button>

            {expandedSections[key] && (
              <div className="p-6 space-y-6">
                {section.paths.map((path, idx) => (
                  <div key={idx} className="border-l-4 border-gray-300 pl-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">{path.name}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      {path.steps.map((step, stepIdx) => renderStep(step, stepIdx))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Footer Warnings */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mt-6">
          <div className="flex items-start gap-3">
            <Flame className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Important Notes:</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <span className="text-red-600 font-semibold">Temperature requirements</span> shown in red are critical for reactions</li>
                <li>• All synthesis routes are <span className="font-semibold">educational simulations only</span></li>
                <li>• Actual real-world chemistry is far more complex and dangerous</li>
                <li>• Many steps require additional reagents, purification, and safety equipment</li>
                <li>• This chart shows simplified game mechanics, not real laboratory procedures</li>
                <li>• <span className="font-semibold">Interactive lab is for educational demonstration only</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg mt-4 text-center text-sm">
          Educational Research Mod • NOT for real-world use • MIT License
        </div>
      </div>
    </div>
  );
};

export default SynthesisChart;
