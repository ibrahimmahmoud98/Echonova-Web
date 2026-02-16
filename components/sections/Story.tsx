"use client";

import Image from "next/image";
// ... imports

// ... inside component
            {/* Cinematic Image */}
            <Image 
                src="/images/story_concept.png" 
                alt="Lens dissolving into particles" 
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Overlay Text */}
            <div className="absolute bottom-10 right-10 z-20 max-w-xs text-right">
                <p className="text-[var(--color-champagne)] font-serif italic text-lg opacity-80">
                    &ldquo;نحن لا نلغي الكاميرا.. بل نتجاوزها.&rdquo;
                </p>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
