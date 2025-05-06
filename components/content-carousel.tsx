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
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
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
                    <motion.div
                      className="cursor-pointer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {type === "channel" ? (
                        <div className="bg-zinc-900 rounded-lg shadow-md p-2 text-center">
                          <div className="relative w-full aspect-square overflow-hidden rounded-md mb-2">
                            {image ? (
                              <motion.div whileHover={{ scale: 1.1 }}>
                                <Image
                                  src={image}
                                  alt={name}
                                  fill
                                  className="object-cover rounded-md"
                                  loading="lazy"
                                  blurDataURL="/placeholder.jpg"
                                  placeholder="blur"
                                />
                              </motion.div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                <span className="text-white text-xs">{name}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-white">{name}</p>
                        </div>
                      ) : (
                        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                          {image ? (
                            <motion.div whileHover={{ scale: 1.1 }}>
                              <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover"
                                loading="lazy"
                                blurDataURL="/placeholder.jpg"
                                placeholder="blur"
                              />
                            </motion.div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                              <span className="text-white text-xs">{name}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
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
                          {/* Aqui você pode adicionar mais detalhes do conteúdo */}
                          Detalhes do conteúdo como descrição, categoria, duração etc.
                        </p>
                      </div>
                    </div>
                  </Content>
                </Wrapper>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
