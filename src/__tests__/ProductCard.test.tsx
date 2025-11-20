import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/Product";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import authReducer from "../redux/authSlice";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

const makeStore = () =>
  configureStore({
    reducer: { cart: cartReducer, auth: authReducer },
  });

const product: Product = {
  id: 1,
  title: "Test Product",
  price: 9.99,
  category: "test-category",
  description: "A short description of the product",
  stock: 10,
  image: "https://example.com/image.png",
  rating: { rate: 4.5, count: 12 },
};

const renderWithProviders = (ui: React.ReactElement) => {
  const store = makeStore();
  const result = render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
  return { store, ...result };
};

describe("ProductCard", () => {
  test("matches snapshot (initial render)", () => {
    const { asFragment } = renderWithProviders(
      <ProductCard product={product} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders product info", () => {
    renderWithProviders(<ProductCard product={product} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$9.99")).toBeInTheDocument();
    expect(screen.getByText("test-category")).toBeInTheDocument();
  });

  test("adds to cart and shows toast", () => {
    const { store } = renderWithProviders(<ProductCard product={product} />);
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);
    expect(store.getState().cart.items).toHaveLength(1);
    expect(screen.getByText(/added to cart!/i)).toBeInTheDocument();

   
    fireEvent.click(addButton);
    expect(store.getState().cart.items[0].quantity).toBe(2);
  });
});
