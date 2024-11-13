import React from 'react'
import { useSelector } from 'react-redux'

function Blog() {

    const currentMode = useSelector((state) => state.modeSwitch.mode);
   
    return (
    <>
        <div className='flex flex-col min-h-screen mt-20 mx-32'>
            
            <div className={`mx-40`}>
                <h1 className='text-white font-bold text-3xl mb-10'>
                    Building a career in Web3
                </h1>
            </div>

            <div className={`mx-40 py-3 text-sm text-gray-400 mb-8 space-y-1 border-y-4 ${currentMode=="tech" ? "border-[#1C5CFF]" : "border-[#8C1936]" }`}>
                <p className="font-medium ">January 15, 2024</p>
                <p className="font-medium ">5 min read</p>
            </div>
            
            {/* TODO: To be changed in way that can store text wrapped in xml and not plain text */}
            <div className='mx-40'>
                <p className='text-[#E8E9EA] text-md max-w-fit mx-auto py-8 leading-relaxed'>
                As the digital landscape continues to evolve, Web3 stands out as a revolutionary force, transforming how we interact with the internet. At its core, Web3 represents a shift toward a decentralized web, powered by blockchain technology, where users have greater control over their data, transactions, and online identities. In this blog, we’ll delve into what it takes to build a successful career in this dynamic and rapidly growing field.
    Understanding Web3: The Basics
    Before diving into career opportunities, it’s essential to grasp the fundamentals of Web3. Unlike the traditional web, which relies on centralized servers and entities, Web3 is built on decentralized networks. Blockchain technology serves as the backbone, providing transparency, security, and immutability to digital transactions and data storage.
    Key concepts include:
    Decentralized Applications (dApps): These are applications that run on a blockchain network rather than a single server, ensuring greater security and reliability.
    Smart Contracts: Self-executing contracts with the terms directly written into code, which automatically enforce and execute the agreement.
    Cryptocurrencies: Digital or virtual currencies that use cryptography for security and operate on blockchain technology.
    Essential Skills for a Web3 Career
    Blockchain Fundamentals: A strong understanding of blockchain technology is crucial. Familiarize yourself with how blockchains work, including concepts like consensus mechanisms, cryptographic hashing, and the role of miners and validators.
    Smart Contract Development: Learn to write and deploy smart contracts. Popular programming languages include Solidity for Ethereum and Rust for Solana. Understanding these will enable you to create decentralized applications (dApps) and interact with blockchain networks.
    Decentralized Finance (DeFi): Explore the DeFi ecosystem, which encompasses financial applications built on blockchain technology. Understanding how decentralized exchanges, lending platforms, and yield farming work will be beneficial.
    Cryptocurrency Knowledge: Stay informed about various cryptocurrencies and their use cases. This includes understanding how they are traded, stored, and utilized in the Web3 ecosystem.
    Front-End and Back-End Development: Knowledge of both front-end and back-end technologies is valuable. Web3 development often requires integrating blockchain functionality with traditional web technologies.
    Career Paths in Web3
    Web3 offers diverse career opportunities across various domains. Here are a few paths you might consider:
    Blockchain Developer: Focus on developing blockchain protocols, smart contracts, and dApps. This role requires strong programming skills and a deep understanding of blockchain platforms.
    DeFi Specialist: Work on projects within the decentralized finance sector. This might involve developing new financial products or improving existing protocols.
    UX/UI Designer: Design user interfaces for dApps and Web3 platforms. Given the complexity of blockchain technology, creating intuitive and user-friendly interfaces is crucial.
    Community Manager: Engage with the Web3 community, manage social media channels, and build relationships with users and developers. This role requires strong communication skills and an understanding of the Web3 landscape.
    Product Manager: Oversee the development and launch of Web3 products. This involves coordinating between developers, designers, and stakeholders to ensure successful product delivery.
    Getting Started: Actionable Steps
    Educate Yourself: Start with online courses and tutorials on blockchain technology, smart contracts, and dApps. Platforms like Coursera, Udemy, and edX offer valuable resources.
    Join Web3 Communities: Engage with online communities and forums related to Web3. Participate in discussions, ask questions, and network with industry professionals.
    Build Projects: Apply your knowledge by working on personal or open-source projects. Creating a portfolio of Web3 projects will showcase your skills and attract potential employers.
    Stay Updated: The Web3 space is evolving rapidly. Follow industry news, attend webinars, and stay current with the latest trends and technological advancements.
    Seek Opportunities: Look for internships, freelance gigs, or full-time positions in the Web3 sector. Platforms like GitHub, LinkedIn, and specialized job boards can help you find relevant opportunities.
                </p>
            </div>
        </div>
    </>
  )
}

export default Blog