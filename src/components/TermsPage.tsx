import { site } from "../content/site";

export function TermsPage() {
  return (
    <main className="terms">
      <a className="terms-back" href="/">
        4SCALE
      </a>
      <article>
        <h1>{site.terms.title}</h1>
        {site.terms.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
