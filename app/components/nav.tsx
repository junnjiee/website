'use client'

import Link from 'next/link'
import { Libre_Baskerville } from 'next/font/google'
import { usePathname } from 'next/navigation'

const navSerif = Libre_Baskerville({
  subsets: ['latin'],
  weight: '400',
})

const navItems = {
  '/blog': {
    name: 'blog',
  },
  '/side-quests': {
    name: 'side quests',
  },
}

export function Navbar() {
  const pathname = usePathname()
  const isHomeActive = pathname === '/'

  return (
    <aside className="mb-20 text-[17px] tracking-tight text-[#4d634f]">
      <div className="lg:sticky lg:top-20">
        <nav
          className="relative flex w-full flex-row items-start justify-between px-0 pb-0"
          id="nav"
        >
          <Link
            href="/"
            className={[
              'group relative flex w-[6.8rem] align-middle py-1 pr-2 underline-offset-4 transition-all [perspective:600px] hover:text-[#4d634f]',
              isHomeActive
                ? 'underline decoration-[#4d634f]'
                : 'no-underline',
            ].join(' ')}
          >
            <span className="relative block h-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateX(-90deg)]">
              <span className="absolute inset-0 block whitespace-nowrap [backface-visibility:hidden] [transform:translateZ(0.65rem)]">
                junnjiee
              </span>
              <span className="absolute inset-0 block whitespace-nowrap [backface-visibility:hidden] [transform:rotateX(90deg)_translateZ(0.65rem)]">
                jun jie lim
              </span>
            </span>
          </Link>

          <div className="flex flex-row space-x-0">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive =
                path === '/'
                  ? pathname === '/'
                  : pathname === path || pathname.startsWith(`${path}/`)

              return (
                <Link
                  key={path}
                  href={path}
                  className={[
                    navSerif.className,
                    'relative ml-4 flex align-middle py-1 pl-2 transition-all hover:text-[#4d634f]',
                    'after:absolute after:bottom-0 after:left-2 after:h-px after:w-[calc(100%-0.5rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100',
                    isActive ? 'after:scale-x-100' : '',
                  ].join(' ')}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
