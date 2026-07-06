export default function Footer() {
  return (
    <footer className="mb-16">
      <ul className="font-sm mt-12 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <a
            className="title-link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/junnjiee"
          >
            github
          </a>
        </li>
        <li>
          <a
            className="title-link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://x.com/junnjiee_"
          >
            𝕏
          </a>
        </li>
        <li>
          <a
            className="title-link"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/junnjiee/"
          >
            linkedin
          </a>
        </li>
        <li>
          <a
            className="title-link"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            rss
          </a>
        </li>
      </ul>
      {/* <p className="mt-8 text-neutral-600 dark:text-neutral-300"> */}
      {/*   © {new Date().getFullYear()} MIT Licensed */}
      {/* </p> */}
    </footer>
  );
}
