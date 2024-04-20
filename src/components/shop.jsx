import React, { useState } from 'react';
import './shop.css';
import {productData} from '../products';
import Product from './product';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

function Shop(props) {
    const productsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const displayedProducts = productData.slice(startIndex, endIndex);

    const totalProducts = productData.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
    // Create an array of Pagination.Item elements
    let items = [];
    for (let number = 1; number <= totalPages ; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => {
                    setCurrentPage(number);
                    // Scroll to the top when changing pages
                    window.scrollTo(0, 0);
                  }}
            >
                {number}
            </Pagination.Item>
        );
    }
    return (
        <Container className='shop'>
            <div id="shop">
                <div className="products">
                    {displayedProducts.map((product) => (
                        <Product key={product.prod_id} prod_data={product}/>
                    ))}
                </div>
                <div className="pagination d-flex justify-content-center m-3">
                    <Pagination.Prev onClick={() => {if (currentPage > 1) { setCurrentPage((prevPage) => prevPage - 1);
                            }}}disabled={currentPage <= 1} />
                    <Pagination>{items}</Pagination> {/* Render the Pagination component with items */}
                    <Pagination.Next onClick={() => {setCurrentPage((prevPage) => prevPage + 1); window.scrollTo(0, 0)}}
                        disabled={endIndex >= productData.length} />
                </div>
            </div>
        </Container>
    );
}

export default Shop;
