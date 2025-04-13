import React from 'react'
import "./microphone.css"


export default function Microphone({isRecording}) {
    return (
        <>
        <div className='flex flex-col justify-center items-center gap-5 w-60'>
            <div className={`w-15 h-15 bg-transparent border-1 border-[#3a3a3a] flex 
                justify-center items-center rounded-full ${isRecording ? "recording" : ""}`}>
                <img src="/mic.svg" alt="" width={40}/>
            </div>
            
            <div className='text-white'>
                <p>{ isRecording ? `recording ...`: `hold spacebar to speak`}</p>
            </div>
        </div>
        </>
    )
}