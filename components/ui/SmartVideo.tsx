"use client";

import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface SmartVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src?: string;
  rootMargin?: string;
}

export const SmartVideo = forwardRef<HTMLVideoElement, SmartVideoProps>(
  ({ src, rootMargin = "1000px", className, poster, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLVideoElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    // Forward the internal video ref to parent
    useImperativeHandle(forwardedRef, () => internalRef.current as HTMLVideoElement);

    useEffect(() => {
        if (shouldLoad) return;
        
        const videoElement = internalRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold: 0 }
        );

        observer.observe(videoElement);
        
        return () => observer.disconnect();
    }, [shouldLoad, rootMargin]);

    // Handle autoPlay when dynamically loaded to ensure smooth playback
    useEffect(() => {
        const video = internalRef.current;
        if (shouldLoad && video && props.autoPlay) {
             video.play().catch(() => {});
        }
    }, [shouldLoad, props.autoPlay]);

    return (
      <video
        ref={internalRef}
        className={className}
        preload={shouldLoad ? "auto" : "none"}
        src={shouldLoad ? src : undefined}
        poster={poster}
        {...props}
      />
    );
  }
);

SmartVideo.displayName = "SmartVideo";
