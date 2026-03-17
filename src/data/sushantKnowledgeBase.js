/*
  Structured knowledge base for Sushant Kumar's AI Chatbot.
  This file compiles all portfolio data into a single text context
  that gets injected into the Gemini system prompt.
*/

import {
  personalInfo,
  aboutMe,
  education,
  skillCategories,
  projects,
  certifications,
  achievements,
  experience,
  codingPlatforms,
  activities,
} from './portfolioData';

function buildKnowledgeBase() {
  // --- Personal Introduction ---
  const intro = `
## Personal Introduction
Name: ${personalInfo.name}
Roles: ${personalInfo.roles.join(', ')}
Tagline: ${personalInfo.tagline}
Location: ${personalInfo.location}
Email: ${personalInfo.email}
GitHub: ${personalInfo.socialLinks.github}
LinkedIn: ${personalInfo.socialLinks.linkedin}
LeetCode: ${personalInfo.socialLinks.leetcode}
Kaggle: ${personalInfo.socialLinks.kaggle}

## About Me
${aboutMe.bio}

Key Highlights:
${aboutMe.highlights.map((h) => `- ${h}`).join('\n')}
`;

  // --- Education ---
  const edu = `
## Education
${education
    .map(
      (e) =>
        `- ${e.degree} | ${e.institution} | ${e.year} | ${e.grade}`
    )
    .join('\n')}
`;

  // --- Skills ---
  const skills = `
## Skills
${skillCategories
    .map(
      (cat) =>
        `### ${cat.name}\n${cat.skills
          .map((s) => `- ${s.name} (Proficiency: ${s.level}%)`)
          .join('\n')}`
    )
    .join('\n\n')}
`;

  // --- Projects ---
  const proj = `
## Projects
${projects
    .map(
      (p) =>
        `### ${p.title}
${p.description}
Technologies: ${p.tech.join(', ')}
Categories: ${p.categories.join(', ')}`
    )
    .join('\n\n')}
`;

  // --- Certifications ---
  const certs = `
## Certifications
${certifications
    .map((c) => `- ${c.title} | Issued by: ${c.issuer} | ${c.year} – ${c.description}`)
    .join('\n')}
`;

  // --- Achievements ---
  const achiev = `
## Achievements & Awards
${achievements
    .map(
      (a) =>
        `- ${a.title} (${a.year}): ${a.description} [Stat: ${a.stat}${a.statSuffix} ${a.statLabel}]`
    )
    .join('\n')}
`;

  // --- Experience ---
  const exp = `
## Work Experience
${experience
    .map(
      (e) =>
        `### ${e.role} at ${e.company} (${e.duration})
${e.description}`
    )
    .join('\n\n')}
`;

  // --- Hackathons & Competitions ---
  const hackathons = `
## Hackathons & Competitions
- National Level Hackathon Finalist (2025): Reached the final round of a national-level hackathon with an innovative tech solution.
- Hackathon Organizer – TechFest 2025: Led a team of 20 to organize a 48-hour national level hackathon with 500+ participants.
- Active competitive programmer on LeetCode, Codeforces, HackerRank, and GeeksForGeeks.
`;

  // --- Coding Platforms ---
  const coding = `
## Competitive Coding Profiles
${codingPlatforms
    .map(
      (cp) =>
        `- ${cp.platform} (${cp.handle}): ${cp.solved} problems solved, Rating: ${cp.rating || cp.score}`
    )
    .join('\n')}
`;

  // --- Activities ---
  const acts = `
## Extracurricular Activities
${activities.map((a) => `- ${a.title}: ${a.description}`).join('\n')}
`;

  return [intro, edu, skills, proj, certs, achiev, exp, hackathons, coding, acts].join('\n');
}

export const knowledgeBaseText = buildKnowledgeBase();
