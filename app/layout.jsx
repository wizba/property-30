import Footer from '@/Components/Footer';
import Navbar from '@/Components/Navbar';
import '@/assets/styles/globals.css'
import React from "react";

export const metadata ={
    title: 'Home | Find your dream',
    description: 'Home page',
    keywords: 'Home, page',
}

const MainLayout = ({children}) => {
  
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
