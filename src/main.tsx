import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";
import { PortfolioManager } from "./scripts/components/PortfolioManager";

function App() {
  useEffect(() => {
    // Initialize the portfolio component system
    const portfolio = new PortfolioManager();
    portfolio.init();
  }, []);

  return (
    <div id="portfolio-app">
      {/* Mouse Trail */}
      <div className="mouse-trail" id="mouseTrail"></div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Logo */}
      <a href="#hero" className="logo">
        PN
      </a>

      {/* Navigation - Populated by Navigation component */}
      <nav className="navigation">
        <ul className="nav-list" id="navigation"></ul>
      </nav>

      {/* Floating Elements */}
      <div
        className="floating-element"
        style={{
          top: "10%",
          left: "5%",
          width: "60px",
          height: "60px",
          animationDelay: "0s",
        }}
      ></div>
      <div
        className="floating-element"
        style={{
          top: "70%",
          right: "10%",
          width: "40px",
          height: "40px",
          animationDelay: "-3s",
        }}
      ></div>
      <div
        className="floating-element"
        style={{
          top: "40%",
          left: "80%",
          width: "50px",
          height: "50px",
          animationDelay: "-6s",
        }}
      ></div>

      {/* Main Content - Populated by components */}
      <div className="main-content" id="mainContent"></div>

      {/* Footer - Populated by Footer component */}
      <footer className="footer" id="footer"></footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
