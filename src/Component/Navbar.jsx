import React from "react";
import { useProduct } from "../Context/ProductContext";

export default function Navbar() {
    const { NavbarData, searchFiter, search, setSearch } = useProduct();
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

    return (
        <>
            <nav className="navbar">

                <div className="navbar-brand">
                    <span className="brand-icon">{NavbarData.brandIcon}</span>
                    <span className="brand-name">{NavbarData.brandName}</span>
                </div>

                <div className="navbar-search">
                    <input
                        type="text"
                        placeholder={NavbarData.placeHolderSearch}
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="search-btn">
                        {NavbarData.searchIcon}
                    </button>
                </div>

                <div className="navbar-actions">

                    <button className="nav-action-btn">
                        <span className="nav-action-icon">{NavbarData.acc.icon}</span>
                        <span className="nav-action-name">{NavbarData.acc.name}</span>
                    </button>

                    <button className="nav-action-btn">
                        <span className="nav-action-icon">{NavbarData.watch.icon}</span>
                        <span className="nav-action-name">{NavbarData.watch.name}</span>
                    </button>

                    <button className="nav-action-btn">
                        <span className="nav-action-icon">{NavbarData.cart.icon}</span>
                        <span className="nav-action-name">{NavbarData.cart.name}</span>
                    </button>

                </div>
            </nav>

            <div>{searchFiter.length > 0 ? (
                <div className="product-grid">
                    {search && searchFiter.map((product) => (
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
            </div>
        </>
    );
}