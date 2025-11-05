import type { Product } from "../types/Product";
import ImageWithFallback from "./ImageWithFallback";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import type { AppDispatch } from "../redux/store";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Toast } from 'react-bootstrap';
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowToast(true);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4">
      <Card className="flex-fill h-100 shadow-product-card border-0 rounded-3 overflow-hidden"
            style={{ transition: "transform .2s ease"}}>
        <ImageWithFallback src={product.image} alt={product.title} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="fs-6 text-truncate">
            {product.title}
          </Card.Title>
          <Card.Text className="text-muted small mb-1">
            {product.category}
          </Card.Text>
          <Card.Text className="fw-bold text-primary mb-2">
            {" "}
            ${product.price.toFixed(2)}
          </Card.Text>
          <Card.Text className="text-secondary small flex-grow-1">
            {product.description.length > 25
              ? `${product.description.substring(0, 25)}...`
              : product.description}
          </Card.Text>
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-1">
            <span className="badge bg-warning text-dark mb-2 mb-sm-0">
              ⭐ {product.rating.rate.toFixed(1)}
            </span>
            <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-sm-auto">
              <Button
                variant="outline-secondary"
                size="sm"
                className="flex-fill flex-sm-fill-0 btn-sm"
                onClick={handleViewDetails}
              >
                View
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-fill flex-sm-fill-0 btn-sm"
                onClick={handleAddToCart}
              >
                Add
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>Added to cart!</Toast.Body>
        </Toast>
      </div>
    </div>
  );
}
