import { Hero } from "@/sections/hero";
import { Technologies } from "@/sections/technologies";
import { ExperienceFeed } from "@/sections/experience-feed";
import { ProjectsFeed } from "@/sections/projects-feed";
import { Contact } from "@/sections/contact";

export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <Hero />
      <Technologies />
      <ExperienceFeed />
      <ProjectsFeed />
      <Contact />
    </main>
  );
}
