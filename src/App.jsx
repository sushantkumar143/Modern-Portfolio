import { useState, useEffect } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-dark">
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
  );
}

export default App;
