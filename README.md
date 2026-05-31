# Mina Store (E-Commerce React)

Mina Store is a React-based e-commerce web application with product browsing, cart and checkout flow, admin product management, and a contact page.

## Tech Stack

- React 18 + React Router
- Context API + `useReducer` for cart state
- Firebase (Firestore + Storage + Auth initialization)
- React Bootstrap and MDB React UI Kit
- Styled Components

## Features

- Browse products with pagination
- Add/remove items from cart
- Persistent cart state in `localStorage`
- Checkout form and order creation in Firestore (`commande` collection)
- Product administration pages:
  - Admin login (`admin` / `admin`)
  - Add products with image upload to Firebase Storage
  - View/delete products
- Contact page with form validation

## Project Structure

```text
src/
  App.js                  # App routes
  StateProvider.js        # Context provider
  reducer.js              # Cart reducer logic
  products.js             # Product loading from Firestore
  config/config.js        # Firebase config/initialization
  components/
    shop.jsx              # Product list + pagination
    product.jsx           # Product card
    minicart.jsx          # Side cart preview
    shoppingCart.jsx      # Checkout page
    admin.jsx             # Admin login page
    addprod.jsx           # Product creation form
    ProductsAdmin.jsx     # Product admin table
    contact.jsx           # Contact page layout
```

## Routes

- `/` → Main home page (navbar + shop + footer)
- `/shop` → Shop page
- `/cartShop` → Cart and checkout
- `/contact` → Contact page
- `/admin` → Admin login
- `/addProd` → Add product page
- `/productsadmin` → Product management page

## Installation

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` is currently needed because of a peer dependency conflict with `react-reveal`.

## Run Locally

```bash
npm start
```

## Available Scripts

```bash
npm start
npm test
npm run build
```

## Firebase Data Model (Current Usage)

- `products` collection fields:
  - `prodID`
  - `prodName`
  - `prodPrice`
  - `prodImg`
- `commande` collection fields:
  - `email`, `nom`, `prenom`, `numero`, `ville`, `prod_names`, `totale`

## Current Notes

- Test suite currently fails because `src/products.js` uses top-level `await`, which Jest in current setup does not parse.
- Build currently fails due to existing ESLint warnings/errors in several component files.
- Firebase and EmailJS identifiers are hardcoded in source files.

## Documentation

See [DOCUMENTATION.md](./DOCUMENTATION.md) for architecture and implementation details, and [ABOUT.md](./ABOUT.md) for project summary.
