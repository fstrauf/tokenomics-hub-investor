import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  beforeAuth: (req) => {
    return middleware(req)
  },
  publicRoutes: [
    '/',
    '/thub',
    '/terms',
    '/calculator',

    '/book-an-expert',
    '/glossary',
    '/tokenomics-design',
    '/privacy-policy',
    '/about-us',
    '/api/stripeHook',
    '/api/stripeSync',
    '/api/uploadSheet',
    // '/[id]',
    /^\.*$/,
    '/:path*',
    // '^(?!\/tds(.*))',
    // /^\/foo\/.*$/,
    // /^(?!\/tds\/).*/,
    // /^(?!\/admin\/).*/,
    // /^(?!\/editDesign\/).*/,

    '/(.*)',
    // '?!\/tds'
    // isPathPublic,
    // '/:id',
    // [...publicRoutesFromFile]
  ],
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
