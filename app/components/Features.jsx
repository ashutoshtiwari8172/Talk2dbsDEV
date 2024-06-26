"use client";
import Image from 'next/image';
import TCGA from '../../public/images/TCGA.png';
import PubChem from '../../public/images/pubChem.png';
import GDSC from '../../public/images/cancerrxgene_logo.png';
import GEO from '../../public/images/geo_main.gif';

import React from 'react';

const Features = () => {
  return (
    <section className="py-8" id='features'>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Key Features</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-center my-10">Seamless Access to Curated Databases</h3>
            
            <div className='flex flex-wrap justify-center text-center text-xl'>
              <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col items-center">
                <strong className="text-center">The Cancer Genome Atlas (TCGA)</strong>
                <div className="text-red-500 font-bold ml-2 border-b-2 border-green-500">Coming Soon</div>
                <Image className="my-12"src={TCGA} width={100} height={100} loading="lazy" alt="The Cancer Genome Atlas (TCGA)" />
                <p className='my-7'>Access extensive genomic data on various types of cancer enabling in-depth research into cancer biology and potential therapeutic targets.</p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col items-center">
                <strong className="text-center">Gene Expression Omnibus (GEO)</strong>
                <div className="text-red-500 font-bold ml-2 border-b-2 border-green-500">Coming Soon</div>
                <Image  className='my-14' src={GEO} width={100} height={100} loading="lazy" alt="Gene Expression Omnibus (GEO)" />
                <p className='my-11'>Explore a vast repository of gene expression data across numerous species and experimental conditions.</p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col items-center">
                <strong className="text-center">Genomics of Drug Sensitivity in Cancer (GDSC)</strong>
                <div className="text-green-500 font-bold ml-2 border-b-2 border-green-500">Launching on 14th June</div>
                <Image className='my-7' src={GDSC} width={100} height={100} loading="lazy" alt="Genomics of Drug Sensitivity in Cancer (GDSC)" />
                <p className='my-11'>Obtain valuable insights into drug response and sensitivity across a diverse panel of cancer cell lines.</p>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/4 p-4 flex flex-col items-center">
                <strong className="text-center">PubChem</strong>
                <div className="text-red-500 font-bold ml-2 border-b-2 border-green-500">Coming Soon</div>
                <Image className='my-14' src={PubChem} width={100} height={100} loading="lazy" alt="PubChem" />
                <p className='my-[60px] text-center'>Discover detailed chemical information including compound structures, biological activities, and safety data.</p>
              </div>
            </div>
          </div>

          {/* <div>
            <h3 className="text-xl font-semibold">LLM-Powered Chatbot for Natural Language Queries</h3>
            <p>Our state-of-the-art language model chatbot is designed to understand and respond to your queries in a conversational manner. Whether you're looking for specific data points or need assistance navigating complex datasets, our chatbot is here to help.</p>
            <ul className="list-disc list-inside">
              <li>Intuitive Interaction: Engage in natural language conversations just as you would with a colleague or research assistant.</li>
              <li>Instant Responses: Receive quick and accurate answers to your queries, saving you valuable time and effort.</li>
              <li>Contextual Understanding: The chatbot is equipped to understand the context of your questions, providing relevant and precise information.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Streamlined Data Retrieval</h3>
            <p>With tok2dbs, you can retrieve relevant information quickly and efficiently. Our platform simplifies the process of data exploration, making it easier for you to find what you need:</p>
            <ul className="list-disc list-inside">
              <li>Advanced Search Capabilities: Utilize powerful search tools to locate specific datasets, publications, and data points.</li>
              <li>Data Visualization: Access interactive visualizations to better understand and interpret complex data.</li>
              <li>Customizable Queries: Tailor your queries to extract exactly the information you need without unnecessary noise.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Enhanced Research Productivity</h3>
            <p>Focus on your research instead of data retrieval. tok2dbs handles the heavy lifting, allowing you to concentrate on analysis and discovery:</p>
            <ul className="list-disc list-inside">
              <li>Time-Saving: Reduce the time spent on data collection and preparation, accelerating your research projects.</li>
              <li>Collaboration: Share findings and datasets easily with colleagues, fostering collaboration and innovation.</li>
              <li>Resource Efficiency: Maximize the use of available resources by accessing a centralized hub of critical scientific data.</li>
            </ul>
          </div> */}
        </div> 
      </div>
    </section>
  );
};

export default Features;
