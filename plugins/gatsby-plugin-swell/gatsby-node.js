const swell = require("swell-node");

const store = swell.createClient(
  "test-swell-akrm",
  "J3nodio7Ceytizqo1lMeTX1jUgB7e2XA"
);

const PRODUCT_NODE_TYPE = "Product";
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  const data = await store.get("/products");

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
  );

  return;
};
