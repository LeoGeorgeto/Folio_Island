import { Html } from "@react-three/drei"

// Loader component displaying a spinning animation while loading
const Loader = () => {
  return (
    <Html>
        <div className='flex justify-center items-center'>
        <div className='w-20 h-20 border-opacity-20 border-blue-500 rounded-full animate-spin'/>
    </div>
    </Html>
    
  )
}

export default Loader