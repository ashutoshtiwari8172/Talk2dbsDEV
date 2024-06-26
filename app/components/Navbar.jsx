"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = ({ openModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-10 ${isScrolled ? 'bg-blue-900 text-white' : 'bg-white text-blue-900 shadow-lg'}`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold">tok2dbs</div>
        <div className="space-x-4">
          <Link href="#about" legacyBehavior>
            <a className={`hover:text-gray-600 ${isScrolled ? 'text-white' : 'text-blue-900'}`}>About</a>
          </Link>
          <Link href="#features" legacyBehavior>
            <a className={`hover:text-gray-600 ${isScrolled ? 'text-white' : 'text-blue-900'}`}>Features</a>
          </Link>
          <Link href="#how-it-works" legacyBehavior>
            <a className={`hover:text-gray-600 ${isScrolled ? 'text-white' : 'text-blue-900'}`}>How It Works</a>
          </Link>
          <Link href="#get-started" legacyBehavior>
            <a className={`hover:text-gray-600 ${isScrolled ? 'text-white' : 'text-blue-900'}`}>Get Started</a>
          </Link>
          <Link href="#testimonials" legacyBehavior>
            <a className={`hover:text-gray-600 ${isScrolled ? 'text-white' : 'text-blue-900'}`}>Testimonials</a>
          </Link>
        </div>
        <div className="space-x-4">
          {/* <a onClick={openModal} className={`cursor-pointer py-2 px-4 rounded ${isScrolled ? 'bg-white text-blue-900 hover:bg-gray-200' : 'bg-blue-900 text-white hover:bg-blue-700'}`}>Login</a> */}
          <Link href="/login" className= {`cursor-pointer py-2 px-4 rounded ${isScrolled ? 'bg-white text-blue-900 hover:bg-gray-200' : 'bg-blue-900 text-white hover:bg-blue-700'}`} >Login</Link>
          {/* <a onClick={openModal} className={`cursor-pointer py-2 px-4 rounded border ${isScrolled ? 'bg-transparent text-white border-white hover:bg-white hover:text-blue-900' : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-900 hover:text-white'}`}>Register</a> */}
          <Link href="/register" className={`cursor-pointer py-2 px-4 rounded border ${isScrolled ? 'bg-transparent text-white border-white hover:bg-white hover:text-blue-900' : 'bg-white text-blue-900 border-blue-900 hover:bg-blue-900 hover:text-white'}`} >Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

