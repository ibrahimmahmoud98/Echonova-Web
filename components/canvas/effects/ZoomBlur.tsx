import { ZoomBlurEffect } from "./ZoomBlurEffect";
import { wrapEffect } from "@react-three/postprocessing";

// Wrap the vanilla postprocessing effect for React Three Fiber
export const ZoomBlur = wrapEffect(ZoomBlurEffect);
