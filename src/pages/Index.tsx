import { useState, useCallback, useEffect } from "react";
import TacticalHeader from "@/components/TacticalHeader";
import AboutSection from "@/components/AboutSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import MissionSelect from "@/components/MissionSelect";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";
import MobMeter from "@/components/MobMeter";
import ScrollbarController from "@/components/ScrollbarController";
import SmokeTransition from "@/components/SmokeTransition";
import NimbusCursor from "@/components/NimbusCursor";

const SECTIONS = ["about", "experience", "projects", "skills", "education", "contact"];

const Index = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [eagleVision, setEagleVision] = useState(false);
  const [smokeActive, setSmokeActive] = useState(false);

  const handleNavigate = useCallback((id: string) => {
    setSmokeActive(true);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setTimeout(() => setSmokeActive(false), 400);
    }, 200);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${eagleVision ? "eagle-vision" : ""}`}>
      <NimbusCursor />
      <ScrollbarController />
      <SmokeTransition isActive={smokeActive} />
      <TacticalHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        eagleVision={eagleVision}
        onToggleEagle={() => setEagleVision(!eagleVision)}
      />
      <MobMeter />

      <main className="pt-24 pb-16 max-w-6xl mx-auto px-4">
        <AboutSection eagleVision={eagleVision} />
        <div className="w-full h-px bg-border my-4" />
        <ExperienceTimeline eagleVision={eagleVision} />
        <div className="w-full h-px bg-border my-4" />
        <MissionSelect eagleVision={eagleVision} />
        <div className="w-full h-px bg-border my-4" />
        <SkillsSection eagleVision={eagleVision} />
        <div className="w-full h-px bg-border my-4" />
        <EducationSection />
        <div className="w-full h-px bg-border my-4" />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-[10px] tracking-widest text-muted-foreground">
          SYS://SHAWN_RIJU — ALL SYSTEMS NOMINAL — {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Index;
