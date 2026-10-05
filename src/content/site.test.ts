import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { rail, site } from "./site";

function publicFile(urlPath: string): string {
  return resolve("public", urlPath.replace(/^\//, ""));
}

describe("conteúdo do site", () => {
  it("mantém as três linhas da hero", () => {
    expect(site.hero.lines).toEqual(["Crescer é fácil.", "Escalar é", "Estratégia"]);
    expect(site.hero.lead).toContain("4SCALE");
  });

  it("expõe os serviços publicados pela 4SCALE", () => {
    expect(site.services.map((service) => service.title)).toEqual([
      "Análise de Dados",
      "Automação",
      "Mídia Paga",
      "Mídia Orgânica",
      "SaaS",
      "Criativos",
      "Sites",
      "E-commerce",
    ]);
    for (const service of site.services) {
      expect(service.items.length).toBeGreaterThan(0);
    }
  });

  it("liga cada cliente a um logo único que existe em public", () => {
    const logos = site.clients.map((client) => client.logo);
    expect(new Set(logos).size).toBe(logos.length);
    for (const client of site.clients) {
      expect(client.name.trim().length).toBeGreaterThan(0);
      expect(existsSync(publicFile(client.logo))).toBe(true);
    }
    const withoutSummary = site.clients.filter((client) => client.summary.trim().length === 0);
    expect(withoutSummary.map((client) => client.id)).toEqual(["tributacao-medica"]);
  });

  it("entrega cases e time com mídia local", () => {
    expect(site.cases.length).toBeGreaterThan(1);
    expect(site.team.length).toBeGreaterThan(1);
    for (const item of [...site.cases, ...site.team]) {
      expect(item.image.startsWith("/")).toBe(true);
      expect(existsSync(publicFile(item.image))).toBe(true);
    }
  });

  it("mantém o trilho na ordem das seções", () => {
    expect(rail.map((item) => item.id)).toEqual([
      "about",
      "services",
      "cases",
      "team",
      "clients",
    ]);
  });

  it("usa um e-mail de contato válido", () => {
    expect(site.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("expõe só os dados pedidos no rodapé", () => {
    expect(site.footer.mark).toBe("4SCALE");
    expect(site.footer.location).toBe("Vitória – Espírito Santo");
    expect(site.footer.instagramUrl).toMatch(/^https:\/\/www\.instagram\.com\//);
    expect(site.footer.termsPath).toBe("/termos");
    expect(site.terms.paragraphs.length).toBeGreaterThan(0);
  });
});
