type LibraryItem = {
  name: string;
  description: string;
  href: string;
};

const libraryItems: LibraryItem[] = [
  {
    name: "Commonplace",
    description:
      "A curation of interesting links on the internet worth keeping.",
    href: "https://junnjiee.notion.site/commonplace",
  },
  {
    name: "Compendium",
    description:
      "A collection of notes, information, and knowledge related to my interests.",
    href: "https://junnjiee-compendium.vercel.app/",
  },
];

export const metadata = {
  title: "Library",
  description: "junnjiee's library.",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Digital Garden
      </h1>
      <div className="space-y-5">
        {libraryItems.map((item) => (
          <article key={item.name}>
            <h2 className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-400 underline-offset-2 transition-all hover:decoration-neutral-800 dark:decoration-neutral-600 dark:hover:decoration-neutral-200"
              >
                {item.name}
              </a>
            </h2>
            <p className="mt-2 leading-relaxed text-neutral-700 dark:text-neutral-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
