import Link from 'next/link'
import { formatDate, getBlogPosts, sortBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      {sortBlogPosts(allBlogs).map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-6">
            <p className="text-muted w-[100px] shrink-0 whitespace-nowrap">
              {formatDate(post.metadata.publishedAt, false, 'short')}
            </p>
            <p className="font-medium text-[#253628] tracking-tight transition-colors hover:text-[#5f735f]">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
