// import Container from './container'
// import cn from 'classnames'

// export default function Alert({ preview }) {
//   return (
//     <div
//       className={cn('border-b', {
//         'border-accent-7 bg-accent-7 text-white': preview,
//         'border-accent-2 bg-accent-1': !preview,
//       })}
//     >
//       <Container>
//         <div className="py-2 text-center text-sm">
//           {preview ? (
//             <>
//               This page is a preview.{' '}
//               <a
//                 href="/api/exit-preview"
//                 className="underline transition-colors duration-200 hover:text-cyan"
//               >
//                 Click here
//               </a>{' '}
//               to exit preview mode.
//             </>
//           ) : (
//             <>
//               The source code for this blog is{' '}
//               <a
//                 href="https://github.com/sanity-io/sanity-template-nextjs-blog-comments"
//                 className="underline transition-colors duration-200 hover:text-success"
//               >
//                 available on GitHub
//               </a>
//               .
//             </>
//           )}
//         </div>
//       </Container>
//     </div>
//   )
// }
