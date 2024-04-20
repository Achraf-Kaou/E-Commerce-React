import React from 'react';
import {Truck,Wallet} from 'phosphor-react';
import './footer.css';
const Services = () => {
  return (
    <div className='container'>
      <div className='grid-services'>
        <div className='serv1'>
            <Truck size={32}/>
            <span className='spam'>  Livraison rapide en 24h-48h</span>
        </div>
        <div className='serv2'>
            <Wallet size={32}/>
            <span className='spam'>  Guarentie</span>
        </div>
      </div>
    </div>
  )
}

export default Services;
