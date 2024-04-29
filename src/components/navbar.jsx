import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Storefront, House, AddressBook } from 'phosphor-react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './navbar.css';
import MiniCart from './minicart';

function Navigation() {
    // click on the Home button => scroll to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // click on the shop button => scroll to the shop section
    const scrollToShop = () => {
        const targetSection = document.getElementById('shop');
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth',
            });
        }
    };
    // click on the contact button => scroll to the contact section
    const scrollTofooter = () => {
        const targetSection = document.getElementById('footer');
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth',
            });
        };
    };

    const [isMiniCartOpen, setMiniCartOpen] = useState(false);
    // Function to toggle the mini cart's visibility
    const toggleMiniCart = () => {
        setMiniCartOpen(!isMiniCartOpen);
    };
    const miniCartRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (miniCartRef.current && !miniCartRef.current.contains(event.target)) {
                setMiniCartOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [miniCartRef]);

    

    return (
        <Navbar expand="lg" className="bg-body-tertiary px-5 py-2" fixed="top">
            <Container>
                <Navbar.Brand>
                    <img className='d-inline-block align-top logo' src='./logo.png' alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav " >
                    <Nav className="me-auto" style={{ position: 'absolute', right: '7%', bottom :'2%' }}>
                        <Nav.Link className="mybtn" to="/" onClick={scrollToTop}>
                            <House size={30} style={{position:'relative',bottom:'10px'}}/><span className="spam">Home</span>
                        </Nav.Link>
                        <Nav.Link className="mybtn" to="/shop" onClick={scrollToShop}>
                            <Storefront size={30} style={{position:'relative',bottom:'10px'}}/><span className="spam">Shop</span>
                        </Nav.Link>
                        <Nav.Link className="mybtn" to="/footer" onClick={scrollTofooter}>
                            <AddressBook size={30} style={{position:'relative',bottom:'10px'}}/><span className="spam">Contact us</span>
                        </Nav.Link>
                        <Nav.Link className="mybtn" onClick={toggleMiniCart}>
                            <ShoppingCart size={30} style={{position:'relative',bottom:'10px'}}/>
                        </Nav.Link>
                    </Nav>
                    {isMiniCartOpen && <MiniCart toggleMiniCart={toggleMiniCart}  /> && (
                    <div ref={miniCartRef}>
                        <MiniCart toggleMiniCart={toggleMiniCart} />
                    </div>
                )}
                </Navbar.Collapse>
                
            </Container>

        </Navbar>
    );
}

export default Navigation;