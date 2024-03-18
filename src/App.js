import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FurnitureList from "./components/Forniture/FornitureList";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Auth from "./pages/Auth";
import CartProvider from "./context/ShopProvider";
import ProductDetails from "./pages/ProductDetails";
import Sell from "./pages/Sell";
import Profile from "./pages/Profile";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <FurnitureList />
        </>
      ),
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/products/:productId",
      element: <ProductDetails />,
    },
    {
      path: "/sell",
      element: <Sell />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

  return (
    <>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </>
  );
}

export default App;
