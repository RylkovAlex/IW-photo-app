import React from "react";

const Footer: React.FC = () => (
    <footer className="page-footer blue darken-1">
      <footer className="footer-copyright blue darken-1">
        <div className="container">
          {`© ${new Date().getFullYear()} all rights reserved`}
          <a className="grey-text text-lighten-4 right" href="https://github.com/RylkovAlex/">
            Made by Alexander Rylkov
          </a>
        </div>
      </footer>
    </footer>
  );

export default Footer;
