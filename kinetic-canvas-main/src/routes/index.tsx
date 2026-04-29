import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Loader } from "@/components/Loader";
import { CursorGlow } from "@/components/CursorGlow";
import { Nav } from "@/components/Nav";
import { HeroSection } from "@/sections/HeroSection";
import { MarqueeStrip } from "@/sections/MarqueeStrip";
import { FeatureScenes } from "@/sections/FeatureScenes";
import { ShowcaseScene } from "@/sections/ShowcaseScene";
import { ProcessScene } from "@/sections/ProcessScene";
import { CtaScene } from "@/sections/CtaScene";
import { Footer } from "@/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NOVA — Build at the speed of imagination" },
      { name: "description", content: "NOVA is a real-time cinematic engine that turns ideas into shipped products. WebGL-rendered IDE, multi-agent runtime, sub-50ms multiplayer." },
      { property: "og:title", content: "NOVA — Build at the speed of imagination" },
      { property: "og:description", content: "A real-time, 3D-rendered creative engine for builders." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [loaded]);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <CursorGlow />
      <Nav />
      <main className="relative">
        <HeroSection />
        <MarqueeStrip />
        <FeatureScenes />
        <ShowcaseScene />
        <ProcessScene />
        <CtaScene />
        <Footer />
      </main>
    </>
  );
}
