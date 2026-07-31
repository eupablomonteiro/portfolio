import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Technologies } from "@/sections/technologies";
import { Projects } from "@/sections/projects";
import { Process } from "@/sections/process";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Technologies />
      <Projects />
      <Process />
      <Contact />
    </main>
  );
}
