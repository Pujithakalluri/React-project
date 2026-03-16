import React from "react";
import "./Home.css";
import { FaInstagram, FaFacebook } from "react-icons/fa";

function Home() {
  return (
    <>
      <div className="home">
        <div className="overlay">
          <div className="content">
            <h1>Welcome to KlinKaara Restaurant</h1>
            <p>Crafted with Passion, Delivered with Joy</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <h3>KlinKaara Restaurant</h3>
        <p>© 2026 All Rights Reserved</p>

        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Home;




