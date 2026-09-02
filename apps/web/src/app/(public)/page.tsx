import { Hero } from "@/sections/hero";
import { Technologies } from "@/sections/technologies";
import { Projects } from "@/sections/projects";
import { Experience } from "@/sections/experience";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Technologies />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}