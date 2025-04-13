import React from 'react'
import Agent from './Agent'
import Chat from './Chat'
import Microphone from './Microphone'
import Switch from './Switch'

export default function AgentScreen(
   {chatRef, speaking, name, listening, gender, language, flag, bio, location, imageURL, siriColor, initMsg, isToggled, onToggle}
) {

    return (
        <>
        <div className='w-full flex h-screen items-center justify-center bg-[#1a1a1a] p-20 gap-10'>

            <div className='w-full h-full flex flex-col justify-between items-center gap-20'>
                <div className='w-150 px-5 h-150 max-h-150 overflow-y-auto flex flex-col justify-center items-center shadow-[12px_12px_20px_rgba(0,0,0,0.4)]'>
                    <Chat ref={chatRef} chatColor={siriColor}/> 
                </div>
                <div className='flex gap-4 justify-between w-[50%] align-center'>
                    <Microphone isRecording={listening}/>
                    <Switch isToggled={isToggled} onToggle={onToggle}/>
                </div>
            </div>

            <div className='max-w-160 min-w-160 bg-h-full bg-[#272727] rounded-2xl shadow-[12px_12px_20px_rgba(0,0,0,0.4)]'>
                <Agent
                name={name}
                speaking={speaking}
                gender={gender}
                language={language}
                flag={flag}
                bio={bio}
                imgUrl={imageURL}
                location={location}
                siriColor={siriColor}
                initMsg={initMsg}
                />
            </div>

        </div>
        </>
    )
}

