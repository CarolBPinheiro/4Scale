import { site } from "../content/site";
import { scrollToProgress } from "../animations/scrollTo";

export function Services() {
  return (
    <section id="services" className="services" aria-labelledby="services-title">
      <h2 id="services-title" className="sr-only">
        Serviços
      </h2>
      <div className="services-layout">
        <div className="services-index">
          {site.services.map((service, index) => (
            <h3 key={service.id} className="service-label">
              <button
                type="button"
                onClick={() => {
                  scrollToProgress("services", index, site.services.length);
                }}
              >
                <span className="idx">{service.index}</span>
                <span>{service.title}</span>
              </button>
            </h3>
          ))}
        </div>
        <div className="services-window">
          <div className="services-stack">
            {site.services.map((service) => (
              <ul key={service.id} className="service-group" aria-label={service.title}>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
