import Header from "@/components/Header";
import Hero from "@/components/Hero";
import News from "@/components/News";
import Hours from "@/components/Hours";
import Access from "@/components/Access";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen max-w-screen bg-white">
      <Hero />
      <News />
      <Access />
      <Footer />
    </div>
  );
}
