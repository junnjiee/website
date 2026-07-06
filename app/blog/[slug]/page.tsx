import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPost, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'
import type { TableOfContentsItem } from 'app/blog/toc'

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

function absoluteUrl(pathOrUrl: string) {
  return new URL(pathOrUrl, baseUrl).toString()
}

function getPostImageUrl(title: string, image?: string) {
  return image
    ? absoluteUrl(image)
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`
}

function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
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
}): Promise<Metadata | undefined> {
  const { slug } = await params
  let post = getBlogPost(slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = getPostImageUrl(title, image)

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
  let post = getBlogPost(slug)

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
            image: getPostImageUrl(post.metadata.title, post.metadata.image),
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
