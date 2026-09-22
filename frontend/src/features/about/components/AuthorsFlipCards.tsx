"use client";

import { FlipCard, type FlipCardData } from "@/components/animate-ui/components/community/flip-card";
import { HUB } from "@/lib/hubImages";

const AUTHORS: FlipCardData[] = [
  {
    name: "fitlives Editorial",
    username: "@fitlives",
    image: HUB.checkup,
    bio: "Evidence-informed fitness and nutrition explainers, calculators, and Indian diet pathways.",
    stats: { following: 12, followers: 8400, posts: 48 },
    socialLinks: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/adi1407/fitness-blogs",
    },
  },
  {
    name: "Review Desk",
    username: "@reviewdesk",
    image: HUB.healthConsult,
    bio: "Fact-checks claims against reputable sources and flags medical overreach before publish.",
    stats: { following: 6, followers: 2100, posts: 22 },
  },
];

export function AuthorsFlipCards() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-10">
      {AUTHORS.map((author) => (
        <FlipCard key={author.username} data={author} />
      ))}
    </div>
  );
}
