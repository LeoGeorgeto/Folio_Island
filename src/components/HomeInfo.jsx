import React from 'react'
import { Link } from 'react-router-dom';

// Helper component to display informational boxes with text and a button link
const InfoBox = ({ text, link, btnText }) => (
    <div className="info-box animate-fadeIn scale-75 md:scale-100">
        <p className="font-medium text-sm sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn group">
            <span className="group-hover:info-btn-animated_text transition-all duration-200 text-base sm:text-lg">
                {btnText}
            </span>
        </Link>
    </div>
)

// Predefined content for different stages of the home page
const renderContent = {
    1: (
        <h1 className="text-lg sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-3 sm:py-4 px-6 sm:px-8 text-white mx-5 animate-fadeIn scale-75 md:scale-100">
            Hi, I'm <span className='font-semibold'>Leo</span>👋 
            <br/>
            I'm a <span className='font-mono'>Software Engineer</span>💻☕
            <br/>
            Welcome to Folio Island!
        </h1>
    ),
    2: (
        <InfoBox
            text="As a recent graduate, I have worked on many challenging projects for some amazing companies and picked up many skills along the way!"
            link="/about"
            btnText="Learn more"
        />
    ),
    3: (
        <InfoBox
            text="As part of a team, I had the pleasure of building multiple successful projects over the years. Curious about the impact?"
            link="/Projects"
            btnText="Visit my portfolio"
        />
    ),
    4: (
        <InfoBox
            text="Looking for a Dev? I'm just a few clicks away!"
            link="/Contact"
            btnText="Let's chat"
        />
    ),
}

// Main component to render home information based on the current stage
function HomeInfo({ currentStage, sceneLoaded }) {
    if (!sceneLoaded) return null;
    return <div className="transform scale-75 md:scale-100 mt-8">{renderContent[currentStage] || null}</div>;
}

export default HomeInfo;