import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import { Icon } from "@iconify/react";

const iconMap = {
  HTML: "vscode-icons:file-type-html",
  CSS: "vscode-icons:file-type-css",
  JavaScript: "logos:javascript",
  React: "logos:react",
  Tailwind: "devicon:tailwindcss",
  "Node.js": "logos:nodejs-icon",
  "Express.js": "simple-icons:express",
  MongoDB: "logos:mongodb",
  Python: "logos:python",
  Java: "logos:java",
  C: "simple-icons:c",
  Pandas: "simple-icons:pandas",
  NumPy: "simple-icons:numpy",
  OpenCV: "simple-icons:opencv",
  "Scikit-learn": "simple-icons:scikitlearn",
};

const pctFromName = (name = "") => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return 60 + (h % 36);
};

const getProficiencyDots = (level) => {
  const val = Number(level) || 0;
  if (val >= 80) return "●●●●";
  if (val >= 60) return "●●●○";
  if (val >= 40) return "●●○○";
  return "●○○○";
};

const normalizeContent = (raw) => {
  const out = {};
  if (!raw || typeof raw !== "object") return out;

  Object.entries(raw).forEach(([cat, arr]) => {
    if (!arr) {
      out[cat] = [];
      return;
    }

    if (Array.isArray(arr)) {
      out[cat] = arr.map((item) => {
        if (typeof item === "string") {
          return { name: item, level: undefined, date: undefined };
        }
        if (typeof item === "object") {
          const name =
            item.name ??
            item.title ??
            item.value ??
            Object.values(item).find(
              (v) =>
                typeof v === "string" &&
                v.trim() &&
                !/^\d{4}-\d{2}-\d{2}/.test(v)
            ) ??
            "";

          const level =
            item.level !== undefined && item.level !== null
              ? Number(item.level)
              : undefined;

          const date = item.date ?? item.learnedDate ?? undefined;

          return { name: String(name), level, date };
        }

        return { name: String(item), level: undefined, date: undefined };
      });
      return;
    }

    if (typeof arr === "object") {
      const numericKeys = Object.keys(arr)
        .filter((k) => /^\d+$/.test(k))
        .sort((a, b) => Number(a) - Number(b));

      if (numericKeys.length) {
        out[cat] = numericKeys.map((k) => {
          const v = arr[k];

          if (typeof v === "string")
            return { name: v, level: undefined, date: undefined };

          if (typeof v === "object") {
            return {
              name: v.name ?? v.title ?? String(Object.values(v)[0] ?? ""),
              level: v.level !== undefined ? Number(v.level) : undefined,
              date: v.date ?? undefined,
            };
          }

          return { name: String(v), level: undefined, date: undefined };
        });
        return;
      }

      out[cat] = [];
      return;
    }

    out[cat] = [];
  });

  return out;
};

const SkillsSection = () => {
  const [newSkills, setNewSkills] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/api/home/skill");
        const doc = res?.data?.data || res?.data || {};
        const content = doc?.content || {};
        const normalized = normalizeContent(content);
        setNewSkills(normalized);
      } catch (err) {
        console.error("Fetch Skills Error:", err?.response?.data || err);
      }
    };
    fetchSkills();
  }, []);

  const handleSave = async () => {
    try {
      await API.post("/api/home", { section: "skill", content: newSkills });
      setEditMode(false);
    } catch (err) {
      console.error("Save Skills Error:", err?.response?.data || err);
    }
  };

  const handleChange = (category, index, field, value) => {
    setNewSkills((prev) => {
      const updated = { ...prev };
      if (!Array.isArray(updated[category])) updated[category] = [];
      const item = { ...(updated[category][index] || {}) };

      if (field === "level")
        item.level = value === "" ? undefined : Number(value);
      else if (field === "date")
        item.date = value ? new Date(value).toISOString() : undefined;
      else item[field] = value;

      updated[category][index] = item;
      return updated;
    });
  };

  const handleAddSkill = (category) => {
    setNewSkills((prev) => {
      const updated = { ...prev };
      if (!Array.isArray(updated[category])) updated[category] = [];
      updated[category].push({
        name: "",
        level: 50,
        date: new Date().toISOString(),
      });
      return updated;
    });
  };

  const handleDeleteSkill = (category, index) => {
    setNewSkills((prev) => {
      const updated = { ...prev };
      updated[category] = updated[category].filter((_, i) => i !== index);
      return updated;
    });
  };

  const handleUpdateOne = async (category, index) => {
    try {
      const item = newSkills?.[category]?.[index];
      if (!item) return;

      await API.put("/api/home/skills", {
        category,
        index,
        ...(item.name && { name: item.name }),
        ...(item.level && { percentage: item.level }),
        ...(item.date && { date: item.date }),
      });

      setNewSkills((prev) => {
        const updated = { ...prev };
        if (!updated[category][index].date)
          updated[category][index].date = new Date().toISOString();
        return updated;
      });
    } catch (err) {
      console.error("Update skill failed:", err?.response?.data || err);
    }
  };

  const handleDeleteWithBackend = async (category, index) => {
    try {
      await API.delete("/api/home/skills", {
        data: { category, index },
      });
      handleDeleteSkill(category, index);
    } catch (err) {
      console.error("Delete skill error:", err?.response?.data || err);
    }
  };

  return (
    <section id="skills" aria-label="Skills section" className="section-container py-section-gap-md lg:py-section-gap-lg">
      
      {}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h2 className="text-headline-md sm:text-headline-lg font-bold text-on-surface mb-4">
          My Skills - Built for Production
        </h2>
        <p className="text-body-md sm:text-body-lg text-text-dim mb-12">
          I design and ship scalable web products and ML systems used by real users. 
          From architecture and front-end UX to backend services, deployment and monitoring — 
          I focus on reliable delivery, measurable impact, and maintainable code.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="label-caps text-primary border border-border-subtle bg-surface-elevated px-2 py-1 rounded">FE</span>
              <h3 className="text-headline-md text-on-surface">Frontend</h3>
            </div>
            <p className="text-body-md text-text-dim">
              React, TypeScript, Vite, Tailwind — performant, accessible UIs with component-driven design, client-side caching and progressive enhancement.
            </p>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="label-caps text-secondary border border-border-subtle bg-surface-elevated px-2 py-1 rounded">BE</span>
              <h3 className="text-headline-md text-on-surface">Backend</h3>
            </div>
            <p className="text-body-md text-text-dim">
              Node.js, Express, REST/GraphQL — resilient server-side systems with clear contracts, auth, rate-limiting, and automated testing.
            </p>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="label-caps text-tertiary border border-border-subtle bg-surface-elevated px-2 py-1 rounded">ML</span>
              <h3 className="text-headline-md text-on-surface">ML & Data</h3>
            </div>
            <p className="text-body-md text-text-dim">
              Prototyping and shipping ML features — from data pipelines and models to inference and monitoring. Focus on cost-efficient inference.
            </p>
          </div>
        </div>
      </motion.div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(newSkills || {}).map(([category, techs], idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-card-padding rounded-xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="label-caps text-primary">{category.replace("_", " ")}</h3>
              <span className="label-caps text-text-dim">{techs.length} tools</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {techs.map((tech, i) => {
                const name = tech?.name ?? String(tech ?? "");
                const level = tech?.level ?? pctFromName(name);

                if (editMode) {
                  return (
                    <div key={i} className="flex flex-wrap items-center gap-2 w-full mb-2 bg-surface-elevated p-2 rounded border border-border-subtle">
                      <input
                        value={name}
                        onChange={(e) => handleChange(category, i, "name", e.target.value)}
                        onBlur={() => handleUpdateOne(category, i)}
                        className="bg-surface-deep border border-border-subtle rounded px-2 py-1 text-on-surface text-sm w-32 outline-none focus:border-primary"
                        placeholder="Name"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={level}
                        onChange={(e) => handleChange(category, i, "level", e.target.value)}
                        onBlur={() => handleUpdateOne(category, i)}
                        className="bg-surface-deep border border-border-subtle rounded px-2 py-1 text-on-surface text-sm w-16 outline-none focus:border-primary"
                        placeholder="%"
                      />
                      <button
                        onClick={() => handleDeleteWithBackend(category, i)}
                        className="text-error label-caps ml-auto hover:underline"
                      >
                        DEL
                      </button>
                    </div>
                  );
                }

                return (
                  <div 
                    key={i} 
                    className="group flex items-center gap-2 border border-border-subtle bg-surface-deep/50 label-caps text-[11px] px-3 py-1.5 rounded-full hover:border-primary hover:text-primary transition-all cursor-default"
                  >
                    <Icon icon={iconMap[name] || "mdi:star"} className="w-3.5 h-3.5 text-text-dim group-hover:text-primary transition-colors" />
                    <span>{name}</span>
                    <span className="hidden group-hover:inline-block ml-1 tracking-[0.1em] text-primary">{getProficiencyDots(level)}</span>
                  </div>
                );
              })}
            </div>

            {editMode && (
              <button
                onClick={() => handleAddSkill(category)}
                className="mt-4 btn-ghost w-max text-[10px] py-1.5 px-3"
              >
                + ADD SKILL
              </button>
            )}
          </motion.article>
        ))}
      </div>

      {}
      {user?.role === "admin" && (
        <div className="mt-12 flex justify-center gap-4">
          {editMode ? (
            <>
              <button onClick={handleSave} className="btn-primary">
                SAVE CHANGES
              </button>
              <button onClick={() => setEditMode(false)} className="btn-ghost">
                CANCEL
              </button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="btn-ghost">
              EDIT SKILLS
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
