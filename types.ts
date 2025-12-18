import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
  href?: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix: string;
}

export interface ProjectItem {
  title: string;
  location: string;
  category: string;
  image: string;
  stats: Stat[];
}

export interface Region {
  id: string;
  name: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  description: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string; // For videos
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide';
}

export interface MineXCardStat {
  label: string;
  value: string;
}

export interface MineXCard {
  model: string;
  title: string;
  description: string;
  icon: LucideIcon;
  stats: MineXCardStat[];
  tags: string[];
  href: string;
}
