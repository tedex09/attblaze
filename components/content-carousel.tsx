"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Channel, Movie, Series } from '@/lib/api';

interface ContentCarouselProps {
  title: string;
  items: Channel[] | Movie[] | Series[];
  type: 'channel' | 'movie' | 'series';
}

export default function ContentCarousel({ title, items, type }: ContentCarouselProps) {
  if (!items || items.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
      >
        <CarouselContent>
          {items.map((item) => {
            // Determine item properties based on type
            const id = type === 'series' ? (item as Series).series_id : (item as Channel | Movie).stream_id;
            const name = item.name;
            const image = type === 'series' 
              ? (item as Series).cover 
              : (item as Channel | Movie).stream_icon;
            
            return (
              <CarouselItem key={id} className="basis-1/3 sm:basis-1/4 md:basis-1/6">
                <Link href={`/details/${type}/${id}`}>
                  <motion.div 
                    className="relative aspect-[2/3] rounded-md overflow-hidden bg-zinc-800"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    {image ? (
                      <Image 
                        src={image} 
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                        <span className="text-white text-xs">{name}</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                      <p className="text-xs line-clamp-2">{name}</p>
                    </div>
                  </motion.div>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
}