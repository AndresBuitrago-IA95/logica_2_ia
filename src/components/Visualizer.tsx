import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  ArrowRight, 
  RotateCcw, 
  Search, 
  Eraser, 
  ArrowDownToLine, 
  ArrowUpToLine,
  Hash,
  Layers,
  ListOrdered,
  GitBranch,
  Activity,
  ChevronDown
} from 'lucide-react';

// --- UTILS ---
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

const MethodButton = ({ onClick, icon, label, color }: { onClick: () => void, icon: React.ReactNode, label: string, color: string }) => {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100",
    red: "bg-red-50 text-red-700 hover:bg-red-100 border-red-100",
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100",
    slate: "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-100",
    amber: "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl border text-[11px] font-bold transition-all active:scale-95",
        colors[color]
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// --- LINKED LIST VISUALIZER ---
export const ListVisualizer = () => {
  const [nodes, setNodes] = useState<number[]>([10, 20, 30]);
  const [inputValue, setInputValue] = useState('');
  const [indexValue, setIndexValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

  const insertAtBeginning = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setNodes([val, ...nodes]);
      setInputValue('');
      showMessage(`Insertado ${val} al inicio`);
    }
  };

  const insertAtEnd = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setNodes([...nodes, val]);
      setInputValue('');
      showMessage(`Insertado ${val} al final`);
    }
  };

  const insertAtIndex = () => {
    const val = parseInt(inputValue);
    const idx = parseInt(indexValue);
    if (!isNaN(val) && !isNaN(idx)) {
      if (idx < 0 || idx > nodes.length) {
        showMessage("Índice fuera de rango");
        return;
      }
      const newNodes = [...nodes];
      newNodes.splice(idx, 0, val);
      setNodes(newNodes);
      setInputValue('');
      setIndexValue('');
      showMessage(`Insertado ${val} en índice ${idx}`);
    }
  };

  const removeFromBeginning = () => {
    if (nodes.length > 0) {
      const removed = nodes[0];
      setNodes(nodes.slice(1));
      showMessage(`Eliminado ${removed} del inicio`);
    }
  };

  const removeFromEnd = () => {
    if (nodes.length > 0) {
      const removed = nodes[nodes.length - 1];
      setNodes(nodes.slice(0, -1));
      showMessage(`Eliminado ${removed} del final`);
    }
  };

  const removeByValue = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      const index = nodes.indexOf(val);
      if (index !== -1) {
        setNodes(nodes.filter((_, i) => i !== index));
        setInputValue('');
        showMessage(`Eliminado valor ${val}`);
      } else {
        showMessage(`Valor ${val} no encontrado`);
      }
    }
  };

  const reverseList = () => {
    setNodes([...nodes].reverse());
    showMessage("Lista invertida");
  };

  const clearList = () => {
    setNodes([]);
    showMessage("Lista vaciada");
  };

  const searchNode = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      const index = nodes.indexOf(val);
      if (index !== -1) {
        setHighlightedIndex(index);
        showMessage(`Encontrado en índice ${index}`);
        setTimeout(() => setHighlightedIndex(null), 2000);
      } else {
        showMessage("No encontrado");
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900">Laboratorio de Listas Ligadas</h3>
          <p className="text-xs text-slate-400">Simulación de Lista Simplemente Ligada</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Valor"
              className="w-24 pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <Hash size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          <div className="relative">
            <input
              type="number"
              value={indexValue}
              onChange={(e) => setIndexValue(e.target.value)}
              placeholder="Índice"
              className="w-24 pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <Hash size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2">
        <MethodButton onClick={insertAtBeginning} icon={<ArrowUpToLine size={14} />} label="Ins. Inicio" color="emerald" />
        <MethodButton onClick={insertAtEnd} icon={<ArrowDownToLine size={14} />} label="Ins. Final" color="emerald" />
        <MethodButton onClick={insertAtIndex} icon={<Plus size={14} />} label="Ins. Índice" color="emerald" />
        <MethodButton onClick={searchNode} icon={<Search size={14} />} label="Buscar" color="blue" />
        <MethodButton onClick={reverseList} icon={<RotateCcw size={14} />} label="Invertir" color="indigo" />
        <MethodButton onClick={removeFromBeginning} icon={<ArrowUpToLine size={14} className="rotate-180" />} label="Del. Inicio" color="red" />
        <MethodButton onClick={removeFromEnd} icon={<ArrowDownToLine size={14} className="rotate-180" />} label="Del. Final" color="red" />
        <MethodButton onClick={removeByValue} icon={<Trash2 size={14} />} label="Del. Valor" color="red" />
        <MethodButton onClick={clearList} icon={<Eraser size={14} />} label="Vaciar" color="slate" />
      </div>

      <div className="relative min-h-[140px] p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center overflow-x-auto custom-scrollbar">
        <AnimatePresence>
          <div className="flex items-center gap-4">
            {nodes.map((node, i) => (
              <React.Fragment key={`${node}-${i}`}>
                <motion.div
                  layout
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    borderColor: highlightedIndex === i ? '#10b981' : '#e2e8f0',
                    backgroundColor: highlightedIndex === i ? '#ecfdf5' : '#ffffff'
                  }}
                  exit={{ scale: 0, opacity: 0, y: -20 }}
                  className={cn(
                    "relative flex flex-col items-center gap-1 shrink-0",
                    highlightedIndex === i && "z-10"
                  )}
                >
                  <div className="text-[10px] font-bold text-slate-400 mb-1">[{i}]</div>
                  <div className={cn(
                    "w-16 h-16 bg-white border-2 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm transition-all duration-500",
                    highlightedIndex === i ? "border-emerald-500 text-emerald-600 scale-110 shadow-emerald-100 shadow-xl" : "border-slate-200 text-slate-700"
                  )}>
                    {node}
                  </div>
                </motion.div>
                
                {i < nodes.length - 1 && (
                  <motion.div
                    layout
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    className="text-slate-300 shrink-0"
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                )}
              </React.Fragment>
            ))}
            
            {nodes.length === 0 && (
              <div className="w-full text-center text-slate-400 text-sm italic py-8">
                La lista está vacía. Usa los métodos arriba para interactuar.
              </div>
            )}
            
            {nodes.length > 0 && (
              <div className="flex items-center gap-3 shrink-0">
                <ArrowRight size={24} className="text-slate-300" />
                <div className="px-3 py-1.5 bg-slate-200 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-sm">NULL</div>
              </div>
            )}
          </div>
        </AnimatePresence>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-800 text-white text-[10px] font-bold rounded-full shadow-lg z-30"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- STACK & QUEUE VISUALIZER ---
export const StackQueueVisualizer = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3]);
  const [mode, setMode] = useState<'stack' | 'queue'>('stack');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  const handlePush = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setItems([...items, val]);
      setInputValue('');
      showMessage(mode === 'stack' ? `Push: ${val}` : `Enqueue: ${val}`);
    }
  };

  const handlePop = () => {
    if (items.length === 0) {
      showMessage("Underflow: Estructura vacía");
      return;
    }
    if (mode === 'stack') {
      const popped = items[items.length - 1];
      setItems(items.slice(0, -1));
      showMessage(`Pop: ${popped}`);
    } else {
      const dequeued = items[0];
      setItems(items.slice(1));
      showMessage(`Dequeue: ${dequeued}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">Laboratorio de Pilas y Colas</h3>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => setMode('stack')}
              className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all", mode === 'stack' ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400")}
            >
              Pila (LIFO)
            </button>
            <button 
              onClick={() => setMode('queue')}
              className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all", mode === 'queue' ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400")}
            >
              Cola (FIFO)
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Valor"
            className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button onClick={handlePush} className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"><Plus size={18} /></button>
          <button onClick={handlePop} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><Trash2 size={18} /></button>
        </div>
      </div>

      <div className="h-[200px] bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-end justify-center p-6 overflow-hidden relative">
        <div className={cn("flex gap-2", mode === 'stack' ? "flex-col-reverse w-32" : "flex-row w-full items-center justify-center")}>
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={`${item}-${i}`}
                initial={{ opacity: 0, scale: 0.5, y: -50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: mode === 'queue' ? -100 : 0, y: mode === 'stack' ? -100 : 0 }}
                className={cn(
                  "h-12 flex items-center justify-center bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-700 shadow-sm shrink-0",
                  mode === 'stack' ? "w-full" : "w-12"
                )}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {message && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-4 px-4 py-1 bg-slate-800 text-white text-[10px] rounded-full">
            {message}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- TREE VISUALIZER ---
interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export const TreeVisualizer = () => {
  const [root, setRoot] = useState<TreeNode | null>({
    value: 50,
    left: { value: 30, left: { value: 20 }, right: { value: 40 } },
    right: { value: 70, left: { value: 60 }, right: { value: 80 } }
  });
  const [inputValue, setInputValue] = useState('');

  const insertBST = (node: TreeNode | null, val: number): TreeNode => {
    if (!node) return { value: val };
    if (val < node.value) node.left = insertBST(node.left || null, val);
    else if (val > node.value) node.right = insertBST(node.right || null, val);
    return { ...node };
  };

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setRoot(insertBST(root, val));
      setInputValue('');
    }
  };

  const renderTree = (node: TreeNode | null, x: number, y: number, offset: number): React.ReactNode => {
    if (!node) return null;
    return (
      <g>
        {node.left && (
          <line x1={x} y1={y} x2={x - offset} y2={y + 60} stroke="#CBD5E1" strokeWidth="2" />
        )}
        {node.right && (
          <line x1={x} y1={y} x2={x + offset} y2={y + 60} stroke="#CBD5E1" strokeWidth="2" />
        )}
        <circle cx={x} cy={y} r="20" fill="white" stroke="#10B981" strokeWidth="2" />
        <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1E293B">{node.value}</text>
        {renderTree(node.left || null, x - offset, y + 60, offset / 1.8)}
        {renderTree(node.right || null, x + offset, y + 60, offset / 1.8)}
      </g>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">Laboratorio de Árboles</h3>
          <p className="text-xs text-slate-400">Árbol Binario de Búsqueda (BST)</p>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Valor"
            className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button onClick={handleInsert} className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"><Plus size={18} /></button>
          <button onClick={() => setRoot(null)} className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-200"><Eraser size={18} /></button>
        </div>
      </div>

      <div className="h-[300px] bg-slate-50 rounded-2xl border border-dashed border-slate-200 overflow-auto p-4 flex justify-center">
        <svg width="600" height="300" className="min-w-[600px]">
          {renderTree(root, 300, 40, 120)}
        </svg>
      </div>
    </div>
  );
};

// --- COMPLEXITY VISUALIZER ---
export const ComplexityVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedComplexity, setSelectedComplexity] = useState<string[]>(['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)']);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Axes
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, 260);
    ctx.lineTo(390, 260);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#64748B';
    ctx.font = '10px Inter';
    ctx.fillText('Operaciones (T)', 5, 20);
    ctx.fillText('Datos (n)', 350, 275);

    const drawCurve = (color: string, fn: (n: number) => number) => {
      ctx.strokeStyle = color;
      ctx.beginPath();
      for (let n = 0; n <= 100; n++) {
        const x = 40 + (n * 3.5);
        const y = 260 - (fn(n) * 2);
        if (y < 10) break;
        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    if (selectedComplexity.includes('O(1)')) drawCurve('#10B981', () => 10);
    if (selectedComplexity.includes('O(log n)')) drawCurve('#3B82F6', (n) => Math.log2(n + 1) * 15);
    if (selectedComplexity.includes('O(n)')) drawCurve('#F59E0B', (n) => n);
    if (selectedComplexity.includes('O(n log n)')) drawCurve('#8B5CF6', (n) => n * Math.log2(n + 1) * 0.2);
    if (selectedComplexity.includes('O(n^2)')) drawCurve('#EF4444', (n) => (n * n) * 0.02);

  }, [selectedComplexity]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">Visualizador de Complejidad</h3>
          <p className="text-xs text-slate-400">Comparativa de Notación Big O</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'O(1)', color: 'bg-emerald-500' },
          { id: 'O(log n)', color: 'bg-blue-500' },
          { id: 'O(n)', color: 'bg-amber-500' },
          { id: 'O(n log n)', color: 'bg-violet-500' },
          { id: 'O(n^2)', color: 'bg-red-500' }
        ].map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedComplexity(prev => prev.includes(c.id) ? prev.filter(x => x !== c.id) : [...prev, c.id])}
            className={cn(
              "px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all flex items-center gap-2",
              selectedComplexity.includes(c.id) ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-200"
            )}
          >
            <span className={cn("w-2 h-2 rounded-full", c.color)} />
            {c.id}
          </button>
        ))}
      </div>

      <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4 flex justify-center">
        <canvas ref={canvasRef} width="400" height="280" className="max-w-full" />
      </div>
    </div>
  );
};

// --- RECURSION VISUALIZER ---
export const RecursionVisualizer = () => {
  const [n, setN] = useState(5);
  const [steps, setSteps] = useState<{ n: number, depth: number }[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runFactorial = async (num: number, depth: number = 0) => {
    setSteps(prev => [...prev, { n: num, depth }]);
    await new Promise(r => setTimeout(r, 600));
    if (num > 1) {
      await runFactorial(num - 1, depth + 1);
    }
  };

  const start = async () => {
    setIsRunning(true);
    setSteps([]);
    await runFactorial(n);
    setIsRunning(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900">Visualizador de Recursión</h3>
          <p className="text-xs text-slate-400">Pila de llamadas (Factorial de {n})</p>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.min(10, parseInt(e.target.value) || 0))}
            className="w-16 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
          />
          <button 
            disabled={isRunning}
            onClick={start} 
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm disabled:opacity-50"
          >
            {isRunning ? 'Ejecutando...' : 'Iniciar'}
          </button>
        </div>
      </div>

      <div className="h-[250px] bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-6 flex flex-col-reverse items-center gap-2 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-xs bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex items-center justify-between"
              style={{ marginLeft: `${step.depth * 20}px` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-xs">
                  {step.depth}
                </div>
                <span className="text-sm font-mono text-slate-600">factorial({step.n})</span>
              </div>
              {step.n === 1 && <span className="text-[10px] font-bold text-emerald-500 uppercase">Base Case</span>}
            </motion.div>
          ))}
        </AnimatePresence>
        {steps.length === 0 && <div className="text-slate-400 text-sm italic">Presiona iniciar para ver la recursión.</div>}
      </div>
    </div>
  );
};
