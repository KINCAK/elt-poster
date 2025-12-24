import React, { useState } from 'react';

const App = () => {
  const [skill, setSkill] = useState('Writing');
  const [generatedDraft, setGeneratedDraft] = useState(null);

  // Links to your actual assignments in the 'public' folder
  const files = {
    grammar: "/VocabngrammarZEYNEPKINCAK.docx",
    reading: "/KINCAKREADINGTEST (1).docx",
    speaking: "/speaking test elt403.docx"
  };

  const sections = [
    { 
      id: 1, 
      title: "1. The Foundation", 
      sub: "Assessment vs. Testing", 
      icon: "📖", 
      text: "Testing is just a snapshot, but assessment is the journey. Our SAT analysis showed us that multiple-choice questions often only check if we recognize language traits, not if we can actually use them to communicate.",
      file: files.grammar
    },
    { 
      id: 2, 
      title: "2. The Pillars", 
      sub: "Validity & Reliability", 
      icon: "⚖️", 
      text: "In our speaking test design, we learned that using two examiners, a silent assessor and an interlocutor, is a critical reliability strategy to keep the scoring objective and fair for every student.",
      file: files.speaking
    },
    { 
      id: 3, 
      title: "3. The Heart", 
      sub: "Feedback & Interaction", 
      icon: "💬", 
      text: "Interaction is key. we chose a paired administration format for our speaking test because it allows for a more authentic assessment of interactional skills compared to a standard one-on-one interview.",
      file: files.speaking
    },
    { 
      id: 4, 
      title: "4. The Impact", 
      sub: "The Backwash Effect", 
      icon: "🔄", 
      text: "The Backwash Effect is huge. If we only test recognition, students might focus on rote memorization. We need tasks that push them to actually produce language in real-world contexts.",
      file: files.grammar
    },
    { 
      id: 5, 
      title: "5. The Blueprint", 
      sub: "Test Specifications", 
      icon: "📝", 
      // FIXED: Added missing opening quotation mark below
      text: "Looking at reading tests taught us to target specific sub-skills like skimming for main ideas and careful reading for detail to ensure high construct validity.",
      file: files.reading
    },
    { 
      id: 6, 
      title: "6. Young Learners", 
      sub: "Functional Assessment", 
      icon: "🎨", 
      text: "For younger learners, it's about what they CAN do. We believe adding timed write-ups or short fill-in-the-blanks helps align our tests with how we actually use language in modern life.",
      file: files.grammar
    }
  ];

  return (
    <div className="world-container">
      {/* GLOWING BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[150px]"></div>
      </div>

      {/* FIXED: Removed the extra '*' that was here */}
      <div className="player-character">
        <div className="flex flex-col items-center">
          <div className="text-7xl drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">👩‍🎓</div>
          <div className="mt-4 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg border border-blue-400">
            Zeynep Kınçak
          </div>
        </div>
      </div>

      {/* HORIZONTAL STORY PATH */}
      <div className="flex items-center h-full">
        {sections.map((s) => (
          <section key={s.id} className="storybox w-[100vw] h-full flex items-center justify-center shrink-0 px-8">
            <div className="storybox-card bg-white/10 backdrop-blur-md p-10 rounded-[50px] border border-white/20 shadow-2xl max-w-xl text-center">
              <span className="text-6xl mb-6 block drop-shadow-md">{s.icon}</span>
              <h2 className="text-4xl font-bold text-white mb-2 font-serif">{s.title}</h2>
              <p className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-6">{s.sub}</p>
              <p className="text-slate-200 text-lg italic leading-relaxed mb-8">"{s.text}"</p>
              
              <a 
                href={s.file} 
                download 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold text-sm transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
              >
                📂 Open Project File
              </a>
            </div>
          </section>
        ))}

        {/* TEST DESIGN TERMINAL */}
        <section className="storybox w-[150vw] h-full flex items-center justify-center shrink-0 px-8">
          <div className="storybox-card bg-slate-900/80 backdrop-blur-xl p-12 rounded-[60px] border-2 border-blue-500/50 shadow-2xl max-w-3xl w-full text-white">
            <h2 className="text-4xl font-bold mb-4 font-serif text-blue-400">Test Design Terminal</h2>
            <p className="text-slate-400 mb-8 text-lg">Input your parameters to finalize your draft.</p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <select 
                value={skill} 
                onChange={(e) => setSkill(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 flex-grow text-lg outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="Writing">Skill: Writing (SAT Critique)</option>
                <option value="Reading">Skill: Reading (Architecture of Joy)</option>
                <option value="Speaking">Skill: Speaking (B2 Paired Test)</option>
              </select>
              <button 
                onClick={() => setGeneratedDraft(skill)}
                className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95"
              >
                View Summary
              </button>
            </div>np

            {generatedDraft && (
              <div className="bg-blue-900/30 p-8 rounded-3xl border border-blue-500/30 text-left">
                <p className="text-blue-200 font-mono text-xl mb-4 uppercase font-bold tracking-widest">System Output:</p>
                <div className="text-slate-300 space-y-2 text-sm">
                  {generatedDraft === 'Writing' && (
                    <p>Focuses on transitioning from recognition to production to avoid negative backwash. Prioritizes timed write-ups over simple multiple-choice.</p>
                  )}
                  {generatedDraft === 'Reading' && (
                    <p>B2/C1 target using 'The Architecture of Joy.' Tests skimming for main ideas and careful reading for explicit facts and inferences.</p>
                  )}
                  {generatedDraft === 'Speaking' && (
                    <p>Paired administration format for authentic interaction. Employs analytical rubrics for grammar, discourse, and pronunciation.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

,        <section className="w-[100vw] h-full flex items-center justify-center shrink-0">
          <div className="text-center">
            <h2 className="text-6xl font-serif text-white mb-4">The End.</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-blue-400 font-bold tracking-[0.3em] uppercase">Made by Zeynep Kınçak</p>
          </div>
        </section>
      </div>

      <div className="floor"></div>
    </div>
  );
};

export default App;