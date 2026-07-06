import {
  FaMotorcycle,
  FaLeaf,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";

import "../styles/Features.css";

const features = [
  {
    icon: <FaMotorcycle />,
    title: "Fast Delivery",
    description: "Delivered within 30 minutes",
  },
  {
    icon: <FaLeaf />,
    title: "Fresh Food",
    description: "Prepared with fresh ingredients",
  },
  {
    icon: <FaCreditCard />,
    title: "Secure Payment",
    description: "100% secure online payments",
  },
  {
    icon: <FaHeadset />,
    title: "24×7 Support",
    description: "Always here to help you",
  },
];

const Features = () => {
  return (
    <section className="features">
      <h2>Why Choose Us</h2>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;