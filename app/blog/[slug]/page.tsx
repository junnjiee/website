import { notFound } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

function cx(...classes: (string | false)[]) {
  return classes.filter(Boolean).join(' ')
}

function TableOfContents({ items }) {
  if (items.length === 0) {
    return null
  }

  return (
    <details
      open
      className="mb-8 rounded border border-[#c7d8c4] bg-[#d3e2d0] px-4 py-3"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-muted">
        <span>Table of Contents</span>
        <ChevronDown className="toc-chevron h-4 w-4" aria-hidden="true" />
      </summary>
      <nav className="mt-3 flex flex-col gap-1">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            className={cx(
              'text-sm text-[#4f664f] no-underline transition-colors hover:text-[#253628]',
              item.level === 2 && 'pl-3'
            )}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </details>
  )
}

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post = getBlogPosts().find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'junnjiee',
            },
          }),
        }}
      />
      <div className="mb-8">
        <p className="text-sm text-muted mb-2">
          {formatDate(post.metadata.publishedAt, false, 'short')}
        </p>
        <h1 className="title text-3xl font-normal tracking-tight">
          {post.metadata.title}
        </h1>
        <p className="text-sm text-muted mt-2">{post.metadata.readingTime}</p>
      </div>
      <TableOfContents items={post.tableOfContents} />
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
