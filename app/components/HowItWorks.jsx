import React from 'react';
import Image from 'next/image';
import signIn from '../../public/images/sign-in-blue.jpg';
import db from '../../public/images/dbs.png';
import exploreDB from '../../public/images/exploreDB.png';

const HowItWorks = () => {
  return (
    <section className="py-8" id='how-it-works'>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">How It Works</h2>
        <div className="flex flex-wrap justify-center space-x-4 text-center">
          <div className="flex flex-col items-center flex-1 p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold my-5">Sign Up and Log In</h3>
            <Image src={signIn} width={150} height={150} alt="Sign Up" />
            <p className='text-xl mt-4'>Creating an account is simple and free. Sign up to gain full access to tok2dbs and start exploring our extensive database collections.</p>
          </div>
          <div className="flex flex-col items-center flex-1 p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold my-5">Start a Conversation</h3>
            <Image src={db} width={150} height={150} alt="Start a Conversation" />
            <p className='text-xl mt-4'>Initiate a chat with our LLM-powered chatbot. Type your question or data request in plain language and receive instant responses tailored to your research needs.</p>
          </div>
          <div className="flex flex-col items-center flex-1 p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold my-5">Explore and Analyze Data</h3>
            <Image src={exploreDB} width={150} height={150} alt="Explore and Analyze Data" />
            <p className='text-xl mt-4'>Dive into the curated databases, explore datasets, and gather insights. Use the retrieved data to enhance your research projects and publications. Our platform supports various data formats and provides tools for in-depth analysis.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
