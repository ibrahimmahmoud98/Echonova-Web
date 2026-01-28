"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, ChevronDown, Mail, Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { LiquidButton } from "@/components/ui/LiquidButton"; // Import LiquidButton

if (typeof window !== "undefined") {
    gsap.registerPlugin(useGSAP, MotionPathPlugin);
}

// --- Assets for Slider ---
const SLIDER_IMAGES = [
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568500/ECHONOVA_STUDIO_AURA_173_yynti3.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568497/ECHONOVA_STUDIO_AURA_8_fmv2aw.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568496/ECHONOVA_STUDIO_AURA_21_sginxv.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568492/ECHONOVA_STUDIO_AURA_184_aca3zi.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568491/ECHONOVA_STUDIO_AURA_169_sqb0a5.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568488/ECHONOVA_STUDIO_AURA_10_hlrdx2.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568486/ECHONOVA_STUDIO_AURA_58_meq9l1.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568483/ECHONOVA_STUDIO_AURA_138_gvaldc.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568480/ECHONOVA_STUDIO_AURA_145_v5wj3b.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568480/ECHONOVA_STUDIO_AURA_103_op9odi.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568478/ECHONOVA_STUDIO_AURA_154_cu3ilq.png",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568477/ECHONOVA_STUDIO_AURA_5_gepryv.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568477/ECHONOVA_STUDIO_AURA_3_xjw4m4.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568476/ECHONOVA_STUDIO_AURA_53_hqtdyi.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568476/ECHONOVA_STUDIO_AURA_69_sfhpus.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568476/ECHONOVA_STUDIO_AURA_31_alr3ke.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568476/ECHONOVA_STUDIO_AURA_199_lqnxzz.jpg",
  "https://res.cloudinary.com/da1dtiu2x/image/upload/v1769568476/ECHONOVA_STUDIO_AURA_73_avfbfi.jpg"
];

// --- Form Logic & Types ---
type FormData = {
  name: string;
  email: string;
  countryKey: string;
  countryCode?: string;
  phone: string;
  services: string[];
  message: string;
};

const SERVICE_CATEGORIES = [
  {
    title: "فيديو اعلاني",
    items: ["NOVA LIFE", "NOVA ACTION", "NOVA MAGIC", "تعاون مختلف (فيديو)"]
  },
  {
    title: "الموديلينج والصور",
    items: ["NOVA AURA", "تعاون مختلف (صور)"]
  },
  {
    title: "الإنتاج السينمائي",
    items: ["NOVA SAGA", "NOVA CINEMA", "تعاون مختلف (سينما)"]
  }
];

const ServiceDropdown = ({ 
    category, 
    selectedServices, 
    onToggle 
}: { 
    category: { title: string, items: string[] }, 
    selectedServices: string[], 
    onToggle: (s: string) => void 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasActive = category.items.some(item => selectedServices.includes(item));

    return (
        <div className="w-full relative group">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between px-2 py-2 md:px-4 md:py-3 rounded-xl border transition-all duration-300 text-xs md:text-sm",
                    hasActive || isOpen
                        ? "bg-[var(--color-copper)]/10 border-[var(--color-copper)] text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                )}
            >
                <span className="font-medium truncate">{category.title}</span>
                <ChevronDown className={cn("w-3 h-3 md:w-4 md:h-4 flex-shrink-0 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden absolute top-full left-0 right-0 z-50 bg-[#020B16] border border-white/10 rounded-xl mt-1 p-2 shadow-xl"
                    >
                        <div className="flex flex-col gap-1"> 
                            {category.items.map(item => {
                                const isActive = selectedServices.includes(item);
                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => onToggle(item)}
                                        className={cn(
                                            "flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-right w-full transition-all",
                                            isActive 
                                                ? "bg-[var(--color-copper)] text-white" 
                                                : "text-white/50 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-1.5 h-1.5 rounded-full border border-current",
                                            isActive ? "bg-white" : "bg-transparent"
                                        )} />
                                        {item.replace(/ \(.*\)/, "")}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const COUNTRY_KEYS = [
    { code: "+966", flag: "🇸🇦" },
    { code: "+971", flag: "🇦🇪" },
    { code: "+965", flag: "🇰🇼" },
    { code: "+974", flag: "🇶🇦" },
    { code: "+20", flag: "🇪🇬" },
];

function ContactCard({ icon, title, value, subval, link }: any) {
    const content = (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[var(--color-copper)]/50 transition-all hover:bg-white/10 group cursor-pointer h-full w-full">
            <div className="w-10 h-10 flex-shrink-0 rounded-full bg-[var(--color-copper)]/10 flex items-center justify-center text-[var(--color-copper)] group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(217,112,64,0.2)]">
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <h4 className="text-[var(--color-ivory)]/60 text-xs mb-1">{title}</h4>
                <p className="text-sm md:text-base text-[var(--color-ivory)] font-medium group-hover:text-[var(--color-copper)] transition-colors break-all">{value}</p>
                {subval && <p className="text-[var(--color-ivory)]/40 text-xs mt-1">{subval}</p>}
            </div>
        </div>
    );

    if (link) {
        return <a href={link} className="block w-full">{content}</a>;
    }
    return content;
}

export const ContactPageReveal = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryKey: "+966",
    countryCode: "SA",
    phone: "",
    services: [],
    message: ""
  });

  const [validation, setValidation] = useState({
     name: false,
     email: false,
     phone: false,
     services: false,
     country: true 
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % SLIDER_IMAGES.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
     const isNameValid = formData.name.trim().length > 2;
     const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
     const isPhoneValid = /^\d{8,15}$/.test(formData.phone); 
     const isServicesValid = formData.services.length > 0;
     const isCountryValid = !!formData.countryKey;

     setValidation({
         name: isNameValid,
         email: isEmailValid,
         phone: isPhoneValid,
         services: isServicesValid,
         country: isCountryValid
     });
  }, [formData]);

  const formProgress = useMemo(() => {
      const fields = [validation.name, validation.email, validation.phone, validation.services];
      const validCount = fields.filter(Boolean).length;
      return Math.floor((validCount / 4) * 100);
  }, [validation]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleService = (service: string) => {
      setFormData(prev => {
          const exists = prev.services.includes(service);
          if (exists) return { ...prev, services: prev.services.filter(s => s !== service) };
          return { ...prev, services: [...prev.services, service] };
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (formProgress < 100) return; 
      if (isSending) return;

      setIsSending(true);
      setSubmitError(null);

      try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to send message');

        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', services: [], message: '', countryKey: '+966', countryCode: '+966' });
        }, 5000); 
      
      } catch (error) {
          setSubmitError('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
      } finally {
          setIsSending(false);
      }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#020B16] flex flex-col lg:grid lg:grid-cols-2">
       
       {/* RIGHT COLUMN: MORPHING IMAGES (Mobile: Top / Desktop: Right) */}
       <div className="relative w-full h-[40vh] lg:h-screen lg:sticky lg:top-0 order-1 lg:order-2 overflow-hidden z-0">
           <AnimatePresence mode="popLayout">
               <motion.div
                   key={currentImageIndex}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                   className="absolute inset-0"
               >
                   <div 
                       className="absolute inset-0 bg-cover bg-[center_25%]"
                       style={{ backgroundImage: `url(${SLIDER_IMAGES[currentImageIndex]})` }}
                   />
                   {/* Overlay Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020B16]/20 to-[#020B16] lg:bg-gradient-to-r lg:from-[#020B16] lg:via-transparent lg:to-transparent lg:opacity-80" />
               </motion.div>
           </AnimatePresence>
       </div>

       {/* LEFT COLUMN: FORM (Mobile: Bottom / Desktop: Left) */}
       <div className="relative flex flex-col justify-start items-center p-4 lg:p-12 order-2 lg:order-1 lg:pt-20 bg-[#020B16] lg:bg-transparent -mt-10 lg:mt-0 z-10">
           
            {/* Background Gradient for Form Side */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020B16] via-[#050A14] to-[#01060C] -z-10 lg:hidden" />
            <div className="absolute top-0 right-0 w-[40vh] h-[40vh] bg-[var(--color-copper)]/5 blur-[100px] rounded-full pointer-events-none hidden lg:block" />

            <motion.div 
                initial={{ y: 20, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="w-full max-w-lg z-10 bg-[#020B16]/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-t border-white/10 lg:border-none rounded-t-3xl lg:rounded-none p-6 lg:p-0"
            >
                {/* Header */}
                <div className="mb-6 lg:mb-8 border-b border-white/5 pb-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 text-right">
                        ابدأ مشروعك
                    </h2>
                    <p className="text-white/60 text-right text-lg">
                        املأ النموذج وسنتواصل معك قريباً.
                    </p>
                </div>

                {/* Form */}
                {isSubmitted ? (
                   <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-12 text-center"
                   >
                       <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                           <Check className="w-10 h-10 text-green-500" />
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-2">تم الإرسال بنجاح!</h3>
                       <p className="text-white/60">شكراً لتواصلك معنا.</p>
                   </motion.div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-6 dir-rtl">
                    <div className="grid md:grid-cols-2 gap-5">
                            <div className="relative group text-right">
                                <label className="block text-white/60 text-xs mb-2 pr-1">الاسم الكامل</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all text-right"
                                    placeholder="الاسم الكامل"
                                />
                            </div>

                            <div className="relative group text-right">
                                <label className="block text-white/60 text-xs mb-2 pr-1">البريد الإلكتروني</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all text-right"
                                    placeholder="example@mail.com"
                                />
                            </div>
                    </div>

                    <div className="flex gap-4 text-right">
                        <div className="relative w-1/3">
                            <label className="block text-white/60 text-xs mb-2 pr-1">الرمز</label>
                            <select 
                                name="countryKey"
                                value={formData.countryKey}
                                onChange={(e) => setFormData(prev => ({...prev, countryKey: e.target.value}))}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-2 py-3 text-white focus:border-[var(--color-copper)] outline-none appearance-none text-center"
                                >
                                    {COUNTRY_KEYS.map(c => (
                                        <option key={c.code} value={c.code} className="bg-black">{c.flag} {c.code}</option>
                                    ))}
                                </select>
                        </div>
                        <div className="relative w-2/3">
                            <label className="block text-white/60 text-xs mb-2 pr-1">رقم الهاتف</label>
                            <input 
                                type="tel" 
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all text-left dir-ltr"
                                placeholder="50 000 0000"
                                dir="ltr"
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        <label className="block text-white/60 text-xs mb-2 pr-1">الخدمات المهتم بها</label>
                        {/* 3 Columns on ALL screens (grid-cols-3 instead of md:grid-cols-3) */}
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                            {SERVICE_CATEGORIES.map((category, idx) => (
                                <ServiceDropdown 
                                    key={idx}
                                    category={category}
                                    selectedServices={formData.services}
                                    onToggle={toggleService}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-right">
                        <label className="block text-white/60 text-xs mb-2 pr-1">تفاصيل إضافية</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all resize-none text-sm text-right"
                            placeholder="حدثنا عن مشروعك..."
                        />
                    </div>

                    <div className="flex justify-center pt-4">
                        <LiquidButton 
                            type="submit" 
                            disabled={formProgress < 100 || isSending}
                            className={cn(
                                "w-full",
                                (formProgress < 100 || isSending) ? "opacity-50 cursor-not-allowed" : ""
                            )}
                        >
                             {isSending ? "جاري الإرسال.." : "إرسال الطلب"}
                        </LiquidButton>
                    </div>

                    {submitError && (
                        <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                            {submitError}
                        </div>
                    )}
                </form>
               )}

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                    <ContactCard 
                        icon={<Mail className="w-5 h-5" />}
                        title="البريد الإلكتروني"
                        value="contact@echonovastudio.com"
                        link="mailto:contact@echonovastudio.com"
                    />
                    <ContactCard 
                        icon={<Phone className="w-5 h-5" />}
                        title="واتساب"
                        value="ابدأ المحادثة الآن"
                        link="https://wa.me/message/UQYX7YGKDTPHN1"
                    />
               </div>

            </motion.div>
       </div>

    </section>
  );
}
