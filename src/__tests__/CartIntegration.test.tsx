import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import authReducer from "../redux/authSlice";
import { Provider } from "react-redux";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import type { Product } from "../types/Product";

const makeStore = () =>
  configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
  });

const product: Product = {
  id: 2,
  title: "Integration Product",
  price: 20,
  category: "integration",
  description: "Integration test product",
  stock: 5,
  image: "https://example.com/integration.png",
  rating: { rate: 4.0, count: 3 },
};

const renderScenario = () => {
  const store = makeStore();
  const utils = render(
    <Provider store={store}>
      <MemoryRouter>
        <div>
          <ProductCard product={product} />
          <Cart />
        </div>
      </MemoryRouter>
    </Provider>
  );
  return { store, ...utils };
};

describe("Cart Integration", () => {
  test("adding a product updates cart UI and state", () => {
    const { store } = renderScenario();
    
    expect(screen.getByText(/cart empty/i)).toBeInTheDocument();

    const addBtn = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addBtn);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].quantity).toBe(1);

   
    expect(screen.queryByText(/cart empty/i)).toBeNull();
    expect(
      screen.getByRole("button", { name: /cart \(1\) - \$20\.00/i })
    ).toBeInTheDocument();
  });
});
