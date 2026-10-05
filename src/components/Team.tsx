import { site } from "../content/site";

export function Team() {
  return (
    <section id="team" className="team" aria-labelledby="team-title">
      <h2 id="team-title" className="sr-only">
        Time
      </h2>
      <div className="team-track">
        {site.team.map((chapter) => (
          <article key={chapter.id} className="team-slide">
            <p className="team-index" aria-hidden="true">
              {chapter.index}
            </p>
            <figure className="team-photo">
              <img
                src={chapter.image}
                alt={chapter.imageAlt}
                width={720}
                height={900}
                style={chapter.focus ? { objectPosition: chapter.focus } : undefined}
              />
            </figure>
            <div className="team-copy">
              <h3>{chapter.name}</h3>
              <p>{chapter.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
