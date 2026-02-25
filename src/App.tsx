import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  Code2, 
  GraduationCap, 
  Layout, 
  Menu, 
  Play, 
  Search, 
  X,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import Markdown from 'react-markdown';
import { COURSE_STRUCTURE, Unit, Topic } from './constants';
import { getTopicContent, TopicContent } from './services/geminiService';
import { 
  ListVisualizer, 
  StackQueueVisualizer, 
  TreeVisualizer, 
  ComplexityVisualizer, 
  RecursionVisualizer 
} from './components/Visualizer';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [topicContent, setTopicContent] = useState<TopicContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'explanation' | 'exercises'>('explanation');
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (selectedTopic) {
      loadTopic(selectedTopic.title);
    }
  }, [selectedTopic]);

  const loadTopic = async (title: string) => {
    setIsLoading(true);
    setTopicContent(null);
    setUserAnswers({});
    setShowResults({});
    try {
      const content = await getTopicContent(title);
      setTopicContent(content);
    } catch (error) {
      console.error("Error loading topic:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (index: number, value: string) => {
    setUserAnswers(prev => ({ ...prev, [index]: value }));
  };

  const checkAnswer = (index: number) => {
    setShowResults(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-slate-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 320 : 0 }}
        className={cn(
          "bg-white border-r border-slate-200 flex flex-col relative z-20",
          !isSidebarOpen && "border-none"
        )}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <GraduationCap size={24} />
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-lg tracking-tight">LogiRep II Hub</span>
            )}
          </div>
          {isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 lg:hidden"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {COURSE_STRUCTURE.map((unit) => (
            <div key={unit.id} className="space-y-2">
              <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                {unit.title}
              </h3>
              <div className="space-y-1">
                {unit.topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between group",
                      selectedTopic?.id === topic.id
                        ? "bg-emerald-50 text-emerald-700 font-semibold"
                        : "hover:bg-slate-50 text-slate-600"
                    )}
                  >
                    <span className="truncate">{topic.title}</span>
                    <ChevronRight 
                      size={14} 
                      className={cn(
                        "transition-transform",
                        selectedTopic?.id === topic.id ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      )} 
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-slate-50 rounded-lg text-slate-600"
              >
                <Menu size={20} />
              </button>
            )}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Layout size={16} />
              <span>Dashboard</span>
              {selectedTopic && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-slate-900 font-medium">{selectedTopic.title}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              UdeA Ingeniería
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {!selectedTopic ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mb-8 border border-emerald-100">
                <BookOpen size={48} />
              </div>
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Bienvenido a LogiRep II Hub
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                Tu compañero inteligente para dominar Lógica y Representación II. 
                Selecciona un tema del cronograma para comenzar tu sesión de estudio personalizada.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {[
                  { icon: <Search size={20} />, title: "Búsqueda Profunda", desc: "Explicaciones detalladas generadas por IA." },
                  { icon: <Code2 size={20} />, title: "Código Real", desc: "Ejemplos prácticos en Python y C++." },
                  { icon: <Play size={20} />, title: "Interactividad", desc: "Ejercicios para poner a prueba tu lógica." }
                ].map((feature, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-emerald-600 mb-3">{feature.icon}</div>
                    <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-slate-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto p-8">
              {isLoading ? (
                <div className="space-y-8 animate-pulse">
                  <div className="h-12 bg-slate-200 rounded-xl w-3/4" />
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                  </div>
                  <div className="h-64 bg-slate-200 rounded-2xl" />
                </div>
              ) : topicContent ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col gap-6">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                      {selectedTopic.title}
                    </h1>
                    
                    <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
                      <button
                        onClick={() => setActiveTab('explanation')}
                        className={cn(
                          "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                          activeTab === 'explanation' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        Explicación
                      </button>
                      <button
                        onClick={() => setActiveTab('exercises')}
                        className={cn(
                          "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                          activeTab === 'exercises' ? "bg-white text-emerald-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        Ejercicios
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeTab === 'explanation' ? (
                      <motion.div
                        key="explanation"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                      >
                        <div className="prose prose-slate max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed">
                          <Markdown>{topicContent.explanation}</Markdown>
                        </div>

                        {/* Interactive Laboratories */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-900 font-bold">
                            <Play size={20} className="text-emerald-600" />
                            <span>Laboratorio Interactivo</span>
                          </div>
                          
                          {/* Unit 1: Linked Lists */}
                          {COURSE_STRUCTURE.find(u => u.id === 'unit1')?.topics.some(t => t.id === selectedTopic.id) && (
                            <ListVisualizer />
                          )}

                          {/* Unit 2: Stacks & Queues */}
                          {COURSE_STRUCTURE.find(u => u.id === 'unit2')?.topics.some(t => t.id === selectedTopic.id) && (
                            <StackQueueVisualizer />
                          )}

                          {/* Unit 3: Algorithm Analysis */}
                          {COURSE_STRUCTURE.find(u => u.id === 'unit3')?.topics.some(t => t.id === selectedTopic.id) && (
                            <ComplexityVisualizer />
                          )}

                          {/* Unit 4: Recursion */}
                          {COURSE_STRUCTURE.find(u => u.id === 'unit4')?.topics.some(t => t.id === selectedTopic.id) && (
                            <RecursionVisualizer />
                          )}

                          {/* Unit 5: Trees & Graphs */}
                          {COURSE_STRUCTURE.find(u => u.id === 'unit5')?.topics.some(t => t.id === selectedTopic.id) && (
                            <TreeVisualizer />
                          )}

                          {/* Unit 6: Dynamic Programming (Using Recursion Visualizer as a base) */}
                          {COURSE_STRUCTURE.find(u => u.id === 'unit6')?.topics.some(t => t.id === selectedTopic.id) && (
                            <RecursionVisualizer />
                          )}

                          {/* Unit 7: NP-Completeness (Using Complexity Visualizer) */}
                          {COURSE_STRUCTURE.find(u => u.id === 'unit7')?.topics.some(t => t.id === selectedTopic.id) && (
                            <ComplexityVisualizer />
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-slate-900 font-bold">
                            <Code2 size={20} className="text-emerald-600" />
                            <span>Ejemplo de Implementación</span>
                          </div>
                          <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto shadow-xl">
                            <pre className="text-emerald-400 font-mono text-sm leading-relaxed">
                              <code>{topicContent.codeExample}</code>
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="exercises"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        {topicContent.exercises.map((ex, idx) => (
                          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 block">
                                  Ejercicio {idx + 1}
                                </span>
                                <p className="text-slate-900 font-medium text-lg">{ex.question}</p>
                              </div>
                              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                                <Lightbulb size={20} />
                              </div>
                            </div>

                            {ex.type === 'multiple-choice' && ex.options ? (
                              <div className="grid grid-cols-1 gap-3">
                                {ex.options.map((opt, oIdx) => (
                                  <button
                                    key={oIdx}
                                    onClick={() => handleAnswerChange(idx, opt)}
                                    className={cn(
                                      "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between",
                                      userAnswers[idx] === opt
                                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                        : "border-slate-100 hover:border-slate-200 bg-slate-50"
                                    )}
                                  >
                                    <span>{opt}</span>
                                    {userAnswers[idx] === opt && <CheckCircle2 size={18} />}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <textarea
                                value={userAnswers[idx] || ''}
                                onChange={(e) => handleAnswerChange(idx, e.target.value)}
                                placeholder="Escribe tu respuesta lógica o código aquí..."
                                className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-sm font-mono"
                              />
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                              <button
                                onClick={() => checkAnswer(idx)}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200 flex items-center gap-2"
                              >
                                Verificar <ArrowRight size={16} />
                              </button>
                              
                              {showResults[idx] && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className={cn(
                                    "flex items-center gap-2 text-sm font-bold",
                                    userAnswers[idx]?.toLowerCase().trim() === ex.answer.toLowerCase().trim()
                                      ? "text-emerald-600"
                                      : "text-amber-600"
                                  )}
                                >
                                  {userAnswers[idx]?.toLowerCase().trim() === ex.answer.toLowerCase().trim() ? (
                                    <><CheckCircle2 size={18} /> ¡Correcto!</>
                                  ) : (
                                    <div className="flex flex-col items-end">
                                      <div className="flex items-center gap-2">
                                        <AlertCircle size={18} /> Revisa la pista
                                      </div>
                                      <span className="text-[10px] font-normal text-slate-400 mt-1 italic">
                                        Pista: {ex.hint}
                                      </span>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-slate-400">
                  <AlertCircle size={48} className="mb-4" />
                  <p>No se pudo cargar el contenido. Por favor intenta de nuevo.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}
