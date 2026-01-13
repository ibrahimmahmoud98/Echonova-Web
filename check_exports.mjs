import * as PP from "postprocessing";
console.log(Object.keys(PP).filter(k => k.toLowerCase().includes("blur")));
console.log(Object.keys(PP).filter(k => k.toLowerCase().includes("effect")));
