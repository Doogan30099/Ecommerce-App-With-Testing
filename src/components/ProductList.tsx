import {  useState } from "react";
import { useProducts, useProductsByCategory } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import { Container, Spinner, Alert, Form } from "react-bootstrap";
import { useCategories } from "../hooks/UseCategories";

export interface Props {
    selectedCategory?: string;
}


export default function ProductList() {
    const [selectedCategory, setSelectedCategory ] = useState<string>("");
    const { data: categories } = useCategories();
    const { data: allProducts, isLoading: loadinAll, error: errorAll } = useProducts();
    const { data: categoryProducts, isLoading: loadingCategory, error: errorCategory, } = useProductsByCategory(selectedCategory);

    const productsToDisplay = selectedCategory ? categoryProducts : allProducts;
    const isLoading = selectedCategory ? loadingCategory : loadinAll;
    const isError = selectedCategory ? errorCategory : errorAll;


    

    return (
     <Container className="my-4" style={{ maxWidth: "1400px"}}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Products</h2>
        <Form.Select
          className="shadow-sm border-0 bg-light"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ maxWidth: "250px" }}
        >
          <option value="">All Categories</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </Form.Select>
      </div>

      {isLoading && (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      )}
      {isError && <Alert variant="danger">Failed to load products.</Alert>}
        <div className="row">
            {productsToDisplay?.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </Container>
    );
}
