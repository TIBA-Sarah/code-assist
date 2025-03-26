import React from "react";
import logo from "../img/logoUPJV.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
const Apropos = () => {
  return (
    <div className="propos">
      <section className="about">
        
          <div className="Paragraphe">
        <h2>À propos de nous </h2>
        <p>
          Cette application a été créé par deux étudiantes de l'Université de
          Picardie Jules Verne. Elle sert à générer du code à partir de
          descriptions ou d'intentions en langage naturel.
        </p>
        </div>
        <div className="logo">
        {/* Ajout du logo de l'UPJV */}
          
          <img src={logo} alt="Logo de l'UPJV" className="logo" />
        </div>
      
       <div className="Socials">
       <a href="https://www.linkedin.com/school/upjv-univ/ " target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} /> 
      </a>
      <a href="https://www.facebook.com/share/15mhse3Y6D/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} /> 
      </a>
      <a href="https://www.instagram.com/upjv_univ?igsh=cnQzejhiaW42aXg4" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} /> 
      </a>
        </div> 
        
      </section>
      
      </div>
  );
};

export default Apropos;
