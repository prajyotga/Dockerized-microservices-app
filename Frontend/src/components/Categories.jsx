import "../styles/Categories.css";

const categories = [
  "🍕 Pizza",
  "🍔 Burger",
  "🍜 Noodles",
  "🌮 Tacos",
  "🥤 Drinks",
  "🍰 Desserts",
];

const Categories = () => {
  return (
    <section className="categories">

      <h2>Categories</h2>

      <div className="category-grid">

        {categories.map((cat, index) => (
          <div
            className="category-card"
            key={index}
          >
            {cat}
          </div>
        ))}

      </div>

    </section>
  );
};

export default Categories;