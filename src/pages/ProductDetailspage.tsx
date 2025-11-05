import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../context/api";
import type { Product } from "../types/Product";
import { useAppDispatch } from "../hooks/UseAppDispatch";
import { addToCart } from "../redux/cartSlice";
import { Button, Container, Spinner } from "react-bootstrap";


const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    
    const { data: products, isLoading, isError} = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });

    if (isLoading) 
        return (
            <div className="text-center mty-5">
                <Spinner animation="border" />
            </div>
        );

    if (isError)
        return <p className="text-center text-danger mt-5">Error loading product</p>



    const product = products?.find((p) => p.id === Number(id));
    if (!product) return <p className="text-center mt-5">Product not found.</p>;


    return (
        <Container className="my-5">
            <div className="d-flex flex-column flex-md-row align-items-center">
                <img 
                    src={product.image}
                    alt={product.title}
                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/200")}
                    className="img-fluid rounded shadow-sm me-md-4 mb-3"
                    style={{ maxWidth: "250px" }}
                />
                <div>
                    <h3 className="fw-bold mb-3">{product.title}</h3>
                    <p className="text-muted mb-2 text-capitalize">{product.category}</p>
                    <p className="text-secondary mb-4">{product.description}</p>
                    <h4 className="text-primary mb-3">${product.price.toFixed(2)}</h4>
                    <Button 
                        variant="primary"
                        className="me-2"
                        onClick={() => dispatch(addToCart(product))}
                    >
                        Add to Cart        
                    </Button>
                    <Link to="/products" className="btn btn-outline-secondary">
                    Back to Products
                    </Link>
                </div>
            </div>
        </Container>
    );
};


export default ProductDetails;