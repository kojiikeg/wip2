import Hero from "@/components/Hero";
import News from "@/components/News";
import Access from "@/components/Access";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/nav/MobileMenu";
import DesktopNav from "@/components/nav/DesktopNav";

export default function Home() {
  return (
    <div className="w-full min-h-screen max-w-screen bg-white">
      <MobileMenu />
      <Hero />
      <DesktopNav />
      <News />
      <Access />
      <Footer />
    </div>
  );
}
