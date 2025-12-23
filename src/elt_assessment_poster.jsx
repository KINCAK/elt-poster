import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  RefreshCw, 
  Target, 
  Users, 
  MessageSquare, 
  Zap, 
  FileText,
  Star,
  Info,
  Sparkles,
  Loader2,
  ChevronRight,
  BrainCircuit,
  ClipboardCheck
} from 'lucide-react';

import BlobCursor from './BlobCursor';

const App = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [aiSummary, setAiSummary] = useState('');
  const [testSpecPrompt, setTestSpecPrompt] = useState({ skill: 'Writing', level: 'Intermediate' });
  const [isDraftingSpec, setIsDraftingSpec] = useState(false);
  const [specResult, setSpecResult] = useState('');
  
  // NEW STATES FOR TEST GENERATOR
  const [testObjective, setTestObjective] = useState('');
  const [fullTestResult, setFullTestResult] = useState('');
  const [isGeneratingTest, setIsGeneratingTest] = useState(false);

  // Note: Using the key from your .env snippet
  const apiKey = "AIzaSyAj1stHQe-NrBefFKO-r3txW13YICi6GWk"; 

  const sections = [
    {
      id: 'foundation',
      title: '1. The Foundation',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-500',
      content: 'Assessment vs. Testing',
      details: [
        'Testing: Formal, standardized snapshots (TOEFL, IELTS).',
        'Assessment: The broad umbrella including classroom tasks.',
        'Summative (AoL): Measuring achievement at the end.',
        'Formative (AfL): Ongoing support to guide future learning.'
      ]
    },
    {
      id: 'pillars',
      title: '2. The Pillars',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-green-500',
      content: 'Validity & Reliability',
      details: [
        'Validity: Does it measure what it claims to? (Content, Construct, Face).',
        'Reliability: Is it consistent? (Scoring, administration, test-taker performance).',
        'Rule: If a test is not reliable, it cannot be valid!'
      ]
    },
    {
      id: 'feedback',
      title: '3. The Heart: Feedback',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-purple-500',
      content: 'The 3 Fs & 5 Cs',
      details: [
        'Feed Up: Where am I going? (Goals).',
        'Feedback: How am I doing? (Current performance).',
        'Feed Forward: Where to next? (Actionable steps).',
        'The 5 Cs: Clarity, Coherence, Collaboration, Communication, Care.'
      ]
    },
    {
      id: 'washback',
      title: '4. The Impact',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'bg-orange-500',
      content: 'Washback Effect',
      details: [
        'Positive Washback: Motivates meaningful practice (e.g., project-based assessment).',
        'Negative Washback: Teaching to the test, narrowing the curriculum to MCQs.'
      ]
    },
    {
      id: 'specs',
      title: '5. The Blueprint',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-red-500',
      content: 'Test Specifications',
      details: [
        'Purpose, Format, Content, Timing.',
        'Scoring criteria (Rubrics/Keys).',
        'Reliability & Validity considerations.',
        'Item selection & Difficulty level.'
      ]
    },
    {
      id: 'yl',
      title: '6. Young Learners',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-teal-500',
      content: 'Assessing Kids',
      details: [
        'Concrete & Meaningful: Use visuals and movement.',
        'Low Stress: Minimize anxiety, focus on progress not ranking.',
        'Variety: Short tasks due to limited attention spans.',
        'Feedback: Use symbols, stickers, and encouraging words.'
      ]
    }
  ];

  const callGemini = async (prompt, systemInstruction) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    let delay = 1000;
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text;
      } catch (error) {
        if (i === 4) throw error;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  };

  const generateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const contentString = sections.map(s => `${s.title}: ${s.content} - ${s.details.join(', ')}`).join('\n');
      const result = await callGemini(
        `Summarize these ELT assessment key concepts into a 3-sentence study guide: ${contentString}`,
        "You are an expert ELT Professor helping a student review for an exam."
      );
      setAiSummary(result);
    } catch (error) {
      setAiSummary("Oops! I couldn't generate a summary right now.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const draftTestSpec = async () => {
    setIsDraftingSpec(true);
    try {
      const prompt = `Draft a brief test specification for a ${testSpecPrompt.skill} test for ${testSpecPrompt.level} learners. Include Purpose, Format, and one Reliability tip.`;
      const result = await callGemini(
        prompt,
        "You are an expert in Language Assessment specializing in writing Test Specifications."
      );
      setSpecResult(result);
    } catch (error) {
      setSpecResult("Error drafting specification.");
    } finally {
      setIsDraftingSpec(false);
    }
  };

  // NEW: GENERATE FULL TEST CONTENT
  const generateFullTest = async () => {
    if (!testObjective) return alert("Please enter a learning objective!");
    setIsGeneratingTest(true);
    try {
      const prompt = `Create a draft ELT test for ${testSpecPrompt.skill} at ${testSpecPrompt.level} level. 
      Learning Objective: ${testObjective}. 
      Include: 1. Instructions, 2. 3-5 Questions, 3. Answer Key.`;
      
      const result = await callGemini(
        prompt,
        "You are an expert ELT teacher. Create a high-quality test draft based on the objective."
      );
      setFullTestResult(result);
    } catch (error) {
      setFullTestResult("Error generating test content.");
    } finally {
      setIsGeneratingTest(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans relative overflow-x-hidden">
      <BlobCursor fillColor="#6B8E8E" trailCount={4} zIndex={0} />

      <div className="relative z-10">
        <header className="max-w-6xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            ELT 403: <span className="text-blue-600">Assessment & Evaluation</span>
          </h1>
          <p className="text-xl text-slate-600 font-medium font-serif italic">
            A Visual Poster by KINCAK, TEDU ELT 4th Year
          </p>
        </header>

        {/* SUMMARY SECTION */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col items-center">
          <button 
            onClick={generateSummary}
            disabled={isGeneratingSummary}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isGeneratingSummary ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            ✨ Quick AI Study Summary
          </button>
          {aiSummary && (
            <div className="mt-4 bg-white border-l-4 border-blue-500 p-4 rounded-xl shadow-md max-w-2xl animate-in fade-in slide-in-from-top-2">
              <p className="text-slate-700 text-sm italic">"{aiSummary}"</p>
            </div>
          )}
        </div>

        {/* CARDS GRID */}
        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={`relative overflow-hidden rounded-3xl transition-all duration-300 transform cursor-pointer
                ${activeSection === section.id ? 'scale-105 shadow-2xl ring-4 ring-offset-2 ring-slate-200' : 'shadow-lg hover:shadow-xl hover:-translate-y-1'}
                bg-white border border-slate-100 p-6`}
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              <div className={`${section.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                {section.icon}
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">{section.title}</h2>
              <p className="text-blue-600 font-semibold mb-3">{section.content}</p>
              
              <div className={`space-y-2 transition-all duration-500 ${activeSection === section.id ? 'opacity-100 max-h-96 mt-4' : 'opacity-60 max-h-20 overflow-hidden'}`}>
                {section.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-slate-300" />
                    <p className="text-slate-600 text-sm leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>

              {activeSection !== section.id && (
                <div className="mt-4 flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <Info className="w-3 h-3 mr-1" /> Tap to expand
                </div>
              )}
            </div>
          ))}
        </main>

        {/* NEW COMBINED AI ASSESSMENT LAB */}
        <section className="max-w-6xl mx-auto mt-12 bg-slate-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden border border-slate-700">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <BrainCircuit className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-blue-400 w-8 h-8" />
              <h2 className="text-3xl font-bold tracking-tight">AI Assessment Lab</h2>
            </div>
            
            <p className="text-slate-400 mb-8 max-w-xl">
              Select your parameters and enter a specific learning objective to draft professional test specifications and items.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Skill</label>
                <select 
                  value={testSpecPrompt.skill}
                  onChange={(e) => setTestSpecPrompt({...testSpecPrompt, skill: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Reading</option>
                  <option>Writing</option>
                  <option>Listening</option>
                  <option>Speaking</option>
                  <option>Grammar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Level</label>
                <select 
                  value={testSpecPrompt.level}
                  onChange={(e) => setTestSpecPrompt({...testSpecPrompt, level: e.target.value})}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option>Beginner (A1-A2)</option>
                  <option>Intermediate (B1-B2)</option>
                  <option>Advanced (C1-C2)</option>
                  <option>Young Learners</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Learning Objective</label>
                <input 
                  type="text"
                  placeholder="e.g. Identifying main ideas in news"
                  value={testObjective}
                  onChange={(e) => setTestObjective(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <button 
                onClick={draftTestSpec}
                disabled={isDraftingSpec}
                className="flex-1 min-w-[200px] bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isDraftingSpec ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                1. Draft Spec Blueprint
              </button>
              <button 
                onClick={generateFullTest}
                disabled={isGeneratingTest}
                className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 disabled:opacity-50"
              >
                {isGeneratingTest ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                2. Generate Test Draft
              </button>
            </div>

            {/* RESULTS VIEW */}
            {(specResult || fullTestResult) && (
              <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                {specResult && (
                  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
                    <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest border-b border-slate-700 pb-2">
                      <ClipboardCheck className="w-4 h-4" /> Specification Result
                    </h3>
                    <div className="text-slate-300 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {specResult}
                    </div>
                  </div>
                )}
                {fullTestResult && (
                  <div className="bg-white p-6 rounded-2xl shadow-xl">
                    <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2 text-xs uppercase tracking-widest border-b border-slate-100 pb-2">
                      <Sparkles className="w-4 h-4 text-blue-600" /> Draft Test Content
                    </h3>
                    <div className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                      {fullTestResult}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* TAKEAWAYS SECTION */}
        <section className="max-w-6xl mx-auto mt-12 bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-yellow-500 w-8 h-8 fill-yellow-500" />
            <h2 className="text-3xl font-bold text-slate-800">My Big Takeaways</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl h-fit">
                  <Star className="text-blue-600 w-6 h-6 fill-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Balance is Key</h3>
                  <p className="text-slate-600">Don't just measure learning (Summative); use assessment to <i>drive</i> learning (Formative). Integrating teaching and testing creates a cohesive classroom experience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-green-50 p-3 rounded-2xl h-fit">
                  <CheckCircle className="text-green-600 w-6 h-6 fill-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Practical Reliability</h3>
                  <p className="text-slate-600">To make a test reliable: use clear instructions, provide uniform conditions, and use objective scoring keys. No ambiguity allowed!</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col justify-center">
              <p className="text-xl italic font-serif leading-relaxed mb-4">
                "Assessment should be a bridge, not a barrier. It's about empowering students to see their own progress through clear feedback."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">KS</div>
                <div>
                  <p className="font-bold">KINCAK</p>
                  <p className="text-slate-400 text-sm font-medium">TEDU ELT 4th Year</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center mt-12 pb-8">
          <p className="text-slate-400 text-sm">
            ELT 403 Assignment • Created with a touch of creativity
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;