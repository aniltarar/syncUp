import React from 'react'
import 'ldrs/ring'
import { ring2 } from 'ldrs'


const LoaderSpinner = () => {
    ring2.register()
    return (
        <div className='w-full h-screen flex flex-col gap-y-3 justify-center items-center '>

            <l-ring-2
                size="40"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="black"
            ></l-ring-2>
        </div>
    )
}

export default LoaderSpinner