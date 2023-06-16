import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware } from '@clerk/nextjs/server'
import publicRoutesFromFile from './publicRoutes.json';

// const privatePages = ['/myDesigns']

export default authMiddleware({
  beforeAuth: (req) => {
    return middleware(req)
  },
  publicRoutes: [
    '/',
    '/thub',
    '/terms',
    '/calculator',
    '/posts/[id]',
    '/authors/[slug]',
    '/book-an-expert',
    '/glossary',
    '/tokenomics-design',
    '/privacy-policy',
    '/about-us',
    '/api/stripeHook',
    '/api/stripeSync',
    '/api/uploadSheet',
    '/[id]',
    // '/:id',
    [...publicRoutesFromFile]
  ],
  // afterAuth(auth, req, evt) {    
  //   console.log('🚀 ~ file: middleware.tsx:28 ~ afterAuth ~ req:', req.nextUrl.pathname)
  //   console.log('🚀 ~ file: middleware.tsx:28 ~ afterAuth ~ auth:', auth)
  //   // handle users who aren't authenticated
  //   console.log(privatePages.includes(req.nextUrl.pathname))
  //   if (!auth.userId && privatePages.includes(req.nextUrl.pathname)) {
  //     const signInUrl = new URL('/sign-in', req.url)
  //     signInUrl.searchParams.set('redirect_url', req.url)
  //     return NextResponse.redirect(signInUrl)
  //   }
  // },
})

function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || 'tokenomicshub.xyz'
  const path = url.pathname

  if (
    (path === '/myDesigns' ||
      path === '/newDesign' ||
      path === '/editDesign' ||
      path === '/tokenomics-design') &&
    !hostname.startsWith('design.') &&
    !hostname.startsWith('preview.')
  ) {
    const newHost = `design.${hostname}`
    url.host = newHost
    return NextResponse.redirect(url)
  }

  if (path === '/home') {
    const newHost = hostname.replace('design.', '')
    url.host = newHost
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)","/","/(api|trpc)(.*)"]
}
