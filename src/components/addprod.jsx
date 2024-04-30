import React, { useState } from 'react';
import { db, storage } from '../config/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {collection, addDoc} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';




export const Addprod = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg', 'image/jpg']; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError('');
    } else {
      setProductImg(null);
      setError('Please select a valid image type (jpg or png)');
    }
  };
  
  // add product
  const addProduct = async (e) => {
    e.preventDefault();

    // Create a reference to the 'images' directory in Firebase Storage
    const storageRef = ref(storage, 'images');

    // Create a reference for the uploaded image
    const imageRef = ref(storageRef, productImg.name);

    try {
      // Upload the image
      await uploadBytes(imageRef, productImg);

      // Get the download URL for the uploaded image
      const url = await getDownloadURL(imageRef); 

      // Add product to Firestore with the download URL
      const docRef = await addDoc(collection(db, "products"), { prodID:uuidv4(), prodImg: url,prodName: productName,prodPrice: Number(productPrice),});
      alert("produit ajoutee avec succees")

      // Reset form fields and error state
      setProductName('');
      setProductPrice(0);
      setProductImg(null);
      setError('');
      document.getElementById('file').value = '';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <br />
      <h2>ADD PRODUCTS</h2>
      <hr />
      <form autoComplete="off" className="form" onSubmit={addProduct}>
        <label htmlFor="product-name" >Product Name</label>
        <input
          type="text"
          className="form-control"
          required
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
        />
        <br />
        <label htmlFor="product-price">Product Price</label>
        <input
          type="number"
          className="form-control"
          required
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
        />
        <br />
        <label htmlFor="product-img">Product Image</label>
        <input type="file" className="form-control" id="file" required onChange={productImgHandler} />
        <br />
        <button type="submit" className="btn btn-success btn-md mybtn">
          ADD
        </button>
      </form>
      {error && <span className="error-msg">{error}</span>}
    </div>
  );
};

export default Addprod;
