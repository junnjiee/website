export default function Footer() {
  return (
    <footer className="quiet-rise mb-16 [--quiet-delay:250ms]">
      <ul className="font-sm mt-12 flex flex-row flex-wrap gap-x-4 gap-y-2 text-[17px] text-[#4d634f]">
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
      {/* <p className="mt-8 text-[#6d806c]"> */}
      {/*   © {new Date().getFullYear()} MIT Licensed */}
      {/* </p> */}
    </footer>
  );
}
