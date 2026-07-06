import fs from 'fs'
import path from 'path'
import { getTableOfContents, type TableOfContentsItem } from './toc'

export type BlogMetadata = {
  title: string
  publishedAt: string
  summary: string
  readingTime: string
  image?: string
}

export type BlogPost = {
  metadata: BlogMetadata
  slug: string
  content: string
  tableOfContents: TableOfContentsItem[]
}

type ParsedMDXFile = {
  metadata: BlogMetadata
  content: string
}

const requiredMetadataFields = [
  'title',
  'publishedAt',
  'summary',
  'readingTime',
] as const

function parseFrontmatter(fileContent: string): ParsedMDXFile {
  let frontmatterRegex = /^---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)

  if (!match) {
    throw new Error('MDX file is missing frontmatter')
  }

  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<BlogMetadata> = {}

  frontMatterLines.forEach((line) => {
    let separatorIndex = line.indexOf(':')

    if (separatorIndex === -1) {
      return
    }

    let key = line.slice(0, separatorIndex).trim() as keyof BlogMetadata
    let value = line.slice(separatorIndex + 1).trim()
    value = value.replace(/^['"](.*)['"]$/, '$1')
    metadata[key] = value
  })

  requiredMetadataFields.forEach((field) => {
    if (!metadata[field]) {
      throw new Error(`MDX frontmatter is missing "${field}"`)
    }
  })

  return { metadata: metadata as BlogMetadata, content }
}

function getMDXFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string): ParsedMDXFile {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string): BlogPost[] {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
      tableOfContents: getTableOfContents(content),
    }
  })
}

export function getBlogPosts(): BlogPost[] {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug)
}

export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )
}

export function formatDate(
  date: string,
  includeRelative = false,
  month: 'long' | 'short' = 'long'
) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month,
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
