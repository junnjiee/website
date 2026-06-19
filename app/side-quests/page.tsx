import type { ReactNode } from "react";

type SideQuest = {
  name: string;
  description: ReactNode;
  href?: string;
  period?: string;
};

const projects: SideQuest[] = [
  {
    name: "pi-exa",
    description:
      "A Pi agent extension that adds Exa-powered web and agentic search tools.",
    href: "https://github.com/junnjiee/pi-exa",
  },
  {
    name: "Digital Commonplace",
    description:
      "A curation of interesting links on the internet worth keeping.",
    href: "https://junnjiee.notion.site/commonplace",
  },
];

const experiences: SideQuest[] = [
  {
    name: "GovTech GeekOut Hackathon",
    period: "2023",
    description: "3rd place. Explored using LLMs to improve education.",
  },
];

export const metadata = {
  title: "Side Quests",
  description: "junnjiee's side projects",
};

function SideQuestList({ items }: { items: SideQuest[] }) {
  return (
    <div className="space-y-5">
      {items.map((quest) => (
        <article key={quest.name}>
          <h2 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
            {quest.period ? (
              <>
                {quest.name}
                <span className="font-normal text-muted">
                  {" "}
                  · {quest.period}
                </span>
              </>
            ) : quest.href ? (
              <a
                href={quest.href}
                target="_blank"
                rel="noopener noreferrer"
                className="title-link"
              >
                {quest.name}
              </a>
            ) : (
              quest.name
            )}
          </h2>
          <p className="mt-2 leading-relaxed text-description">
            {quest.description}
          </p>
        </article>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <section className="space-y-12">
      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">Projects</h1>
        <SideQuestList items={projects} />
      </div>

      <div>
        <h1 className="mb-8 text-2xl font-medium tracking-tight">
          Experiences
        </h1>
        <SideQuestList items={experiences} />
      </div>
    </section>
  );
}
