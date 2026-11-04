import { CategoryData } from "./Data/ContentData";
import "./Category.css";

function Category() {
  return (
    <section
      className="category-section"
      id="categories"
      aria-labelledby="category-heading"
    >
      <div className="category-section__heading">
        <div>
          <h2 id="category-heading">Shop by category</h2>
          <p className="category-section__intro">
            Browse all categories and find something you love.
          </p>
        </div>
      </div>

      <div className="category-grid">
        {CategoryData.map((category) => (
          <a
            className="category-card"
            href={`/products?category=${encodeURIComponent(category.name)}`}
            key={category.name}
          >
            <img
              className="category-card__image"
              src={category.image}
              alt=""
              loading="lazy"
            />
            <span className="category-card__name">{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Category;
