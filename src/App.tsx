/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, MapPin, Building2, Phone, ChevronRight, Home, Star, ArrowUpRight, Award, Bot, Maximize2, Camera, Download, X } from "lucide-react";
import { ChatAssistant } from "./components/ChatAssistant";

// Base64 placeholder for a fallback building
const LUXURY_BUILDING_B64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhUZGRgaGhwYHBwcHBgaHBgaGhoZGRoaGRocIy8lHB4rJxoaJjgmKzAxNTU1GiQ7QDs0Py40NTEBDAwMDw8PEQ8PEDEdGB0xMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAKAA8AMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAPRAAAgIBAwIDBAkCBQQDAAAAAQIAEQMSITEEQRMiUWEFMmFxBhQVIzNCUoGhkaKxwXKCkrLRFvDxNGLh/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwX/xAAdEQEBAQEBAAMBAQAAAAAAAAAAARESITFBA1Ei/9oADAMBAAFTERAxEAPwD7EiKioqaHkRFRURURFRURAisREVEREVEREVEREVEREVEREVEREVEREVEREVEREVEREVEREVEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERECIkyICIkyICIkyICIkyICIkyICIkyICIkyIExEiBIiSIExIiBIiSIEiJIiBIiICIiBIiSICIiBIiSICIiBIiSICIiBIiSICIiBIiSICIiBIiSICIiBIiSICIiAoipIExEiBIiSICIiBMSJEAiIiQWqKkREEREVEREVEREVEREVEREVEREVEREVEREVEREVEREQUiRIqSBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREDXwqo6HwU6EIdUUREQUVNRURBRU1FREQUVNRURBRU1FREQUVNRURBRU1FREQUVNRURBRU1FRH//Z";

// User provided images
const HERO_IMAGE_URL = "https://i.postimg.cc/C5JR5MB0/Whats-App-Image-2026-04-17-at-22-21-53.jpg";

const INITIAL_PROPERTIES = [
  {
    id: 1,
    name: "Golden Residence - 2 Quartos",
    price: "A partir de R$ 410.000",
    image: "https://i.postimg.cc/RVNDRzyD/Whats-App-Image-2026-04-19-at-16-25-39.jpg",
    details: "Conforto & Sofisticação",
    description: "Experimente a harmonia perfeita entre design contemporâneo e funcionalidade. O Golden Residence de 2 quartos com suíte foi projetado para casais e jovens famílias que não abrem mão de uma localização privilegiada e acabamentos de altíssimo padrão. Cada detalhe, da varanda gourmet aos revestimentos premium, foi pensado para elevar sua experiência de morar.",
    tags: ["2 Quartos", "1 Suíte", "Varanda Gourmet"],
    allImages: [
      "https://i.postimg.cc/RVNDRzyD/Whats-App-Image-2026-04-19-at-16-25-39.jpg",
      "https://i.postimg.cc/05t4DNW3/Whats-App-Image-2026-04-19-at-16-25-39-(1).jpg",
      "https://i.postimg.cc/vHcNzdCy/Whats-App-Image-2026-04-19-at-16-25-40.jpg",
      "https://i.postimg.cc/RVNDRzyY/Whats-App-Image-2026-04-19-at-16-25-40-(1).jpg",
      "https://i.postimg.cc/HsVh2CRv/Whats-App-Image-2026-04-19-at-16-25-40-(2).jpg",
      "https://i.postimg.cc/fTJrKhpp/Whats-App-Image-2026-04-19-at-16-25-40-(3).jpg"
    ]
  },
  {
    id: 2,
    name: "Golden Residence - 3 Quartos",
    price: "A partir de R$ 450.000",
    image: "https://i.postimg.cc/vHcNzdCy/Whats-App-Image-2026-04-19-at-16-25-40.jpg",
    details: "Amplitude & Exclusividade",
    description: "A joia da coroa do Golden Residence. Este suntuoso apartamento de 3 quartos com suíte oferece espaços amplos e integrados, ideais para receber convidados com a elegância que você merece. A suíte master é um santuário de tranquilidade, e a área social flui naturalmente para uma varanda com vista panorâmica. Um investimento seguro para quem busca o extraordinário.",
    tags: ["3 Quartos", "1 Suíte", "Luxo"],
    allImages: [
      "https://i.postimg.cc/vHcNzdCy/Whats-App-Image-2026-04-19-at-16-25-40.jpg",
      "https://i.postimg.cc/05t4DNW3/Whats-App-Image-2026-04-19-at-16-25-39-(1).jpg",
      "https://i.postimg.cc/RVNDRzyD/Whats-App-Image-2026-04-19-at-16-25-39.jpg",
      "https://i.postimg.cc/RVNDRzyY/Whats-App-Image-2026-04-19-at-16-25-40-(1).jpg",
      "https://i.postimg.cc/HsVh2CRv/Whats-App-Image-2026-04-19-at-16-25-40-(2).jpg",
      "https://i.postimg.cc/fTJrKhpp/Whats-App-Image-2026-04-19-at-16-25-40-(3).jpg"
    ]
  },
  {
    id: 3,
    name: "Uniq Residencial",
    price: "A partir de R$ 213.000",
    image: "https://i.postimg.cc/MZjsMYBw/Whats-App-Image-2026-04-19-at-16-26-11.jpg",
    details: "Inteligente & Versátil",
    description: "Inovação é a palavra de ordem no Uniq Residencial. Criado para mentes modernas e estilos de vida ágeis, este empreendimento traz apartamentos de 2 quartos com suíte que priorizam a inteligência espacial e a luz natural. No Uniq, a sofisticação encontra a praticidade em um endereço que coloca você no centro de tudo, sem abrir mão do silêncio e da privacidade.",
    tags: ["2 Quartos", "1 Suíte", "Inovador"],
    allImages: [
      "https://i.postimg.cc/MZjsMYBw/Whats-App-Image-2026-04-19-at-16-26-11.jpg",
      "https://i.postimg.cc/HW7SctMY/Whats-App-Image-2026-04-19-at-16-26-12.jpg",
      "https://i.postimg.cc/xjbsJPmT/Whats-App-Image-2026-04-19-at-16-26-12-(1).jpg",
      "https://i.postimg.cc/wxsWykN6/Whats-App-Image-2026-04-19-at-16-26-12-(2).jpg",
      "https://i.postimg.cc/kMtj6ySM/Whats-App-Image-2026-04-19-at-16-26-12-(3).jpg",
      "https://i.postimg.cc/ryth094s/Whats-App-Image-2026-04-19-at-16-26-13.jpg",
      "https://i.postimg.cc/y6SfgTR8/Whats-App-Image-2026-04-19-at-16-26-13-(1).jpg",
      "https://i.postimg.cc/pVn0hBjd/Whats-App-Image-2026-04-19-at-16-26-13-(2).jpg",
      "https://i.postimg.cc/sfZnQJWX/Whats-App-Image-2026-04-19-at-16-26-13-(3).jpg",
      "https://i.postimg.cc/MZjsMYBQ/Whats-App-Image-2026-04-19-at-16-26-14.jpg",
      "https://i.postimg.cc/3rDL4ZGy/Whats-App-Image-2026-04-19-at-16-26-14-(1).jpg",
      "https://i.postimg.cc/05JtMCSM/Whats-App-Image-2026-04-19-at-16-26-14-(2).jpg",
      "https://i.postimg.cc/gc6MXKh6/Whats-App-Image-2026-04-19-at-16-26-14-(3).jpg"
    ]
  },
];

const LOGO_B64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByklEQVR4nO3csY2DMBQF0D8uAGUh7B6GsgYrkDWYghGogRHYhDFAYASGgI6XG1NIdV0u2vS+5Oue/X7Z0m9KA4CIsUoXABAzKFAgoECBgAIFAsQUCBgoUCCgQIGAAgUCAQUKBBQoEFCgQICAAgUCAQUKBBQoEFAgoECBgAIFAsQUCBgoUCAQUKBAQIECgZgCBQMEChSIAQUCBAUCMQUKBAgKBOIMCBQoxBIoEFCgQIEYUCBAYKBAQIECMRv7I8S09wREfInYnyH2Y4jZInZoCB8YwgcG+8AgHzDQBwb4gEE+MJAPDPEBAnxgQA8M6IEBPTCIBwZxgIE8MAgDDOSBIXxgIA8M4QND+MAQPjCAByYBAhYgYAECECBgAQIYIGABABAgYAECECBgAQIYIGABABAYIAABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAYIDABABAIEDAAAYYDAhiAAMP9iAEHDBgwYMABAwaY3A4Y/H7A4M8DBn8fMPDzgEGfBwz4PGDA3xcY8HXA4NcDAAAAMB9/AbpWl73h+ZgXAAAAAElFTkSuQmCC";
const WHATSAPP_LINK = "https://wa.me/5521984314779";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [doorOpen, setDoorOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProperties(prev => [{
          id: Date.now(),
          name: "Novo Imóvel de Luxo",
          price: "Consulta",
          image: base64String,
          details: "Carregado via painel",
          description: "Imóvel selecionado e carregado manualmente para avaliação de exclusividade.",
          tags: ["Personalizado", "Padrão Xavier"],
          allImages: [base64String]
        }, ...prev]);
        alert("Imagem carregada com sucesso no portfólio Xavier!");
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setDoorOpen(true), 3500); // Start opening at 3.5s
    const timer2 = setTimeout(() => setLoading(false), 6500); // Extend slightly to 6.5s for fade-out polish
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#051121] overflow-hidden"
            style={{ perspective: "2000px" }}
          >
            {/* Background Future/Luxury Glow */}
            <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1],
                 opacity: [0.3, 0.6, 0.3],
                 rotate: [0, 90, 180, 270, 360]
               }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute w-[150vw] h-[150vw] bg-[radial-gradient(circle,_rgba(197,160,89,0.15)_0%,_transparent_70%)] pointer-events-none"
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * 1000 - 500, 
                  y: Math.random() * 1000 - 500, 
                  z: -1000,
                  opacity: 0 
                }}
                animate={{ 
                  z: 500,
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: Math.random() * 5,
                  ease: "easeOut"
                }}
                className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
              />
            ))}

            {/* Future Portal Rings */}
            <AnimatePresence>
              {doorOpen && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 4, opacity: 0 }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: ring * 0.8,
                        ease: "easeOut" 
                      }}
                      className="absolute w-64 h-64 border border-gold/40 rounded-full"
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* 3D Gate Doors with Detail */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={doorOpen ? { rotateY: -110 } : { rotateY: 0 }}
              transition={{ duration: 2.5, ease: [0.7, 0, 0.3, 1] }}
              style={{ originX: "left", transformStyle: "preserve-3d" }}
              className="absolute left-0 top-0 w-1/2 h-full bg-[#0a192f] border-r-8 border-gold shadow-[30px_0_60px_rgba(0,0,0,0.9)] z-[150] flex items-center justify-end"
            >
              {/* Door Molding/Trim */}
              <div className="w-4/5 h-4/5 border-2 border-gold/10 mr-12 rounded-sm flex items-center justify-center">
                 <div className="w-1/2 h-full border-x border-gold/5" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ rotateY: 0 }}
              animate={doorOpen ? { rotateY: 110 } : { rotateY: 0 }}
              transition={{ duration: 2.5, ease: [0.7, 0, 0.3, 1] }}
              style={{ originX: "right", transformStyle: "preserve-3d" }}
              className="absolute right-0 top-0 w-1/2 h-full bg-[#0a192f] border-l-8 border-gold shadow-[-30px_0_60px_rgba(0,0,0,0.9)] z-[150] flex items-center justify-start"
            >
              {/* Door Molding/Trim */}
              <div className="w-4/5 h-4/5 border-2 border-gold/10 ml-12 rounded-sm flex items-center justify-center">
                 <div className="w-1/2 h-full border-x border-gold/5" />
              </div>
            </motion.div>

            {/* Central Content Reveal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={doorOpen 
                ? { opacity: 0, scale: 1.2, translateZ: 500, filter: "blur(40px)" } 
                : { scale: 1, opacity: 1, translateZ: -200, filter: "blur(0px)" }
              }
              transition={{ duration: 2, ease: "easeInOut" }}
              className="z-[100] flex flex-col items-center gap-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="text-center relative max-w-2xl px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <p className="text-gold/60 font-elegant text-[9px] lg:text-[11px] tracking-[1.2em] uppercase mb-8 ml-[1.2em] font-light italic">Bem-vindo à Xavier</p>
                  <h2 className="text-white font-fashion text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-none mb-2">
                    A CASA É <span className="italic text-gold opacity-90">SUA...</span>
                  </h2>
                  <motion.div 
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 2 }}
                    className="h-px w-24 bg-gold/10 mx-auto my-10"
                  />
                  <h3 className="text-white/70 font-sophisticated text-2xl md:text-3xl lg:text-4xl tracking-[0.4em] font-light uppercase">
                    Pode entrar
                  </h3>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 2 }}
                className="relative mt-4"
              >
                <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   className="absolute -inset-10 border border-gold/5 rounded-full"
                />
                <img
                  src={LOGO_B64}
                  alt="Xavier Imóveis"
                  className="w-24 h-24 md:w-28 md:h-28 object-contain mix-blend-screen opacity-30"
                />
              </motion.div>
            </motion.div>

            {/* Flash Effect on Open */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={doorOpen ? { opacity: [0, 0.8, 0] } : { opacity: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="absolute inset-0 bg-white z-[105] pointer-events-none mix-blend-overlay"
            />
            
            {/* Blinding Light Core */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={doorOpen ? { opacity: 0.4, scale: 2 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-[radial-gradient(circle,_#fff_0%,_#c5a059_30%,_transparent_70%)] blur-[100px] z-[99] pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <main className="bg-[#050a14] relative text-white">
          <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full" />
          </div>

          <nav className="fixed top-0 w-full z-50 bg-[#050a14]/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={LOGO_B64} alt="Logo" className="w-10 h-10 object-contain" />
                <span className="font-sophisticated text-xl tracking-[0.2em] text-gold uppercase hidden sm:block">Xavier Imóveis</span>
              </div>
              <div className="flex items-center gap-8">
                <a href="#imoveis" className="text-xs uppercase tracking-widest hover:text-gold transition-colors">Imóveis</a>
                <a href="#contato" className="text-xs uppercase tracking-widest hover:text-gold transition-colors">Contato</a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  className="bg-gold text-black px-6 py-2 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
                >
                  <MessageCircle size={14} /> Atendimento
                </a>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={HERO_IMAGE_URL}
                className="w-full h-full object-cover opacity-20 scale-110"
                alt="Luxury Background"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050a14] via-[#050a14]/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-[1px] bg-gold" />
                  <span className="text-gold uppercase tracking-[0.4em] text-xs font-semibold">Residenciais de Altíssimo Padrão</span>
                </div>
                <h1 className="text-6xl lg:text-9xl font-fashion mb-8 leading-[0.85] tracking-tight">
                  Sua nova <br />
                  <span className="text-gold italic">história</span> <br />
                  começa aqui.
                </h1>
                <p className="text-white/50 text-xl max-w-md mb-12 font-sans leading-relaxed">
                  A excelência imobiliária no Edifício Top Commerce. O endereço da sua próxima conquista.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    className="bg-gold text-black px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(197,160,89,0.3)] hover:scale-105 transition-all text-center"
                  >
                    Atendimento Exclusivo
                  </a>
                  <a href="#imoveis" className="border border-white/20 hover:border-gold px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] transition-all text-center">
                    Ver Portfólio
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="relative"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 relative group bg-white/5 backdrop-blur-sm p-2">
                  <div className="absolute inset-0 bg-gold/5 group-hover:bg-transparent transition-colors duration-500" />
                  <img
                    src={HERO_IMAGE_URL}
                    alt="Property Preview"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-10 left-10 right-10 p-10 bg-[#050a14]/60 backdrop-blur-xl border border-white/10 rounded-xl">
                    <p className="text-gold text-[10px] uppercase tracking-widest mb-2 font-black flex items-center gap-2">
                       DISPONIBILIDADE IMEDIATA
                    </p>
                    <h3 className="text-3xl font-fashion italic">Penthouses Selecionadas</h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="escritorio" className="py-24 border-y border-white/5 relative bg-[#0a192f]/50">
             <div className="max-w-7xl mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {[
                   { icon: <Building2 />, title: "Edifício Top Commerce", desc: "Nossa sede no centro de Nova Iguaçu oferece um ambiente refinado para fecharmos os melhores negócios." },
                   { icon: <Award />, title: "Gestão de Luxo", desc: "Curadoria especializada em imóveis de alto padrão e investimentos estratégicos na região." },
                   { icon: <MessageCircle />, title: "Atendimento 24/7", desc: "Sempre prontos para te atender via WhatsApp com a agilidade que mercado de luxo exige." }
                 ].map((stat, i) => (
                   <div key={i} className="flex flex-col gap-4">
                     <div className="w-12 h-12 rounded-full border border-gold/50 flex items-center justify-center text-gold mb-4">
                       {stat.icon}
                     </div>
                     <h3 className="text-gold font-sophisticated text-2xl tracking-[0.1em]">{stat.title}</h3>
                     <p className="text-white/40 text-sm leading-relaxed">{stat.desc}</p>
                   </div>
                 ))}
               </div>
             </div>
          </section>

          <section id="imoveis" className="py-32 max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
              <div>
                <p className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 font-bold">Portfólio Selecionado</p>
                <h2 className="text-5xl lg:text-7xl font-fashion">Imóveis <br /> Extraordinários</h2>
              </div>
              <a href={WHATSAPP_LINK} target="_blank" className="flex items-center gap-4 text-gold group hover:pr-4 transition-all">
                <span className="uppercase text-xs tracking-widest border-b border-gold/30 pb-1">Ver mais no WhatsApp</span>
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {properties.map((prop) => (
                <motion.div
                  key={prop.id}
                  layoutId={prop.id.toString()}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProperty(prop)}
                >
                   <div className="aspect-square relative overflow-hidden">
                      <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={prop.name} referrerPolicy="no-referrer" />
                      <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 text-[10px] font-bold uppercase rounded-sm">Lançamento</div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="text-gold" size={32} />
                      </div>
                   </div>
                   <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] text-gold uppercase tracking-widest mb-1 italic font-bold">{prop.details}</p>
                          <h4 className="text-2xl font-fashion tracking-tight">{prop.name}</h4>
                        </div>
                        <span className="text-gold font-bold">{prop.price}</span>
                      </div>
                      <div className="flex gap-4 text-white/40 text-[10px] uppercase font-bold tracking-widest border-t border-white/5 pt-6">
                        {prop.tags.map(tag => <span key={tag}>{tag}</span>)}
                      </div>
                      <button className="w-full mt-8 py-4 border border-gold/30 group-hover:bg-gold group-hover:text-black transition-all uppercase text-[10px] tracking-widest font-black rounded-full">
                        Solicitar Detalhes
                      </button>
                   </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="mt-32 p-16 border-2 border-dashed border-white/10 rounded-[40px] bg-gold/[0.02] flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
               <Camera size={48} className="text-gold/40 mb-6" />
               <h3 className="text-4xl font-fashion italic mb-4">Gerenciador de Ativos</h3>
               <p className="text-white/40 max-w-lg mb-8 text-lg font-light">
                 Sistema Xavier de carregamento inteligente. Selecione suas fotos de luxo e nosso motor as converterá instantaneamente para o formato de alta performance.
               </p>
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept="image/*" 
               />
               <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gold text-black px-12 py-5 rounded-full text-xs uppercase tracking-widest font-black hover:scale-105 transition-all shadow-[0_10px_30px_rgba(197,160,89,0.2)] flex items-center gap-3"
                >
                 <Download size={16} /> Carregar Novo Imóvel
               </button>
            </motion.div>
          </section>

          <footer className="py-20 bg-[#02050a] border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
                <div className="col-span-2">
                  <div className="flex items-center gap-4 mb-8">
                    <img src={LOGO_B64} alt="Logo" className="w-12 h-12 object-contain" />
                    <span className="font-sophisticated text-3xl tracking-[0.2em] text-gold uppercase">Xavier Imóveis</span>
                  </div>
                  <p className="max-w-md text-white/40 leading-relaxed mb-8 text-lg">
                    Sinônimo de excelência e discrição no mercado imobiliário de luxo em Nova Iguaçu e região metropolitana do Rio de Janeiro.
                  </p>
                  <div className="flex gap-6">
                     <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                       <MessageCircle size={20} />
                     </a>
                     <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-all">
                       <Phone size={20} />
                     </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-gold font-sophisticated text-2xl italic mb-8">Localização</h4>
                  <div className="flex gap-4 text-white/40 text-sm">
                    <MapPin className="text-gold shrink-0" size={20} />
                    <p className="leading-loose">
                      Av. Gov. Roberto Silveira, 470 <br />
                      Sala 1210 - Edifício Top Commerce <br />
                      Centro, Nova Iguaçu - RJ <br />
                      CEP: 26210-210
                    </p>
                  </div>
                </div>

                <div>
                   <h4 className="text-gold font-sophisticated text-2xl italic mb-8">Contato</h4>
                   <div className="flex flex-col gap-6 text-white/40 text-sm">
                     <a href={WHATSAPP_LINK} target="_blank" className="flex items-center gap-3 hover:text-gold transition-colors text-lg">
                       <MessageCircle size={24} /> WhatsApp: (21) 98431-4779
                     </a>
                     <div className="flex items-center gap-3 text-lg">
                       <Phone size={24} /> Atendimento Premium 24/7
                     </div>
                   </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-white/10">
                 <p>© 2026 Xavier Imóveis - Todos os direitos reservados</p>
                 <div className="flex gap-8">
                   <a href="#" className="hover:text-gold transition-colors">POLÍTICA DE PRIVACIDADE</a>
                   <a href="#" className="hover:text-gold transition-colors">TERMOS DE USO</a>
                 </div>
              </div>
            </div>
          </footer>

          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            className="fixed bottom-8 right-8 z-[60] bg-gold text-black p-6 rounded-full shadow-[0_10px_40px_rgba(197,160,89,0.4)] transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <MessageCircle size={32} className="relative z-10 group-hover:text-black" />
          </motion.a>

          <ChatAssistant />
           <AnimatePresence>
            {selectedProperty && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-4 md:p-10 overflow-y-auto"
                onClick={() => setSelectedProperty(null)}
              >
                <div className="absolute top-6 right-6 text-white cursor-pointer hover:text-gold transition-colors z-[110]">
                  <X size={32} />
                </div>
                
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-[#050a14] border border-white/10 rounded-3xl w-full max-w-6xl overflow-hidden relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Multi Image Sidebar */}
                    <div className="h-[400px] lg:h-auto border-r border-white/5 bg-[#02050a]">
                      <div className="h-full overflow-y-auto p-6 scrollbar-hide">
                        <div className="grid grid-cols-1 gap-4">
                          {selectedProperty.allImages?.map((img: string, idx: number) => (
                            <motion.img
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              src={img}
                              alt={`Vista ${idx + 1}`}
                              className="w-full h-auto rounded-lg shadow-2xl hover:scale-[1.02] transition-transform cursor-zoom-in"
                              referrerPolicy="no-referrer"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Property Description */}
                    <div className="p-8 lg:p-16 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-12 h-px bg-gold/50" />
                        <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold">Oportunidade de Investimento</span>
                      </div>
                      
                      <h2 className="text-4xl md:text-6xl font-fashion mb-6 leading-tight">{selectedProperty.name}</h2>
                      <p className="text-gold text-2xl font-bold mb-8">{selectedProperty.price}</p>
                      
                      <div className="space-y-6 mb-12">
                        <p className="text-white/60 text-lg leading-relaxed font-light italic">
                          {selectedProperty.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 border-y border-white/5 py-8">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                               <Building2 size={18} />
                             </div>
                             <div>
                               <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Suítes</p>
                               <p className="text-lg font-fashion">1 Master</p>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                               <Star size={18} />
                             </div>
                             <div>
                               <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Investimento</p>
                               <p className="text-lg font-fashion">Alta Valorização</p>
                             </div>
                           </div>
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                               <Award size={18} />
                             </div>
                             <div>
                               <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Status</p>
                               <p className="text-lg font-fashion">Pronto para Morar</p>
                             </div>
                           </div>
                        </div>
                      </div>

                      <div className="bg-gold/5 border border-gold/10 p-6 rounded-2xl mb-8">
                        <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-black mb-2">Exclusividade Xavier</p>
                        <p className="text-white/60 text-sm leading-relaxed italic">
                          "Nossa proposta para o {selectedProperty.name} inclui assessoria jurídica completa e taxas de financiamento exclusivas para clientes Prime."
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6">
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          className="flex-1 bg-gold text-black px-8 py-5 rounded-full text-xs font-black uppercase tracking-widest text-center shadow-[0_15px_30px_rgba(197,160,89,0.3)] hover:scale-105 transition-all"
                        >
                          Agendar Visita Agora
                        </a>
                        <button className="flex-1 border border-white/10 px-8 py-5 rounded-full text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
                          Baixar Catálogo PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      )}
    </div>
  );
}
