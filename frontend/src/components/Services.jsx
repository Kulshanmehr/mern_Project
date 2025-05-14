import "./Services.css";

export default function Services() {
  return (
    <section className="services">
      <h3>Our Services</h3>
      <div className="service-list">
        <div className="service-item">
          <h4>Web Development</h4>
          <p>We build responsive and scalable web applications.</p>
        </div>
        <div className="service-item">
          <h4>Mobile Apps</h4>
          <p>Native and hybrid apps for iOS and Android.</p>
        </div>
        <div className="service-item">
          <h4>Cloud Hosting</h4>
          <p>Secure and high-performance cloud infrastructure.</p>
        </div>
      </div>
    </section>
  );
}
