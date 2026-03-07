import { motion } from "framer-motion";

const education = [
  {
    degree: "M.Sc., Advanced Computer Science (Cloud Computing)",
    school: "University of Leeds",
    year: "November 2023",
    note: "Graduated with Distinction",
  },
  {
    degree: "B.Tech, Computer Science and Engineering",
    school: "Govt. Model Engineering College",
    year: "August 2020",
    note: null,
  },
];

const achievements = [
  "★ Shining Star (organisation-wide, peer-nominated award) — Leeds University Union",
  "★ Best Catering Assistant of the Year 2024 — Old Bar, Leeds University Union",
  "★ Graduated MSc with Distinction — University of Leeds",
];

const EducationSection = () => (
  <section id="education" className="py-20">
    <div className="max-w-4xl mx-auto px-4">
      <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2 text-center">DATA ARCHIVES</p>
      <h2 className="text-2xl font-light tracking-wider text-center mb-12">EDUCATION & HONORS</h2>

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            className="nier-border p-5 bg-card"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <p className="text-[10px] tracking-widest text-muted-foreground mb-2">{edu.year}</p>
            <h3 className="text-sm font-semibold tracking-wider mb-1">{edu.degree}</h3>
            <p className="text-xs text-muted-foreground">{edu.school}</p>
            {edu.note && (
              <p className="text-xs text-accent mt-2 font-medium">{edu.note}</p>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="nier-border p-5 bg-card"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-[10px] tracking-widest text-muted-foreground mb-3">ACHIEVEMENTS</p>
        <ul className="space-y-2">
          {achievements.map((a, i) => (
            <li key={i} className="text-xs leading-relaxed text-muted-foreground">{a}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  </section>
);

export default EducationSection;
