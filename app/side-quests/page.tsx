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
      "A pi extension that adds Exa-powered web and agentic search tools to the coding agent.",
    href: "https://github.com/junnjiee/pi-exa",
  },
];

const experiences: SideQuest[] = [
  {
    name: "Singapore Army",
    period: "2024 - 2026",
    description:
      "Sometimes I get to do cool stuff, like fast roping down a chopper or jumping out of a plane. Mostly walked a lot.",
  },
  {
    name: "GovTech GeekOut Hackathon",
    period: "2023",
    description: (
      <>
        3rd place. Explored using LLMs to democratize education, met really cool
        people like{" "}
        <a
          href="https://github.com/euanlimzx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          @euanlimzx
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/hrtowii"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          @hrtowii
        </a>
        .
      </>
    ),
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
                <span className="font-normal text-neutral-500 dark:text-neutral-400">
                  {" "}
                  · {quest.period}
                </span>
              </>
            ) : quest.href ? (
              <a
                href={quest.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-400 underline-offset-2 transition-all hover:decoration-neutral-800 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
              >
                {quest.name}
              </a>
            ) : (
              quest.name
            )}
          </h2>
          <p className="mt-2 leading-relaxed text-neutral-700 dark:text-neutral-300">
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
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Projects
        </h1>
        <SideQuestList items={projects} />
      </div>

      <div>
        <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
          Experiences
        </h1>
        <SideQuestList items={experiences} />
      </div>
    </section>
  );
}
