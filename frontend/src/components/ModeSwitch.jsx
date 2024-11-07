import React from 'react'

function ModeSwitch({switchTechMode, switchLifeMode, techClassName, lifeClassName}) {

return (
    <div className='bg-[#D9D9D9] w-44 h-9 flex justify-between rounded-full mr-7'>
        
        <button className={`transition delay-100 font-bold text-center rounded-full ml-1 my-1 w-20 ${techClassName}`}
         onClick={switchTechMode}>TECH</button>
        
        <button className={`transition delay-100 font-bold text-center rounded-full mr-1 my-1 w-20 ${lifeClassName}`}
         onClick={switchLifeMode}>LIFE</button>
    
    </div>
  )
}

export default ModeSwitch