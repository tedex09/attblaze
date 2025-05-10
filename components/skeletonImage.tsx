'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils'; // helper de merge de classes (se tiver)

interface SkeletonImageProps extends ImageProps {
  classNameWrapper?: string;
}

export function SkeletonImage({ classNameWrapper, className, ...props }: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative w-full h-full", classNameWrapper)}>
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
      )}
      <Image
        {...props}
        className={cn(
          "transition-opacity duration-700 ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />
    </div>
  );
}
