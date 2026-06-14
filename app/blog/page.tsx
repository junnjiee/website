import { BlogPosts } from "app/components/posts";

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
      "Collection of notes, information, and knowledge related to my interests.",
    href: "https://junnjiee-compendium.vercel.app/",
  },
];

export const metadata = {
  title: "Blog",
  description: "junnjiee's blog.",
};

export default function Page() {
  return (
    <section>
      <div className="mb-12">
        <h1 className="text-2xl font-medium tracking-tight mb-8">
          My Blog
        </h1>
        <BlogPosts />
      </div>

      <h1 className="mb-8 text-2xl font-medium tracking-tight">
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
                className="title-link"
              >
                {item.name}
              </a>
            </h2>
            <p className="mt-2 leading-relaxed text-description">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
