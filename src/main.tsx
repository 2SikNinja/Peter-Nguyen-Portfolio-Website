import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/main.css";

// We'll create this App component that uses your TypeScript system
function App() {
  return (
    <div id="portfolio-app">
      {/* Mouse Trail */}
      <div className="mouse-trail" id="mouseTrail"></div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Logo */}
      <div className="logo">
        <div className="logo-text">PN</div>
      </div>

      {/* Navigation will be injected here */}
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

      {/* Main Content */}
      <div className="main-content" id="mainContent">
        {/* Sections will be dynamically generated here */}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links" id="footerLinks"></div>
            <div className="social-links" id="socialLinks"></div>
            <div className="copyright">
              © 2024{" "}
              <span
                style={{ color: "var(--primary-color)", fontWeight: "600" }}
              >
                Peter Nguyen
              </span>
              . All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
