const swell = require('swell-node')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const store = swell.createClient(
  'test-swell-akrm',
  'J3nodio7Ceytizqo1lMeTX1jUgB7e2XA'
)

const PRODUCT_NODE_TYPE = 'Product'

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions
  const data = await store.get('/products')

  data.results.forEach((product) =>
    createNode({
      ...product,
      id: createNodeId(`${PRODUCT_NODE_TYPE}-${product.id}`),
      parent: null,
      children: [],
      internal: {
        type: PRODUCT_NODE_TYPE,
        contentDigest: createContentDigest(product),
      },
    })
  )

  return
}

async function createImage(createNodeField, node, config, index) {
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
