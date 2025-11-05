import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('../components/HeroCanvas'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <HeroCanvas />
        <div className="hero-content">
          <h1>
            <span className="brand">CardiaCare</span> Heart Hospital
          </h1>
          <p className="tagline">Precision cardiology. Compassionate care. 24/7 heart emergency.</p>
          <div className="cta">
            <a href="#appointment" className="btn btn-primary">Book Appointment</a>
            <a href="#services" className="btn btn-secondary">Our Services</a>
          </div>
          <div className="badges">
            <span>JCI Accredited</span>
            <span>ISO 9001</span>
            <span>24/7 Cath Lab</span>
          </div>
        </div>
      </section>

      <section id="services" className="section container">
        <h2>Centers of Excellence</h2>
        <div className="grid">
          <div className="card">
            <h3>Interventional Cardiology</h3>
            <p>Angioplasty, stenting, and structural heart interventions with ultra-low radiation.</p>
          </div>
          <div className="card">
            <h3>Cardiac Surgery</h3>
            <p>Minimally invasive bypass, valve repair, and robotic-assisted procedures.</p>
          </div>
          <div className="card">
            <h3>Electrophysiology</h3>
            <p>3D mapping ablations, pacemakers, ICDs, and advanced arrhythmia care.</p>
          </div>
          <div className="card">
            <h3>Heart Failure & Transplant</h3>
            <p>LVAD program, advanced therapies, and comprehensive transplant care.</p>
          </div>
        </div>
      </section>

      <section className="section container alt">
        <div className="two-col">
          <div>
            <h2>Why Choose CardiaCare</h2>
            <ul className="checks">
              <li>Door-to-balloon under 45 minutes</li>
              <li>AI-enabled imaging and cath lab analytics</li>
              <li>Dedicated cardiac ICU with 1:1 nursing</li>
              <li>Integrated rehab and lifestyle program</li>
            </ul>
          </div>
          <div>
            <h2>Meet Our Experts</h2>
            <p className="muted">Board-certified cardiologists, surgeons, and electrophysiologists trained at top global centers.</p>
            <div className="avatars">
              <div className="avatar"><span>AP</span><small>Intervention</small></div>
              <div className="avatar"><span>RS</span><small>EP</small></div>
              <div className="avatar"><span>VK</span><small>Surgery</small></div>
              <div className="avatar"><span>NM</span><small>Imaging</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2>Patient Stories</h2>
        <div className="grid testimonials">
          <blockquote>?Back to marathon training 6 weeks after a minimally invasive valve repair.? <span>? Priya M.</span></blockquote>
          <blockquote>?My atrial fibrillation cured by a painless day-care ablation.? <span>? Daniel K.</span></blockquote>
          <blockquote>?Door-to-balloon in 32 minutes. The team saved my life.? <span>? Aisha R.</span></blockquote>
        </div>
      </section>

      <section id="appointment" className="section container alt">
        <h2>Book an Appointment</h2>
        <form className="form" action="/api/contact" method="post">
          <div className="row">
            <input name="name" placeholder="Full name" required />
            <input name="phone" placeholder="Phone" required />
          </div>
          <div className="row">
            <input type="email" name="email" placeholder="Email" required />
            <select name="service" required>
              <option value="">Select Service</option>
              <option>Consultation</option>
              <option>ECG/Echo</option>
              <option>Angiography</option>
              <option>Ablation</option>
              <option>Bypass/Valve</option>
            </select>
          </div>
          <textarea name="message" placeholder="Brief message" rows={4} />
          <button className="btn btn-primary" type="submit">Submit</button>
          <p className="muted small">We respond within 1 business hour.</p>
        </form>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>CardiaCare Heart Hospital</strong>
            <p className="muted small">123 Heartway Blvd, MedCity ? +1 (555) 012-3456</p>
          </div>
          <p className="muted small">? {new Date().getFullYear()} CardiaCare. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
