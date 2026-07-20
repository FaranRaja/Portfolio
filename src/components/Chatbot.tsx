import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { chatbotKnowledge, personal } from '../data/portfolio';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED = [
  "What's Faran's tech stack?",
  'Tell me about SkillUp AI',
  'Is he open to internships?',
  'How can I contact him?',
];

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

async function askGemini(history: Message[], userMessage: string): Promise<string> {
  const systemInstruction = `[System context — always follow this]\n${chatbotKnowledge}\n\nYou are Faran's portfolio assistant. Answer questions about his skills, projects, background, and contact information in a friendly, professional way. Keep answers concise.`;
  
  // Format history for Gemini (excluding the initial greeting to keep context clean)
  const contents = history.slice(1).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));
  
  // Add current message
  contents.push({ role: 'user', parts: [{ text: userMessage }] });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "Sorry, I couldn't get a response. Please try again!";
  } catch (error) {
    console.error('Gemini error:', error);
    throw error;
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Faran's portfolio assistant. Ask me anything about his skills, projects, background, or how to get in touch. 👋",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggested(false);

    const userMsg: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await askGemini(messages, text);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I'm having trouble connecting right now. You can reach Faran directly at ${personal.email}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#ff9a9e] border-4 border-border flex items-center justify-center neo-shadow transition-transform hover:-translate-y-2 hover:shadow-[8px_8px_0_#1e2330]"
        whileTap={{ scale: 0.94 }}
        animate={open ? {} : { y: [0, -6, 0] }}
        transition={open ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={28} className="text-text" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={28} className="text-text" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse dot */}
      {!open && (
        <motion.div
          className="fixed bottom-[74px] right-6 z-50 w-4 h-4 rounded-full bg-green-400 border-4 border-border neo-shadow"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-28 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] flex flex-col rounded-[2.5rem] border-4 border-border bg-surface neo-shadow overflow-hidden"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-4 border-b-4 border-border bg-[#7bd0e1] flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-surface border-4 border-border flex items-center justify-center neo-shadow">
                <Bot size={20} className="text-text" />
              </div>
              <div>
                <p className="text-xl font-display font-black text-text">Faran's Assistant</p>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-400 border-2 border-border" />
                  <span className="text-sm font-bold text-text/80 font-body">Powered by Gemini</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-[#fbc2eb]/10">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full border-4 border-border flex-shrink-0 flex items-center justify-center shadow-[2px_2px_0_#1e2330] ${
                    msg.role === 'assistant' ? 'bg-[#e9c0e9]' : 'bg-[#d2e823]'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={16} className="text-text" /> : <User size={16} className="text-text" />}
                  </div>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-base font-bold font-body leading-relaxed whitespace-pre-wrap border-4 border-border shadow-[4px_4px_0_#1e2330] ${
                    msg.role === 'user'
                      ? 'bg-accent text-text rounded-br-sm'
                      : 'bg-surface text-text rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e9c0e9] border-4 border-border shadow-[2px_2px_0_#1e2330] flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-text" />
                  </div>
                  <div className="bg-surface border-4 border-border shadow-[4px_4px_0_#1e2330] rounded-2xl rounded-bl-sm px-5 py-4 flex items-center gap-2">
                    {[0, 1, 2].map((d) => (
                      <motion.div key={d} className="w-2.5 h-2.5 rounded-full bg-text"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showSuggested && messages.length === 1 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-3 pt-2">
                  <p className="text-sm font-black font-display uppercase tracking-tight text-text/60">Suggested questions</p>
                  {SUGGESTED.map((q) => (
                    <button key={q} onClick={() => send(q)}
                      className="block w-full text-left font-bold text-base font-body text-text border-4 border-border bg-surface rounded-xl px-4 py-3 shadow-[4px_4px_0_#1e2330] hover:-translate-y-1 hover:bg-[#d2e823] transition-all">
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t-4 border-border bg-surface flex-shrink-0">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about Faran…"
                  className="flex-1 bg-bg border-4 border-border rounded-xl px-4 py-3 text-base text-text font-bold font-body placeholder-text/40 outline-none focus:border-accent shadow-[4px_4px_0_#1e2330] transition-colors"
                  disabled={loading}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="w-14 h-14 rounded-xl border-4 border-border bg-accent flex items-center justify-center hover:-translate-y-1 hover:bg-accent2 shadow-[4px_4px_0_#1e2330] transition-all disabled:opacity-40 disabled:hover:translate-y-0 flex-shrink-0"
                >
                  {loading ? <Loader2 size={24} className="text-text animate-spin" /> : <Send size={24} className="text-text" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
