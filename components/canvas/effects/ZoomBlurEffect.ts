import { Effect } from "postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = `
uniform float strength;
uniform vec2 center;

float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 color = vec4(0.0);
    float total = 0.0;
    vec2 toCenter = center - uv;
    float offset = random(uv);
    
    for (float t = 0.0; t <= 40.0; t++) {
        float percent = (t + offset) / 40.0;
        float weight = 4.0 * (percent - percent * percent);
        vec4 sampledColor = texture2D(inputBuffer, uv + toCenter * percent * strength);
        sampledColor.rgb *= sampledColor.a;
        color += sampledColor * weight;
        total += weight;
    }
    
    outputColor = color / total;
    outputColor.rgb /= outputColor.a + 0.00001;
}
`;

export class ZoomBlurEffect extends Effect {
  constructor({ strength = 0, center = [0.5, 0.5] } = {}) {
    super("ZoomBlurEffect", fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ["strength", new Uniform(strength)],
        ["center", new Uniform(new Vector2(center[0], center[1]))]
      ])
    });
  }

  get strength() {
    return this.uniforms.get("strength")!.value;
  }

  set strength(value) {
    this.uniforms.get("strength")!.value = value;
  }
}
