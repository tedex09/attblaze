"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Channel, Movie, Series } from "@/lib/api";
import { SkeletonImage } from "@/components/skeletonImage";

interface ContentCarouselProps {
  title: string;
  items: Channel[] | Movie[] | Series[];
  type: "channel" | "movie" | "series";
  isLoading?: boolean;
}

export default function ContentCarousel({
  title,
  items,
  type,
  isLoading = false,
}: ContentCarouselProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isLoading) {
    return <SkeletonCarousel type={type} />;
  }

  if (!items?.length) {
    return null;
  }

  const Wrapper = isMobile ? Sheet : Dialog;
  const Trigger = isMobile ? SheetTrigger : DialogTrigger;
  const Content = isMobile ? SheetContent : DialogContent;
  const Header = isMobile ? SheetHeader : DialogHeader;
  const Title = isMobile ? SheetTitle : DialogTitle;

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            dragFree: true,         // no mobile: arraste livre
            breakpoints: {
              "(min-width: 768px)": {
                dragFree: false,    // no desktop: sem arraste livre
                skipSnaps: true     // opcional: para não “prender” nos slides
              }
            }
          }}
          className="w-full"
        >
          <CarouselContent className="md:overflow-x-auto">
            {items.map((item) => {
              const id =
                type === "series"
                  ? (item as Series).series_id
                  : (item as Channel | Movie).stream_id;
              const name = item.name;
              const image =
                type === "series"
                  ? (item as Series).cover
                  : (item as Channel | Movie).stream_icon;

              return (
                <CarouselItem
                  key={id}
                  className={
                    type === "channel"
                      ? "basis-1/4 md:basis-1/6"
                      : "basis-1/3 sm:basis-1/4 md:basis-1/6"
                  }
                >
                  <Wrapper>
                    <Trigger asChild>
                      <div className="cursor-pointer transition-shadow duration-300 hover:shadow-lg rounded-lg">
                        {type === "channel" ? (
                          <div className="rounded-lg p-2 text-center">
                            <div className="relative w-full aspect-square rounded-md md:rounded-3xl mb-2">
                              {image ? (
                                <SkeletonImage
                                  src={image}
                                  alt={name}
                                  fill
                                  className="object-cover rounded-md md:rounded-3xl"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                  <span className="text-white font-bold text-xs">{name}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-white font-bold text-xs">{name}</p>
                          </div>
                        ) : (
                          <div className="relative aspect-[2/3] rounded-md shadow-lg">
                            {image ? (
                              <SkeletonImage
                                src={image}
                                alt={name}
                                fill
                                className="object-cover rounded-md shadow-lg"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                <span className="text-white text-xs">{name}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </Trigger>

                    <Content
                      side={isMobile ? "bottom" : undefined}
                      className={isMobile ? "h-[85vh] rounded-t-2xl p-6" : "p-6 max-w-2xl"}
                    >
                      <Header>
                        <Title>{name}</Title>
                      </Header>
                      <div className="mt-4 flex gap-4">
                        <div className="relative w-32 aspect-[2/3] rounded-lg overflow-hidden">
                          {image && (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              className="object-cover rounded-md"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Details about the content like description, category, duration etc.
                          </p>
                        </div>
                      </div>
                    </Content>
                  </Wrapper>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

function SkeletonCarousel({ type }: { type: "channel" | "movie" | "series" }) {
  return (
    <section className="px-4 py-6">
      <Skeleton className="w-48 h-8 mb-4" />
      <div className="flex gap-4 overflow-x-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={type === "channel" ? "w-20 h-20" : "w-32 aspect-[2/3]"}
          >
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}