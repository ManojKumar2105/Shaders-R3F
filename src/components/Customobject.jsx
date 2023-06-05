import { useRef } from "react"
import { useEffect } from "react"
import { useMemo } from "react"
import { DoubleSide } from "three"



export default function Customobject(){
    
    const geometryRef = useRef()

    useEffect(()=>{
        geometryRef.current.computeVertexNormals()
    },[])

    const verticesCount = 10 * 3   //10 triangles with 3 points each

    const positions = useMemo(()=>{
        const positions = new Float32Array(verticesCount * 3)
    
        for(let i = 0;i < verticesCount ;i++){
            positions[i] = (Math.random() - 0.5) * 3
        }
        return positions}
    ,[verticesCount])

    return <mesh position-y={-0.89}>
                <bufferGeometry ref={geometryRef}>
                    <bufferAttribute 
                    attach="attributes-position"
                    count={verticesCount}
                    itemSize={3}
                    array={positions}
                    />
                </bufferGeometry>
                <meshBasicMaterial color="red" side={DoubleSide} />
        </mesh>
    
}