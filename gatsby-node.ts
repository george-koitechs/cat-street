// import { CreatePagesArgs } from 'gatsby'

// import path from 'path'
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-ignore  --  library does not have declaration files
// import swell from 'swell-node'

// const store = swell.createClient(
//   'test-swell-akrm',
//   'J3nodio7Ceytizqo1lMeTX1jUgB7e2XA'
// )
// console.log('createing pages ...')
// exports.createPages = async function ({ actions }: CreatePagesArgs) {
//   const data: { results: any } = await store.get('/products')
//   console.log(data)
//   data.results.forEach((product: any) => {
//     actions.createPage({
//       path: `/products/${product.slug}`,
//       // component: path.resolve(`./src/templates/product.tsx`),
//       context: { slug: product.slug },
//     })
//   })
// }
