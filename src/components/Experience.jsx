
import vertexShader from "../shaders/vertexShader.js";
import fragmentShader from "../shaders/fragmentShader.js";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React from "react";
import { useRef } from "react";
import * as THREE from "three";
import vertexShaderPars from "../shaders/vertexShaderPars.js";
import vertexShaderMains from "../shaders/vertexShaderMains.js";
import fragmentMain from "../shaders/fragmentMain.js";
// import fragmentMain from "../shaders/fragmentMain.js";
import fragmentPars from "../shaders/fragmentPars.js";
console.log(shaderMaterial);

const ProjectMaterial = shaderMaterial(
    {
        uTime:0,
    },
    vertexShader,
    fragmentShader
)
extend({ProjectMaterial})

export default function Experience(){

    const projectRef = useRef();

    useFrame((state,delta)=>{
        // projectRef.current.shader.uniforms.uTime+=delta*0.1;
        // console.log(projectRef.current);
    })

    const {color} = useControls({
        color:"rgb(255,0,0)"

    })
        

    return (
        <>

           <OrbitControls />
            <directionalLight position={[2,2,2] } color={color}  intensity={0.6} />
           <ambientLight color={color } intensity={0.2} /> 
                <mesh >
                    {/* <planeBufferGeometry args={[2,2,2,2]} />         */}
                    <icosahedronGeometry args={[3,300]} />
                    {/* <projectMaterial ref={projectRef}/> */}
                    <meshStandardMaterial ref={projectRef} onBeforeCompile={(shader)=>{
                        // userData.shader=shader
                        
                        const clock=new THREE.Clock();
                        function uTimeChange(){
                            const elapsedtime= clock.getElapsedTime()
                            shader.uniforms.uTime={value:elapsedtime*0.0001}
                            console.log(elapsedtime)
                        }
                        
                        const parseVertexString=/*glsl*/`#include <displacementmap_pars_vertex>`
                        shader.vertexShader = shader.vertexShader.replace(parseVertexString,parseVertexString+vertexShaderPars);
                        const mainVertexString=/*glsl*/`#include <displacementmap_vertex>`
                        shader.vertexShader = shader.vertexShader.replace(mainVertexString,mainVertexString+vertexShaderMains);
                        const fragmentParseString = /*glsl*/ `#include <bumpmap_pars_fragment>`
                        shader.fragmentShader = shader.fragmentShader.replace(fragmentParseString,fragmentParseString+fragmentPars);
                        const mainFragmentString=/*glsl*/`#include <normal_fragment_maps>`
                        shader.fragmentShader = shader.fragmentShader.replace(mainFragmentString,mainFragmentString+fragmentMain);
                        setInterval(uTimeChange,500);
                    }} />
                </mesh>                   
               
        </>
        
    )
    
}