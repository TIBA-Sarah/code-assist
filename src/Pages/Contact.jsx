import React from "react";
import "../style.css";
import Swal from 'sweetalert2'



const Contact = () => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "913ee659-a5fe-4f23-821c-bd155f421cff");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "succès!",
        text: "Votre message a été bien envoyé! merci pour votre visite",
        icon: "success"
      });
    }
  };


  return(
  <section className="contact">
      <form onSubmit={onSubmit}>
        <h2> Formulaire de contact</h2>
        <div className="input-box">
          <label>Nom Complet</label>
           <input type="text" placeholder="Veuillez saisir votre nom complet " className="field"  name="nom"required/>
        </div>
        <div className="input-box">
          <label>Adresse E-mail</label>
           <input type="email" placeholder="Veuillez saisir votre adresse mail " className="field" name="email" required/>
        </div>
        <div className="input-box">
          <label>Votre message</label>
           <textarea name="message" id="" className="field mess" placeholder="Laissez nous votre message" required/>
        </div>
        <button type="submit">Envoyer le message</button>
      </form>
  </section>
  );
};
export default Contact;