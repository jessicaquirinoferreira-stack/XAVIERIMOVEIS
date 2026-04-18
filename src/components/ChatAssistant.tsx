import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o Assistente Inteligente da Xavier Imóveis. Como posso tornar sua busca pelo imóvel perfeito uma experiência extraordinária hoje?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, { role: 'user', content: userMessage }].map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "Você é o Assistente Inteligente da Xavier Imóveis, uma imobiliária de luxo localizada no Edifício Top Commerce em Nova Iguaçu. Seu tom é extremamente sofisticado, prestativo e exclusivo. Você deve ajudar os clientes com dúvidas sobre imóveis de luxo, localização e agendamentos. Induza sempre o contato final pelo WhatsApp (21 98431 4779). Nunca use 'Markdown' complexo além de negrito.",
        }
      });

      const assistantContent = response.text || "Desculpe, tive um breve lapso de conexão. Como posso ajudar?";
      setMessages(prev => [...prev, { role: 'assistant', content: assistantContent }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "No momento estou refinando meus conhecimentos. Que tal conversarmos diretamente pelo WhatsApp?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[70]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] h-[500px] bg-[#0a192f] border border-gold/30 rounded-lg shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-gold/20 flex justify-between items-center bg-gold/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                  <Bot size={18} className="text-black" />
                </div>
                <div>
                  <p className="text-sm font-serif text-gold font-bold">Assistente Xavier</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Inteligência Artificial</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold/20 text-white border border-gold/20' 
                      : 'bg-white/5 text-white/80 border border-white/10'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <Loader2 size={16} className="text-gold animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gold/20 bg-black/40">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Seu próximo luxo está à distância de uma mensagem..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pr-12 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1.5 p-1.5 bg-gold rounded-full text-black hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-[#0a192f] border border-gold/30 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative"
      >
        <div className="absolute inset-0 bg-gold/5 rounded-full animate-pulse" />
        <Bot size={28} className="text-gold group-hover:rotate-12 transition-transform" />
        {isOpen ? <X size={20} className="absolute -top-1 -right-1 bg-red-500 rounded-full text-white p-1" /> : null}
      </motion.button>
    </div>
  );
};
