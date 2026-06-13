import type { ReactNode } from "react";

type ExperienceItem = {
  period: string;
  title: string;
  organisation: string;
  href: string;
  description: ReactNode;
};

const experiences: ExperienceItem[] = [
  {
    period: "2024 - 2026",
    title: "Served the Army",
    organisation: "",
    href: "",
    description:
      "Sometimes I get to do cool stuff, like fast roping down a chopper or jumping out of a plane. Still learning how to embrace the suck.",
  },
  {
    period: "Summer 2024",
    title: "Research Engineer Intern",
    organisation: "A*STAR ARTC",
    href: "https://www.a-star.edu.sg/artc",
    description: (
      <>
        Developed CNN-based models for an industrial image segmentation task,
        referencing open-source architectures such as{" "}
        <a
          href="https://www.sciencedirect.com/science/article/abs/pii/S0169260719307904"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 transition-all hover:decoration-neutral-800 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
        >
          Dense-Inception U-Net
        </a>{" "}
        and{" "}
        <a
          href="https://arxiv.org/abs/1706.05587"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-neutral-400 underline-offset-2 transition-all hover:decoration-neutral-800 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
        >
          DeepLabV3
        </a>
        .
      </>
    ),
  },
];

export function Experience() {
  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        Life so Far
      </h2>
      <div className="space-y-5 border-l border-neutral-200 pl-4 dark:border-neutral-800">
        {experiences.map((experience) => (
          <article
            key={`${experience.period}-${experience.title}`}
            className="relative"
          >
            <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950" />
            <div className="flex flex-col gap-1 md:flex-row md:gap-4">
              <p className="shrink-0 text-sm tabular-nums text-neutral-500 dark:text-neutral-400 md:w-[120px]">
                {experience.period}
              </p>
              <div>
                <h3 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                  {experience.title}
                  {experience.organisation && (
                    <>
                      <span className="font-normal text-neutral-500 dark:text-neutral-400">
                        {" "}
                        ·{" "}
                      </span>
                      <a
                        href={experience.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-normal text-neutral-500 underline decoration-neutral-400 underline-offset-2 transition-all hover:text-neutral-900 hover:decoration-neutral-800 dark:text-neutral-400 dark:decoration-neutral-600 dark:hover:text-neutral-100 dark:hover:decoration-neutral-200"
                      >
                        {experience.organisation}
                      </a>
                    </>
                  )}
                </h3>
                <p className="mt-1 leading-relaxed text-neutral-700 dark:text-neutral-300">
                  {experience.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
