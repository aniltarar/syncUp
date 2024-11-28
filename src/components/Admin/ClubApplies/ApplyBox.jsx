import React from 'react'

const ApplyBox = () => {
    return (
        <div className='px-4 py-2 bg-neutral-300 border flex flex-col justify-between '>
            <div className='flex flex-col gap-y-3'>
                <div className='flex items-center justify-between'>
                    <div className='p-10  bg-blue-500'></div>
                    <div>

                        <h2 className='text-lg font-semibold'>Club Name : KULÜP ADI</h2>

                    </div>
                </div>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nostrum quae voluptatum delectus sed repellat ducimus a molestias deserunt fugit.</p>
            </div>
            <div className='text-end'>
                <h3>Club Leader</h3>
                <p>Leader Name</p>
            </div>
            <div className='gap-x-2 flex'>
                <button className='bg-green-500 text-white px-4 py-2 rounded-md'>Accept</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Reject</button>
            </div>
        </div>
    )
}

export default ApplyBox