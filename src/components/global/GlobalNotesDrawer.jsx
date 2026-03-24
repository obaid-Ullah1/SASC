import React, { useState } from "react";
import { X, Plus, Trash2, Circle, ShieldCheck, PencilLine, Sparkles, Info, Bell, Calendar, Clock } from "lucide-react";

const GlobalNotesDrawer = ({
  isOpen,
  onClose,
  side = "right",
  themeGradient = "linear-gradient(135deg, #10b981 0%, #059669 100%)",
}) => {
  const [activeSection, setActiveSection] = useState("doing");
  const [newTask, setNewTask] = useState("");
  const isLeft = side === "left";

  const todayDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const instructions = [
    { id: 1, text: "Verify all entries before the 25th of each month.", type: "Inventory", priority: "High", date: "Feb 20, 2026" },
    { id: 2, text: "Verify all Injection preparations before the 25th of each month", type: "Injection Preparation", priority: "Critical", date: "Feb 22, 2026" },
    { id: 3, text: "Verify all Roles entries before the 25th of each month.", type: "Organization Roles", priority: "Standard", date: "Feb 18, 2026" }
  ];

  const [notes, setNotes] = useState([
    { id: 1, text: "Check surgical equipment calibration", status: "doing", timestamp: "Feb 23, 10:15 AM" }
  ]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    
    const now = new Date();
    const timestamp = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ", " + 
                      now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    setNotes([...notes, { 
      id: Date.now(), 
      text: newTask.trim(), 
      status: activeSection,
      timestamp: timestamp 
    }]);
    setNewTask("");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/10 z-[60] transition-opacity" />
      )}
      
      <div className={`fixed top-0 h-full w-[400px] z-[70] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isLeft ? "left-0" : "right-0"} 
        ${isOpen ? "translate-x-0" : (isLeft ? "-translate-x-full" : "translate-x-full")}`}>
        
        <div className="h-[calc(100vh-16px)] m-2 bg-[#FCFDFF] rounded-[2.2rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200/50 relative">
          
          <div className="relative overflow-hidden px-6 py-6 text-white shrink-0" 
               style={{ 
                 background: isLeft 
                   ? "linear-gradient(135deg, #334155 0%, #1e293b 100%)" 
                   : themeGradient 
               }}>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />

            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  {isLeft ? <Bell size={20} className="text-white" /> : <PencilLine size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-[14px] font-black uppercase tracking-[0.15em] leading-none">
                      {isLeft ? "Instructions" : "Personal Tasks"}
                    </h2>
                    {isLeft && (
                      <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full border border-white/10">
                        {todayDate}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-medium text-white/70 mt-1.5 flex items-center gap-1">
                    <Sparkles size={10} /> {isLeft ? "System Guidelines" : "Auto-stamped Notes"}
                  </p>
                </div>
              </div>
              
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90 border border-white/10 text-white">
                <X size={18} />
              </button>
            </div>

            {!isLeft && (
              <div className="mt-6 flex bg-black/20 rounded-xl p-1 relative z-10 border border-white/10">
                {["doing", "upcoming", "done"].map((s) => (
                  <button key={s} onClick={() => setActiveSection(s)}
                    className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all
                      ${activeSection === s ? "bg-white text-slate-900 shadow-lg" : "text-white/60 hover:text-white"}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 bg-[#F8FAFC] custom-scrollbar">
            {isLeft ? (
              instructions.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                      item.priority === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.type}
                    </span>
                    {/* ENHANCED VISIBILITY FOR INSTRUCTION DATE */}
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      <Calendar size={12} className="text-slate-400" />
                      <span className="text-[10px] uppercase tracking-tighter">{item.date}</span>
                    </div>
                  </div>
                  
                  {/* WRAPPER FOR INSTRUCTIONS TEXT */}
                  <p className="text-[13px] font-bold text-slate-700 leading-relaxed break-words overflow-hidden">
                    {item.text}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-emerald-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Verified Protocol</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-300 italic">Ref# 00{item.id}</span>
                  </div>
                </div>
              ))
            ) : (
              notes.filter(n => n.status === activeSection).map((note) => (
                <div key={note.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group">
                  <div className="flex items-start gap-3">
                    <Circle size={16} className="mt-0.5 text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0"> {/* min-w-0 is critical for break-words to work in flex */}
                      {/* WRAPPER FOR TASK TEXT (Multi-line support + Long text fix) */}
                      <p className="text-[13px] font-bold text-slate-600 leading-snug break-words whitespace-pre-wrap">
                        {note.text}
                      </p>
                      {/* ENHANCED VISIBILITY FOR TASK DATE */}
                      <div className="mt-2 flex items-center gap-1.5 text-emerald-700 bg-emerald-50 w-fit px-2 py-0.5 rounded-md border border-emerald-100 font-bold">
                        <Clock size={10} />
                        <span className="text-[9px] font-black uppercase tracking-wider">{note.timestamp}</span>
                      </div>
                    </div>
                    <button onClick={() => setNotes(notes.filter(n => n.id !== note.id))} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {!isLeft && (
            <div className="px-5 py-5 bg-white border-t border-slate-100">
              <div className="flex flex-col gap-2 bg-slate-50 border border-slate-200 p-2 rounded-2xl focus-within:border-emerald-400 transition-all">
                {/* TEXTAREA FOR MULTI-LINE INPUT */}
                <textarea
                  placeholder="Type your note here..."
                  className="w-full bg-transparent text-sm font-bold outline-none px-2 py-1 text-slate-700 resize-none min-h-[60px] custom-scrollbar"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddTask();
                    }
                  }}
                />
                <div className="flex justify-end">
                  <button onClick={handleAddTask} className="p-3 rounded-xl text-white shadow-lg active:scale-95 transition-transform shrink-0" style={{ background: themeGradient }}>
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
              <p className="text-[8px] text-slate-400 mt-2 text-center uppercase font-black tracking-widest">Shift + Enter for new line</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalNotesDrawer;