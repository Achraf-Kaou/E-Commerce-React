import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/config";

const fetchData = async () => {
  try {
    const productsCollection = collection(db, "products");

    const snapshot = await getDocs(productsCollection);

    const productData = [];

    snapshot.forEach((doc) => {
      const data = doc.data();

      const formattedProduct = {
        prodID:data.prodID,
        prodName: data.prodName,
        prodPrice: data.prodPrice,
        prodImg: data.prodImg,
       
      };

      productData.push(formattedProduct);
    });

    console.log(productData);

    return productData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; 
  }
};

const productData = await fetchData();

export { productData };
