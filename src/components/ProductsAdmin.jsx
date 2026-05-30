import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { fetchProducts } from '../products';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../config/config";


export default function App() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSupprim = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <section className="" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="7" xl="12">
            <MDBCard className="rounded-3">
              <MDBCardBody className="p-4">
                <h4 className="text-center my-3 pb-3">My Products</h4>
                <MDBTable className="mb-4">
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Img</th>
                      <th scope="col">Produit</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {products.map((product)=> (
                    <tr key={product.docId || product.prodID}>
                      <th scope="row"><img src={product.prodImg} style={{width : "90px" , height : "90px"}} alt={product.prodName} /></th>
                      <td>{product.prodName}</td>
                      <td>{product.prodPrice} DT</td>
                      <td>
                        <button type="button" color="danger" className="btn btn-danger" onClick={() => handleSupprim(product.docId)}>
                          Delete
                        </button>
                      </td>
                    </tr>))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}