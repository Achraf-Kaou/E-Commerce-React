import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { PlusCircle, MinusCircle,Trash } from 'phosphor-react';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const NavbarCart = () => {
    const [{ cart }, dispatch] = useStateValue();
    if ((!cart || cart.length === 0)){
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
    <section className="" style={{ backgroundColor: "#eee" }}>
  <MDBContainer className="py-1 ">
    <MDBRow className="justify-content-center align-items-center cart-items text-center">
        {groupedCart.map((c) => (
        <div style={{backgroundColor : "white"}} className='mb-1' key={c.prod_id}>
          <MDBCol className="rounded-3 cart-item row d-flex align-items-center" key={c.prod_id} style={{marginBottom: "0px"}}>
                <div className='d-flex'>   
                    <MDBCardImage className="rounded-3" fluid
                    src={c.prod_img}
                    alt={c.prod_name} style={{ width: '90px', height: '50px' }} />
                    <p className="fw-normal ">{c.prod_name}</p>
                </div> 
            <MDBRow className="justify-content-between align-items-center">
                <div className='d-flex'>
                <MDBCol className="d-flex align-items-center">
                <div className="def-number-input number-input safari_only" style={{ border: '1px solid transparent', backgroundColor: 'white' }}>
                                                <button className="minus" onClick={()=> {
                                                    dispatch({
                                                    type: 'removeOneFromCart',
                                                    prod_id: c.prod_id,
                                                    });
                                                    }}>
                                                </button>
                                                <input className="quantity fw-bold text-black" min={0}
                                                    value={c.quantity} data-id={c.prod_id} readOnly disabled
                                                    type="number" style={{ border: '1px solid transparent', backgroundColor: 'white' }} />
                                                <button className="plus" onClick={()=> {
                                                    dispatch({
                                                    type: 'addToCart',
                                                    item: {
                                                    prod_id: c.prod_id,
                                                    prod_name: c.prod_name,
                                                    prod_price: c.prod_price,
                                                    prod_img: c.prod_img,
                                                    },
                                                    });
                                                    }}>
                                                </button>
                                            </div>
                    <div className="text-danger">
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
                </MDBCol>
                </div>
            </MDBRow>
            </MDBCol>
        </div>
        ))}

        <MDBCard>
        <MDBCardBody>
            <MDBRow className="d-flex align-items-center">
                <MDBCol md="5">
                <Link to='/CartShop' className="btn btn-primary">Confirmer</Link>
                </MDBCol>
                <MDBCol md="7">
                <MDBInput className="" value={`Total : ${total} DT`} disabled style={{ border: '1px solid transparent', backgroundColor: 'white' }}>
                </MDBInput>
                </MDBCol>
            </MDBRow>
        </MDBCardBody>
        </MDBCard>
    </MDBRow>
  </MDBContainer>
</section>
  )
}

export default NavbarCart