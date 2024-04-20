import React, { useEffect } from 'react';
import './minicart.css';
import { X } from 'phosphor-react';
import { useStateValue } from '../StateProvider';
import Cart from './cart';

function MiniCart({ toggleMiniCart }) {
    const [{ cart }, dispatch] = useStateValue();
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    if (!cart || cart.length === 0) {
        
        return (
            <div className="cart">
                <X size={28} className="X" onClick={toggleMiniCart} />
                <p>votre panier est vide</p>
                <p>acheter un produit pour voir votre panier</p>
            </div>
        );
    }
    
    const groupedCart = cart.reduce((grouped, currentItem) => {
        const itemIndex = grouped.findIndex(item => item.prod_id === currentItem.prod_id);
        if (itemIndex !== -1) {
            grouped[itemIndex].quantity += 1;
        } else {
            grouped.push({ ...currentItem, quantity: 1 });
        }
        return grouped;
    }, []);

    const total = groupedCart.reduce((acc, item) => {
        return acc + item.prod_price * item.quantity;
    }, 0);

    return (
        <div className="cart">
            <div className="X">
                <X size={28} onClick={toggleMiniCart} />
            </div>
            <div className='Cart'>
                <Cart groupedCart={groupedCart} total={total} isInMiniCart={true} toggleMiniCart={false}/>
            </div>
        </div>
    );
}

export default MiniCart;
