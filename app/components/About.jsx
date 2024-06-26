"use client"
import React from 'react';

const About = () => {
  return (
    <section className="py-8 my-10 bg-white" id='about'>
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">About</h2>
        <p className="mb-4 text-xl text-justify ">tok2dbs is a groundbreaking web portal designed specifically for biomedical and clinical researchers. Our platform transforms how you interact with complex databases enabling you to query vast repositories of biomedical data using natural language. With tok2dbs access to crucial scientific information is just a conversation away.Our mission is to democratize access to critical scientific data simplifying data retrieval and making it more intuitive for researchers, scientists, and educators to obtain the information they need to drive innovation and discovery in the biomedical field.</p>
        {/* <p className="mb-4 text-xl text-justify">Our mission is to democratize access to critical scientific data simplifying data retrieval and making it more intuitive for researchers, scientists, and educators to obtain the information they need to drive innovation and discovery in the biomedical field.</p> */}
      </div>
    </section>
  );
};

export default About;
