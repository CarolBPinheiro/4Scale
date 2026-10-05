import { site } from "../content/site";
import { scrollToProgress } from "../animations/scrollTo";
import { ClientLogo } from "./ClientLogo";

export function Clients() {
  return (
    <section id="clients" className="clients" aria-labelledby="clients-title">
      <h2 id="clients-title" className="sr-only">
        Clientes
      </h2>
      <div className="clients-layout">
        {site.clients.map((client, index) => (
          <article key={client.id} className="client-row">
            <h3 className="client-name">
              <button
                type="button"
                onClick={() => {
                  scrollToProgress("clients", index, site.clients.length);
                }}
              >
                {client.name}
              </button>
            </h3>
            <div className="client-detail">
              <div className="logo-plate">
                <ClientLogo src={client.logo} alt={client.name} />
              </div>
              <p className="client-kicker">{client.name}</p>
              {client.summary ? <p className="client-summary">{client.summary}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
