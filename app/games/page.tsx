import { Suspense } from 'react';
import { format } from 'date-fns';
import { getLiveStreams, getEPG } from '@/lib/api';
import Navbar from '@/components/navbar';
import Loading from '@/components/loading';
import MatchCard from '@/components/match-card';

function isFootballMatch(title: string): boolean {
  const keywords = ['futebol', 'vs', ' x ', 'campeonato', 'liga', 'football', 'soccer'];
  const lowerTitle = title.toLowerCase();
  return keywords.some(keyword => lowerTitle.includes(keyword));
}

export default async function GamesPage() {
  // Fetch EPG data and live channels
  const [epgData, channels] = await Promise.all([
    getEPG(),
    getLiveStreams()
  ]);
  
  // Create a map of channel IDs to channel info
  const channelMap = new Map(
    channels.map(channel => [channel.epg_channel_id, channel])
  );
  
  // Filter and process football matches
  const matches = epgData
    .filter(entry => isFootballMatch(entry.title))
    .map(entry => {
      const channel = channelMap.get(entry.channel_id);
      if (!channel) return null;
      
      const startTime = new Date(entry.start);
      const formattedTime = format(startTime, "MMM d 'at' HH:mm");
      
      return {
        title: entry.title,
        channelName: channel.name,
        channelIcon: channel.stream_icon,
        startTime: formattedTime,
        channelId: channel.stream_id,
        timestamp: startTime.getTime()
      };
    })
    .filter((match): match is NonNullable<typeof match> => match !== null)
    .sort((a, b) => a.timestamp - b.timestamp);

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      <Navbar />
      
      <section className="pt-4 pb-16">
        <Suspense fallback={<Loading />}>
          <div className="px-4 py-4">
            <h1 className="text-2xl font-bold mb-2">Live Football</h1>
            <p className="text-zinc-400 text-sm mb-6">Watch live football matches from around the world</p>
          </div>
          
          <div className="px-4">
            {matches.length > 0 ? (
              matches.map((match, index) => (
                <MatchCard
                  key={`${match.channelId}-${match.timestamp}`}
                  title={match.title}
                  channelName={match.channelName}
                  channelIcon={match.channelIcon}
                  startTime={match.startTime}
                  channelId={match.channelId}
                  index={index}
                />
              ))
            ) : (
              <div className="text-center text-zinc-400 py-8">
                No live football matches scheduled at the moment.
              </div>
            )}
          </div>
        </Suspense>
      </section>
    </main>
  );
}