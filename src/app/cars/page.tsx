import Link from "next/link";
import Image from "next/image";
import { cars, hyderabadAreas } from "@/data/cars";
import BrandLogo from "@/components/BrandLogo";

type SearchValue = string | string[] | undefined;
type CarsPageProps = {
  searchParams: Promise<{ city?: SearchValue; area?: SearchValue; pickup?: SearchValue; return?: SearchValue }>;
};

function first(value: SearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

function makeBookingInquiry(car: (typeof cars)[number], city: string, pickup?: string, returned?: string) {
  const dates = pickup && returned ? ` from ${pickup} to ${returned}` : "";
  const message = `Hi CityCruze, I'm interested in the ${car.brand} ${car.model} in ${car.area}, ${city}${dates}. Please confirm availability, total price and rental terms.`;
  return `https://wa.me/917842266161?text=${encodeURIComponent(message)}`;
}

export default async function CarsPage({ searchParams }: CarsPageProps) {
  const query = await searchParams;
  const city = first(query.city) || "Hyderabad";
  const area = first(query.area) || "";
  const pickup = first(query.pickup) || "";
  const returned = first(query.return) || "";
  const visibleCars = area ? cars.filter((car) => car.area === area) : cars;

  return <main className="cars-page">
    <nav className="nav wrap cars-nav">
      <Link className="brand" href="/" aria-label="CityCruze home"><span className="brand-mark">C</span><span>CITY<span className="orange">CRUZE</span><small>EVERY JOURNEY. YOUR WAY.</small></span></Link>
      <Link className="nav-cta" href="/">Back to home <span>↗</span></Link>
    </nav>

    <header className="cars-heading wrap">
      <div className="eyebrow dark"><i /> SAMPLE CITYCRUZE LISTINGS</div>
      <h1>Find your next<br />drive in <em>{area ? `${area}, ` : ""}{city}.</em></h1>
      <p>Choose a pickup area to see sample partner cars nearby.</p>
      <form className="cars-search" action="/cars" method="get">
        <label className="search-field"><span className="field-icon">⌖</span><span className="field-content"><small>PICK-UP CITY</small><select name="city" defaultValue={city}><option>Hyderabad</option><option>Secunderabad</option></select></span></label>
        <label className="search-field"><span className="field-icon">⌖</span><span className="field-content"><small>PICK-UP AREA</small><select name="area" defaultValue={area} disabled={city !== "Hyderabad"}><option value="">All Hyderabad areas</option>{hyderabadAreas.map((cityArea) => <option key={cityArea} value={cityArea}>{cityArea}</option>)}</select></span></label>
        <label className="search-field"><span className="field-icon">▦</span><span className="field-content"><small>PICK-UP DATE</small><input aria-label="Pick-up date" type="date" name="pickup" defaultValue={pickup} /></span></label>
        <label className="search-field"><span className="field-icon">↗</span><span className="field-content"><small>RETURN DATE</small><input aria-label="Return date" type="date" name="return" defaultValue={returned} /></span></label>
        <button className="search-button" type="submit">Update search <span>→</span></button>
      </form>
    </header>

    <section className="section wrap cars-results" aria-labelledby="cars-results-title">
      <div className="section-heading"><div><div className="eyebrow dark"><i /> {visibleCars.length} SAMPLE VEHICLES{area ? ` · ${area.toUpperCase()}` : ""}</div><h2 id="cars-results-title">Choose your ride.</h2></div><span className="cars-date-summary">{pickup && returned ? `${pickup} – ${returned}` : "Dates not selected"}</span></div>
      {visibleCars.length > 0 ? <div className="car-grid">{visibleCars.map((car) => <article className="car-card" key={car.id}>
        <div className={`car-image ${car.color}`}><Image src={car.image} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 800px) 100vw, 33vw" className="car-photo"/><span className="car-tag">{car.tag}</span></div>
        <div className="car-info"><div><div className="car-brandline"><BrandLogo icon={car.logo} brand={car.brand}/></div><h3>{car.model}</h3><p>{car.type}</p><p className="car-pickup-area">⌖ Pickup in {car.area}</p></div></div>
        <div className="car-meta"><span>♙ {car.seats}</span><span>◉ {car.fuel}</span><span>◷ Rental terms apply</span></div>
        <div className="car-price"><strong>{car.price}</strong><span> / day <small> onwards</small></span></div>
        <a className="car-book-button" href={makeBookingInquiry(car, city, pickup, returned)} target="_blank" rel="noopener noreferrer">Book now <span aria-hidden="true">↗</span></a>
      </article>)}</div> : <div className="cars-empty"><h3>No sample cars in this area yet</h3><p>Try another Hyderabad pickup area to see demo listings.</p></div>}
      <p className="availability-note">Sample listings and pickup areas only. Live partner inventory, availability, eligibility, final price and rental terms must be confirmed before a booking.</p>
    </section>
  </main>;
}
