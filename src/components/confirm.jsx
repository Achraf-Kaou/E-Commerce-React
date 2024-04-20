import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import Cart from './cart';
import './confirm.css';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import {collection, addDoc} from 'firebase/firestore';
import { db } from '../config/config';
import emailjs from 'emailjs-com';


function Confirm() {
    const { Formik } = formik;
    const [{cart},dispatch]=useStateValue();
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
        etat: yup.string().required(),
        Numero: yup.number().required(),
        prods:yup.string(),
        terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
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
        <div className="confirm-container">
      <div className="form-container">
        <Formik className='my-form'
            validationSchema={schema}
            onSubmit={handleCommande}
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                ville: '',
                etat: '',
                Numero: 0,
                terms: false,
            }}
        >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit} ref={Form}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationFormik01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={values.firstName}
                            onChange={handleChange}
                            
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormik02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={values.lastName}
                            onChange={handleChange}
                            
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationFormikemail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                           
                            <Form.Control
                                type="text"
                                placeholder="email"
                                aria-describedby="inputGroupPrepend"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationFormik03">
                        <Form.Label>ville</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ville"
                            name="ville" 
                            value={values.ville}
                            onChange={handleChange}
                            isInvalid={!!errors.ville}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.ville}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationFormik04">
                        <Form.Label>etat</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="etat"
                            name="etat"
                            value={values.etat}
                            onChange={handleChange}
                            isInvalid={!!errors.etat}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.etat}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationFormik05">
                        <Form.Label>Numero du telephone</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Numero"
                            name="Numero"
                            value={values.Numero}
                            onChange={handleChange}
                            isInvalid={!!errors.Numero}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.Numero}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="7" controlId="validationFormik06">
                        <Form.Label>les produits à commander</Form.Label>
                        <Form.Control
                            type="text"
                            name="prods"
                           
                            value={prod_names}
                            
                            
                        />
                        
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationFormik06">
                        <Form.Label>totale à payer</Form.Label>
                        <Form.Control
                            type="text"
                            name="total"
                           
                            value={total}
                            
                            
                        />
                        
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        name="terms"
                        label="Agree to terms and conditions"
                        onChange={handleChange}
                        isInvalid={!!errors.terms}
                        feedback={errors.terms}
                        feedbackType="invalid"
                        id="validationFormik0"
                    />
                </Form.Group>
                <Cart className=""/>
                <Button type="submit">commander</Button>
                <Link to="/">retourner à la page </Link>
            </Form>
        )}
        </Formik>
        </div>
    </div>
    );
    
}

export default Confirm;