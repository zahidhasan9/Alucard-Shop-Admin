'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Badge, Spinner, Alert, Table } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/features/productSlice';

const ProductDetails = ({ slug }) => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);
  const [activeImage, setActiveImage] = useState('');

  const backendOrigin =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, '') ||
    'http://localhost:5000';

  const getImageUrl = (image) => {
    if (!image) return '/images/product-placeholder.png';

    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }

    if (image.startsWith('/uploads')) {
      return `${backendOrigin}${image}`;
    }

    return image;
  };

  useEffect(() => {
    if (slug) {
      dispatch(getProduct(slug));
    }
  }, [dispatch, slug]);

  const productImages = useMemo(() => {
    const images = [];

    if (product?.thumbnail) images.push(product.thumbnail);

    if (Array.isArray(product?.images)) {
      product.images.forEach((img) => {
        if (img && !images.includes(img)) images.push(img);
      });
    }

    if (Array.isArray(product?.variants)) {
      product.variants.forEach((variant) => {
        if (variant?.image && !images.includes(variant.image)) {
          images.push(variant.image);
        }
      });
    }

    return images;
  }, [product]);

  useEffect(() => {
    if (productImages.length > 0) {
      setActiveImage(productImages[0]);
    }
  }, [productImages]);

  const formatPrice = (value) => {
    return `${Number(value || 0).toLocaleString()} tk`;
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';
    return new Date(value).toLocaleString();
  };

  const stockStatus = Number(product?.countInStock || 0) > 0;

  if (!slug) {
    return (
      <Alert variant="warning" className="my-4">
        Product slug missing. Open this page like:{' '}
        <strong>/ecommerce/product-details?slug=product-slug</strong>
      </Alert>
    );
  }

  if (loading && !product) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error && !product) {
    return (
      <Alert variant="danger" className="my-4">
        {error}
      </Alert>
    );
  }

  if (!product) {
    return (
      <Alert variant="warning" className="my-4">
        Product not found.
      </Alert>
    );
  }

  return (
    <>
      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
            <div>
              <h3 className="mb-1">Product Details</h3>
              <p className="text-muted mb-0">
                Full admin overview for this product.
              </p>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <Link
                href="/ecommerce/products-list"
                className="btn btn-light border rounded-3"
              >
                Back to Products
              </Link>

              {product?.slug && (
                <Link
                  href={`/ecommerce/edit-product/${product.slug}`}
                  className="btn btn-primary rounded-3"
                >
                  Edit Product
                </Link>
              )}
            </div>
          </div>

          <Row className="g-4">
            <Col lg={5}>
              <div className="border rounded-3 p-3 bg-light text-center">
                <Image
                  src={getImageUrl(activeImage || product?.thumbnail)}
                  alt={product?.name || 'Product image'}
                  width={520}
                  height={520}
                  className="img-fluid rounded-3 object-fit-contain"
                  unoptimized
                  style={{ maxHeight: '420px' }}
                />
              </div>

              {productImages.length > 1 && (
                <div className="d-flex gap-2 flex-wrap mt-3">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`border rounded-3 p-1 bg-white ${
                        activeImage === img ? 'border-primary' : ''
                      }`}
                      style={{ width: 68, height: 68 }}
                    >
                      <Image
                        src={getImageUrl(img)}
                        alt={`Product image ${index + 1}`}
                        width={60}
                        height={60}
                        className="rounded-2 object-fit-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </Col>

            <Col lg={7}>
              <div className="product-details-content ms-lg-3 mt-4 mt-lg-0">
                <div className="d-flex gap-2 flex-wrap mb-3">
                  <Badge
                    bg={stockStatus ? 'success' : 'danger'}
                    className="p-2"
                  >
                    {stockStatus ? 'In Stock' : 'Out of Stock'}
                  </Badge>

                  <Badge
                    bg={product?.isActive ? 'primary' : 'secondary'}
                    className="p-2"
                  >
                    {product?.isActive ? 'Active' : 'Inactive'}
                  </Badge>

                  {product?.isFeatured && (
                    <Badge bg="info" className="p-2">
                      Featured
                    </Badge>
                  )}

                  {product?.flash_sell && (
                    <Badge bg="warning" text="dark" className="p-2">
                      Flash Sale
                    </Badge>
                  )}
                </div>

                <h3 className="fs-22 fw-semibold lh-base mb-3">
                  {product?.name || 'Untitled Product'}
                </h3>

                <div className="d-flex align-items-center gap-2 mb-3 pb-3 border-bottom">
                  <span className="text-warning">
                    {'★'.repeat(Math.round(product?.rating || 0))}
                    {'☆'.repeat(5 - Math.round(product?.rating || 0))}
                  </span>

                  <span className="text-muted">
                    {Number(product?.rating || 0).toFixed(1)} rating ·{' '}
                    {product?.numReviews || 0} reviews · {product?.sold || 0}{' '}
                    sold
                  </span>
                </div>

                <div className="mb-4">
                  <h2 className="fs-22 mb-1">
                    {formatPrice(product?.price)}

                    {product?.oldPrice > product?.price && (
                      <del className="fw-normal fs-16 ms-2 text-muted">
                        {formatPrice(product.oldPrice)}
                      </del>
                    )}

                    {product?.discount > 0 && (
                      <Badge bg="danger" className="ms-2">
                        {product.discount}% OFF
                      </Badge>
                    )}
                  </h2>

                  <small className="text-muted">
                    Current admin product price.
                  </small>
                </div>

                <Row className="g-3 mb-4">
                  <Col sm={6}>
                    <div className="border rounded-3 p-3 h-100">
                      <span className="text-muted d-block mb-1">SKU</span>
                      <strong>{product?.sku || 'N/A'}</strong>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="border rounded-3 p-3 h-100">
                      <span className="text-muted d-block mb-1">Stock</span>
                      <strong>{product?.countInStock || 0} units</strong>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="border rounded-3 p-3 h-100">
                      <span className="text-muted d-block mb-1">Category</span>
                      <strong>{product?.category?.name || 'N/A'}</strong>
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="border rounded-3 p-3 h-100">
                      <span className="text-muted d-block mb-1">Brand</span>
                      <strong>{product?.brand?.name || 'N/A'}</strong>
                    </div>
                  </Col>
                </Row>

                <ul className="ps-0 mb-0 list-unstyled border-top border-bottom py-3">
                  <li className="d-flex align-items-center mb-2">
                    <span className="text-muted me-2">Slug:</span>
                    <span className="fw-medium text-secondary">
                      {product?.slug || 'N/A'}
                    </span>
                  </li>

                  <li className="d-flex align-items-center mb-2">
                    <span className="text-muted me-2">Product Type:</span>
                    <span className="fw-medium text-secondary">
                      {product?.product_type || 'N/A'}
                    </span>
                  </li>

                  <li className="d-flex align-items-center mb-2">
                    <span className="text-muted me-2">Created:</span>
                    <span className="fw-medium text-secondary">
                      {formatDate(product?.createdAt)}
                    </span>
                  </li>

                  <li className="d-flex align-items-center">
                    <span className="text-muted me-2">Updated:</span>
                    <span className="fw-medium text-secondary">
                      {formatDate(product?.updatedAt)}
                    </span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="bg-white border-0 rounded-3 mb-4 h-100">
            <Card.Body className="p-4">
              <h4 className="mb-3">Description</h4>

              {product?.shortDescription && (
                <p className="text-secondary fw-semibold">
                  {product.shortDescription}
                </p>
              )}

              <div
                className="text-muted"
                dangerouslySetInnerHTML={{
                  __html: product?.description || 'No description available.',
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="bg-white border-0 rounded-3 mb-4 h-100">
            <Card.Body className="p-4">
              <h4 className="mb-3">SEO Information</h4>

              <div className="mb-3">
                <span className="text-muted d-block">Meta Title</span>
                <strong>{product?.metaTitle || 'N/A'}</strong>
              </div>

              <div>
                <span className="text-muted d-block">Meta Description</span>
                <p className="mb-0 text-secondary">
                  {product?.metaDescription || 'N/A'}
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <h4 className="mb-3">Product Variants</h4>

          <div className="table-responsive">
            <Table className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>SKU</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Storage</th>
                  <th>Price</th>
                  <th>Old Price</th>
                  <th>Stock</th>
                </tr>
              </thead>

              <tbody>
                {product?.variants?.length > 0 ? (
                  product.variants.map((variant, index) => (
                    <tr key={variant?._id || index}>
                      <td>
                        <strong>{variant?.label || `Variant ${index + 1}`}</strong>

                        {variant?.attributes?.length > 0 && (
                          <div className="mt-1">
                            {variant.attributes.map((attr, attrIndex) => (
                              <small
                                key={attrIndex}
                                className="d-block text-muted"
                              >
                                {attr?.key}: {attr?.value}
                              </small>
                            ))}
                          </div>
                        )}
                      </td>

                      <td>{variant?.sku || 'N/A'}</td>
                      <td>{variant?.color || 'N/A'}</td>
                      <td>{variant?.size || 'N/A'}</td>
                      <td>{variant?.storage || 'N/A'}</td>
                      <td>{formatPrice(variant?.price || product?.price)}</td>
                      <td>
                        {variant?.oldPrice
                          ? formatPrice(variant.oldPrice)
                          : 'N/A'}
                      </td>
                      <td>
                        <Badge
                          bg={Number(variant?.stock || 0) > 0 ? 'success' : 'danger'}
                          className="p-2"
                        >
                          {variant?.stock || 0}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No variants available for this product.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      <Card className="bg-white border-0 rounded-3 mb-4">
        <Card.Body className="p-4">
          <h4 className="mb-3">Additional Details</h4>

          <div className="table-responsive">
            <Table className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>
                {product?.details?.length > 0 ? (
                  product.details.map((item, index) => (
                    <tr key={index}>
                      <td className="fw-semibold text-secondary">
                        {item?.key || 'N/A'}
                      </td>
                      <td>{item?.value || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center text-muted py-4">
                      No additional details available.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProductDetails;