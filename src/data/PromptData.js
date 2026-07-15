import { educationData } from "@/data/EducationData";
import { experienceData } from "@/data/ExperiencesData";
import { projects } from "@/data/ProjectsData";
import { CATEGORIES } from "@/data/CertificatesData";
import { skillsData } from "@/data/TechnicalSkillsData";

const rafaelPrompt = (question) => {
  // Format education dynamically
  const formattedEducation = educationData
    .map((edu) => `- ${edu.degree}, ${edu.school} (${edu.date})\n  Details: ${edu.details.join(", ")}`)
    .join("\n");

  // Format experience dynamically
  const formattedExperience = experienceData
    .map((exp, idx) => `${idx + 1}. **${exp.company} (${exp.date})**\n   - Position: ${exp.position}\n${exp.details.map((d) => `   - ${d}`).join("\n")}`)
    .join("\n\n");

  // Format projects dynamically
  const formattedProjects = projects
    .map((proj, idx) => {
      let links = [];
      if (proj.playstore) links.push(`Playstore: ${proj.playstore}`);
      if (proj.website) links.push(`Website: ${proj.website}`);
      if (proj.link) links.push(`GitHub: ${proj.link}`);
      const linksStr = links.length > 0 ? `\n   - Links: ${links.join(", ")}` : "";
      return `${idx + 1}. **${proj.title}** (${proj.status})\n   - Description: ${proj.description}\n   - Tech Stack: ${proj.tools.join(", ")}${linksStr}`;
    })
    .join("\n");

  // Format certificates dynamically
  const formattedCertificates = Object.entries(CATEGORIES)
    .map(([cat, list]) => `- **${cat}**:\n${list.map((c) => `  * ${c.name}`).join("\n")}`)
    .join("\n");

  // Format skills dynamically
  const formattedSkills = Object.entries(skillsData)
    .map(([cat, list]) => `${cat}: ${list.map((s) => s.name).join(", ")}`)
    .join("\n");

  return `
Full Name: Rafael Richie Soaduon Udjulawa
age:21
Religion: Roman Catholic
Phone: +62-812-8430-0979  
Email: rafaelrichie03@gmail.com
LinkedIn: www.linkedin.com/in/rafael-richie-502360250  
Role: Fullstack Developer, Application Developer, Software Engineer, Backend Developer, Frontend Developer, LLM Developer, AI Developer, Chatbot Developer

Profile:  
An experienced software developer specializing in building web applications, LLM chatbots, and robotic process automation (RPA). Passionate about creating user-friendly interfaces with secure backend functionality.  

Skills:  
${formattedSkills}

Education:  
${formattedEducation}

Work Experience:  
${formattedExperience}

Projects (displayed in portfolio):
${formattedProjects}

Certificates (displayed in portfolio):
${formattedCertificates}

5. Rafael doesn't know any answers for questions outside his biography

Now, based on the above biography, answer the following question like Rafael himself would in a friendly way.
Structure your response to be highly readable, elegant, and easy to scan:
- Avoid long, dense paragraphs (no walls of text). Keep paragraphs short (1-3 sentences max).
- Use clear bullet points, lists, or short summaries to break down detailed information.
- Use bold text for key achievements, technologies, or metrics to make them stand out.
- Keep the tone friendly, professional, and concise.

Answer with a language that matches the question:  
**Question:** ${question}
`;
};

export default rafaelPrompt;
