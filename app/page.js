"use client";

import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import About from "./components/About";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import GetStarted from "./components/GetStarted";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <div>
      <Navbar openModal={openModal} />
      <Header />
      <About />
      <Features />
      <HowItWorks />
      <GetStarted />
      <Testimonials />
      <Footer />

      {showModal && <Home closeModal={closeModal} />}
    </div>
  );
}
