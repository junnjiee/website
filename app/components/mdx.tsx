import Link from 'next/link'
import Image from 'next/image'
import type { ImageProps } from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React, {
  type AnchorHTMLAttributes,
  type ComponentProps,
  type ReactNode,
} from 'react'

type TableData = {
  headers: ReactNode[]
  rows: ReactNode[][]
}

function cx(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink({
  href = '',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a {...props}>{children}</a>
  }

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return (
      <a {...props} href={href}>
        {children}
      </a>
    )
  }

  return (
    <a {...props} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function RoundedImage(props: ImageProps) {
  return <Image {...props} className={cx('rounded-lg', props.className)} />
}

function Code({ children, ...props }: ComponentProps<'code'>) {
  let code = typeof children === 'string' ? children : String(children ?? '')
  let codeHTML = highlight(code)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function toPlainText(value: ReactNode): string {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value)
  }

  if (Array.isArray(value)) {
    return value.map(toPlainText).join('')
  }

  if (React.isValidElement<{ children?: ReactNode }>(value)) {
    return toPlainText(value.props.children)
  }

  return ''
}

export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/-{2,}/g, '-')
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children: ReactNode }) => {
    let slug = slugify(toPlainText(children))
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

type CustomMDXProps = ComponentProps<typeof MDXRemote>

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
