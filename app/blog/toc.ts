import { slugify } from 'app/components/mdx'

export type TableOfContentsItem = {
  level: number
  text: string
  slug: string
}

export function getTableOfContents(content: string): TableOfContentsItem[] {
  let inCodeBlock = false

  return content
    .split('\n')
    .map((line) => {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock
        return null
      }

      if (inCodeBlock) {
        return null
      }

      let match = /^(#{1,2})\s+(.+)$/.exec(line)

      if (!match) {
        return null
      }

      let level = match[1].length
      let text = match[2].trim()

      return {
        level,
        text,
        slug: slugify(text),
      }
    })
    .filter((item): item is TableOfContentsItem => item !== null)
}
