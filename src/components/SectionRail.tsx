import { rail } from "../content/site";
import { scrollToSection } from "../animations/scrollTo";

type SectionRailProps = {
  active: string;
};

export function SectionRail({ active }: SectionRailProps) {
  return (
    <nav className="rail" aria-label="Seções">
      <ol>
        {rail.map((item, index) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                <span>{index + 1}</span>
                {current ? <span className="rail-label">— {item.label}</span> : null}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
