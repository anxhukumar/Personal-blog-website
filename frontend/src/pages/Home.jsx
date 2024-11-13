import React, { useState } from 'react'
import MainHeader from '../components/Header/MainHeader'
import { GradientBtn, HomeBlogSnippet, MessageForm, SearchBar } from '../components'
import { useSelector } from 'react-redux'

function Home() {

    const currentMode = useSelector((state) => state.modeSwitch.mode);
    const [messageBox, setMessageBox] = useState(false)

  return (
    <>
        <MainHeader />
        <div className='flex min-h-screen mt-10 mx-32'>
            <div className='flex flex-col gap-10 min-w-80 h-3/4'>
                <SearchBar />
                
                <div className='flex flex-col gap-1'>
                    <span className={`transition duration-700   ${currentMode=="tech" ? "text-[#1C5CFF]" : "text-[#8C1936]"}`}>Topics</span>
                    <ol className='text-white'>
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                        
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                        
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                        
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                       
                        <li>
                            <span className='inline-block hover:underline cursor-pointer'>Dummy topic</span>
                        </li>
                    </ol>
                </div>

                {/* MessageForm with smooth transition */}
                <div className={`transition-all duration-500 ease-in-out transform ${messageBox ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                    {messageBox && <MessageForm closeMessageBox={() => setMessageBox(false)} />}
                </div>
                
                {!messageBox && <GradientBtn label="Get in touch" onClick={() => setMessageBox(true)} />} 
                
            </div>
        
            
            <div className='flex flex-col items-center h-screen overflow-y-auto custom-scrollbar'>
                <HomeBlogSnippet title="Building a career in Web3" overview="In this blog, we explore the exciting world of Web3 and what it takes to build a successful career in this emerging field. With the rise of decentralized applications (dApps), blockchain technology, and cryptocurrencies, the demand for Web3 professionals is skyrocketing. We'll cover the key skills needed, from understanding blockchain fundamentals to mastering smart contracts and decentralized finance (DeFi). Whether you're a developer, designer, marketer, or strategist, this guide will help you navigate the opportunities in the Web3 space and provide actionable steps to kickstart or advance your career in this new digital frontier." datePublished="Sept 12 2024"/>
                <HomeBlogSnippet title="Building a career in Web3" overview="In this blog, we explore the exciting world of Web3 and what it takes to build a successful career in this emerging field. With the rise of decentralized applications (dApps), blockchain technology, and cryptocurrencies, the demand for Web3 professionals is skyrocketing. We'll cover the key skills needed, from understanding blockchain fundamentals to mastering smart contracts and decentralized finance (DeFi). Whether you're a developer, designer, marketer, or strategist, this guide will help you navigate the opportunities in the Web3 space and provide actionable steps to kickstart or advance your career in this new digital frontier." datePublished="Sept 12 2024"/>
                <HomeBlogSnippet title="Building a career in Web3" overview="In this blog, we explore the exciting world of Web3 and what it takes to build a successful career in this emerging field. With the rise of decentralized applications (dApps), blockchain technology, and cryptocurrencies, the demand for Web3 professionals is skyrocketing. We'll cover the key skills needed, from understanding blockchain fundamentals to mastering smart contracts and decentralized finance (DeFi). Whether you're a developer, designer, marketer, or strategist, this guide will help you navigate the opportunities in the Web3 space and provide actionable steps to kickstart or advance your career in this new digital frontier." datePublished="Sept 12 2024"/>
                <HomeBlogSnippet title="Building a career in Web3" overview="In this blog, we explore the exciting world of Web3 and what it takes to build a successful career in this emerging field. With the rise of decentralized applications (dApps), blockchain technology, and cryptocurrencies, the demand for Web3 professionals is skyrocketing. We'll cover the key skills needed, from understanding blockchain fundamentals to mastering smart contracts and decentralized finance (DeFi). Whether you're a developer, designer, marketer, or strategist, this guide will help you navigate the opportunities in the Web3 space and provide actionable steps to kickstart or advance your career in this new digital frontier." datePublished="Sept 12 2024"/>
                <HomeBlogSnippet title="Building a career in Web3" overview="In this blog, we explore the exciting world of Web3 and what it takes to build a successful career in this emerging field. With the rise of decentralized applications (dApps), blockchain technology, and cryptocurrencies, the demand for Web3 professionals is skyrocketing. We'll cover the key skills needed, from understanding blockchain fundamentals to mastering smart contracts and decentralized finance (DeFi). Whether you're a developer, designer, marketer, or strategist, this guide will help you navigate the opportunities in the Web3 space and provide actionable steps to kickstart or advance your career in this new digital frontier." datePublished="Sept 12 2024"/>
            </div>
        </div>
    </>
  )
}

export default Home