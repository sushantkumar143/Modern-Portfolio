import { personalInfo } from '../data/portfolioData';
import { FaGithub, FaLinkedin, FaTwitter, FaKaggle } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="relative py-8 border-t border-glass-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-text-secondary text-sm">
          © 2026 <span className="neon-text font-semibold">{personalInfo.name}</span>. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer"
            className="text-text-secondary hover:text-neon transition-colors">
            <FaGithub size={18} />
          </a>
          <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer"
            className="text-text-secondary hover:text-neon transition-colors">
            <FaLinkedin size={18} />
          </a>
          <a href={personalInfo.socialLinks.twitter} target="_blank" rel="noreferrer"
            className="text-text-secondary hover:text-neon transition-colors">
            <FaTwitter size={18} />
          </a>
          <a href={personalInfo.socialLinks.leetcode} target="_blank" rel="noreferrer"
            className="text-text-secondary hover:text-neon transition-colors">
            <SiLeetcode size={18} />
          </a>
          <a href={personalInfo.socialLinks.kaggle} target="_blank" rel="noreferrer"
            className="text-text-secondary hover:text-neon transition-colors">
            <FaKaggle size={18} />
          </a>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--color-neon), #7b2ff7, transparent)' }} />
    </footer>
  );
}
