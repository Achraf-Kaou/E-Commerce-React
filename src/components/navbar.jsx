import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Storefront, House, AddressBook } from 'phosphor-react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './navbar.css';
import MiniCart from './minicart';
import { Link } from 'react-router-dom';
import logo from '../whitelogo.png'
import { useNavigate, useLocation } from 'react-router-dom';
function Navigation() {
    const Navigate = useNavigate();
    const path = useLocation()
    const handleNavigation = (destination) => {
        if (path.pathname !== '/') {
            Navigate(destination)
        }
    }
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
        <Navbar expand="lg" className="px-5 py-2 bg-dark text-white" fixed="top">
            <Container>
                <Navbar.Brand>
                    <a href="#" style={{textDecoration : 'none', color : 'black'}}>
                        <img className='d-inline-block align-top logo ' src={logo} alt="Logo" /><h2 style={{position:'relative',top:'5px'}} className='text-white'>   Le Sportif</h2>
                    </a>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav " >
                    <Nav className="me-auto" style={{ position: 'absolute', right: '7%' }}>
                        <Nav.Link className="mybtn" to="/" onClick={() => {scrollToTop();handleNavigation('/');}}>
                            <House size={30} style={{position:'relative',bottom:'5px', color : 'white'}}/><span className='text-white'>Home</span>
                        </Nav.Link>
                        <Nav.Link className="mybtn" to="/shop" onClick={()=>{scrollToShop();handleNavigation('/')}}>
                            <Storefront size={30} style={{position:'relative',bottom:'5px', color : 'white'}}/><span className='text-white'>Shop</span>
                        </Nav.Link>
                        <Link className="mybtn" to="/contact" >
                            <AddressBook size={30} style={{position:'relative',bottom:'5px',marginTop:'8px', color : 'white'}}/><span className='text-white'>Contact us</span>
                        </Link>
                        <Nav.Link className="mybtn" onClick={toggleMiniCart}>
                            <ShoppingCart size={30} style={{position:'relative',bottom:'5px', color : 'white'}}/>
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