import React from 'react'
import {PhoneCall,InstagramLogo,FacebookLogo,EnvelopeSimple} from 'phosphor-react';
import './footer.css';

const Contact = () => {
  const noDeco={
    color:'black',textDecoration:'none'
  }
  return (
    <div className='contact'>
      <div className='appel'>
        <PhoneCall size={32}/>
        <span className='spam'>+216 12 445 678</span>
      </div>
      <div className="mail">
        <a href='' style={noDeco}>
          <EnvelopeSimple size={32} />
          <span className='spam'>minastore0001@gmail.com</span>
        </a>
      </div>
      <div className='fb'>
        <a href='' style={noDeco}>
          <FacebookLogo size={32}/>
          <span className='spam'>Notre page Facebook</span>
        </a>
      </div>
      <div className='insta'>
        <a href='' style={noDeco}>
          <InstagramLogo size={32}/>
          <span className='spam'>Notre page Instagram</span>
        </a>
      </div>
    </div>
  )
}

export default Contact;
