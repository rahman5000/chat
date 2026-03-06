"use client";

import Link from "next/link";

export default function NewsPage() {
  const newsSites = [
    {
      name: "Google News",
      url: "https://news.google.com/topstories",
      desc: "Top global news from Google",
    },
    {
      name: "BBC News",
      url: "https://www.bbc.com/news",
      desc: "Latest world news from BBC",
    },
    {
      name: "CNN",
      url: "https://edition.cnn.com/world",
      desc: "Breaking international news",
    },
    {
      name: "Reuters",
      url: "https://www.reuters.com/world/",
      desc: "Trusted global news coverage",
    },
    {
      name: "Al Jazeera",
      url: "https://www.aljazeera.com/news/",
      desc: "Top world news and analysis",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#17212b] text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Top World News</h1>

      <div className="grid gap-4">
        {newsSites.map((site, index) => (
          <a
            key={index}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1f2c38] p-4 rounded-lg hover:bg-[#243443] transition"
          >
            <h2 className="text-lg font-semibold">{site.name}</h2>
            <p className="text-gray-400 text-sm">{site.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
