import React from 'react';
import { PlusCircle, MinusCircle, Trash } from 'phosphor-react';
import { useStateValue } from '../StateProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cart.css'; 
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Cart({ isInMiniCart}) {
    const location = useLocation();
    const [{ cart }, dispatch] = useStateValue();
    const [isConfirm,setisConfirm]=useState(false);
    if(location.pathname==='/confirm' &&!isConfirm){
        setisConfirm(true);
    }
    
    
    if (!isConfirm&&(!cart || cart.length === 0)){
        return (
            <div className='cart'>
                <p>Votre panier est vide</p>
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
        <div className={`cart ${isConfirm ? 'hidden' : 'visible'}`}>
            
        
            <div className="cart-items text-center">
                {groupedCart.map((c) => (
                    <div className="cart-item row" key={c.prod_id}>
                        <div className="col-3 ">{c.prod_name}</div>
                        <div className="col-4 ">
                            <img src={c.prod_img} alt={c.prod_name} />
                        </div>
                        <div className="col-4 ">
                            <div className="input-group">
                                <span className="input-group-btn">
                                    <div
                                        onClick={() => {
                                            dispatch({
                                                type: 'removeOneFromCart',
                                                prod_id: c.prod_id,
                                            });
                                        }}
                                    >
                                        <MinusCircle size={20} />
                                    </div>
                                </span>
                                <input
                                    type="text"
                                    className="form-control text-center"
                                    value={c.quantity}
                                    min="0"
                                    pattern="[0-9]*"
                                    data-id={c.prod_id}
                                    readOnly
                                />
                                <span className="input-group-btn">
                                    <div
                                        onClick={() => {
                                            dispatch({
                                                type: 'addToCart',
                                                item: {
                                                    prod_id: c.prod_id,
                                                    prod_name: c.prod_name,
                                                    prod_price: c.prod_price,
                                                    prod_img: c.prod_img,
                                                },
                                            });
                                        }}
                                    >
                                        <PlusCircle size={20} />
                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="col-1 ">
                            <Trash
                                size={15}
                                onClick={() => {
                                    dispatch({
                                        type: 'removeFromCart',
                                        prod_id: c.prod_id,
                                    });
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="total-container">
                <p>Total: {total} DT</p>
            </div>
            {isInMiniCart && ( // Conditionally render the button
                <button className='confirmer_butt' style={{width:'91px'}} 
                >
                    <Link to='/confirm'>confirmer</Link>
                </button>
                
            )}
        </div>
    );
}

export default Cart;
