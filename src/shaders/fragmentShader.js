export default /*glsl*/` varying vec3 vPosition;
    uniform float uTime;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;
    
    void main(){

        vec3 ambient = vec3(0.5, 0.5, 0.5); // color - grey

        // diffuse (lambertian) lighting
        // lightColor, lightSource, normal, diffuseStrength
        vec3 normal = normalize(vNormal.xyz);
        vec3 lightColor = vec3(0.529,0.808,0.922); // color - white
        vec3 lightSource = vec3(1.0, 1.0, 1.0); // coord - (1, 0, 0)
        float diffuseStrength = max(0.0, dot(lightSource, normal));
        vec3 diffuse = diffuseStrength * lightColor;
      
        // specular light
        // lightColor, lightSource, normal, specularStrength, viewSource
        vec3 cameraSource = vec3(0.0, 0.0, 1.0);
        vec3 viewSource = normalize(cameraSource);
        vec3 reflectSource = normalize(reflect(-lightSource, normal));
        float specularStrength = max(0.0, dot(viewSource, reflectSource));
        specularStrength = pow(specularStrength, 256.0);
        vec3 specular = specularStrength * lightColor;
      
        // lighting = ambient + diffuse + specular
        vec3 lighting = vec3(0.0, 0.0, 0.0); // color - black
        // lighting = ambient;
        // lighting = ambient * 0.0 + diffuse;
        // lighting = ambient * 0.0 + diffuse * 0.0 + specular;
        lighting = ambient * 0.0 + diffuse * 0.5 + specular * 0.5;
      
        // color = modelColor * lighting
        vec3 modelColor = vec3(0.75, 0.75, 0.75);
        vec3 color = modelColor * lighting;
      
        gl_FragColor=vec4(vec3(vDisplacement*color),1.0);
    }`

    
    // vec3 viewDirection = normalize(cameraPosition-vPosition);
    // float fresnel = dot(viewDirection,vNormal);
    // gl_FragColor=vec4(vec3(smoothstep(0.45,0.55,fresnel)),1.0);
    // gl_FragColor=vec4(step(0.8,vec3(1.0-abs((vUv.x-0.5)))),1.0); line
    // gl_FragColor=vec4(vec3(step(0.9,1.0-abs(length(vUv.x-0.5)))),1.0); Own Code of LINE
    // gl_FragColor=vec4(vec3(step(0.6,1.0-length(vUv-0.5))),1.0);Own Code Of Circle
    // gl_FragColor=vec4(vec3(step(0.6,1.0-fract((vUv.x*10.0)-0.5))),1.0);Just Playing 
    // vec3 color = vec3(0.0,1.0,1.0);
    //     color.gb = color.rr;

    // vec3 viewSource = normalize(vec3(0.0,0.0,1.0));
    // vec3 reflectSource = normalize(reflect(-lightSource,vNormal));
    // vec3 specularStrength = dot(viewSource,reflectSource);
    // specularStrength = pow(specularStrength,24.0)*lightColor;