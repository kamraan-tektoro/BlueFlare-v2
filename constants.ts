import { Zap, Server, Activity, Globe, Cpu, ShieldCheck, TrendingUp, Anchor } from 'lucide-react';
import { NavItem, ServiceItem, ProjectItem, Region, GalleryItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Why BlueFlare', href: '#why-us' },
  { label: 'Global Reach', href: '#global' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Projects', href: '#projects' },
];

export const SERVICES: ServiceItem[] = [
  {
    title: 'Generator Sales & Install',
    description: 'Industrial-grade power generation procurement, installation, and lifecycle maintenance for mission-critical uptime.',
    icon: Zap,
    tags: ['Procurement', 'Installation', 'Maintenance']
  },
  {
    title: 'Carbon Cube',
    description: 'Modular, carbon-capture-ready energy units designed to minimize footprint while maximizing output.',
    icon: Cpu,
    tags: ['Modular', 'Carbon-Ready', 'Efficient']
  },
  {
    title: 'BlueFlare OS',
    description: 'Intelligent load-balancing AI software that optimizes grid performance and predictive maintenance in real-time.',
    icon: Activity,
    tags: ['AI', 'SaaS', 'Optimization']
  },
  {
    title: 'Power Projects',
    description: 'End-to-end infrastructure development, from site acquisition and permitting to construction and commissioning.',
    icon: Anchor,
    tags: ['Development', 'Construction', 'EPC']
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
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
    title: 'Grid Monitoring Center',
    category: 'Operations',
    size: 'large' // Spans 2x2
  },
  {
    id: '2',
    type: 'image',
    src: '/miners.webp',
    title: 'Bitcoin Miners',
    category: 'Field Work',
    size: 'tall' // Spans 1x2
  },
  {
    id: '3',
    type: 'image',
    src: '/1MW gen pack.webp',
    title: '1MW Generator',
    category: 'Infrastructure',
    size: 'medium' // 1x1
  },
  {
    id: '4',
    type: 'image',
    src: '/Harvest-Site-True-North.webp',
    title: 'Harvest Site, True North',
    category: 'Field Work',
    size: 'medium'
  },
  {
    id: '5',
    type: 'video',
    src: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    title: 'Global Connectivity',
    category: 'Network',
    size: 'wide' // 2x1
  }
];