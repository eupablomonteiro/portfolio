import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IconSprite } from "@/components/ui/icon-sprite";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IconSprite />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
