import React from 'react';
import { ShoppingCart } from 'phosphor-react';
import './product.css';
import { useStateValue } from '../StateProvider';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Product(props) {
    
    const prod_name = props.prod_data.prodName;
    const prod_price = props.prod_data.prodPrice;
    const prod_img =  props.prod_data.prodImg;
    const prod_id = props.prod_data.prodID;
    
    const [{}, dispatch] = useStateValue();

    const addToCart = () => {
        dispatch({
            type: 'addToCart',
            item: {
                prod_id : prod_id,
                prod_name: prod_name,
                prod_price: prod_price,
                prod_img: prod_img
            },
        });
    }

    return (
        <Card style={{ width: '18rem' }} className='product'>
            
            <Card.Img variant="top" src={prod_img} alt={prod_name} className='product-image' style={{height : '250px', width : '250px'}} />
            <Card.Body className='product-details'>
                <Card.Title className='product-name'>{prod_name}</Card.Title>
                <Card.Text className='product-price'>
                    {prod_price} DT
                </Card.Text>
                <Button variant="primary" className='add-to-cart' onClick={addToCart}>
                    <ShoppingCart size={22} />
                    Ajouter au panier
                </Button>
            </Card.Body>
        </Card>
    );
}

export default Product;
