import React, { useEffect, useMemo, useState } from 'react';
import './shop.css';
import { fetchProducts } from '../products';
import Product from './product';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';

function Shop() {
    const productsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            setError('');
            const data = await fetchProducts();
            if (!data) {
                setError('Unable to load products right now.');
                setProducts([]);
            } else {
                setProducts(data);
            }
            setIsLoading(false);
        };

        loadProducts();
    }, []);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const displayedProducts = useMemo(() => products.slice(startIndex, endIndex), [products, startIndex, endIndex]);
    const totalProducts = products.length;
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
                {isLoading && <p>Loading products...</p>}
                {!isLoading && error && <p>{error}</p>}
                {!isLoading && !error && totalProducts === 0 && <p>No products available yet.</p>}
                <div className="products">
                    {displayedProducts.map((product) => (
                        <Product key={product.prodID} prod_data={product}/>
                    ))}
                </div>
                <div className="pagination d-flex justify-content-center m-3">
                    <Pagination.Prev onClick={() => {
                        if (currentPage > 1) {
                            setCurrentPage((prevPage) => prevPage - 1);
                            window.scrollTo(0, 0);
                        }
                    }} disabled={currentPage <= 1} />
                    <Pagination>{items}</Pagination>
                    <Pagination.Next onClick={() => {
                        if (currentPage < totalPages) {
                            setCurrentPage((prevPage) => prevPage + 1);
                            window.scrollTo(0, 0);
                        }
                    }} disabled={currentPage >= totalPages} />
                </div>
            </div>
        </Container>
    );
}

export default Shop;
