"use client"
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-4" id='footer'>
      <div className="container mx-auto text-center">
        <p>© 2024 tok2dbs. All Rights Reserved. | <a href="#" className="underline">Privacy Policy</a> | <a href="#" className="underline">Terms of Service</a></p>
        <div className="mt-2">
          <a href="#" className="mx-2">Twitter</a>
          <a href="#" className="mx-2">LinkedIn</a>
          <a href="#" className="mx-2">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
