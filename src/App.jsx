import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';

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
import FloatingNavbar from './components/FloatingNavbar';
import SmoothScroll from './components/SmoothScroll';


function App() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-transparent relative">
        <AnimatedBackground />

        {/* Main Content always in DOM so it can be revealed by the split */}
        <div className="relative z-10 w-full">
          <Navbar />
          <FloatingNavbar />
          <main>
            <HeroSection />
            <AboutSection />
            <EducationSection />

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
    </SmoothScroll>
  );
}

export default App;
