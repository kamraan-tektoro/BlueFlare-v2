import { Zap, Server, Activity, Globe, Cpu, ShieldCheck, TrendingUp, Anchor } from 'lucide-react';
import { NavItem, ServiceItem, ProjectItem, Region } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Why BlueFlare', href: '#why-us' },
  { label: 'Global Reach', href: '#global' },
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
    title: 'Ignite OS',
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
    image: 'https://picsum.photos/800/600?random=1',
    stats: [
      { label: 'Uptime', value: '99.99', suffix: '%' },
      { label: 'Capacity', value: '150', suffix: 'MW' }
    ]
  },
  {
    title: 'Nordic Wind Link',
    location: 'Oslo, Norway',
    category: 'Renewable Storage',
    image: 'https://picsum.photos/800/600?random=2',
    stats: [
      { label: 'Offset', value: '450', suffix: 'k Tons' },
      { label: 'Efficiency', value: '+22', suffix: '%' }
    ]
  },
  {
    title: 'Texas Grid Stabilizer',
    location: 'Austin, TX',
    category: 'Battery Storage',
    image: 'https://picsum.photos/800/600?random=3',
    stats: [
      { label: 'Response', value: '<50', suffix: 'ms' },
      { label: 'Storage', value: '500', suffix: 'MWh' }
    ]
  }
];

export const REGIONS: Region[] = [
  { id: 'na', name: 'North America', x: 20, y: 35, description: 'HQ in Alberta with major operations across Texas and California.' },
  { id: 'eu', name: 'Europe', x: 52, y: 30, description: 'Renewable integration hubs in Norway and Germany.' },
  { id: 'asia', name: 'Asia Pacific', x: 75, y: 45, description: 'Manufacturing partnerships and emerging grid projects.' },
];