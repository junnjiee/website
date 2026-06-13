import { Experience } from "app/components/experience";
import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hello, I'm Jun Jie
      </h1>
      <p className="mb-4">
        {` I'm a builder from Singapore, currently studying Computer Science at 
        NUS. I enjoy building and understanding interesting and/or useful software`}
      </p>
      {/* <p className="mb-4"> */}
      {/*   {`Once in a while, I do touch grass and spend time on mountains.`} */}
      {/* </p> */}
      <div className="my-8">
        <Experience />
        <BlogPosts />
      </div>
    </section>
  );
}
