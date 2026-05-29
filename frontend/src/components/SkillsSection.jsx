import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { 
  Code2, Database, Layout, Server, 
  Terminal, Cpu, Globe, Braces, 
  CheckCircle2, Activity, GitBranch,
  Layers, Lightbulb
} from "lucide-react";

const SkillsSection = () => {
  const [skillsData, setSkillsData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/api/home/skill");
        setSkillsData(res.data?.data?.content || {});
      } catch (err) {
        console.error("Failed to fetch skills", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const frontendSkills = skillsData["frontend"] || [];
  const backendSkills = skillsData["backend"] || [];
  const dataScienceSkills = skillsData["Data Science - AI/ML"] || [];
  const languageSkills = skillsData["languages"] || [];
  const toolSkills = skillsData["tools"] || [];
  const coreSkills = skillsData["Core Concept"] || [];
  const databaseSkills = skillsData["DataBase"] || [];
  const firewallSkills = skillsData["Firewall"] || [];
  const securitySkills = skillsData["Security"] || [];
  const softSkills = skillsData["Soft Skills"] || [];
  const strengthsSkills = skillsData["Strengths"] || [];
  const communicationSkills = skillsData["Communication Language"] || [];

  const renderSkillName = (skill) => typeof skill === 'object' ? skill.name : skill;

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-24 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-primary font-mono text-sm tracking-widest">LOADING CAPABILITIES...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-24 relative bg-[#0a0a0a]">
      {/* Header Section */}
      <div className="mb-16">
        <div className="inline-block px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-xs font-mono tracking-widest text-white/70 uppercase">Technical Arsenal</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6 font-geist leading-tight">
          Engineering Efficiency,<br />
          One Line at a Time.
        </h2>
        <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
          A categorized breakdown of my technical capabilities, ranging from high-
          performance backend systems to creative AI implementation. Built for
          scalability and production performance.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col gap-6">
        {/* ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Frontend - Wide Card */}
          <div className="lg:col-span-8 rounded-3xl bg-[#111111] border border-white/5 p-8 hover:bg-[#151515] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">01 / Capabilities</p>
                <h3 className="text-3xl font-medium text-white tracking-tight">Frontend Engineering</h3>
              </div>
              <Layout className="w-6 h-6 text-white/30" />
            </div>
            
            <div className="flex flex-wrap gap-3 mt-auto">
              {frontendSkills.length > 0 ? frontendSkills.map((skill, i) => (
                <div key={i} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span className="text-sm font-medium text-white/90">{renderSkillName(skill)}</span>
                </div>
              )) : <span className="text-white/40 text-sm">No skills found</span>}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5">
              <p className="text-sm text-white/50 max-w-lg">
                Focused on crafting responsive, accessible, and high-performance user interfaces with a focus on atomic design principles.
              </p>
            </div>
          </div>

          {/* Backend - Narrow Card */}
          <div className="lg:col-span-4 rounded-3xl bg-[#111111] border border-white/5 p-8 hover:bg-[#151515] transition-colors relative group flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs font-mono text-white/40 mb-2 uppercase tracking-wider">02 / Core</p>
                <h3 className="text-2xl font-medium text-white tracking-tight">Backend & APIs</h3>
              </div>
            </div>

            <div className="space-y-4 flex-grow">
              {backendSkills.length > 0 ? backendSkills.map((skill, i) => (
                <div key={i} className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <Server className="w-4 h-4 text-white/40" />
                    <span className="text-sm font-medium text-white/80">{renderSkillName(skill)}</span>
                  </div>
                  {i === 0 && <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">EXPERT</span>}
                </div>
              )) : <span className="text-white/40 text-sm">No skills found</span>}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] tracking-widest text-white/40 uppercase">Uptime Reliability</span>
                <span className="text-xs font-mono text-emerald-400">99.9%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400/50 w-[99.9%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Data Science */}
          <div className="lg:col-span-6 xl:col-span-7 rounded-3xl bg-[#111111] border border-white/5 p-8 hover:bg-[#151515] transition-colors flex flex-col">
            <div className="mb-10">
              <p className="text-xs font-mono text-emerald-400/70 mb-2 uppercase tracking-wider flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                Advanced Specialization
              </p>
              <h3 className="text-3xl font-medium text-white tracking-tight">Data Science & AI/ML</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              {dataScienceSkills.length > 0 ? dataScienceSkills.map((skill, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#161616] border border-white/5 hover:border-white/10 transition-colors">
                  <h4 className="text-sm font-medium text-white/90 mb-1">{renderSkillName(skill)}</h4>
                  <p className="text-xs text-white/40 font-mono">Applied ML / Deep Learning</p>
                </div>
              )) : <span className="text-white/40 text-sm">No skills found</span>}
            </div>
          </div>

          {/* Right Side Stack: Languages, Tooling, Core CS */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6">
            
            {/* Top row in right stack */}
            <div className="grid grid-cols-2 gap-6 flex-grow">
              {/* Languages */}
              <div className="rounded-3xl bg-[#111111] border border-white/5 p-6 hover:bg-[#151515] transition-colors">
                <p className="text-xs font-mono text-white/40 mb-6 uppercase tracking-wider">Languages</p>
                <ul className="space-y-3">
                  {languageSkills.length > 0 ? languageSkills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                      <div className="w-1 h-1 rounded-full bg-white/30"></div>
                      {renderSkillName(skill)}
                    </li>
                  )) : <li className="text-white/40 text-sm">None</li>}
                </ul>
              </div>
              
              {/* Tooling */}
              <div className="rounded-3xl bg-[#111111] border border-white/5 p-6 hover:bg-[#151515] transition-colors">
                <p className="text-xs font-mono text-white/40 mb-6 uppercase tracking-wider">Tooling</p>
                <ul className="space-y-4">
                  {toolSkills.length > 0 ? toolSkills.map((skill, i) => {
                    const skillName = renderSkillName(skill);
                    let Icon = Terminal;
                    if (skillName.toLowerCase().includes('git')) Icon = GitBranch;
                    if (skillName.toLowerCase().includes('docker')) Icon = Layers;
                    return (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <Icon className="w-4 h-4 text-white/40" />
                        {skillName}
                      </li>
                    );
                  }) : <li className="text-white/40 text-sm">None</li>}
                </ul>
              </div>
            </div>

            {/* Bottom row in right stack: Core CS */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1a1c29] to-[#11131a] border border-blue-500/10 p-6 hover:border-blue-500/20 transition-colors flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono text-blue-400/70 mb-2 uppercase tracking-wider">Core Computer Science</p>
                <h4 className="text-sm font-medium text-white/90 leading-relaxed">
                  {coreSkills.length > 0 ? coreSkills.map(s => renderSkillName(s)).join(', ') : 'DSA, OOPS, DBMS'}
                </h4>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 ml-4">
                <Code2 className="w-4 h-4 text-blue-400" />
              </div>
            </div>

          </div>
        </div>

        {/* ROW 3: Infrastructure, Security, and Soft Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Databases Architecture */}
          <div className="lg:col-span-4 rounded-3xl bg-[#111111] border border-white/5 p-8 hover:bg-[#151515] transition-colors flex flex-col">
            <p className="text-xs font-mono text-white/40 mb-6 uppercase tracking-wider">03 / Infrastructure</p>
            <h3 className="text-2xl font-medium text-white tracking-tight mb-8">Database Systems</h3>
            <div className="space-y-4">
              {databaseSkills.length > 0 ? databaseSkills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Database className="w-4 h-4 text-emerald-400/60" />
                  <span className="text-sm font-medium text-white/80">{renderSkillName(skill)}</span>
                </div>
              )) : <span className="text-white/40 text-sm">No databases found</span>}
            </div>
          </div>

          {/* Security & Firewall */}
          <div className="lg:col-span-4 rounded-3xl bg-[#111111] border border-white/5 p-8 hover:bg-[#151515] transition-colors flex flex-col">
            <p className="text-xs font-mono text-white/40 mb-6 uppercase tracking-wider">04 / Protection</p>
            <h3 className="text-2xl font-medium text-white tracking-tight mb-8">Security & Firewall</h3>
            <div className="space-y-4">
              {[...securitySkills, ...firewallSkills].length > 0 ? [...securitySkills, ...firewallSkills].map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400/60" />
                  <span className="text-sm font-medium text-white/80">{renderSkillName(skill)}</span>
                </div>
              )) : <span className="text-white/40 text-sm">No security skills found</span>}
            </div>
          </div>

          {/* Interpersonal */}
          <div className="lg:col-span-4 rounded-3xl bg-[#111111] border border-white/5 p-8 hover:bg-[#151515] transition-colors flex flex-col">
            <p className="text-xs font-mono text-white/40 mb-6 uppercase tracking-wider">05 / Interpersonal</p>
            <h3 className="text-2xl font-medium text-white tracking-tight mb-6">Soft Skills & Comms</h3>
            
            <div className="flex-grow space-y-6">
              {communicationSkills.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-white/40 mb-2">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {communicationSkills.map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-white/80 border border-white/10">{renderSkillName(skill)}</span>
                    ))}
                  </div>
                </div>
              )}

              {softSkills.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-white/40 mb-2">Soft Skills</h4>
                  <ul className="space-y-1">
                    {softSkills.map((skill, i) => (
                      <li key={i} className="text-sm text-white/80 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/40"></span>
                        {renderSkillName(skill)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {strengthsSkills.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-white/40 mb-2">Strengths</h4>
                  <ul className="space-y-1">
                    {strengthsSkills.map((skill, i) => (
                      <li key={i} className="text-sm text-white/80 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/40"></span>
                        {renderSkillName(skill)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Future Focus Section */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-mono text-emerald-400 mb-4 uppercase tracking-wider">Future Focus</p>
          <h2 className="text-4xl font-medium text-white mb-6 tracking-tight">Building Future-Ready Solutions</h2>
          <p className="text-white/60 text-base leading-relaxed mb-8">
            My vision is to bridge the gap between abstract problem-solving and tangible impact. Every line of code is an opportunity to redefine industry standards and empower users globally through intelligent, scalable digital transformation.
          </p>
          
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-1">Passion-Driven Innovation</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                I believe in solving meaningful problems through smart design and innovative technical thinking.
              </p>
            </div>
          </div>
        </div>
        
        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#111]">
          {/* Abstract background for the visual side */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
          <div className="absolute bottom-6 right-6 bg-blue-600 rounded-2xl p-6 shadow-2xl backdrop-blur-md border border-white/10">
            <h3 className="text-4xl font-bold text-white mb-1">05+</h3>
            <p className="text-[10px] font-mono text-white/80 uppercase tracking-widest">Years of Evolution</p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default SkillsSection;

