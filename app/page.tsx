import { Experience } from "app/components/experience";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hello, I'm Jun Jie.
      </h1>
      <p className="mb-4">
        {`I'm from Singapore, currently studying Computer Science at NUS.`}
        {` I enjoy building awesome software and learning about interesting ideas in CS.`}
      </p>
      <div className="my-8">
        <Experience />
      </div>
    </section>
  );
}
