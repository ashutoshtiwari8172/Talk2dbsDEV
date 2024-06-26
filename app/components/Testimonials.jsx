"use client"

import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-8 bg-gray-100" id='testimonials'>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <div className="space-y-4">
          <blockquote className="border-l-4 border-blue-900 pl-4 italic">
            "tok2dbs has significantly streamlined our data retrieval process, allowing us to focus more on our research and less on navigating complex databases." - Dr. Manisha Arora, Biomedical sciences &Department of Pathology & Clinical Sciences Education, Mercer University School of Medicine ,Columbus GA.
          </blockquote>
          <blockquote className="border-l-4 border-blue-900 pl-4 italic">
            "The conversational interface is intuitive and makes data exploration so much easier." - Dr. Shivani Sharma, Biomedical sciences &Department of Pathology & Clinical Sciences Education, Mercer University School of Medicine ,Columbus GA.
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
