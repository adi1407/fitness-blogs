"use client";

import { FlipCard, type FlipCardData } from "@/components/animate-ui/components/community/flip-card";

const AUTHORS: FlipCardData[] = [
  {
    name: "FitKnowledge Editorial",
    username: "@fitknowledge",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
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
