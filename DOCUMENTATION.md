# Project Documentation

## 1) Overview

This repository contains a client-side e-commerce application built with React. It supports product browsing, cart management, checkout/order submission, admin product management, and a contact form.

## 2) Architecture

### Frontend

- **Framework:** React (Create React App)
- **Routing:** `react-router-dom`
- **State Management:** React Context + `useReducer`
- **UI Libraries:** React Bootstrap, MDB React UI Kit, Styled Components

### Backend Services

- **Firestore:** product and order persistence
- **Firebase Storage:** product image uploads
- **EmailJS:** checkout email submission

## 3) Core Application Flow

1. App loads through `src/index.js` with `StateProvider` wrapping `App`.
2. `App.js` routes users to shop, cart, contact, and admin pages.
3. Product data is loaded from Firestore in `src/products.js`.
4. Users add items to cart from `product.jsx`.
5. Cart state updates through reducer actions and persists in `localStorage`.
6. Checkout (`shoppingCart.jsx`) validates data, creates a Firestore order record, sends EmailJS request, then clears cart.

## 4) State Management

`src/reducer.js` supports these actions:

- `addToCart`
- `removeFromCart`
- `removeOneFromCart`
- `setCart`
- `emptyCart`

Initial state is hydrated from `localStorage` using `loadCartFromLocalStorage()`.

## 5) Component Responsibilities

- `navbar.jsx`: navigation and cart access
- `shop.jsx`: paginated product display
- `product.jsx`: product card and add-to-cart trigger
- `minicart.jsx` / `navbarCart.jsx`: grouped cart preview and totals
- `shoppingCart.jsx`: cart detail, quantity updates, and checkout form
- `admin.jsx`: basic admin authentication form
- `addprod.jsx`: creates products + uploads image to Firebase Storage
- `ProductsAdmin.jsx`: list and delete products
- `contact.jsx` + `InputSide.jsx` + `DetailsBar.jsx`: contact page and validation

## 6) Data Contracts

### Product Object

```text
{
  prodID: string,
  prodName: string,
  prodPrice: number,
  prodImg: string
}
```

### Cart Item Object

```text
{
  prod_id: string,
  prod_name: string,
  prod_price: number,
  prod_img: string
}
```

### Commande (Order) Record

```text
{
  email: string,
  nom: string,
  prenom: string,
  numero: string,
  ville: string,
  prod_names: string,
  totale: number
}
```

## 7) Setup and Commands

Install:

```bash
npm install --legacy-peer-deps
```

Run:

```bash
npm start
```

Test:

```bash
CI=true npm test -- --watch=false
```

Build:

```bash
npm run build
```

## 8) Known Issues and Limitations

- `src/products.js` uses top-level `await`, causing Jest parsing failure in current test setup.
- Existing ESLint issues prevent successful production build in CI mode.
- Admin login is hardcoded (`admin` / `admin`) and not secure for production.
- Firebase and EmailJS configuration values are hardcoded in source code.
- Some labels/messages are mixed language (French/English) and can be standardized.

## 9) Recommendations

- Move sensitive/service identifiers to environment variables.
- Replace hardcoded admin authentication with secure auth/authorization.
- Refactor product fetching to avoid top-level `await` for better test compatibility.
- Resolve existing lint warnings/errors to restore reliable CI builds.
- Add integration and unit tests around reducer, checkout validation, and product data loading.
