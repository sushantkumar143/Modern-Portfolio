import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import SkillsIntro from './components/SkillsIntro';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import AchievementsSection from './components/AchievementsSection';
import ExperienceSection from './components/ExperienceSection';
import CodingPlatforms from './components/CodingPlatforms';
import ActivitiesSection from './components/ActivitiesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ChatbotLauncher from './components/ChatbotLauncher';


function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatedBackground />

      {/* Main Content always in DOM so it can be revealed by the split */}
      <div className="relative z-10 w-full">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <SkillsIntro />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <AchievementsSection />
          <ExperienceSection />
          <CodingPlatforms />
          <ActivitiesSection />
          <ContactSection />
        </main>
        <Footer />
      </div>

      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* AI Chatbot Launcher – fixed position, persists across all sections, hidden during loading */}
      {!loading && <ChatbotLauncher />}
    </div>
  );
}

export default App;
