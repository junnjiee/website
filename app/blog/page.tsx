import { BlogPosts } from "app/components/posts";

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
    </section>
  );
}
