const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);
    if (parsedCart.length > 0) {
      return parsedCart;
    }
  }
  return []; 
};
export const initialState = {
  cart: loadCartFromLocalStorage(), 
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'addToCart':
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case 'removeFromCart':
      const updatedCart = state.cart.filter(item => item.prod_id !== action.prod_id);
      console.log("UC : ", updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };
    case 'removeOneFromCart':
      const index = state.cart.findIndex(item => item.prod_id === action.prod_id);
      const updatedCart2 = [...state.cart];
      updatedCart2.splice(index, 1);
      return {
        ...state,
        cart: updatedCart2,
      }
    case 'setCart':
      return {
        ...state,
        cart: action.cart, 
      };
    case 'emptyCart':
      localStorage.removeItem('cart');
      state.cart.splice(0,state.cart.length);
      return{
        ...state,
        cart:state.cart,
      };
    default:
      return state;
  };
};

export default reducer;
