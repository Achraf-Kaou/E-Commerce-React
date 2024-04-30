import React, { useState } from 'react';
import styled from 'styled-components';

const InputSideWrapper = styled.form`
  width: 100%;
  height: auto;
  margin-top: 20px;
  position: relative;
  padding: 10px 10px 100px 10px;
`;

const InputWrapper = styled.div`
  border: 2px solid transparent;
  width: 90%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  color: #333;
  width: 100%;
  font-size: 15px;
  padding: 8px;
  border-bottom: 1px solid rgb(100, 21, 173);
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  outline: 0px transparent ;
`;

const MessageInput = styled.textarea`
  width: 100%;
  color: #333;
  font-size: 15px;
  padding: 10px;
  border-bottom: 1px solid rgb(100, 21, 173);
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  outline: 0px transparent !important;
`;

const SubMitButton = styled.input`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: rgb(8, 8, 63);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 25px 12px 24px;
  cursor: pointer;
`;

const InputSide = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérification des données
    if (!verifierFirstLastName(name)) {
      alert('Veuillez entrer un nom valide (avec une majuscule)');
      return;
    }
    if (!verifierEmail(email)) {
      alert('Veuillez entrer une adresse e-mail valide');
      return;
    }
    if (!verifierNumero(phone)) {
      alert('Veuillez entrer un numéro de téléphone valide (8 chiffres)');
      return;
    }
    // Envoyer le message
    alert('Message envoyé avec succès!');
    // Réinitialiser les champs
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  // Fonction de validation du nom
  const verifierFirstLastName = (name) => {
    if (!name.trim()) {
      return false;
    }
    return name[0] === name[0].toUpperCase();
  };

  // Fonction de validation de l'email
  const verifierEmail = (email) => {
    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
  };

  // Fonction de validation du numéro de téléphone
  const verifierNumero = (phone) => {
    return phone.length === 8 && !isNaN(phone);
  };

  return (
    <InputSideWrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <p>Name</p>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <p>Email</p>
        <Input
          type="email"
          placeholder="xyz@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <p>Phone</p>
        <Input
          type="text"
          placeholder="+21622444666"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <p>Message</p>
        <MessageInput
          placeholder="Write your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </InputWrapper>
      <SubMitButton type="submit" value="Send Message" />
    </InputSideWrapper>
  );
};

export default InputSide;
