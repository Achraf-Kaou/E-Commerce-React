import { getDocs, collection } from "firebase/firestore";
import { db } from "./config/config";

const fetchProducts = async () => {
  try {
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    const productData = [];

    snapshot.forEach((snapshotDoc) => {
      const data = snapshotDoc.data();

      const formattedProduct = {
        docId: snapshotDoc.id,
        prodID: data.prodID,
        prodName: data.prodName,
        prodPrice: data.prodPrice,
        prodImg: data.prodImg,
      };

      productData.push(formattedProduct);
    });
    return productData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export { fetchProducts };
