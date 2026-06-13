import type { ReactNode } from "react";

type SideQuest = {
  name: string;
  description: ReactNode;
  href?: string;
};

const sideQuests: SideQuest[] = [
  {
    name: "pi-exa",
    description:
      "A pi extension that adds Exa-powered web and agentic search tools to the coding agent.",
    href: "https://github.com/junnjiee/pi-exa",
  },
  {
    name: "Compendium",
    description:
      "A digital collection of notes, information and knowledge related to my interests.",
    href: "https://junnjiee-compendium.vercel.app/",
  },
  {
    name: "GovTech GeekOut Hackathon 2023",
    description: (
      <>
        3rd place. Explored using LLMs to democratize education, won a speaker,
        and met really cool people like{" "}
        <a
          href="https://github.com/euanlimzx"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 transition-all hover:decoration-neutral-800 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
        >
          @euanlimzx
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/hrtowii"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 transition-all hover:decoration-neutral-800 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
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

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Side Quests
      </h1>
      <p className="mb-8 text-neutral-700 dark:text-neutral-300"></p>
      <div className="space-y-5">
        {sideQuests.map((quest) => (
          <article key={quest.name}>
            <h2 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
              {quest.href ? (
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
    </section>
  );
}
