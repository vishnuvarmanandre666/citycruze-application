"use client";

import { useLayoutEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cars, brands, hyderabadAreas } from "@/data/cars";
import BrandLogo from "@/components/BrandLogo";
import TextLoop from "@/components/TextLoop/TextLoop";
import SplitText from "@/components/SplitText/SplitText";

const stats = [
  { value: 1, title: "Launch city", detail: "Hyderabad is our first market." },
  { value: 3, title: "Sample cars", detail: "A small preview of the CityCruze lineup." },
  { value: 3, title: "Car makes", detail: "Hyundai, Maruti Suzuki and Mahindra." },
  { value: 8, title: "Helpful FAQs", detail: "Answers to common rental questions." },
];

function Pin() { return <span className="pin" aria-hidden="true">⌖</span>; }

export default function Home() {
  const router = useRouter();
  const [city, setCity] = useState("Hyderabad");
  const [pickupArea, setPickupArea] = useState("");
  const [pickup, setPickup] = useState("2026-11-20");
  const [returned, setReturned] = useState("2026-11-22");
  const [searchError, setSearchError] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visibleCars = selectedBrand ? cars.filter((car) => car.brand === selectedBrand) : cars;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const animationContext = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(".hero-poster img", { autoAlpha: 0, scale: 1.025, duration: 0.9 })
        .from(".poster-copy .eyebrow, .hero-location", { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.1 }, "-=0.35")
        .from(".poster-copy > p, .hero-note", { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.1 }, "-=0.2")
        .from(".search-card", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.3");

      gsap.utils.toArray<HTMLElement>(".reveal-heading").forEach((heading) => {
        gsap.from(heading, {
          y: 24,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: heading, start: "top 84%", once: true },
        });
      });

      gsap.from(".step-grid > div", {
        y: 18,
        autoAlpha: 0,
        duration: 0.55,
        stagger: 0.14,
        ease: "power2.out",
        scrollTrigger: { trigger: ".step-grid", start: "top 82%", once: true },
      });

      gsap.utils.toArray<HTMLElement>(".stats-value").forEach((element) => {
        const target = Number(element.dataset.count);
        const count = { value: 0 };
        gsap.to(count, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
          onUpdate: () => { element.textContent = String(Math.round(count.value)).padStart(2, "0"); },
        });
      });
    });

    return () => animationContext.revert();
  }, []);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const start = new Date(`${pickup}T00:00:00`);
    const end = new Date(`${returned}T00:00:00`);
    if (!pickup || !returned || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      setSearchError("Choose a return date after your pick-up date.");
      return;
    }
    setSearchError("");
    router.push(`/cars?city=${encodeURIComponent(city)}&area=${encodeURIComponent(pickupArea)}&pickup=${encodeURIComponent(pickup)}&return=${encodeURIComponent(returned)}`);
  }

  return <main>
    <nav className="nav wrap" onKeyDown={(event) => { if (event.key === "Escape") setMobileMenuOpen(false); }}>
      <a className="brand" href="#top" aria-label="CityCruze home"><span className="brand-mark">C</span><span>CITY<span className="orange">CRUZE</span><small>EVERY JOURNEY. YOUR WAY.</small></span></a>
      <div id="primary-navigation" className={`nav-links${mobileMenuOpen ? " is-open" : ""}`}><a href="/cars" onClick={() => setMobileMenuOpen(false)}>Explore cars</a><a href="#how" onClick={() => setMobileMenuOpen(false)}>How it works</a><a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQs</a><a href="#partner" onClick={() => setMobileMenuOpen(false)}>For fleet partners</a></div>
      <button className={`menu-toggle${mobileMenuOpen ? " is-open" : ""}`} type="button" aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="primary-navigation" onClick={() => setMobileMenuOpen((open) => !open)}><span/><span/><span/></button>
      <a className="nav-cta" href="#search">Find a car <span>↗</span></a>
    </nav>

    <section className="hero" id="top">
      <div className="hero-poster">
        <Image src="/images/citycruze-hyderabad-twilight.png" alt="Illustrated white SUV on a Hyderabad road at sunset, with Charminar in the background" fill priority sizes="100vw" />
        <div className="poster-copy">
          <div className="eyebrow"><i /> YOUR NEXT DRIVE STARTS HERE</div>
          <h1 className="hero-headline"><span className="hero-split-line"><SplitText tag="span" className="hero-split-part" text="Make room" effect="rise" hoverEffect="wave" splitType="chars" delay={34} duration={0.8} staggerFrom="start" trigger="load" mask textAlign="left" /></span><span className="hero-split-line"><SplitText tag="span" className="hero-split-part" text="for " effect="rise" hoverEffect="wave" splitType="chars" delay={34} duration={0.8} staggerFrom="start" trigger="load" mask textAlign="left" /><SplitText tag="span" className="hero-split-part hero-split-accent" text="the road." effect="rise" hoverEffect="wave" splitType="chars" delay={34} duration={0.8} staggerFrom="start" trigger="load" mask color="#f5a623" textAlign="left" /></span></h1>
          <p>Find the right car for the plans you haven't made yet.<br className="desktop-break" /> Explore self-drive rentals across Hyderabad.</p>
          <div className="hero-note"><span className="spark">✳</span> More freedom. Your own pace.</div>
        </div>
        <div className="hero-location"><strong>HYDERABAD</strong><span>17.3850° N</span></div>
      </div>
      <div className="search-wrap wrap" id="search">
        <form className="search-card" onSubmit={handleSearch}>
          <label className="search-field"><span className="field-icon"><Pin/></span><span className="field-content"><small>PICK-UP CITY</small><select value={city} onChange={event => { setCity(event.target.value); setPickupArea(""); }}><option>Hyderabad</option><option>Secunderabad</option></select></span></label>
          <label className="search-field"><span className="field-icon"><Pin/></span><span className="field-content"><small>PICK-UP AREA</small><select value={pickupArea} disabled={city !== "Hyderabad"} onChange={event => setPickupArea(event.target.value)}><option value="">All Hyderabad areas</option>{hyderabadAreas.map((area) => <option key={area} value={area}>{area}</option>)}</select></span></label>
          <label className="search-field"><span className="field-icon">▦</span><span className="field-content"><small>PICK-UP DATE</small><input aria-label="Pick-up date" type="date" required value={pickup} onChange={event => setPickup(event.target.value)} /></span></label>
          <label className="search-field"><span className="field-icon">↗</span><span className="field-content"><small>RETURN DATE</small><input aria-label="Return date" type="date" required value={returned} onChange={event => setReturned(event.target.value)} /></span></label>
          <button className="search-button" type="submit">Find available cars <span>→</span></button>
        </form>
        {searchError && <p className="search-error" role="alert">{searchError}</p>}
        <div className="search-caption"><span>✳</span> Browse at your pace. Compare before you decide.</div>
      </div>
    </section>

    <section className="stats-section" aria-labelledby="stats-title">
      <div className="wrap">
        <div className="stats-heading">
          <div className="eyebrow dark"><i /> CITYCRUZE, AT A GLANCE</div>
          <h2 id="stats-title" className="reveal-heading">Hyderabad's self-drive<br className="stats-break" /> car rental marketplace.</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat) => <article className="stat-card" key={stat.title}>
            <p className="stats-value" data-count={stat.value} aria-label={`${stat.value}`}>{String(stat.value).padStart(2, "0")}</p>
            <h3>{stat.title}</h3>
            <p className="stat-detail">{stat.detail}</p>
          </article>)}
        </div>
        <p className="stats-note">Illustrative counts reflect this website preview, not live marketplace totals.</p>
      </div>
    </section>

    <section className="fleet section wrap" id="cars">
      <div className="section-heading"><div><div className="eyebrow dark"><i /> THE CITYCRUZE LINEUP</div><h2 className="reveal-heading">Pick your kind<br/>of <em>getaway.</em></h2></div><a className="text-link" href="/cars">Find more cars <span>↗</span></a></div>
      <div className="make-selector"><div><span className="make-kicker">BROWSE BY MAKE</span><p>Find a familiar name for your next drive.</p></div><div className="make-buttons"><button type="button" className={!selectedBrand ? "selected" : ""} aria-pressed={!selectedBrand} onClick={() => setSelectedBrand(null)}>All makes</button>{brands.map((brand) => <button type="button" key={brand.name} className={selectedBrand === brand.name ? "selected" : ""} aria-pressed={selectedBrand === brand.name} onClick={() => setSelectedBrand(brand.name)}><BrandLogo icon={brand.logo} brand={brand.name}/></button>)}</div></div>
      <div className="brand-ticker" aria-label="Featured car brands"><TextLoop text="HYUNDAI · MARUTI SUZUKI · MAHINDRA" shape="line" speed={32} direction="forward" separator="✦" curviness={0} fontSize={26} fontWeight={700} letterSpacing={3} uppercase color="#59636b" ribbon={false} edgeFade={0.2} pauseOnHover preserveAspectRatio="xMidYMid slice" /></div>
      <div className="car-grid">{visibleCars.map((car) => <article className="car-card" key={car.model}>
        <div className={`car-image ${car.color}`}><Image src={car.image} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 800px) 100vw, 33vw" className="car-photo"/><span className="car-tag">{car.tag}</span></div>
        <div className="car-info"><div><div className="car-brandline"><BrandLogo icon={car.logo} brand={car.brand}/></div><h3>{car.model}</h3><p>{car.type}</p><p className="car-pickup-area">⌖ Pickup in {car.area}</p></div><span className="arrow-circle">↗</span></div>
        <div className="car-meta"><span>♙ {car.seats}</span><span>◉ {car.fuel}</span><span>◷ Unlimited plans</span></div>
        <div className="car-price"><strong>{car.price}</strong><span> / day <small> onwards</small></span></div>
      </article>)}</div>
      <p className="availability-note">Sample vehicles shown for preview. Actual vehicles, eligibility, availability and rental terms are confirmed before booking.</p>
    </section>

    <section className="steps" id="how"><div className="wrap steps-inner"><div className="eyebrow"><i/> EASY DOES IT</div><h2 className="reveal-heading">Three steps.<br/><em>Then you're off.</em></h2><div className="step-grid"><div><span>01</span><h3>Choose your car</h3><p>Compare eligible vehicles, details and rental terms in one place.</p></div><div><span>02</span><h3>Request your dates</h3><p>Check the total estimated price and send a booking request.</p></div><div><span>03</span><h3>Get ready to go</h3><p>Once confirmed, your trip details and handover info are all set.</p></div></div></div></section>

    <section className="partner wrap" id="partner"><div><div className="eyebrow dark"><i/> HAVE A FLEET?</div><h2 className="reveal-heading">Good cars deserve<br/>good <em>company.</em></h2><p>Bring your fleet to a new audience. We’re building a network of local rental partners in Hyderabad.</p></div><a className="partner-button" href="/partners/register">Become a fleet partner <span>↗</span></a><div className="partner-orbit">CC<span>✳</span></div></section>

    <section className="faq-section" id="faq">
      <div className="wrap faq-layout">
        <div className="faq-intro">
          <div className="eyebrow dark"><i /> CUSTOMER SUPPORT</div>
          <h2 className="reveal-heading">Good to know<br />before you <em>go.</em></h2>
          <p>Everything you need to know before hitting the road.</p>
          <div className="faq-contact">
            <span className="faq-contact-mark" aria-hidden="true">?</span>
            <h3>Still have questions?</h3>
            <p>We're just a WhatsApp message away.</p>
            <a href="https://wa.me/917842266161?text=Hi%20CityCruze%2C%20I%20have%20a%20question%20about%20your%20car%20rental%20service." target="_blank" rel="noopener noreferrer">
              <span>Contact Us on WhatsApp</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="faq-list" aria-label="Frequently asked questions">
          <details><summary><span>How do I book a car with CityCruze?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>Choose your pickup location and rental dates, explore available vehicles, review the rental terms and complete the booking process.</p></details>
          <details><summary><span>What documents do I need?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>You will generally need a valid driving licence and identity verification. Additional eligibility requirements may apply.</p></details>
          <details><summary><span>Is a security deposit required?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>A refundable security deposit may apply depending on the vehicle and rental partner. Check the amount and refund conditions before booking.</p></details>
          <details><summary><span>Can I cancel my booking?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>Cancellation eligibility and refund amounts depend on the cancellation policy displayed for your booking.</p></details>
          <details><summary><span>Can I drive outside Hyderabad?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>Travel outside Hyderabad depends on the vehicle's permitted operating area and rental agreement. Confirm this before starting your trip.</p></details>
          <details><summary><span>What happens if I return the car late?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>Late-return charges may apply according to the rental agreement. Contact your rental partner promptly if you expect a delay.</p></details>
          <details><summary><span>Is fuel included in the rental price?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>Fuel inclusions vary by vehicle and rental partner. Check the listing and rental agreement before confirming your booking.</p></details>
          <details><summary><span>How do I contact customer support?</span><span className="faq-toggle" aria-hidden="true" /></summary><p>You can contact the CityCruze support team through the contact options provided on our website.</p></details>
          <p className="faq-disclaimer">Rental terms, eligibility, deposits, cancellation rules and travel permissions may vary by vehicle and rental partner. Always review the applicable booking terms before confirming.</p>
        </div>
      </div>
    </section>
    <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#top"><span className="brand-mark">C</span><span>CITY<span className="orange">CRUZE</span><small>EVERY JOURNEY. YOUR WAY.</small></span></a><span>Made for the way you want to go. <b>✳</b></span><span>© 2026 CityCruze</span></div></footer>
  </main>;
}

