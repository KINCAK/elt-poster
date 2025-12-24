import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle, RefreshCw, Target, Users, MessageSquare, 
  Zap, FileText, Star, Info, Sparkles, BrainCircuit, ClipboardCheck 
} from 'lucide-react';
import StarBackground from './StarBackground'; 
import InteractiveCursor from './InteractiveCursor';

const App = () => {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { 
      id: 'foundation', 
      title: '1. The Foundation', 
      icon: <BookOpen className="w-6 h-6" />, 
      color: 'bg-[#6c269e]/20 text-purple-300', 
      content: 'Assessment vs. Testing', 
      details: [
        'Testing: Formal, standardized snapshots (TOEFL, IELTS) used for high-stakes decisions.', 
        'Assessment: The broad umbrella including classroom tasks, observations, and portfolios.', 
        'Summative (AoL): Measuring achievement at the end of a unit to provide a final grade.', 
        'Formative (AfL): Ongoing support used to guide future learning and provide immediate feedback.'
      ] 
    },
    { 
      id: 'pillars', 
      title: '2. The Pillars', 
      icon: <Target className="w-6 h-6" />, 
      color: 'bg-[#6c269e]/20 text-purple-300', 
      content: 'Validity & Reliability', 
      details: [
        'Validity: Does the test measure what it claims to? (Content, Construct, and Face validity).', 
        'Reliability: Is the scoring consistent across different raters and time periods?', 
        'Practicality: Is the test stay within budget, time, and resource constraints?', 
        'Rule: A test can be reliable without being valid, but it cannot be valid without being reliable.'
      ] 
    },
    { 
      id: 'feedback', 
      title: '3. The Heart', 
      icon: <MessageSquare className="w-6 h-6" />, 
      color: 'bg-[#6c269e]/20 text-purple-300', 
      content: 'The 3 Fs & 5 Cs', 
      details: [
        'Feed Up: Clarifying goals (Where am I going?).', 
        'Feedback: Current performance data (How am I doing?).', 
        'Feed Forward: Actionable next steps (Where to next?).', 
        'The 5 Cs: Feedback must be Clear, Coherent, Collaborative, Communicative, and Caring.'
      ] 
    },
    { 
      id: 'washback', 
      title: '4. The Impact', 
      icon: <RefreshCw className="w-6 h-6" />, 
      color: 'bg-[#6c269e]/20 text-purple-300', 
      content: 'Washback Effect', 
      details: [
        'Positive Washback: When testing motivates meaningful practice and better teaching methods.', 
        'Negative Washback: "Teaching to the test" where the curriculum narrows to only cover exam items.', 
        'Impact: The effect of a test on the individual, the classroom, and society at large.',
        'Alignment: Ensuring that what we teach matches what we assess.'
      ] 
    },
    { 
      id: 'specs', 
      title: '5. The Blueprint', 
      icon: <FileText className="w-6 h-6" />, 
      color: 'bg-[#6c269e]/20 text-purple-300', 
      content: 'Test Specifications', 
      details: [
        'Design: Defining the purpose, target audience, and specific language skills to be tested.', 
        'Item Writing: Creating clear, non-ambiguous questions that match the difficulty level.', 
        'Scoring Rubrics: Developing objective criteria (Analytic vs. Holistic) for consistent grading.', 
        'Piloting: Testing the items on a small group before the final administration.'
      ] 
    },
    { 
      id: 'yl', 
      title: '6. Young Learners', 
      icon: <Users className="w-6 h-6" />, 
      color: 'bg-[#6c269e]/20 text-purple-300', 
      content: 'Assessing Kids', 
      details: [
        'Scaffolding: Using visuals, movement (TPR), and realia to make tasks concrete.', 
        'Low Affective Filter: Reducing anxiety to allow students to demonstrate true ability.', 
        'Observation: Using non-intrusive methods to assess progress during natural play/tasks.', 
        'Encouragement: Focusing on "Can-Do" statements rather than pointing out errors.'
      ] 
    }
  ];

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans relative overflow-x-hidden text-white">
      <StarBackground />
      <InteractiveCursor /> 
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <div className="inline-block bg-[#6c269e]/10 text-[#6c269e] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-[#6c269e]/20">
            TEDU ELT 403 Poster
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter cursor-default">
            <div className="inline-block mr-4">
              {"LANGUAGE".split("").map((char, i) => (
                <span key={`l-${i}`} className="key inline-block">{char}</span>
              ))}
            </div>
            <div className="inline-block text-[#6c269e]">
              {"ASSESSMENT".split("").map((char, i) => (
                <span key={`a-${i}`} className="key inline-block">{char}</span>
              ))}
            </div>
          </h1>

          <p className="text-xl text-slate-400 font-medium italic max-w-2xl mx-auto">
            A comprehensive visual poster.
          </p>
          <div className="w-24 h-1 bg-[#6c269e] mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(108,38,158,0.5)]"></div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((s, index) => (
            <div 
              key={s.id} 
              className="poster-card bg-slate-800/40 backdrop-blur-md p-8 rounded-[2rem] shadow-xl border border-white/10 transition-all duration-500 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={`${s.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform -rotate-3 border border-purple-500/30`}>
                {s.icon}
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">{s.title}</h2>
              <p className="text-[#a855f7] font-bold uppercase text-xs tracking-widest mb-6">
                {s.content}
              </p>
              
              <ul className="space-y-4">
                {s.details.map((detail, i) => (
                  <li key={i} className="flex gap-3 items-start group">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6c269e]/50 group-hover:bg-[#6c269e] transition-colors"></div>
                    <p className="text-slate-300 text-sm leading-relaxed">{detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </main>

        <section className="mt-20 p-10 bg-white/5 backdrop-blur-lg rounded-[3rem] text-white relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <BrainCircuit className="w-40 h-40" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Star className="text-yellow-400 fill-yellow-400" /> Final Takeaway
            </h2>
            <p className="text-xl font-serif italic text-slate-200 leading-relaxed">
              "Assessment should be a bridge to learning, not a barrier to it (Do not use assessment as punishment!). We should be balancing reliability with care and validity with practicality, so we can assist our students to see their own growth."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-[#6c269e] rounded-full flex items-center justify-center font-black">ZK</div>
              <div>
                <p className="font-bold text-lg">Zeynep Kınçak</p>
                <p className="text-slate-400 text-sm uppercase tracking-widest">TED University • ELT 2025</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center mt-20 pb-10 border-t border-white/10 pt-10 text-slate-500 text-xs">
          kairakincak.com • Interactive Educational Poster Concept
        </footer>
      </div>
    </div>
  );
};

export default App;