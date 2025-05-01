"use client";

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface SkeletonCarouselProps {
  title: string;
  count?: number;
}

export default function SkeletonCarousel({ title, count = 8 }: SkeletonCarouselProps) {
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: count }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/6">
              <div className="aspect-[2/3] rounded-md overflow-hidden">
                <div className="w-full h-full bg-zinc-800 animate-pulse"></div>
                <div className="h-5 w-full mt-2 bg-zinc-800 animate-pulse rounded"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}