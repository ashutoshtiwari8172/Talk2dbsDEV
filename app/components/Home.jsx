"use client";

import React from 'react';
import Countdown from '../components/Countdown';

const Home = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button className="absolute top-4 right-4 text-xl" onClick={closeModal}>
          &times;
        </button>
        <div className="text-center">
          <h1 className="text-6xl font-bold text-black mb-8">Coming Soon!</h1>
          <p className="text-2xl text-black mb-16">Platform  is live for beta testing . Try it out!</p>
          <Countdown />
        </div>
      </div>
    </div>
  );
};

export default Home;
