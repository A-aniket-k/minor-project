// import React from 'react'

// const Dummy = () => {
//   return (
//     <div className=''>
//       app 
//     </div>
//   )
// }

// export default Dummy
// src/components/Dummy.jsx
// src/components/Dummy.jsx

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Dummy = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
  return (
    <div className="flex flex-col min-h-screen">
{/* // Updated Header Section */}
<header className="bg-orange-500 text-white p-4 flex items-center">
  <img
    src="https://msit.in/static/img/msit.png"
    alt="MSIT Logo"
    className="h-12 w-auto mr-4"
  />
  <div className="header-info text-center flex-1">
    <h1 className="text-2xl font-bold">Maharaja Surajmal Institute of Technology</h1>
    <p className="text-sm">Affiliated to GGSIPU | NAAC Accredited 'A' Grade | Approved by AICTE | ISO 9001:2015 Certified</p>
  </div>
</header>


      {/* Navbar Section */}
      <nav className="bg-blue-600 text-white p-2">
        <ul className="flex justify-around">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">Society</li>
          <li className="hover:underline cursor-pointer">Info Brochure</li>
          <li className="hover:underline cursor-pointer">Achievements</li>
          <li className="hover:underline cursor-pointer">Alumni</li>
          <li className="hover:underline cursor-pointer">Academic Calendar</li>
          <li className="hover:underline cursor-pointer">Placements</li>
          <li className="hover:underline cursor-pointer">AICTE</li>
          <li className="hover:underline cursor-pointer">Contact Us</li>
        </ul>
      </nav>

      {/* Main Content Section */}
      <main className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-1/5 bg-gray-100 p-4">
          <h3 className="font-semibold mb-2">Links</h3>
          <ul className="space-y-1">
            <li className="hover:underline cursor-pointer">About MSIT</li>
            <li className="hover:underline cursor-pointer">Vision & Mission</li>
            <li className="hover:underline cursor-pointer">History</li>
            <li className="hover:underline cursor-pointer">Administration</li>
            <li className="hover:underline cursor-pointer">Governing Body</li>
            <li className="hover:underline cursor-pointer">From the Desk</li>
            <h4 className="font-semibold mt-4 mb-2">Departments</h4>
            <li className="hover:underline cursor-pointer">CSE</li>
            <li className="hover:underline cursor-pointer">IT</li>
            <li className="hover:underline cursor-pointer">ECE</li>
            <li className="hover:underline cursor-pointer">EEE</li>
            <li className="hover:underline cursor-pointer">Applied Sciences</li>
          </ul>
        </aside>

     {/* Center Content */}
     <section className="center-content w-3/5 px-4">
        <div className="welcome-section mb-8">
          <h2 className="text-2xl font-bold">Welcome</h2>
          <div className="image-slider my-4">
            <Slider {...sliderSettings}>
              <div>
                <img src="https://msit.in/static/img/mainPage/slide_13.jpeg" alt="Slide 1" className="w-full" />
              </div>
              <div>
                <img src="https://msit.in/static/img/mainPage/slide_2.jpg" alt="Slide 2" className="w-full" />
              </div>
              <div>
                <img src="https://msit.in/static/img/mainPage/slide_6.jpg" alt="Slide 3" className="w-full" />
              </div>
              {/* Add more slides as needed */}
            </Slider>
          </div>
        </div>

        <div className="virtual-tour mb-8">
          <h2 className="text-2xl font-bold">Virtual Tour</h2>
          <div className="video-container my-4">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/HdQpUwgujqI" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-64">
            </iframe>
          </div>
          <div className="photo-gallery flex justify-center space-x-2">
            <img src="https://msit.in/static/img/mainPage/slide_13.jpeg" alt="Photo 1" className="w-24 h-24" />
            <img src="https://msit.in/static/img/mainPage/slide_2.jpg" alt="Photo 2" className="w-24 h-24" />
            <img src="https://msit.in/static/img/mainPage/slide_6.jpg" alt="Photo 3" className="w-24 h-24" />
          </div>
          <button className="view-all-button mt-4 bg-blue-500 flex items-center text-white py-2 px-4 rounded">View all photos</button>
        </div>

        
      </section>

        {/* Right Sidebar */}
        <aside className="w-1/5 bg-gray-100 p-4">
          <div className="mb-8">
            <h3 className="font-semibold mb-2">Latest News</h3>
            <ul className="space-y-1">
              <li className="hover:underline cursor-pointer">Reporting for Admission in B.Tech Academic Session 2024-25</li>
              <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mt-2">View All</button>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Notices</h3>
            <ul className="space-y-1">
              <li className="hover:underline cursor-pointer">Hostel admission registration form</li>
              <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 mt-2">View All</button>
            </ul>
          </div>
          <div className="absolute left-0 bottom-10 p-4">
      <Link to="/">
        <img
          alt="Your Company"
          src="https://openclipart.org/image/800px/307415"
          className="h-8 w-auto"
        />
      </Link>
    </div>
        </aside>
      </main>

      {/* Footer Section */}
      <footer className="bg-black text-white text-center p-4">
        <p>All Rights Reserved | Maharaja Surajmal Institute of Technology | 2024</p>

      </footer>
    </div>
  );
};

export default Dummy;
