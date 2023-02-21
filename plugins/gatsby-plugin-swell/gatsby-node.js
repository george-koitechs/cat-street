const swell = require('swell-node')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const store = swell.createClient('koi-test', '83NMEz9DQ6tVzqv3hMHpRwtHwGYpQCdW')

const PRODUCT_NODE_TYPE = 'Product'

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions
  const data = await store.get('/products', {
    where: { active: true },
    sort: 'date_created desc',
    $locale: ['fr', 'de', 'uk'],
  })

  data.results.forEach((product) => {
    return createNode({
      ...product,
      parent: null,
      children: [],
      internal: {
        type: PRODUCT_NODE_TYPE,
        contentDigest: createContentDigest(product),
      },
    })
  })
}

async function createImage(createNodeField, node, config) {
  const fileNode = await createRemoteFileNode(config)
  if (fileNode) {
    createNodeField({ node, name: 'image', value: fileNode.id })
  }
}
exports.onCreateNode = async ({
  node, // the node that was just created
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === PRODUCT_NODE_TYPE) {
    await createImage(createNodeField, node, {
      // the url of the remote image to generate a node for
      url: node.images[0].file.url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })
  }
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type Product implements Node {
      image: File @link(from: "fields.image")
     }
  `)
}
