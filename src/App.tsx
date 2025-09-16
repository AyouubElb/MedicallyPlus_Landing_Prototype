import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProblemFramingSection } from "./components/ProblemFramingSection";
import { OurPromiseSection } from "./components/OurPromiseSection";
import { FeaturesOverviewSection } from "./components/FeaturesOverviewSection";
import { SaaSPreviewSection } from "./components/SaaSPreviewSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { InteractiveFormSection } from "./components/InteractiveFormSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ProblemFramingSection />
        <OurPromiseSection />
        <FeaturesOverviewSection />
        <SaaSPreviewSection />
        <TestimonialsSection />
        {/*      <InteractiveFormSection />
         */}
      </main>
      <Footer />
    </div>
  );
}
