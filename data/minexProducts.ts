// MineX Series Product Data
// Source: Official BlueFlare MineX Spec Sheets - 2025 Edition

export interface MineXSpec {
  label: string;
  value: string;
}

export interface MineXSpecSection {
  title: string;
  specs: MineXSpec[];
}

export interface MineXQuickStat {
  label: string;
  value: string;
  suffix?: string;
}

export interface MineXProduct {
  model: string;
  modelNumber: string;
  subtitle: string;
  tagline: string;
  overview: string[];
  idealFor: string[];
  quickStats: MineXQuickStat[];
  specSections: MineXSpecSection[];
  siteRequirements: string[];
  gasRequirements: string[];
  maintenanceRequirements: string[];
  edgeBoxCapabilities: string[];
  edgeBoxFee: string;
  deploymentSteps: string[];
  deploymentTimeline: string;
  financialOverview: {
    installedPrice: string;
    operatingCost: string;
    netMonthlyRevenue: string;
    expectedPayback: string;
  };
  useCases: string[];
}

export const MINEX_PRODUCTS: Record<string, MineXProduct> = {
  '50': {
    model: 'MineX™ 50',
    modelNumber: '50',
    subtitle: '50–75 kW Class',
    tagline: 'BlueFlare\'s smallest turnkey modular Bitcoin mining system',
    overview: [
      'The MineX™-50 is BlueFlare\'s smallest turnkey modular Bitcoin mining system, engineered specifically for low-volume natural gas wells producing 25–40 mcf/d.',
      'This unit enables producers to monetize even the smallest stranded or marginal gas assets by converting field gas into high-efficiency computational power.',
      'As a fully packaged system, the MineX-50 includes a winterized enclosure, generator, power distribution, cooling, and optional ASIC hardware — all remotely monitored and optimized through the BlueFlare Edge Box.'
    ],
    idealFor: [
      'Low-flow active wells',
      'Shut-in wells requiring economic activation',
      'Environmental compliance projects',
      'Proof-of-concept deployments for producers new to mining'
    ],
    quickStats: [
      { label: 'Power Output', value: '50–75', suffix: 'kW' },
      { label: 'Gas Required', value: '25–40', suffix: 'mcf/d' },
      { label: 'ASIC Capacity', value: '12–18', suffix: 'miners' },
      { label: 'Hashrate Range', value: '1.4–2.2', suffix: 'PH/s' },
      { label: 'Enclosure', value: '10', suffix: 'ft' },
      { label: 'Climate Rating', value: '-40 to +40', suffix: '°C' }
    ],
    specSections: [
      {
        title: 'Power & Performance',
        specs: [
          { label: 'Electrical Output', value: '50–75 kW continuous duty' },
          { label: 'Voltage', value: '400–480V, 3-phase' },
          { label: 'Frequency', value: '50/60 Hz compatible' },
          { label: 'Power Factor', value: '0.8–1.0' },
          { label: 'Efficiency Mode', value: 'Adjustable via Edge Box' }
        ]
      },
      {
        title: 'Generator Specifications',
        specs: [
          { label: 'Engine Type', value: 'Weifang/Yuchai Natural Gas Genset' },
          { label: 'Rated Power', value: '60–80 kW' },
          { label: 'Fuel Source', value: 'Raw field gas (varied BTU)' },
          { label: 'Fuel Requirement', value: '25–40 mcf/d' },
          { label: 'RPM', value: '1,800 rpm' },
          { label: 'Alternator', value: 'Brushless, AVR-controlled' },
          { label: 'Emissions', value: 'Low-CH4 slip configuration' },
          { label: 'Starting', value: 'Electric start with auto-restart' }
        ]
      },
      {
        title: 'Enclosure & Cooling',
        specs: [
          { label: 'Enclosure Type', value: '10-foot insulated steel module' },
          { label: 'Climate Rating', value: '-40°C to +40°C' },
          { label: 'Cooling System', value: 'High-static air-cooled exhaust fan system' },
          { label: 'Sound Attenuation', value: '70–75 dB at 7 meters' },
          { label: 'Insulation', value: 'Mineral wool + thermal barrier' },
          { label: 'Winterization', value: 'Heated intake plenums & cable routing' }
        ]
      },
      {
        title: 'ASIC Capacity',
        specs: [
          { label: 'Rack Capacity', value: '12–18 ASIC miners' },
          { label: 'Compatible Models', value: 'S19, S19j Pro, M30S, M30S++, XP, S21 (low count)' },
          { label: 'Network', value: 'Managed via BlueFlare Edge Box' },
          { label: 'Average Hashrate Range', value: '1.4–2.2 PH/s (depending on miner selection)' }
        ]
      },
      {
        title: 'Electrical & Distribution',
        specs: [
          { label: 'PDU', value: 'Integrated 3-phase industrial PDU' },
          { label: 'Protection', value: 'Surge suppression + grounding grid' },
          { label: 'Breakers', value: 'Field-serviceable breaker panel' },
          { label: 'Wiring', value: 'CSA-compliant outdoor-rated cable assemblies' }
        ]
      }
    ],
    siteRequirements: [
      '10\' × 10\' gravel pad',
      'Vehicle access for delivery & crane placement',
      'Nearby natural gas tie-in point',
      'Minimal civil work required'
    ],
    gasRequirements: [
      '25–40 mcf/d',
      'BTU range: 900–1,400+ acceptable',
      'Pressure: 5–60 psi (regulator included)'
    ],
    maintenanceRequirements: [
      'Oil/filter changes every 600–800 hours',
      'Spark plug replacements as per engine spec',
      'ASIC cleaning (every 3–4 months)',
      'Remote monitoring handles most diagnostics'
    ],
    edgeBoxCapabilities: [
      'Generator performance analytics',
      'ASIC fleet monitoring',
      'Predictive maintenance alerts',
      'Auto-restart & exception-based controls',
      'Cellular + Starlink network failover'
    ],
    edgeBoxFee: '$350–$500 USD per month',
    deploymentSteps: [
      'Site assessment & producer gas analysis',
      'Gravel pad and site prep',
      'Delivery & picker truck placement',
      'Gas tie-in and regulation',
      'Electrical tie-in',
      'ASIC racking & firmware configuration',
      'Full commissioning & Edge Box activation'
    ],
    deploymentTimeline: '1–2 days on site',
    financialOverview: {
      installedPrice: '$48,100 – $76,350 USD',
      operatingCost: '<$0.02/kWh equivalent',
      netMonthlyRevenue: '~$800–$1,600',
      expectedPayback: '36–48 months'
    },
    useCases: [
      'Small-volume gas wells',
      'Sites with no pipeline connection',
      'Re-activated shut-in wells',
      'Regulatory compliance for methane mitigation',
      'Entry-level mining deployments'
    ]
  },
  '125': {
    model: 'MineX™ 125',
    modelNumber: '125',
    subtitle: '100–150 kW Class',
    tagline: 'Balanced footprint with strong economic output',
    overview: [
      'The MineX™-125 is engineered for Alberta producers operating 50–80 mcf/d gas wells, where traditional power generation or pipeline tie-ins are uneconomic.',
      'This modular, winterized, and fully autonomous system converts low-value natural gas into high-revenue digital power with minimal operational burden.',
      'With support for 24–36 ASIC miners, an insulated enclosure, and the BlueFlare Edge Box for automated management, the MineX-125 strikes a balance between compact footprint and strong economic output.'
    ],
    idealFor: [
      'Medium-sized marginal wells',
      'Shut-in wells requiring economic reactivation',
      'Operators seeking strong ROI with limited capex',
      'Producers wanting to scale into larger MineX units over time'
    ],
    quickStats: [
      { label: 'Power Output', value: '100–150', suffix: 'kW' },
      { label: 'Gas Required', value: '50–80', suffix: 'mcf/d' },
      { label: 'ASIC Capacity', value: '24–36', suffix: 'miners' },
      { label: 'Hashrate Range', value: '2.0–4.0', suffix: 'PH/s' },
      { label: 'Enclosure', value: '10–20', suffix: 'ft' },
      { label: 'Climate Rating', value: '-40 to +40', suffix: '°C' }
    ],
    specSections: [
      {
        title: 'Power & Performance',
        specs: [
          { label: 'Electrical Output', value: '100–150 kW continuous duty' },
          { label: 'Voltage', value: '400–480V, 3-phase' },
          { label: 'Frequency', value: '50/60 Hz compatible' },
          { label: 'Power Factor', value: '0.8–1.0' },
          { label: 'Efficiency Mode', value: 'Adjustable via Edge Box' }
        ]
      },
      {
        title: 'Generator Specifications',
        specs: [
          { label: 'Engine Type', value: 'Weifang/Yuchai Natural Gas Genset' },
          { label: 'Rated Power', value: '120–160 kW' },
          { label: 'Fuel Source', value: 'Raw field gas (varied BTU)' },
          { label: 'Fuel Requirement', value: '50–80 mcf/d' },
          { label: 'RPM', value: '1,800 rpm' },
          { label: 'Alternator', value: 'Brushless, AVR-controlled' },
          { label: 'Emissions', value: 'Low methane slip configuration' },
          { label: 'Starting', value: 'Electric start with auto-restart' }
        ]
      },
      {
        title: 'Enclosure & Cooling',
        specs: [
          { label: 'Enclosure Type', value: '10 or 20-foot insulated steel module' },
          { label: 'Climate Rating', value: '-40°C to +40°C' },
          { label: 'Cooling System', value: 'High-static air-cooled exhaust or optional hydro system' },
          { label: 'Sound Attenuation', value: '70–75 dB at 7 meters' },
          { label: 'Insulation', value: 'Mineral wool thermal envelope' },
          { label: 'Winterization', value: 'Heated intake, cable trays, generator compartment' }
        ]
      },
      {
        title: 'ASIC Capacity',
        specs: [
          { label: 'Rack Capacity', value: '24–36 ASIC miners' },
          { label: 'Compatible Models', value: 'S19, S19j Pro, S19 XP, M30S, M30S++' },
          { label: 'Network Control', value: 'BlueFlare Edge Box centralized management' },
          { label: 'Average Hashrate Range', value: '2.0–4.0 PH/s (model dependent)' }
        ]
      },
      {
        title: 'Electrical & Distribution',
        specs: [
          { label: 'PDU', value: '3-phase industrial-grade PDU' },
          { label: 'Protection', value: 'Surge protection, grounding bus, field bonding' },
          { label: 'Breakers', value: 'Individual ASIC breakers + main disconnect' },
          { label: 'Wiring', value: 'CSA-compliant exterior-rated harness' }
        ]
      }
    ],
    siteRequirements: [
      '10\'–20\' gravel pad (size depends on enclosure option)',
      'Road access for transport and picker truck',
      'Nearby gas line access point'
    ],
    gasRequirements: [
      '50–80 mcf/d',
      'BTU: 900–1,400+ acceptable',
      'Pressure: 5–60 psi (regulator included)'
    ],
    maintenanceRequirements: [
      'Generator oil/filter service every 600–800 hours',
      'Spark plug replacement per OEM schedule',
      'ASIC dust cleaning every 3–4 months',
      'Remote monitoring reduces on-site visits'
    ],
    edgeBoxCapabilities: [
      'Generator health analytics',
      'ASIC fleet monitoring (uptime, hashrate, power draw)',
      'Predictive maintenance alerts',
      'Network failover (cellular + Starlink)',
      'Auto-restart and exception-based control logic'
    ],
    edgeBoxFee: '$350–$500 USD per month',
    deploymentSteps: [
      'Engineering review and site validation',
      'Gravel pad preparation and access setup',
      'Delivery & placement via picker truck',
      'Gas tie-in and conditioning (if required)',
      'Electrical tie-in and grounding',
      'ASIC racking + firmware optimization',
      'Commissioning + Edge Box activation'
    ],
    deploymentTimeline: '2–3 days',
    financialOverview: {
      installedPrice: '$76,600 – $119,100 USD',
      operatingCost: '<$0.02/kWh equivalent',
      netMonthlyRevenue: '~$2,000–$3,000',
      expectedPayback: '30–42 months'
    },
    useCases: [
      'Medium-flow wells (50–80 mcf/d)',
      'Reactivation of shut-in assets',
      'Remote operations with no grid access',
      'Producers scaling toward larger units',
      'ESG-driven methane mitigation projects'
    ]
  },
  '250': {
    model: 'MineX™ 250',
    modelNumber: '250',
    subtitle: '200–300 kW Class',
    tagline: 'BlueFlare\'s flagship modular mining system — optimal economic sweet spot',
    overview: [
      'The MineX™-250 is BlueFlare\'s flagship modular mining system, engineered for wells producing 100–150 mcf/d.',
      'This unit represents the optimal economic sweet spot for Alberta producers, offering sub–2-year payback potential, strong hashrate density, minimal operational burden via remote automation, and high reliability in extreme winter conditions.',
      'Balancing cost, performance, and scalability, the MineX-250 is the most widely applicable model in the MineX product family. It unlocks profitability for marginal wells that are otherwise uneconomic under traditional gas sales or processing models.'
    ],
    idealFor: [
      'Sub–2-year payback potential',
      'Strong hashrate density',
      'Minimal operational burden via remote automation',
      'High reliability in extreme winter conditions'
    ],
    quickStats: [
      { label: 'Power Output', value: '200–300', suffix: 'kW' },
      { label: 'Gas Required', value: '100–150', suffix: 'mcf/d' },
      { label: 'ASIC Capacity', value: '48–72', suffix: 'miners' },
      { label: 'Hashrate Range', value: '5–9', suffix: 'PH/s' },
      { label: 'Enclosure', value: '20', suffix: 'ft' },
      { label: 'Climate Rating', value: '-40 to +40', suffix: '°C' }
    ],
    specSections: [
      {
        title: 'Power & Performance',
        specs: [
          { label: 'Electrical Output', value: '200–300 kW continuous duty' },
          { label: 'Voltage', value: '400–480V, 3-phase' },
          { label: 'Frequency', value: '50/60 Hz compatible' },
          { label: 'Power Factor', value: '0.8–1.0' },
          { label: 'Efficiency Mode', value: 'Intelligent throttling via Edge Box' }
        ]
      },
      {
        title: 'Generator Specifications',
        specs: [
          { label: 'Engine Type', value: 'Industrial-grade Weifang/Yuchai Natural Gas Genset' },
          { label: 'Rated Power', value: '220–320 kW' },
          { label: 'Fuel Source', value: 'Raw field gas (BTU-flex tolerant)' },
          { label: 'Fuel Requirement', value: '100–150 mcf/d' },
          { label: 'RPM', value: '1,800 rpm' },
          { label: 'Alternator', value: 'Brushless, AVR-controlled' },
          { label: 'Emissions', value: 'Low methane slip; optional catalyst package' },
          { label: 'Starting', value: 'Electric start with auto-restart' }
        ]
      },
      {
        title: 'Enclosure & Cooling',
        specs: [
          { label: 'Enclosure Type', value: '20-foot insulated steel module' },
          { label: 'Climate Rating', value: '-40°C to +40°C' },
          { label: 'Cooling System', value: 'Air-cooled (standard) or optional hydro-cooled' },
          { label: 'Sound Attenuation', value: '70–78 dB at 7 meters' },
          { label: 'Insulation', value: 'Mineral wool + vapor barrier' },
          { label: 'Winterization', value: 'Heated intake, cable routing, generator bay insulation' }
        ]
      },
      {
        title: 'ASIC Capacity',
        specs: [
          { label: 'Rack Capacity', value: '48–72 ASIC miners' },
          { label: 'Compatible Models', value: 'S19, S19j Pro, S19 XP, S21, M30S++' },
          { label: 'Network Control', value: 'BlueFlare Edge Box centralized management' },
          { label: 'Average Hashrate Range', value: '5–9 PH/s (model dependent)' }
        ]
      },
      {
        title: 'Electrical & Distribution',
        specs: [
          { label: 'PDU', value: '3-phase industrial PDU with main isolator' },
          { label: 'Protection', value: 'Integrated surge suppression + grounding grid' },
          { label: 'Breakers', value: 'Dedicated ASIC breaker banks' },
          { label: 'Wiring', value: 'CSA-compliant industrial cabling' }
        ]
      }
    ],
    siteRequirements: [
      '20\' gravel pad',
      'Road access for transport and picker truck',
      'Gas tie-in point within 30–60 ft'
    ],
    gasRequirements: [
      '100–150 mcf/d',
      'BTU: 950–1,400+',
      'Pressure: 5–60 psi (regulator included)',
      'Optional gas scrubber for H₂S or liquids'
    ],
    maintenanceRequirements: [
      'Generator servicing every 600–800 hours',
      'Spark plug replacement per OEM schedule',
      'ASIC cleaning every 3–4 months',
      'Most oversight handled remotely via Edge Box'
    ],
    edgeBoxCapabilities: [
      'Generator telemetry & predictive alerts',
      'ASIC fleet monitoring (hashrate, power, temps)',
      'Auto-restart and safe-shutdown logic',
      'Dual-network failover (cellular + Starlink)',
      'Data analytics dashboard'
    ],
    edgeBoxFee: '$350–$500 USD per month',
    deploymentSteps: [
      'Engineering review & gas-flow validation',
      'Gravel pad construction & access preparation',
      'Delivery via flatbed + picker truck placement',
      'Gas tie-in installation',
      'Electrical tie-in and grounding grid',
      'ASIC racking + firmware configuration',
      'Commissioning & Edge Box activation'
    ],
    deploymentTimeline: '2–4 days',
    financialOverview: {
      installedPrice: '$137,600 – $163,100 USD',
      operatingCost: '<$0.02/kWh equivalent',
      netMonthlyRevenue: '~$4,000–$8,000',
      expectedPayback: '18–28 months'
    },
    useCases: [
      'Marginal wells with 100–150 mcf/d',
      'Reactivating shut-in wells',
      'ESG-driven methane mitigation strategies',
      'High-efficiency off-grid data center operations',
      'Producers requiring fast, self-funded payback periods'
    ]
  },
  '500': {
    model: 'MineX™ 500',
    modelNumber: '500',
    subtitle: '400–550 kW Class',
    tagline: 'High-capacity system for medium-sized gas assets',
    overview: [
      'The MineX™-500 is a high-capacity modular Bitcoin mining system engineered for wells producing 200–275 mcf/d.',
      'It is designed for producers seeking a robust, scalable, and highly efficient monetization system for medium-sized gas assets.',
      'This unit supports both air-cooled and hydro-cooled configurations and is optimized for enhanced thermal performance, high-density hashrate deployment, and maximum uptime in extreme cold-weather conditions.'
    ],
    idealFor: [
      'Producers with mid-range gas volumes',
      'Operators seeking strong payback (<24 months)',
      'Multi-well pad deployments',
      'ESG and methane reduction initiatives'
    ],
    quickStats: [
      { label: 'Power Output', value: '400–550', suffix: 'kW' },
      { label: 'Gas Required', value: '200–275', suffix: 'mcf/d' },
      { label: 'ASIC Capacity', value: '96–126', suffix: 'miners' },
      { label: 'Hashrate Range', value: '10–15', suffix: 'PH/s' },
      { label: 'Enclosure', value: '20–30', suffix: 'ft' },
      { label: 'Climate Rating', value: '-40 to +40', suffix: '°C' }
    ],
    specSections: [
      {
        title: 'Power & Performance',
        specs: [
          { label: 'Electrical Output', value: '400–550 kW continuous duty' },
          { label: 'Voltage', value: '400–480V, 3-phase' },
          { label: 'Frequency', value: '50/60 Hz compatible' },
          { label: 'Power Factor', value: '0.8–1.0' },
          { label: 'Efficiency Mode', value: 'Intelligent load balancing (Edge Box-controlled)' }
        ]
      },
      {
        title: 'Generator Specifications',
        specs: [
          { label: 'Engine Type', value: 'Industrial-grade Weifang/Yuchai Natural Gas Genset' },
          { label: 'Rated Power', value: '450–600 kW' },
          { label: 'Fuel Source', value: 'Raw field gas' },
          { label: 'Fuel Requirement', value: '200–275 mcf/d' },
          { label: 'RPM', value: '1,800 rpm' },
          { label: 'Alternator', value: 'Brushless, AVR-regulated' },
          { label: 'Emissions', value: 'Low CH₄ slip; optional catalytic reduction' },
          { label: 'Starting', value: 'Electric + auto-start/restart logic' }
        ]
      },
      {
        title: 'Enclosure & Cooling',
        specs: [
          { label: 'Enclosure Type', value: '20 or 30-foot insulated steel module' },
          { label: 'Climate Rating', value: '-40°C to +40°C' },
          { label: 'Cooling Options', value: 'Air-cooled OR full hydro-cooled system' },
          { label: 'Fan/Pump Systems', value: 'High-static fan banks or hydro pump manifold' },
          { label: 'Sound Attenuation', value: '70–78 dB at 7 meters' },
          { label: 'Insulation', value: 'Mineral wool & vapor barrier' },
          { label: 'Winterization', value: 'Heated lines, generator bay insulation, freeze-protected manifolds' }
        ]
      },
      {
        title: 'ASIC Capacity',
        specs: [
          { label: 'Rack Capacity', value: '96–126 ASIC miners' },
          { label: 'Compatible Models', value: 'S19, S19j Pro, S19 XP, S21 (hydro), M30S++' },
          { label: 'Network Control', value: 'Autonomous via BlueFlare Edge Box' },
          { label: 'Average Hashrate Range', value: '10–15 PH/s (model dependent)' }
        ]
      },
      {
        title: 'Electrical & Distribution',
        specs: [
          { label: 'PDU', value: 'High-capacity 3-phase PDU with main isolation breaker' },
          { label: 'Surge Protection', value: 'Integrated protection cage' },
          { label: 'Breakers', value: 'Dedicated ASIC breaker banks' },
          { label: 'Wiring', value: 'CSA-compliant industrial cabling' }
        ]
      }
    ],
    siteRequirements: [
      'Gravel pad approx. 20–30 feet in length',
      'Road and picker truck access',
      'Nearby gas tie-in point (30–60 ft recommended)'
    ],
    gasRequirements: [
      '200–275 mcf/d',
      'BTU: 950–1,400+',
      'Pressure: 5–60 psi (regulator included)',
      'Optional gas scrubber for H₂S, water, or liquids'
    ],
    maintenanceRequirements: [
      'Generator servicing every 600–800 hours',
      'Spark plugs per OEM schedule',
      'ASIC cleaning every 3–4 months (air-cooled)',
      'Hydro coolant checks (hydro-cooled)',
      'Most system oversight occurs remotely via the Edge Box'
    ],
    edgeBoxCapabilities: [
      'Generator health analytics & predictive alerts',
      'ASIC monitoring (hashrate, power, temperatures)',
      'Automated efficiency tuning',
      'Auto-restart and safe-shutdown logic',
      'Dual-network failover (cellular + Starlink)'
    ],
    edgeBoxFee: '$500–$700 USD per month',
    deploymentSteps: [
      'Engineering review & gas analysis',
      'Pad preparation & site access',
      'Delivery + picker truck placement',
      'Gas connection (regulator, valves, optional scrubber)',
      'Electrical tie-in & grounding',
      'ASIC installation & firmware configuration',
      'Commissioning & Edge Box activation'
    ],
    deploymentTimeline: '3–5 days',
    financialOverview: {
      installedPrice: '$206,350 – $300,600 USD',
      operatingCost: '<$0.02/kWh equivalent',
      netMonthlyRevenue: '~$8,000–$15,000',
      expectedPayback: '18–26 months'
    },
    useCases: [
      'Medium-flow wells with 200–275 mcf/d',
      'Multi-well pad monetization',
      'ESG & methane elimination compliance',
      'High-density off-grid mining deployments',
      'Operators scaling toward >750 kW systems'
    ]
  },
  '750': {
    model: 'MineX™ 750',
    modelNumber: '750',
    subtitle: '700–750 kW Class',
    tagline: 'Highest-capacity modular Bitcoin mining system for industrial-scale monetization',
    overview: [
      'The MineX™-750 is BlueFlare\'s highest-capacity modular Bitcoin mining system, engineered for producers with 300–350 mcf/d gas availability or multi-well pad integration.',
      'This unit is designed for industrial-scale monetization of natural gas resources, offering very strong economies of scale, high-density hydro-cooled mining support, robust winterization for extreme Canadian climates, and sub–2-year payout potential under favorable hashprice conditions.',
      'With support for 168–180 hydro or air-cooled ASICs, the MineX-750 delivers exceptional hashrate throughput and is the most powerful turnkey system available in the MineX product line.'
    ],
    idealFor: [
      'Very strong economies of scale',
      'High-density hydro-cooled mining support',
      'Robust winterization for extreme Canadian climates',
      'Sub–2-year payout potential under favorable hashprice conditions'
    ],
    quickStats: [
      { label: 'Power Output', value: '700–750', suffix: 'kW' },
      { label: 'Gas Required', value: '300–350', suffix: 'mcf/d' },
      { label: 'ASIC Capacity', value: '168–180', suffix: 'miners' },
      { label: 'Hashrate Range', value: '18–28', suffix: 'PH/s' },
      { label: 'Enclosure', value: '30', suffix: 'ft' },
      { label: 'Climate Rating', value: '-40 to +40', suffix: '°C' }
    ],
    specSections: [
      {
        title: 'Power & Performance',
        specs: [
          { label: 'Electrical Output', value: '700–750 kW continuous duty' },
          { label: 'Voltage', value: '400–480V, 3-phase' },
          { label: 'Frequency', value: '50/60 Hz compatible' },
          { label: 'Power Factor', value: '0.8–1.0' },
          { label: 'Load Flexibility', value: 'Dynamic generator load management (Edge Box-controlled)' }
        ]
      },
      {
        title: 'Generator Specifications',
        specs: [
          { label: 'Engine Type', value: 'Heavy-duty Weifang/Yuchai Natural Gas Genset' },
          { label: 'Rated Power', value: '750–900 kW' },
          { label: 'Fuel Source', value: 'Raw field gas' },
          { label: 'Fuel Requirement', value: '300–350 mcf/d' },
          { label: 'RPM', value: '1,800 rpm' },
          { label: 'Alternator', value: 'Industrial brushless alternator with AVR' },
          { label: 'Emissions', value: 'Optional methane catalyst or oxidizer' },
          { label: 'Starting', value: 'Electric + remote auto-start sequencing' }
        ]
      },
      {
        title: 'Enclosure & Cooling',
        specs: [
          { label: 'Enclosure Type', value: '30-foot insulated steel data center module' },
          { label: 'Climate Rating', value: '-40°C to +40°C' },
          { label: 'Cooling Options', value: 'Hydro-cooled (recommended) or enhanced air-cooled' },
          { label: 'Hydro System', value: 'Plate heat exchanger, manifolds, pumps, insulated coolant loops' },
          { label: 'Air System', value: 'Multi-fan high-static pressure exhaust system' },
          { label: 'Sound Attenuation', value: '70–80 dB at 7 meters' },
          { label: 'Winterization', value: 'Generator bay insulation, heated coolant manifolds, freeze-protected plumbing' }
        ]
      },
      {
        title: 'ASIC Capacity',
        specs: [
          { label: 'Rack Capacity', value: '168–180 ASIC miners' },
          { label: 'Compatible Models', value: 'S19, S19 XP, S21 hydro, M30S++' },
          { label: 'Network Control', value: 'BlueFlare Edge Box centralized autonomous management' },
          { label: 'Average Hashrate Range', value: '18–28 PH/s (model dependent)' }
        ]
      },
      {
        title: 'Electrical & Distribution',
        specs: [
          { label: 'PDU', value: 'High-capacity industrial PDU with main isolator' },
          { label: 'Surge Protection', value: 'Integrated surge & voltage protection cage' },
          { label: 'Breakers', value: 'Individual ASIC circuit breakers' },
          { label: 'Wiring', value: 'CSA-compliant, insulated, winter-rated cabling' }
        ]
      }
    ],
    siteRequirements: [
      'Gravel pad approx. 30–40 ft',
      'Road access suitable for heavy equipment & picker truck',
      'Gas tie-in point within 30–70 ft'
    ],
    gasRequirements: [
      '300–350 mcf/d',
      'BTU: 950–1,400+',
      'Pressure: 5–60 psi (regulator included)',
      'Optional gas scrubber & dehydration recommended for long-term reliability'
    ],
    maintenanceRequirements: [
      'Generator service every 600–800 hours',
      'Spark plug intervals per OEM',
      'Hydro coolant monitoring (hydro-cooled systems)',
      'ASIC dust removal (air-cooled systems)',
      'Most system insights handled via Edge Box'
    ],
    edgeBoxCapabilities: [
      'Generator telemetry & predictive maintenance',
      'ASIC fleet monitoring and auto-tuning',
      'Exception-based alerts and restart logic',
      'Dual-path networking (cellular + Starlink)',
      'Data analytics dashboard'
    ],
    edgeBoxFee: '$500–$700 USD per month',
    deploymentSteps: [
      'Engineering analysis & gas-flow validation',
      'Gravel pad preparation & site access setup',
      'Delivery + heavy picker truck installation',
      'Gas tie-in (regulators, valves, optional scrubber)',
      'Electrical tie-in and grounding grid installation',
      'ASIC installation and firmware optimization',
      'Full commissioning & Edge Box activation'
    ],
    deploymentTimeline: '3–6 days',
    financialOverview: {
      installedPrice: '$323,100 – $439,350 USD',
      operatingCost: '<$0.02/kWh equivalent',
      netMonthlyRevenue: '~$12,000–$22,000',
      expectedPayback: '18–24 months'
    },
    useCases: [
      'Industrial-scale gas monetization',
      'Multi-well pad integration',
      'High-density off-grid Bitcoin mining',
      'ESG emissions reduction programs',
      'Producers expanding decentralized compute portfolios'
    ]
  }
};

export const MINEX_MODELS = ['50', '125', '250', '500', '750'] as const;
export type MineXModel = typeof MINEX_MODELS[number];
