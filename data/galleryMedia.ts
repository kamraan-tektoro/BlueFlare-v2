export type MediaCategory = 'site' | 'generators' | 'installations' | 'bitcoin-miners';

export type MediaItem = {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  category: MediaCategory;
  title?: string;
  description?: string;
  poster?: string;
};

const labelMap: Record<MediaCategory, string> = {
  site: 'Site',
  generators: 'Generators',
  installations: 'Installations',
  'bitcoin-miners': 'Bitcoin Miners',
};

const imageFiles = {
  site: [
    'Harvest-Site-True-North.webp',
    'Site-1.webp',
    'Site-2.webp',
    'Site-3.webp',
    'Site-4.webp',
    'Site-5.webp',
    'Site-6.webp',
    'Site-7.webp',
    'Site-8.webp',
    'Site-9.webp',
    'Site-10.webp',
    'Site-11.webp',
    'Site-12.webp',
  ],
  generators: [
    '1MW gen pack.webp',
    '1MW gen.webp',
    '225KW weichai.webp',
    '4x250 gen.webp',
    '800KW Gen.webp',
    'Baudouin 1MW.webp',
    'Generator-1.webp',
    'Generator-2.webp',
    'Generator-3.webp',
    'Generator-4.webp',
    'Generator-5.webp',
    'Generator-6.webp',
  ],
  installations: [
    'Installation-1.webp',
    'Installation-2.webp',
    'Installation-3.webp',
    'Installation-4.webp',
    'Installation-5.webp',
    'Installation-6.webp',
    'Installation-7.webp',
    'Installation-8.webp',
    'Installation-9.webp',
    'Installation-10.webp',
    'Installation-11.webp',
    'Installation-12.webp',
    'Installation-13.webp',
    'Installation-14.webp',
    'Installation-15.webp',
    'Installation-16.webp',
    'Installation-17.webp',
    'Installation-18.webp',
    'Installation-19.webp',
    'Installation-20.webp',
    'Installation-21.webp',
    'Installation-22.webp',
    'Installation-23.webp',
    'Installation-24.webp',
  ],
  'bitcoin-miners': [
    'miners.webp',
    'Bitcoin-Miner-1.webp',
    'Bitcoin-Miner-2.webp',
    'Bitcoin-Miner-3.webp',
    'Bitcoin-Miner-4.webp',
    'Bitcoin-Miner-5.webp',
    'Bitcoin-Miner-6.webp',
    'Bitcoin-Miner-7.webp',
    'Bitcoin-Miner-8.webp',
    'Bitcoin-Miner-9.webp',
    'Bitcoin-Miner-10.webp',
    'Bitcoin-Miner-11.webp',
    'Bitcoin-Miner-12.webp',
    'Bitcoin-Miner-13.webp',
    'Bitcoin-Miner-14.webp',
  ],
};

const videoFiles: Record<MediaCategory, string[]> = {
  site: [],
  generators: ['500KW Air Building.mp4'],
  installations: ['Installation.MOV'],
  'bitcoin-miners': [],
};

const createTitle = (fileName: string) => {
  const name = fileName.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  return name.replace(/\s+/g, ' ').trim();
};

const buildMediaItems = (): MediaItem[] => {
  const items: MediaItem[] = [];

  (Object.keys(imageFiles) as MediaCategory[]).forEach((category) => {
    imageFiles[category].forEach((file) => {
      const title = createTitle(file);
      const id = `${category}-${title.toLowerCase().replace(/\s+/g, '-')}`;
      items.push({
        id,
        type: 'image',
        src: `/${category}/${file}`,
        alt: `${title} - ${labelMap[category]}`,
        category,
        title,
      });
    });
  });

  (Object.keys(videoFiles) as MediaCategory[]).forEach((category) => {
    videoFiles[category].forEach((file) => {
      const title = createTitle(file);
      const id = `${category}-${title.toLowerCase().replace(/\s+/g, '-')}-video`;
      items.push({
        id,
        type: 'video',
        src: `/${category}/${file}`,
        alt: `${title} - ${labelMap[category]}`,
        category,
        title,
      });
    });
  });

  return items;
};

export const GALLERY_MEDIA: MediaItem[] = buildMediaItems();

