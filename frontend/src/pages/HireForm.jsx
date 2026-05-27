import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const HireForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    description: "",
  });

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setDocument(e.target.files[0]);
  const setBudget = (val) => setFormData({ ...formData, budget: val });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (document) data.append("document", document);

      const res = await API.post("/api/hire", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Request submitted successfully! I will reach out shortly.");
      setFormData({
        name: "", email: "", phone: "", projectType: "", budget: "", description: "",
      });
      setDocument(null);
    } catch (error) {
      console.error("❌ Hire request failed:", error);
      setMessage("❌ Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-deep min-h-screen text-on-surface pt-32 pb-section-gap-lg">
      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-gutter">
        
        {}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 border border-border-subtle bg-surface-elevated rounded-full px-4 py-1.5 label-caps text-text-dim mb-6">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            AVAILABLE FOR HIGH-IMPACT PROJECTS
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-xl font-geist text-on-surface max-w-3xl mb-4">
            Build the future with <span className="accent-gradient-text">technical precision.</span>
          </h1>
          <p className="text-body-lg text-text-dim max-w-2xl">
            Whether you need a full-stack application, an AI-powered automation system, or a technical consultation, I deliver scalable and elegant solutions.
          </p>
        </div>

        {}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {}
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            
            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {[
                { icon: "robot_2", title: "Custom AI Solutions", desc: "LLM integration, autonomous agents, and intelligent workflows.", tags: ["PYTHON", "OPENAI", "LANGCHAIN"], stats: "5+ AI Systems Built" },
                { icon: "architecture", title: "Technical Consultation", desc: "System architecture, performance audits, and team scaling strategies.", tags: ["ARCHITECTURE", "DEVOPs"], stats: "Startup Advisory" },
                { icon: "code_blocks", title: "Full Stack Development", desc: "End-to-end web applications with modern frameworks.", tags: ["REACT", "NODE.JS", "MONGODB"], stats: "10+ Deployments" },
                { icon: "speed", title: "Why hire a Product Engineer?", desc: "I don't just write code. I care about user experience, business metrics, and shipping fast without breaking things.", tags: ["PRODUCT", "UI/UX"], stats: "End-to-End Delivery" }
              ].map((svc, idx) => (
                <div key={idx} className="glass-card p-6 rounded-xl flex flex-col">
                  <span className="material-symbols-outlined text-primary text-3xl mb-4" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>{svc.icon}</span>
                  <h3 className="text-headline-md mb-2">{svc.title}</h3>
                  <p className="text-body-md text-text-dim mb-4 flex-1">{svc.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {svc.tags.map(t => <span key={t} className="label-caps text-[10px] border border-border-subtle px-2 py-1 rounded bg-surface-deep">{t}</span>)}
                  </div>
                  <div className="label-caps text-tertiary">{svc.stats}</div>
                </div>
              ))}
            </div>

            {}
            <div>
              <h3 className="label-caps text-text-dim mb-4">WHAT CLIENTS SAY</h3>
              <div className="flex flex-col gap-4">
                <div className="glass-card p-6 rounded-xl">
                  <p className="text-body-md text-text-dim italic mb-4">"Ashish completely transformed our internal dashboard. It's incredibly fast and the code is pristine."</p>
                  <div className="label-caps text-on-surface">Alex M. • Startup Founder</div>
                </div>
                <div className="glass-card p-6 rounded-xl">
                  <p className="text-body-md text-text-dim italic mb-4">"The AI automation he built saved us hundreds of hours a month. Brilliant product thinking."</p>
                  <div className="label-caps text-on-surface">Sarah K. • Operations Lead</div>
                </div>
              </div>
            </div>

            {}
            <div className="glass-card p-6 rounded-xl border-l-4 border-l-primary flex flex-col items-start mt-4">
              <span className="material-symbols-outlined text-primary mb-2 text-3xl">smart_toy</span>
              <h3 className="text-headline-md mb-2">Want a quick answer?</h3>
              <div className="w-full bg-surface-deep border border-border-subtle p-3 rounded text-code-sm text-text-dim font-mono mb-4">
                > Ask my AI clone about my experience...<span className="animate-pulse">_</span>
              </div>
              <button type="button" onClick={() => navigate("/assistant")} className="btn-ghost rounded w-full sm:w-auto">Launch Assistant Chat</button>
            </div>

          </div>

          {}
          <div className="w-full lg:w-1/2">
            <div className="glass-card p-6 md:p-card-padding rounded-2xl sticky top-24">
              <h2 className="text-headline-lg mb-2">Let's build together</h2>
              <p className="text-body-md text-text-dim mb-8">Fill out the form below and I'll get back to you within 24 hours.</p>

              {message && (
                <div className={`mb-6 p-4 rounded label-caps text-center ${message.includes("✅") ? "bg-tertiary/10 border border-tertiary/50 text-tertiary" : "bg-error/10 border border-error/50 text-error"}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors"
                  />
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-text-dim outline-none transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled>Project Category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="App Development">App Development</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <label className="label-caps text-text-dim">BUDGET RANGE</label>
                  <div className="flex flex-wrap gap-2">
                    {["<$1k", "$1k - $5k", "$5k+"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`px-4 py-2 rounded-full font-label-caps text-xs border transition-all ${
                          formData.budget === b 
                            ? "bg-primary text-on-primary border-primary" 
                            : "bg-surface-deep border-border-subtle text-text-dim hover:border-primary hover:text-primary"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  name="description"
                  placeholder="Project brief, timeline, and goals..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-surface-deep border border-border-subtle focus:border-primary px-4 py-3 rounded text-on-surface outline-none transition-colors mt-2"
                  rows="5"
                  required
                ></textarea>

                <div className="flex flex-col gap-2">
                  <label className="label-caps text-text-dim">ATTACHMENT (OPTIONAL)</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full text-text-dim file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-surface-elevated file:text-primary hover:file:bg-white/10"
                    accept=".pdf,.doc,.docx"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary rounded mt-4"
                >
                  {loading ? "Submitting..." : "Submit Proposal ▶"}
                </button>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6 pt-6 border-t border-border-subtle">
                  <a href="#" className="label-caps text-text-dim hover:text-on-surface transition-colors">Book a discovery call</a>
                  <a href="mailto:engineer@domain.com" className="label-caps text-text-dim hover:text-on-surface transition-colors">Direct Email</a>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HireForm;
