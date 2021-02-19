import React from 'react';
import '../css/footer.css';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer>
      <p className='FooterText'>
        <span>&#169;</span> debo9210 - devchallenge.io {date}
      </p>
    </footer>
  );
};

export default Footer;
