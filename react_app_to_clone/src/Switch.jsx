import React from "react";
import './togglebtn.css';

export default function Switch({isToggled, onToggle}) {

    return (
        <div className="flex justify-center items-center gap-5">
            <button onClick={onToggle} className='hover:cursor-pointer'>
                <div className={`toggle-btn ${isToggled ? 'toggled' : ''}`}>
                    
                        <div className='thumb'></div>
                </div>
            </button>
            <img src={`${isToggled? '/woman.svg':'/clown.svg'}`} alt="" width={45}/>
        </div>
    )
}