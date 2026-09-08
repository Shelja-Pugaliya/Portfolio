import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Work from "@/components/Work";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Journey />
        <Work />
      </main>
      <Contact />
    </>
  );
}
