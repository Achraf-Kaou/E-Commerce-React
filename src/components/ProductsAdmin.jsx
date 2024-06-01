import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import {productData} from '../products';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../config/config";


export default function App() {
    const handleSupprim = async(productId)=> {
        await deleteDoc(doc(db, 'products', productId))
          .then(() => {
            console.log('Product deleted successfully');
            // Handle success, if needed (e.g., update product list)
          })
          .catch((error) => {
            console.error('Error deleting product:', error);
            // Handle error, if needed
          });
      }
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
                    {productData.map((product)=> (
                    <tr key={product.prodID}>
                      <th scope="row"><img src={product.prodImg} style={{width : "90px" , height : "90px"}}/></th>
                      <td>{product.prodName}</td>
                      <td>{product.prodPrice} DT</td>
                      <td>
                        <button type="button" color="danger" className="btn btn-danger" onClick={() => handleSupprim(product.prodID)}>
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