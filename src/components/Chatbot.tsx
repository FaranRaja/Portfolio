import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { chatbotKnowledge } from '../data/portfolio';

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

// Grok API call via Vercel Serverless Function
async function askGrok(history: Message[], userMessage: string): Promise<string> {
  // Build conversation history for Grok
  const messages = [
    // Inject system knowledge
    {
      role: 'system',
      content: `[System context — always follow this]\n${chatbotKnowledge}\n\nYou are Faran's portfolio assistant. Answer questions about his skills, projects, background, and contact information in a friendly, professional way.`
    },
    // Previous conversation turns
    ...history.slice(1).map((m) => ({
      role: m.role,
      content: m.content,
    })),
    // New message
    { role: 'user', content: userMessage },
  ];

  // Call our secure Vercel API route
  const res = await fetch("/api/chat", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error('Serverless error:', err);
    throw new Error('Chat API error');
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "Sorry, I couldn't get a response. Please try again!";
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
      const reply = await askGrok(messages, text);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. You can reach Faran directly at faranraja011@gmail.com",
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
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/30 hover:bg-accent/80 transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        animate={open ? {} : { y: [0, -4, 0] }}
        transition={open ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse dot */}
      {!open && (
        <motion.div
          className="fixed bottom-[70px] right-6 z-50 w-3 h-3 rounded-full bg-green-400 border-2 border-bg"
          animate={{ scale: [1, 1.3, 1] }}
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
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] flex flex-col rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/60 overflow-hidden"
            style={{ height: '480px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 bg-surface flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                <Bot size={15} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-display font-semibold text-text">Faran's Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-muted font-mono">Online · Powered by Grok</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                    msg.role === 'assistant' ? 'bg-accent/20 border border-accent/20' : 'bg-white/10 border border-white/10'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={12} className="text-accent" /> : <User size={12} className="text-muted" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm font-body leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-accent text-white rounded-br-sm'
                      : 'bg-surface border border-white/8 text-text rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-accent" />
                  </div>
                  <div className="bg-surface border border-white/8 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.div key={d} className="w-1.5 h-1.5 rounded-full bg-muted"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {showSuggested && messages.length === 1 && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-2 pt-1">
                  <p className="text-xs text-muted/60 font-mono">Suggested questions</p>
                  {SUGGESTED.map((q) => (
                    <button key={q} onClick={() => send(q)}
                      className="block w-full text-left text-xs font-body text-muted border border-white/8 rounded-xl px-3 py-2 hover:border-accent/30 hover:text-text hover:bg-accent/5 transition-all">
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-white/8 bg-surface flex-shrink-0">
              <div className="flex items-center gap-2 bg-card border border-white/8 rounded-xl px-3 py-2 focus-within:border-accent/30 transition-colors">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask about Faran…"
                  className="flex-1 bg-transparent text-sm text-text font-body placeholder-muted/50 outline-none"
                  disabled={loading}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors disabled:opacity-40 flex-shrink-0"
                >
                  {loading ? <Loader2 size={13} className="text-white animate-spin" /> : <Send size={13} className="text-white" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
