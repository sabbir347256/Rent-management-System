import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import Features from './Features/Features';
import ViewHomeCards from './HomeCards/ViewHomeCards';
import Howworks from './HowItWorks/Howworks';
import ManagerSection from './ManagerSection/ManagerSection';
import Terminal from './Terminal/Terminal';
import CalltoAction from './Action/CalltoAction';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <Features></Features>
            <ViewHomeCards></ViewHomeCards>
            <Howworks></Howworks>
            <ManagerSection></ManagerSection>
            <Terminal></Terminal>
            <CalltoAction></CalltoAction>
        </div>
    );
};

export default Home;