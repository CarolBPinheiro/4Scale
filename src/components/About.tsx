import { site } from "../content/site";

export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <div className="about-copy">
        <h2 id="about-title">{site.about.title}</h2>
        <p>{site.about.body}</p>
      </div>
    </section>
  );
}
