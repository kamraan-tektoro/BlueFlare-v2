import React, { useMemo, useState } from 'react';
import Navbar from './Navbar';
import FooterCTA from './FooterCTA';
import Section from './ui/Section';
import { GALLERY_MEDIA, MediaCategory, MediaItem } from '../data/galleryMedia';

type CategoryOption = {
  id: 'all' | 'videos' | MediaCategory;
  label: string;
};

const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'all', label: 'All' },
  { id: 'videos', label: 'Videos' },
  { id: 'site', label: 'Site' },
  { id: 'generators', label: 'Generators' },
  { id: 'installations', label: 'Installations' },
  { id: 'bitcoin-miners', label: 'Bitcoin Miners' },
];

const categoryLabelMap: Record<MediaCategory, string> = {
  generators: 'Generators',
  site: 'Site',
  installations: 'Installations',
  'bitcoin-miners': 'Bitcoin Miners',
};

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryOption['id']>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const filteredMedia = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_MEDIA;
    if (activeCategory === 'videos') return GALLERY_MEDIA.filter((item) => item.type === 'video');
    return GALLERY_MEDIA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-28">
        <Section className="relative overflow-hidden pt-12 md:pt-16 pb-16 md:pb-24">
          <div className="pointer-events-none absolute inset-x-0 -top-20 flex justify-center">
            <div className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-brand-blue/10 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Gallery
              </h1>
              <p className="text-slate-400 max-w-2xl">
                Explore more footage from our deployments, generators, and sites. Filter by
                category to focus on the operations that matter most to you.
              </p>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {CATEGORY_OPTIONS.map((category) => {
                const isActive = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-blue text-white border-brand-blue shadow-[0_0_20px_rgba(37,99,235,0.35)]'
                        : 'bg-white/5 border-white/10 text-slate-200 hover:border-brand-blue/60 hover:text-white'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedia.map((item) => (
                <MediaCard key={item.id} item={item} onSelect={() => setSelectedItem(item)} />
              ))}
            </div>
          </div>
        </Section>
      </main>

      <FooterCTA />

      {selectedItem && (
        <div
          className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[90vh] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative">
              {selectedItem.type === 'image' ? (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  className="w-full h-full max-h-[90vh] object-contain bg-black"
                />
              ) : (
                <video
                  controls
                  poster={selectedItem.poster}
                  className="w-full h-full max-h-[90vh] object-contain bg-black"
                >
                  <source src={selectedItem.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <span className="absolute left-4 bottom-4 inline-flex px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-glow backdrop-blur">
                {categoryLabelMap[selectedItem.category]}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type MediaCardProps = {
  item: MediaItem;
  onSelect: () => void;
};

const MediaCard: React.FC<MediaCardProps> = ({ item, onSelect }) => {
  return (
    <article
      className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 border border-white/5 shadow-lg shadow-brand-blue/10 hover:border-brand-blue/40 hover:shadow-brand-blue/30 transition-all duration-300 cursor-pointer"
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
    >
      {item.type === 'image' ? (
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <video
          poster={item.poster}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
        >
          <source src={item.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute left-4 bottom-4 flex items-center gap-2">
        <span className="inline-flex px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-glow backdrop-blur">
          {categoryLabelMap[item.category]}
        </span>
        {item.type === 'video' && (
          <span className="inline-flex px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-white/10 border border-white/20 text-white backdrop-blur">
            Video
          </span>
        )}
      </div>
    </article>
  );
};

export default GalleryPage;

