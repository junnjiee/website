import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export default function Page() {
  return (
    <section
      className={`${manrope.className} quiet-rise font-normal text-[20.5px] leading-relaxed text-[#253628] space-y-7`}
    >
      <h1 className="mb-10">hello, i'm jun jie.</h1>
      <p>
        {`i'm a computer science undergrad at `}
        <a
          href="https://www.nus.edu.sg/"
          target="_blank"
          rel="noopener noreferrer"
          className="landing-link"
        >
          nus
        </a>
        {`. `}
        {`i enjoy building awesome software and learning about interesting concepts in cs.`}
      </p>
      <p>
        {`previously, i was at `}
        <a
          href="https://www.a-star.edu.sg/"
          target="_blank"
          rel="noopener noreferrer"
          className="landing-link"
        >
          a*star
        </a>
        {`, `}
        {`where i developed cnn models for automating visual inspection in manufacturing.`}
      </p>
      <p>
        {`i also served 2 years in the singapore army, `}
        {`where i sometimes did cool stuff, `}
        {`like fast roping down helis or jumping out of planes.`}
      </p>
    </section>
  );
}
