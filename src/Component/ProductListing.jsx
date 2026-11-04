import { useMemo, useState } from "react";
import products from "./Data/Data.json";
import "./ProductListing.css";

const pageSize = 12;
const currencyFormatters = {};

function formatPrice(amount, currency) {
  if (!currencyFormatters[currency]) {
    currencyFormatters[currency] = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
  }

  return currencyFormatters[currency].format(amount);
}

function ProductListing({ category }) {
  const [sortOrder, setSortOrder] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const matchingProducts = useMemo(() => {
    const categoryProducts = products.filter(
      (product) => product.isActive && product.category === category,
    );

    if (sortOrder === "price-low") {
      return [...categoryProducts].sort((first, second) => first.price - second.price);
    }

    if (sortOrder === "price-high") {
      return [...categoryProducts].sort((first, second) => second.price - first.price);
    }

    if (sortOrder === "rating") {
      return [...categoryProducts].sort((first, second) => second.rating - first.rating);
    }

    return categoryProducts;
  }, [category, sortOrder]);

  const productsToShow = matchingProducts.slice(0, visibleCount);

  return (
    <main className="product-listing">
      <nav className="product-listing__breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span aria-hidden="true">/</span>
        <span>{category}</span>
      </nav>

      <header className="product-listing__header">
        <div>
          <p className="product-listing__eyebrow">Curated for you</p>
          <h1>{category}</h1>
          <p className="product-listing__summary">
            Explore considered finds in {category.toLowerCase()}, picked for
            everyday living.
          </p>
        </div>
        <label className="product-listing__sort">
          <span>Sort by</span>
          <select
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value);
              setVisibleCount(pageSize);
            }}
          >
            <option value="featured">Featured</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </header>

      <div className="product-listing__result-count">
        {matchingProducts.length} {matchingProducts.length === 1 ? "item" : "items"}
      </div>

      {productsToShow.length > 0 ? (
        <div className="product-grid">
          {productsToShow.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-card__image-link">
                <img
                  className="product-card__image"
                  src={product.thumbnail || product.images?.[0]}
                  alt={product.title}
                  loading="lazy"
                />
                {product.discountPercentage > 0 && (
                  <span className="product-card__discount">
                    {product.discountPercentage}% off
                  </span>
                )}
              </div>
              <div className="product-card__content">
                <p className="product-card__brand">{product.brand}</p>
                <h2 className="product-card__title">{product.title}</h2>
                <div className="product-card__rating">
                  <span aria-label={`${product.rating} out of 5 stars`}>
                    ★ {product.rating}
                  </span>
                  <span>({product.reviewCount.toLocaleString("en-IN")})</span>
                </div>
                <div className="product-card__prices">
                  <strong>{formatPrice(product.price, product.currency)}</strong>
                  {product.mrp > product.price && (
                    <del>{formatPrice(product.mrp, product.currency)}</del>
                  )}
                </div>
                {product.shipping?.freeShipping && (
                  <p className="product-card__shipping">Free delivery</p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="product-listing__empty">
          <h2>No products in this category yet</h2>
          <p>Browse all categories to find something you love.</p>
          <a href="/">Back to categories</a>
        </div>
      )}

      {visibleCount < matchingProducts.length && (
        <button
          className="product-listing__load-more"
          type="button"
          onClick={() => setVisibleCount((count) => count + pageSize)}
        >
          Show more products
        </button>
      )}
    </main>
  );
}

export default ProductListing;
