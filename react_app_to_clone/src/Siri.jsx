import React from 'react'
import SiriWave from 'react-siriwave'

function AudioVisualizer({playing, siriColor}) {

  return (
    <div className={`w-full h-full relative ${playing ? "opacity-100" : "opacity-50"}`}>
        <SiriWave
            color={siriColor}
            cover={true}
            speed={playing ? 0.13 : 0.05}/>
    </div>
  )
}

export default AudioVisualizer
