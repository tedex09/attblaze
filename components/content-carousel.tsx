"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold mb-4"
      >
        {title}
      </motion.h2>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item, index) => {
            const id = type === "series" ? (item as Series).series_id : (item as Channel | Movie).stream_id;
            const name = item.name;
            const image = type === "series" ? (item as Series).cover : (item as Channel | Movie).stream_icon;

            return (
              <CarouselItem
                key={id}
                className={type === "channel" ? "basis-1/4 md:basis-1/6" : "basis-1/3 sm:basis-1/4 md:basis-1/6"}
              >
                <Wrapper>
                  <Trigger asChild>
                    <motion.div
                      className="cursor-pointer"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        transition: { delay: index * 0.1 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {type === "channel" ? (
                        <div className="premium-channel">
                        <motion.div
                          className="relative w-full aspect-square overflow-hidden rounded-md mb-2"
                          whileHover={{
                            y: -4,
                            boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.2)",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {image ? (
                            <Image
                              src={image}
                              alt={name}
                              fill
                              className="object-cover rounded-md"
                              loading="lazy"
                              blurDataURL="/placeholder.jpg"
                              placeholder="blur"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800/50 backdrop-blur-sm">
                              <span className="text-white text-xs">{name}</span>
                            </div>
                          )}
                        </motion.div>
                        <p className="text-sm text-white text-center font-bold">{name}</p>
                      </div>
                      
                      ) : (
                        <div className="premium-card">
                          <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
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
                              <div className="w-full h-full flex items-center justify-center bg-zinc-800/50 backdrop-blur-sm">
                                <span className="text-white text-xs">{name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </Trigger>

                  <Content
                    side={isMobile ? "bottom" : undefined}
                    className={isMobile ? "h-[85vh] rounded-t-2xl p-6 bg-zinc-900/95 backdrop-blur-sm" : "p-6 max-w-2xl bg-zinc-900/95 backdrop-blur-sm"}
                  >
                    <Header>
                      <Title className="text-xl font-bold">{name}</Title>
                    </Header>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 flex gap-4"
                    >
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
                        <p className="text-sm text-zinc-400">
                          {/* Content details would go here */}
                          Details about the content such as description, category, duration etc.
                        </p>
                      </div>
                    </motion.div>
                  </Content>
                </Wrapper>
              </CarouselItem>
            );
          })}
        </CarouselContent>
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
            <Skeleton className="w-full h-full rounded-lg animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}