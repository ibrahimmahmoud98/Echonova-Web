"use client";

import { useRef, useState, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial, useVideoTexture } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

import { Check, AlertCircle, ChevronDown } from "lucide-react";
import { PaperPlane } from "@/components/ui/PaperPlane";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP Plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP, MotionPathPlugin);
}

// --- Shader Definition ---
const RevealShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uProgress: 0, 
    uOverlayColor: new THREE.Color('#050510'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uProgress;
    uniform vec3 uOverlayColor;
    varying vec2 vUv;

    void main() {
        // --- 1. CONFIGURATION ---
        float navyOpacity = smoothstep(0.15, 0.0, uProgress);
        
        // --- 2. PRE-90% Logic (Original Blobs) ---
        vec2 uvTL = vec2(0.25, 0.75);
        vec2 uvTR = vec2(0.75, 0.75);
        vec2 uvBL = vec2(0.25, 0.25);
        vec2 uvBR = vec2(0.75, 0.25);
        
        float flowTime = uProgress * 0.5;
        float blobDistort = sin(flowTime) * 0.05;
        
        vec3 cTL = texture2D(uTexture, uvTL + blobDistort).rgb * 0.4; 
        vec3 cTR = texture2D(uTexture, uvTR - blobDistort).rgb * 1.6; 
        vec3 cBL = texture2D(uTexture, uvBL + blobDistort).rgb * 1.6; 
        vec3 cBR = texture2D(uTexture, uvBR - blobDistort).rgb * 0.4; 
        
        float mixX = smoothstep(0.0, 1.0, vUv.x + sin(vUv.y * 2.0 + flowTime)*0.1);
        float mixY = smoothstep(0.0, 1.0, vUv.y + cos(vUv.x * 2.0 + flowTime)*0.1);
        
        vec3 top = mix(cTL, cTR, mixX);
        vec3 bot = mix(cBL, cBR, mixX);
        vec3 blobLayer = mix(bot, top, mixY); 
        
        // --- 3. CLEAN REVEAL (Post-90%) ---
        // User requested NO distortion here. Just pure image.
        vec3 cleanLayer = texture2D(uTexture, vUv).rgb;
        
        // --- 4. MIXING ---
        // Crossfade from Blobs to Clean at 100% - 110%
        float switchPhase = smoothstep(1.0, 1.1, uProgress);
        
        // Force fully clean if > 1.15% to avoid ANY artifacting
        if (uProgress > 1.15) {
             switchPhase = 1.0;
        }

        vec3 finalComp = mix(blobLayer, cleanLayer, switchPhase);
        
        // Fade out the navy overlay
        vec3 result = mix(finalComp, uOverlayColor, navyOpacity);

        gl_FragColor = vec4(result, 1.0);
    }
  `
);

extend({ RevealShaderMaterial });

// --- R3F Background Component ---
const RevealBackground = ({ progress }: { progress: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();
  
  const texture = useVideoTexture("/videos/hero-background.mp4", {
      start: false,
      muted: true,
      loop: true,
      crossOrigin: 'Anonymous'
  }); 

  useEffect(() => {
      const video = texture.image;
      if (video && progress >= 0.99) {
          video.play();
      } else if (video) {
        video.pause();
      }
  }, [texture, progress]);
  
  const scale = useMemo(() => {
    const imageAspect = 16 / 9;
    const canvasAspect = viewport.width / viewport.height;
    if (canvasAspect > imageAspect) {
        return [viewport.width, viewport.width / imageAspect, 1];
    } else {
        return [viewport.height * imageAspect, viewport.height, 1];
    }
  }, [viewport]);

  useFrame((state) => {
    if (materialRef.current) {
        // Smoothly interpolate progress
        materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
            materialRef.current.uniforms.uProgress.value,
            progress,
            0.1
        );
        
        // --- THE KILL SWITCH (JS SIDE) ---
        // Force uniforms to zero if animation is done
        if (materialRef.current.uniforms.uProgress.value > 1.2) {
            materialRef.current.uniforms.uProgress.value = 1.25;
        }
        
        materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale as any}>
      <planeGeometry args={[1, 1, 32, 32]} />
      {/* @ts-ignore */}
      <revealShaderMaterial 
        ref={materialRef} 
        key={RevealShaderMaterial.key} 
        uTexture={texture}
        transparent={true}
      />
    </mesh>
  );
};

// --- Form Logic & Types ---
type FormData = {
  name: string;
  email: string;
  countryKey: string;
  countryCode?: string; // Type Fix
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
                    "w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 text-sm",
                    hasActive || isOpen
                        ? "bg-[var(--color-copper)]/10 border-[var(--color-copper)] text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"
                )}
            >
                <span className="font-medium">{category.title}</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-2 flex flex-col gap-2 pl-4 border-r-2 border-white/10 mr-2"> 
                           {/* Note: RTL layout, so mr-2 and pl-4 might need flip depending on dir. Assuming global dir-rtl for arabic? 
                               Actually input has dir="ltr" on phone, others standard. Let's stick to flex gap.
                           */}
                            {category.items.map(item => {
                                const isActive = selectedServices.includes(item);
                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => onToggle(item)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-right w-full transition-all",
                                            isActive 
                                                ? "bg-[var(--color-copper)] text-white" 
                                                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-2 h-2 rounded-full border border-current",
                                            isActive ? "bg-white" : "bg-transparent"
                                        )} />
                                        {/* Show clean name (hide unique identifier suffix) */}
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

export const ContactReveal = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryKey: "+1",
    countryCode: "US", // Initial value
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

  // Simulation State
  const [simProgress, setSimProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false); 
  const [showError, setShowError] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalReveal, setFinalReveal] = useState(false); 

  // Animation Refs & State
  const buttonRef = useRef<HTMLButtonElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const restingPlaneRef = useRef<SVGSVGElement>(null); // Track the plane SVG exactly
  const formContainerRef = useRef<HTMLDivElement>(null); // Outer wrapper (Scroll + Plane)
  const contentRef = useRef<HTMLDivElement>(null); // Inner wrapper (Header + Form fields) - Fades out
  const [animationStatus, setAnimationStatus] = useState<'idle' | 'morph' | 'flying' | 'success'>('idle');

  const containerRef = useRef<HTMLDivElement>(null);

  // Manual Trigger Logic
  const triggerSimulation = () => {
      if (!hasStarted) {
          setHasStarted(true);
          setIsSimulating(true);
      }
  };

  // FX: Complete the curve from 78% -> 100% on successful submission
  useEffect(() => {
    if (!isSubmitted) return;
    
    // Resume simulation from where it paused (78%)
    const interval = setInterval(() => {
        setSimProgress(prev => {
            const next = prev + (Math.random() * 0.3); // Ultra slow finishing (1/8 original)
            if (next >= 100) {
                clearInterval(interval);
                setFinalReveal(true); // Trigger final success state
                return 100;
            }
            return next;
        });
    }, 20);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  // GSAP Pinning Logic
  useGSAP(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top", // When top of section hits top of viewport
        end: "+=1500", // Pin for 1500px of scroll
        pin: true,     // Pin the section
        scrub: true,   // Smooth scrubbing
        onEnter: () => {
            triggerSimulation();
        }
    });

    return () => {
        trigger.kill();
    };
  }, { scope: containerRef });

  // Simulation Update Loop (Time-based, distinct from scroll)
  useEffect(() => {
    if (!isSimulating) return;

    const startDelay = setTimeout(() => {
        const interval = setInterval(() => {
            setSimProgress(prev => {
                const next = prev + (Math.random() * 1.5);
                if (next >= 78) {
                    clearInterval(interval);
                    setIsSimulating(false);
                    setShowError(true);
                    setTimeout(() => setShowForm(true), 1500); 
                    return 78;
                }
                return next;
            });
        }, 30); 
        
        return () => clearInterval(interval);
    }, 500);

    return () => clearTimeout(startDelay);
  }, [isSimulating]);

  // Combined Progress Calculation
  const logicProgress = useMemo(() => {
     if (!hasStarted) return 0;

     // 1. Final Reveal (Completed)
     if (finalReveal) return 1.3;

     // 2. Post-Submission Loading (78% -> 100%)
     if (isSubmitted) {
         // Ensure we start from at least 0.78 and go to 1.0
         return Math.max(0.78, simProgress / 100);
     }

     // 3. Initial Simulation (Scroll Triggered 0-78%)
     if (isSimulating || (simProgress < 78 && !showError)) {
         return (simProgress / 100) * 0.3; // Map 0-78 to 0.0-0.23 (Dark phase)
     } 
     
     // 4. Form Filling Phase (Interactive)
     else {
         const fields = [validation.name, validation.email, validation.phone, validation.services];
         const validCount = fields.filter(Boolean).length;
         // Map 0-4 valid fields to 0.3 -> 0.75 (Clearer but still blobs)
         return 0.3 + (validCount / 4) * 0.45;
     }
  }, [validation, simProgress, isSimulating, showError, hasStarted, finalReveal, isSubmitted]);

  // Global Simulation Display (For the centered loader only)
  const simDisplayPercent = useMemo(() => {
      // If submitted, show the climb from 78 to 100
      if (isSubmitted) return Math.min(100, Math.floor(simProgress));
      return Math.min(78, Math.floor(simProgress));
  }, [simProgress, isSubmitted]);

  // Form Specific Progress (0-100% purely based on data)
  const formProgress = useMemo(() => {
      const fields = [validation.name, validation.email, validation.phone, validation.services];
      const validCount = fields.filter(Boolean).length;
      return Math.floor((validCount / 4) * 100);
  }, [validation]);


  // Real-time Validation
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

  // TETHERING ENGINE (NATIVE SCROLL VERSION)
  // Calculates the static offset relative to the Form Container.
  // Since both are in the same scroll context, this only needs to run on resize/layout changes.
  useEffect(() => {
    // Only tether if we are ready (100%) and waiting (idle)
    if (formProgress < 100 || animationStatus !== 'idle') {
        return;
    }

    const updatePosition = () => {
        const btn = buttonRef.current;
        const flyer = flyerRef.current;
        const container = formContainerRef.current;
        
        if (!btn || !flyer || !container) return;

        // Get rects relative to viewport
        const btnRect = btn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Calculate offset relative to the container
        // X = (Button Left - Container Left) + Offset
        // Y = (Button Top - Container Top) + Center Offset
        // X: Left edge + 25px (Moved left to avoid text overlap)
        const relativeX = (btnRect.left - containerRect.left) + 25;
        const relativeY = (btnRect.top - containerRect.top) + (btnRect.height / 2);

        // Apply Position (Absolute)
        // Note: transformOrigin center is critical
        gsap.set(flyer, {
            x: relativeX,
            y: relativeY,
            xPercent: -50,
            yPercent: -50,
            rotation: 225,
            transformOrigin: "50% 50%"
        });
    };

    // Run on mount and resize
    updatePosition();
    window.addEventListener('resize', updatePosition);
    
    // Also run when form expands/changes
    const resizeObserver = new ResizeObserver(updatePosition);
    if (formContainerRef.current) resizeObserver.observe(formContainerRef.current);

    return () => {
        window.removeEventListener('resize', updatePosition);
        resizeObserver.disconnect();
    };
  }, [formProgress, animationStatus]);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formProgress < 100) return; 
      
      if (animationStatus !== 'idle') return;

      // 2. RELEASE THE TETHER
      // Changing status to 'morph' automatically unmounts the Ticker useEffect.
      // The plane is now free-floating at its last known position (atop the button).
      setAnimationStatus('morph');

      const btn = buttonRef.current;
      const flyer = flyerRef.current;
      const formContainer = formContainerRef.current;
      
      if (!btn || !flyer) return;

        // 2. RELEASE THE TETHER & SWITCH CONTEXT
        // Current state: Absolute (Scrollable)
        // Target state: Fixed (Global Flight)
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // The button's plane is rotated 225deg (pointing down-left)
        const INITIAL_ROTATION = 225;
  
        // Create Timeline
        const tl = gsap.timeline({
            onComplete: () => {
               setAnimationStatus('success');
               // Morph button back or show success state
               setIsSubmitted(true);
               
               // Reset form after delay
               setTimeout(() => {
                   setAnimationStatus('idle');
                   setFormData({ name: '', email: '', phone: '', services: [], message: '', countryKey: '+966', countryCode: '+966' });
                   // setShowForm(false); // Optional: close form
               }, 3000);
            }
        });

        const rect = flyer.getBoundingClientRect();
        
        // Calculate the CENTER of the plane in screen coordinates
        // We use center because we have xPercent: -50, yPercent: -50
        const startX = rect.left + (rect.width / 2);
        const startY = rect.top + (rect.height / 2);

        // INSTANTLY Promote to Fixed Position keeping exact visual spot
        gsap.set(flyer, {
            position: 'fixed',
            left: 0,
            top: 0,
            x: startX,
            y: startY,
            // Keep anchor center
            xPercent: -50,
            yPercent: -50,
            rotation: INITIAL_ROTATION
        });

      // 2. Button Morph (Shrink)
      tl.to(btn, {
          width: 50,
          minWidth: 50,
          color: "transparent",
          duration: 0.25,
          ease: "back.in(2)" 
      });

      // 3. LAUNCH PHASE (Instant Switch)
      tl.addLabel("launch");

      // A. Hide Form Content (Fields + Header) - Leave Plane Visible!
      if (contentRef.current) {
           tl.to(contentRef.current, { autoAlpha: 0, duration: 0.1 }, "launch");
      }
      
      // OPTIONAL: Hide the Scroll/Form container interaction, but keep it visible for the plane
      if (formContainerRef.current) {
          tl.set(formContainerRef.current, { pointerEvents: "none" }, "launch");
      }

      // B. Swap Button -> Flyer
      tl.call(() => {
          if (buttonRef.current) buttonRef.current.style.opacity = '0';
          setAnimationStatus('flying'); 
      }, [], "launch");
      
      
      
      // C. SPIRAL FLIGHT PATH with DYNAMIC NOSE ORIENTATION
      const NOSE_OFFSET = 0; // degrees - no offset needed!

      const spiralPath = [
          // 1. Outward Thrust (Right/Up)
          { x: startX + 120, y: startY - 80 }, 
          // 2. Apex of Loop (High, Centered-ish)
          { x: centerX + 60, y: centerY - 200 },
          // 3. Back of Loop (Left)
          { x: centerX - 80, y: centerY - 120 },
          // 4. Target (Center)
          { x: centerX, y: centerY } 
      ];

      // Track previous position for velocity calculation
      let prevPosX = startX;
      let prevPosY = startY;

      tl.to(flyer, {
          motionPath: {
              path: spiralPath,
              curviness: 1.5,
              // NO autoRotate - we handle rotation manually
          },
          duration: 1.8, 
          ease: "power2.inOut",
          onUpdate: function() {
              // Get current position
              const currentX = gsap.getProperty(flyer, "x") as number;
              const currentY = gsap.getProperty(flyer, "y") as number;
              
              // Calculate movement delta (velocity vector)
              const deltaX = currentX - prevPosX;
              const deltaY = currentY - prevPosY;
              
              // DEBUG LOG
              console.log('[Plane Debug]', {
                  currentX: currentX.toFixed(2),
                  currentY: currentY.toFixed(2),
                  deltaX: deltaX.toFixed(2),
                  deltaY: deltaY.toFixed(2),
                  threshold: Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5
              });
              
              // Only rotate if there's meaningful movement (avoid division by zero / jitter)
              if (Math.abs(deltaX) > 0.5 || Math.abs(deltaY) > 0.5) {
                  // Calculate the angle of movement direction (in degrees)
                  const movementAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                  
                  // Apply rotation: align the nose to movement direction
                  const targetRotation = movementAngle + NOSE_OFFSET;
                  
                  // DEBUG LOG
                  console.log('[Plane Rotation]', {
                      movementAngle: movementAngle.toFixed(2),
                      NOSE_OFFSET,
                      targetRotation: targetRotation.toFixed(2)
                  });
                  
                  gsap.set(flyer, { rotation: targetRotation });
              }
              
              // Update previous position for next frame
              prevPosX = currentX;
              prevPosY = currentY;
          }
      }, "launch");
      
      // Wind/Wobble (scale only, no rotation interference)
      tl.to(flyer, {
          scale: 0.9,
          duration: 0.6,
          yoyo: true,
          repeat: 2,
          ease: "sine.inOut"
      }, "launch");


      // 4. Arrival & Morph
      tl.to(flyer, {
          scale: 0.2, 
          duration: 0.15,
          ease: "power1.in"
      });
      
      tl.call(() => setAnimationStatus('success')); 

      tl.to(flyer, {
          scale: 1.5,
          rotation: 0, 
          opacity: 1,
          boxShadow: "0px 0px 50px rgba(74, 222, 128, 0.8)", 
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
      });

      // 5. Fade Out
      tl.to(flyer, {
          opacity: 0,
          delay: 0.3,
          duration: 0.3
      });
  };

  return (
    <section 
        id="contact-reveal" 
        ref={containerRef}
        onClick={triggerSimulation}
        className="relative h-screen w-full overflow-hidden bg-black cursor-pointer"
    >
       
       {/* 1. WebGL Background Layer */}
       <div className="absolute inset-0 z-0">
           <Canvas dpr={[1, 2]}>
               <Suspense fallback={null}>
                   <RevealBackground progress={logicProgress} />
               </Suspense>
           </Canvas>
       </div>

       {/* 2. Overlay Gradient */}
       <AnimatePresence>
           {!finalReveal && (
               <motion.div 
                 initial={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 1 }}
                 className="absolute inset-0 z-10 bg-gradient-to-l from-black/90 via-black/60 to-transparent pointer-events-none" 
               />
           )}
       </AnimatePresence>




       {/* 3. SIMULATION / LOADING LAYER */}
       <AnimatePresence mode="wait">
           {/* Show when: 
               1. Simulating initial phases (0-78) AND no error
               2. OR Submitted and finishing (78-100) 
           */}
           {((isSimulating && !showError) || (isSubmitted && !finalReveal)) && (
               <motion.div 
                 key="sim-loader"
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4"
               >
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight flex items-center gap-1">
                       {isSubmitted ? "جاري اكمال توليد عالمك" : "جاري توليد عالم علامتك التجارية"}
                       <span className="animate-pulse">.</span>
                       <span className="animate-pulse delay-100">.</span>
                       <span className="animate-pulse delay-200">.</span>
                   </h2>
                   <div className="text-6xl md:text-8xl font-mono text-white/20 font-bold">
                       {simDisplayPercent}%
                   </div>
               </motion.div>
           )}
       </AnimatePresence>

       {/* 4. ERROR MESSAGE (Prior to Submit) */}
       <AnimatePresence>
            {showError && !isSubmitted && formProgress < 100 && (
                 <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
                     <motion.div 
                        initial={{ 
                            top: "50%", 
                            left: "50%", 
                            x: "-50%", 
                            y: "-50%", 
                            scale: 1.5,
                            opacity: 0 
                        }}
                        animate={showForm ? { 
                            top: "50%", 
                            left: "90%", 
                            x: "-100%", 
                            y: "-50%", 
                            scale: 1,
                            opacity: 1,
                            boxShadow: ["0 0 20px rgba(239,68,68,0.2)", "0 0 60px rgba(239,68,68,0.6)", "0 0 20px rgba(239,68,68,0.2)"]
                        } : { 
                            top: "50%", 
                            left: "50%", 
                            x: "-50%", 
                            y: "-50%", 
                            scale: 1.5,
                            opacity: 1,
                            boxShadow: ["0 0 50px rgba(239,68,68,0.4)", "0 0 100px rgba(239,68,68,0.8)", "0 0 50px rgba(239,68,68,0.4)"]
                        }}
                        transition={{ 
                            duration: 1, 
                            ease: "easeInOut",
                            boxShadow: {
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }
                        }}
                        className={cn(
                            "absolute bg-red-500/10 backdrop-blur-md border border-red-500/50 text-red-100 px-8 py-6 rounded-2xl flex flex-col items-center gap-4 text-center min-w-[300px]",
                            showForm ? "items-start text-right max-w-sm" : "items-center"
                        )}
                     >
                        <AlertCircle className={cn("text-red-500 transition-all", showForm ? "w-8 h-8" : "w-16 h-16")} />
                        <div>
                            <span className={cn("block font-bold mb-2", showForm ? "text-lg" : "text-3xl")}>خطأ في التوليد</span>
                            <span className={cn("block opacity-80", showForm ? "text-sm" : "text-xl")}>البيانات غير مكتملة (78%). المرجو إكمال النموذج يدوياً.</span>
                        </div>
                     </motion.div>
                 </div>
            )}
       </AnimatePresence>


       {/* 5. FORM LAYER */}
       <AnimatePresence>
           {showForm && (
               <motion.div 
                 initial={{ x: -100, opacity: 0 }} 
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: -100, opacity: 0, transition: { duration: 0.5 } }} // Slide out on submit
                 transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                 className="absolute inset-0 z-20 container mx-auto px-4 flex items-center justify-end h-full"
               >
                   <div 
                       ref={formContainerRef} // FIXED: Attached ref for hiding
                       className="w-full max-w-xl relative"
                   >
                       
                       {/* THE PLANE - NOW ABSOLUTE INSIDE SCROLL CONTAINER (Native Stability) */}
                       <div 
                           ref={flyerRef}
                           className="absolute z-[100] pointer-events-none flex items-center justify-center text-white transition-opacity duration-300"
                           style={{
                               width: '20px',
                               height: '20px',
                               left: 0,
                               top: 0,
                               // We rely on GSAP to set X/Y relative to this container
                               pointerEvents: 'none',
                               opacity: (formProgress === 100 && animationStatus !== 'success') ? 1 : 0,
                               transition: 'opacity 0.3s ease-in-out'
                            }}
                        >
                            {/* Always render the plane */}
                            {animationStatus !== 'success' && (
                                <PaperPlane className={cn(
                                    "w-5 h-5 transition-colors duration-300",
                                    formProgress === 100 ? "text-white" : "text-[var(--color-copper)]"
                                )} />
                            )}
                            {animationStatus === 'success' && (
                                <div className="bg-green-500 rounded-full p-2 shadow-[0_0_20px_rgba(74,222,128,0.6)]">
                                    <Check className="w-6 h-6 text-white" />
                                </div>
                            )}
                        </div>

                       {/* Header & Form Content Wrapper - Fades out independently */}
                       <div 
                            ref={contentRef}
                            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
                        >
                           {/* Header */}
                           <div className="mb-6 border-b border-white/5 pb-4">
                               <div className="flex justify-between items-end mb-2">
                                   <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                       <span className={cn("w-2 h-2 rounded-full animate-pulse", formProgress === 100 ? "bg-green-500" : "bg-red-500")} />
                                       {formProgress === 100 ? "قم بالارسال لاستكمال انشاء عالمك" : "بيانات التوليد"}
                                   </h2>
                                   <span className="text-3xl font-mono font-bold text-[var(--color-copper)]">{formProgress}%</span>
                               </div>
                               {/* Progress Bar */}
                               <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                   <div 
                                     className={cn("h-full transition-all duration-700 ease-out", formProgress === 100 ? "bg-green-500" : "bg-[var(--color-copper)]")}
                                     style={{ width: `${formProgress}%` }}
                                   />
                               </div>
                           </div>
                           
                           {/* Form */}
                           <form onSubmit={handleSubmit} className="space-y-4">
                           
                           {/* Row 1: Name */}
                           <div className="relative group">
                               <input 
                                   type="text" 
                                   name="name"
                                   value={formData.name}
                                   onChange={handleInputChange}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all pl-10"
                                   placeholder="الاسم الكامل"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                                    {validation.name ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                                </div>
                            </div>

                            {/* Row 2: Email */}
                            <div className="relative group">
                                <input 
                                   type="email" 
                                   name="email"
                                   value={formData.email}
                                   onChange={handleInputChange}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all pl-10"
                                   placeholder="البريد الإلكتروني"
                                />
                                 <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                                    {validation.email ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                                </div>
                            </div>

                            {/* Row 3: Phone & Country */}
                            <div className="flex gap-3">
                                <div className="relative w-1/3">
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
                                    <input 
                                       type="tel" 
                                       name="phone"
                                       value={formData.phone}
                                       onChange={handleInputChange}
                                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all text-left dir-ltr"
                                       placeholder="50 000 0000"
                                       dir="ltr"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30">
                                        {validation.phone ? <Check className="w-4 h-4 text-green-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/20" />}
                                    </div>
                                </div>
                            </div>

                            {/* Row 4: Services (Multi Select) */}
                            <div>
                                <label className="block text-white/60 text-xs mb-2">الخدمات المهتم بها (اختر واحدة على الأقل)</label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

                            {/* Row 5: Message (Optional) */}
                            <div>
                                <textarea 
                                   name="message"
                                   value={formData.message}
                                   onChange={handleInputChange}
                                   rows={2}
                                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[var(--color-copper)] outline-none transition-all resize-none text-sm"
                                   placeholder="رسالة إضافية (اختياري)"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center pt-2">
                                <button 
                                   ref={buttonRef} // Attach Ref Here
                                   type="submit"
                                   disabled={formProgress < 100}
                                   className={cn(
                                       "px-12 py-3 rounded-full font-bold flex items-center gap-2 transition-all duration-500 shadow-lg min-w-[140px] justify-center overflow-hidden",
                                       formProgress === 100 
                                           ? "bg-[var(--color-copper)] text-white hover:bg-orange-600 shadow-[0_0_20px_rgba(217,112,64,0.4)] cursor-pointer translate-y-0" 
                                           : "bg-white/10 text-white/40 border border-white/10 cursor-not-allowed"
                                   )}
                                >
                                    {formProgress === 100 ? (
                                       <div className="flex items-center gap-2">
                                           <span>ارسال</span>
                                       </div>
                                    ) : (
                                       <span className="text-sm">({formProgress}%)</span>
                                    )}
                                </button>
                            </div>

                        </form>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
     </section>
   );
}
