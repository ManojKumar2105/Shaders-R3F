export default /*glsl*/ `  
vec3 normal=normal; 
normal.y+=uTime;
vec3 noisePattern = vec3(noise(normal));
float pattern = wave(noisePattern);

//Varyings

vDisplacement = pattern;

float displacement = vDisplacement / 3.0;
transformed+=normalize(objectNormal) * displacement;
`