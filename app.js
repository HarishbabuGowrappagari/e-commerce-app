import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Context for Cart Management
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// Login Component
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "user@example.com" && password === "password") {
      setErrorMessage(""); // Clear any previous error message
      alert("Login successful..!");
      navigate("/");
    } else {
      setErrorMessage("Invalid email or password. Please try again."); // Set error message
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="p-4 w-80">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Login</h1>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && ( // Conditionally render error message
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
          )}
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
// Home Page Component
const HomePage = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Welcome to Our E-commerce Store!</h1>
    <Link to="/products">
      <Button>Explore Products</Button>
    </Link>
  </div>
);

// Products Page Component
const ProductsPage = () => {
  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <CardContent>
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>Price: ${product.price}</p>
              <Link to={`/products/${product.id}`}>
                <Button className="mt-2">View Product</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Product Details Component
const ProductDetails = ({ id }) => {
  const { addToCart } = useCart();
  const product = { id, name: `Product ${id}`, price: id * 100 };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p>Price: ${product.price}</p>
      <Button onClick={() => addToCart(product)} className="mt-4">Add to Cart</Button>
      <Link to="/cart">
        <Button variant="secondary" className="mt-2">Go to Cart</Button>
      </Link>
    </div>
  );
};

// Cart Page Component
const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="mb-2">
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// App Component
const App = () => (
  <CartProvider>
    <Router>
      <nav className="p-4 bg-gray-200">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;
