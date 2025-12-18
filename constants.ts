import { Zap, Server, Activity, Globe, Cpu, ShieldCheck, TrendingUp, Anchor, Package, Layers, Star, Factory, Building2 } from 'lucide-react';
import { NavItem, ServiceItem, ProjectItem, Region, GalleryItem, MineXCard } from './types';

export const NAV_ITEMS: NavItem[] = [
  { 
    label: 'Solutions', 
    href: '#solutions',
    children: [
      { label: 'Generator Solutions', href: '/generator-solutions' },
      { label: 'Carbon Cube™', href: '/carbon-cube' },
      { label: 'BlueFlare OS™', href: '/blueflare-os' },
      { label: 'Power Projects', href: '/power-projects' },
    ]
  },
  { 
    label: 'MineX™ Series', 
    href: '#minex',
    children: [
      { label: 'MineX™ 50', href: '/minex-50' },
      { label: 'MineX™ 125', href: '/minex-125' },
      { label: 'MineX™ 250', href: '/minex-250' },
      { label: 'MineX™ 500', href: '/minex-500' },
      { label: 'MineX™ 750', href: '/minex-750' },
    ]
  },
  { label: 'Why BlueFlare', href: '/#why-blueflare' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Generator Sales, Installation & Repair',
    description: 'Turnkey generator equipment, install, commissioning, and maintenance for industrial and remote operations.',
    icon: Zap,
    tags: ['Sales', 'Installation', 'Maintenance'],
    href: '/generator-solutions'
  },
  {
    title: 'Carbon Cube™',
    description: 'Portable methane mitigation + instrument air in a compact field-deployable enclosure.',
    icon: Cpu,
    tags: ['Portable', 'Methane Mitigation', 'Field-Ready'],
    href: '/carbon-cube'
  },
  {
    title: 'BlueFlare OS™',
    description: 'Ignition SCADA + DCIM integration for monitoring, control, and analytics.',
    icon: Activity,
    tags: ['SCADA', 'DCIM', 'Analytics'],
    href: '/blueflare-os'
  },
  {
    title: 'Power Projects',
    description: 'Industrial, utility, and large-scale energy infrastructure delivered fast and reliably.',
    icon: Anchor,
    tags: ['Industrial', 'Utility', 'Infrastructure'],
    href: '/power-projects'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    title: 'Alberta Data Hub',
    location: 'Calgary, AB',
    category: 'Datacenter',
    image: 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&q=80&w=1000',
    stats: [
      { label: 'Uptime', value: '99.99', suffix: '%' },
      { label: 'Capacity', value: '150', suffix: 'MW' }
    ]
  },
  {
    title: 'Nordic Wind Link',
    location: 'Oslo, Norway',
    category: 'Renewable Storage',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1000',
    stats: [
      { label: 'Offset', value: '450', suffix: 'k Tons' },
      { label: 'Efficiency', value: '+22', suffix: '%' }
    ]
  },
  {
    title: 'Texas Grid Stabilizer',
    location: 'Austin, TX',
    category: 'Battery Storage',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000',
    stats: [
      { label: 'Response', value: '<50', suffix: 'ms' },
      { label: 'Storage', value: '500', suffix: 'MWh' }
    ]
  }
];

export const REGIONS: Region[] = [
  { 
    id: 'ab', 
    name: 'Alberta', 
    x: 16, 
    y: 26, 
    description: 'Global Headquarters. The heart of our R&D and pilot facility testing.' 
  },
  { 
    id: 'tx', 
    name: 'Houston', 
    x: 23, 
    y: 38, 
    description: 'Energy Corridor Hub. Managing grid-scale storage and US distribution.' 
  },
  { 
    id: 'uae', 
    name: 'Dubai', 
    x: 64, 
    y: 42, 
    description: 'MENA Operations Center. Solar integration and smart-city infrastructure.' 
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    type: 'video',
    src: '/generators/500KW Air Building.mp4',
    poster: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    title: '500KW Air Building',
    category: 'Field Work',
    size: 'large' // Spans 2x2
  },
  {
    id: '2',
    type: 'image',
    src: '/bitcoin-miners/miners.webp',
    title: 'Bitcoin Miners',
    category: 'Field Work',
    size: 'tall' // Spans 1x2
  },
  {
    id: '3',
    type: 'image',
    src: '/generators/1MW gen pack.webp',
    title: '1MW Generator',
    category: 'Infrastructure',
    size: 'medium' // 1x1
  },
  {
    id: '4',
    type: 'image',
    src: '/site/Harvest-Site-True-North.webp',
    title: 'Harvest Site, True North',
    category: 'Field Work',
    size: 'medium'
  },
  {
    id: '5',
    type: 'video',
    src: '/installations/Installation.MOV',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    title: 'Installation',
    category: 'Field Work',
    size: 'large' // Spans 2x2
  },
  {
    id: '6',
    type: 'image',
    src: '/site/Site-5.webp',
    title: 'Site',
    category: 'Field Work',
    size: 'wide'
  },
  {
    id: '7',
    type: 'image',
    src: '/installations/Installation-13.webp',
    title: 'Installation',
    category: 'Field Work',
    size: 'medium'
  },
  {
    id: '8',
    type: 'image',
    src: '/bitcoin-miners/Bitcoin-Miner-7.webp',
    title: 'Bitcoin Miner',
    category: 'Field Work',
    size: 'medium'
  }
];

export const MINEX_CARDS: MineXCard[] = [
  {
    model: '50',
    title: 'MineX™ 50',
    description: 'Entry-level modular mining for low-volume wells.',
    icon: Package,
    stats: [
      { label: 'Power', value: '50–75 kW' },
      { label: 'Gas', value: '25–40 mcf/d' },
      { label: 'ASICs', value: '12–18' },
      { label: 'Hashrate', value: '1.4–2.2 PH/s' }
    ],
    tags: ['10ft Module', '36–48 mo Payback'],
    href: '/minex-50'
  },
  {
    model: '125',
    title: 'MineX™ 125',
    description: 'Scale-up system with balanced output and footprint.',
    icon: Layers,
    stats: [
      { label: 'Power', value: '100–150 kW' },
      { label: 'Gas', value: '50–80 mcf/d' },
      { label: 'ASICs', value: '24–36' },
      { label: 'Hashrate', value: '2.0–4.0 PH/s' }
    ],
    tags: ['10–20ft Module', '30–42 mo Payback'],
    href: '/minex-125'
  },
  {
    model: '250',
    title: 'MineX™ 250',
    description: 'Flagship sweet spot — optimal economics for most wells.',
    icon: Star,
    stats: [
      { label: 'Power', value: '200–300 kW' },
      { label: 'Gas', value: '100–150 mcf/d' },
      { label: 'ASICs', value: '48–72' },
      { label: 'Hashrate', value: '4.5–7.5 PH/s' }
    ],
    tags: ['20ft Module', '18–28 mo Payback'],
    href: '/minex-250'
  },
  {
    model: '500',
    title: 'MineX™ 500',
    description: 'High-capacity system with air or hydro cooling.',
    icon: Factory,
    stats: [
      { label: 'Power', value: '400–550 kW' },
      { label: 'Gas', value: '200–275 mcf/d' },
      { label: 'ASICs', value: '96–126' },
      { label: 'Hashrate', value: '10–15 PH/s' }
    ],
    tags: ['20–30ft Module', '18–26 mo Payback'],
    href: '/minex-500'
  },
  {
    model: '750',
    title: 'MineX™ 750',
    description: 'Industrial-scale monetization for high-volume assets.',
    icon: Building2,
    stats: [
      { label: 'Power', value: '700–750 kW' },
      { label: 'Gas', value: '300–350 mcf/d' },
      { label: 'ASICs', value: '168–180' },
      { label: 'Hashrate', value: '18–28 PH/s' }
    ],
    tags: ['30ft Module', '18–24 mo Payback'],
    href: '/minex-750'
  }
];