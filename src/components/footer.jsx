import React from 'react';
import Container from 'react-bootstrap/Container';
import {Truck,Wallet,PhoneCall,InstagramLogo,FacebookLogo,EnvelopeSimple} from 'phosphor-react';
import logo from '../blacklogo.png'

const Footer = () => {
    return (
        <Container id="footer">
            <div className='row'>
                <div className='d-flex features-box col-lg-6'>
                    <Truck size={32} />
                    <span className='spam'><h4> Livraison rapide en 24h-48h</h4> </span>
                </div>
                <div className='d-flex features-box col-lg-6'>
                    <Wallet size={32} />
                    <span className='spam'><h4>Guarantie</h4></span>
                </div>
            </div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                        <img src={logo} alt="Logo" style={{height : "20px", width : "20px"}} />
                    </a>
                    <span className="mb-3 mb-md-0 text-body-secondary">© 2024 - Le Sportif</span>
                </div>
                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a className="text-body-secondary" href=""><EnvelopeSimple size={32} /></a></li>
                    <li class="ms-3"><a className="text-body-secondary" href=""><FacebookLogo size={32}/></a></li>
                    <li class="ms-3"><a className="text-body-secondary" href=""><InstagramLogo size={32}/></a></li>
                </ul>
            </footer>
        </Container>
    );
};

export default Footer;
