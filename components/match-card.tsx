"use client";

import { motion } from 'framer-motion';
import { Trophy, Tv, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MatchCardProps {
  title: string;
  channelName: string;
  channelIcon?: string;
  startTime: string;
  channelId: number;
  index: number;
}

export default function MatchCard({ title, channelName, channelIcon, startTime, channelId, index }: MatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Link href={`/watch/channel/${channelId}`}>
        <div className="bg-zinc-800 rounded-lg p-4 mb-4 hover:bg-zinc-700 transition-colors">
          <div className="flex items-center mb-2">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          </div>
          
          <div className="flex items-center mb-2">
            <Tv className="w-4 h-4 text-zinc-400 mr-2" />
            <div className="flex items-center">
              {channelIcon && (
                <div className="w-6 h-6 relative mr-2">
                  <Image
                    src={channelIcon}
                    alt={channelName}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-sm text-zinc-300">{channelName}</span>
            </div>
          </div>
          
          <div className="flex items-center text-zinc-400">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{startTime}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}