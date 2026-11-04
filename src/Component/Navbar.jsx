import React from "react";
import { useProduct } from "../Context/ProductContext";

export default function Navbar() {
    const { NavbarData } = useProduct();

    return (
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
    );
}