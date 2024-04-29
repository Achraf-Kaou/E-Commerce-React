import React, { useState } from "react";
import { useStateValue } from '../StateProvider';
import { Link, useLocation } from 'react-router-dom';
import {collection, addDoc} from 'firebase/firestore';
import { db } from '../config/config';
import emailjs from 'emailjs-com';
import {Trash } from 'phosphor-react';
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
import * as formik from 'formik';
import * as yup from 'yup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import "./shoppingCart.css"

export default function CartCheckout() {
    const { Formik } = formik;
    const location = useLocation();
    const [{ cart }, dispatch] = useStateValue();

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
    const prod_names = groupedCart.reduce((acc, item)=>{
        return acc + " " + item.quantity +" * " + item.prod_name;
    },"");
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        ville: yup.string().required(),
        Numero: yup.number().required(),
        prods:yup.string(),
    });
    const handleCommande = async (values) => {
    const commandeData = {
        email: values.email,
        nom: values.firstName,
        numero: values.Numero,
        prenom: values.lastName,
        prod_names: prod_names,
        totale: total,
        ville: values.ville
    };
    const docRef = await addDoc(collection(db, "commande"), commandeData);
    emailjs.sendForm('service_z0hu0oh', 'template_0qh3fjk', Form.current,'m_S1m3rvWbBA1-UfL')
    emailjs.sendForm('service_z0hu0oh', 'template_41918yr', Form.current,'m_S1m3rvWbBA1-UfL');
    dispatch({
        type: 'emptyCart',
    });
    }
return (
<section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
    <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol>
                <MDBCard className="shopping-cart" style={{ borderRadius: "15px" }}>
                    <MDBCardBody className="text-black">
                        <MDBRow>
                            <MDBCol lg="7" className="px-5 py-4">
                                <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
                                    Your products
                                </MDBTypography>
                                {groupedCart.map((c) => (
                                <div className="d-flex align-items-center mb-5 mx-auto" key={c.prod_id}>
                                    <div className="flex-shrink-0">
                                        <MDBCardImage src={c.prod_img} fluid style={{ width: "100px" }}
                                            alt={c.prod_name} />
                                    </div>

                                    <div className="flex-grow-1 ms-3">
                                        <a href="#!" className="float-end text-black">
                                            <MDBIcon fas icon="times" />
                                        </a>
                                        <MDBTypography tag="h5" className="text-primary">
                                            {c.prod_name}
                                        </MDBTypography>

                                        <div className="d-flex align-items-center">
                                            <input type="text" className="prix fw-bold mb-0 me-5 pe-3"  value={`prix unitaire : ${c.prod_price}`} readonly disabled/>
                                            <div className="def-number-input number-input safari_only">
                                                <button className="minus" onClick={()=> {
                                                    dispatch({
                                                    type: 'removeOneFromCart',
                                                    prod_id: c.prod_id,
                                                    });
                                                    }}>
                                                </button>
                                                <input className="quantity fw-bold text-black" min={0}
                                                    value={c.quantity} data-id={c.prod_id} readOnly disabled
                                                    type="number" />
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
                                            <div className="col-1 ">
                                                <Trash size={15} onClick={()=> {
                                                    dispatch({
                                                    type: 'removeFromCart',
                                                    prod_id: c.prod_id,
                                                    });
                                                    }}
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ))}

                                <hr className="mb-4" style={{
                        height: "2px",
                        backgroundColor: "#1266f1",
                        opacity: 1,
                      }} />
                                <div className="d-flex justify-content-between p-2 mb-2"
                                    style={{ backgroundColor: "#e1f5fe" }}>
                                    <MDBTypography tag="h5" className="fw-bold mb-0">
                                        Total:
                                    </MDBTypography>
                                    <MDBTypography tag="h5" className="fw-bold mb-0">
                                        {total} DT
                                    </MDBTypography>
                                </div>
                            </MDBCol>


                            <MDBCol lg="5" className="px-5 py-4">
                                <MDBTypography tag="h3" className="mb-5 pt-2 text-center fw-bold text-uppercase">
                                    Delivery
                                </MDBTypography>

                                <Formik className='my-form' validationSchema={schema} onSubmit={handleCommande}
                                    initialValues={{
                                        firstName: '',
                                        lastName: '',
                                        email: '',
                                        ville: '',
                                        etat: '',
                                        Numero: '',
                                        terms: false,
                                    }}>
                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                    <Form noValidate onSubmit={handleSubmit} ref={Form}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik01">
                                                <Form.Label>First name</Form.Label>
                                                <Form.Control type="text" name="firstName" placeholder="First name"
                                                    value={values.firstName} onChange={handleChange} />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} controlId="validationFormik02">
                                                <Form.Label>Last name</Form.Label>
                                                <Form.Control type="text" name="lastName" placeholder="Last name"
                                                    value={values.lastName} onChange={handleChange} />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormikemail">
                                                <Form.Label>Email</Form.Label>
                                                <InputGroup hasValidation>
                                                    <Form.Control type="text" placeholder="email"
                                                        aria-describedby="inputGroupPrepend" name="email"
                                                        value={values.email} onChange={handleChange}
                                                        isInvalid={!!errors.email} />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email}
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik03">
                                                <Form.Label>adresse</Form.Label>
                                                <Form.Control type="text" placeholder="ville" name="ville"
                                                    value={values.ville} onChange={handleChange}
                                                    isInvalid={!!errors.ville} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.ville}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} controlId="validationFormik05">
                                                <Form.Label>Numero du telephone</Form.Label>
                                                <Form.Control type="tel" placeholder="Numero" name="Numero"
                                                    value={values.Numero} onChange={handleChange}
                                                    isInvalid={!!errors.Numero} />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.Numero}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <MDBBtn block size="lg">
                                            Buy now
                                        </MDBBtn>

                                        <MDBTypography tag="h5" className="fw-bold mb-5 mt-3">
                                            <a href="/">
                                                Back to shopping
                                            </a>
                                        </MDBTypography>

                                    </Form>
                                    )}
                                </Formik>

                            </MDBCol>
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
</section>
);
}