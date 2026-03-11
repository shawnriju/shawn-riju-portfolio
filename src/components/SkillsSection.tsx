import { motion } from "framer-motion";
import { StarBall } from "./StarBall";

interface SkillCategory {
  label: string;
  items: string[];
}

const categories: SkillCategory[] = [
  { label: "LANGUAGES & SCRIPTING", items: ["Python", "C#", "T-SQL", "HTML", "JavaScript"] },
  { label: "FRAMEWORKS & LIBRARIES", items: [".NET", "ASP.NET MVC", "Entity Framework", "BeautifulSoup", "Streamlit"] },
  { label: "AI TOOLS", items: ["LangChain", "OpenAI API", "Cursor AI", "AntiGravity"] },
  { label: "DATABASES", items: ["MSSQL", "ChromaDB"] },
  { label: "CLOUD & INFRA", items: ["Azure", "VMware"] },
  { label: "DEV TOOLS", items: ["Git", "GitHub", "JIRA", "Visual Studio", "VS Code"] },
  { label: "METHODOLOGY", items: ["Agile (Scrum)", "REST APIs", "Unit Testing (xUnit)"] },
  { label: "OTHER", items: ["Unity3D", "SSRS", "Asana"] },
];

const SkillsSection = ({ eagleVision }: { eagleVision: boolean }) => (
  <section id="skills" className="py-20">
    <div className="max-w-4xl mx-auto px-4">
      <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">EQUIPMENT</p>
      <h2 className="text-2xl font-light tracking-wider text-center mb-12">ARSENAL</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            className="nier-border p-4 bg-card relative"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-3">
               <p className="text-[10px] tracking-widest text-muted-foreground">{cat.label}</p>
               {i === 2 && <StarBall number={6} />}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className={`text-xs px-2 py-0.5 border border-border transition-all duration-300 ${
                    eagleVision ? "eagle-glow" : ""
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
