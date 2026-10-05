import type { ReactNode } from "react";
import { site, type CaseStudy } from "../content/site";
import { scrollToProgress } from "../animations/scrollTo";

export function Cases() {
  return (
    <section id="cases" className="cases" aria-labelledby="cases-title">
      <h2 id="cases-title" className="sr-only">
        Cases
      </h2>
      <div className="cases-stage">
        {site.cases.map((item) => (
          <article key={item.id} className="case-panel">
            <div className="case-copy">
              <CaseTitle title={item.title} accent={item.accent} />
              <p className="case-summary">{item.summary}</p>
            </div>
            <figure className="case-figure">
              <img src={item.image} alt={item.imageAlt} width={800} height={800} />
            </figure>
            <ul className="case-tags">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <ol className="case-thumbs">
        {site.cases.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className="case-thumb"
              aria-label={`Ver ${item.title.replace("\n", " ")}`}
              onClick={() => {
                scrollToProgress("cases", index, site.cases.length);
              }}
            >
              <img src={item.image} alt="" width={46} height={58} />
            </button>
          </li>
        ))}
      </ol>
      <button
        type="button"
        className="view-all"
        onClick={() => {
          scrollToProgress("cases", 0, site.cases.length);
        }}
      >
        Ver todos os projetos
      </button>
    </section>
  );
}

function CaseTitle({ title, accent }: Pick<CaseStudy, "title" | "accent">) {
  const lines = title.split("\n");
  return (
    <h3 className="case-title">
      {lines.map((line) => (
        <span key={line} className="case-line">
          {highlight(line, accent)}
        </span>
      ))}
    </h3>
  );
}

function highlight(line: string, accent?: string): ReactNode {
  if (!accent || !line.includes(accent)) {
    return line;
  }
  const start = line.indexOf(accent);
  return (
    <>
      {line.slice(0, start)}
      <span className="accent">{accent}</span>
      {line.slice(start + accent.length)}
    </>
  );
}
