import { CategoryData, FooterData } from "./Data/ContentData";
import "./Footer.css";

function Footer() {
  const featuredCategories = CategoryData.slice(0, 5);

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__brand">
          <a className="site-footer__logo" href="/" aria-label={`${FooterData.brandName} home`}>
            <span aria-hidden="true">{FooterData.brandIcon}</span>
            <span>{FooterData.brandName}</span>
          </a>
          <p>{FooterData.description}</p>
        </div>

        <nav className="site-footer__column" aria-label="Shop">
          <h2>Shop</h2>
          <ul>
            {featuredCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                >
                  {category.name}
                </a>
              </li>
            ))}
            <li>
              <a href="/#categories">All categories</a>
            </li>
          </ul>
        </nav>

        <div className="site-footer__column">
          <h2>Customer care</h2>
          <ul>
            <li>
              <a href={`mailto:${FooterData.supportEmail}`}>Contact support</a>
            </li>
            <li>
              <a href="mailto:orders@urbanthreads.example?subject=Order%20support">
                Order help
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer__column">
          <h2>Follow along</h2>
          <ul>
            {FooterData.socialLinks.map((social) => (
              <li key={social.name}>
                <a href={social.href} target="_blank" rel="noreferrer">
                  {social.name}
                  <span className="site-footer__external" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>
          © {new Date().getFullYear()} {FooterData.brandName}. {FooterData.copyright}
        </span>
        <a href="mailto:support@urbanthreads.example">Questions? Get in touch</a>
      </div>
    </footer>
  );
}

export default Footer;