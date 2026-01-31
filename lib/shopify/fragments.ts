const imageFragment = `
  fragment image on Image {
    url
    altText
    width
    height
  }
`;

const priceFragment = `
  fragment price on MoneyV2 {
    amount
    currencyCode
  }
`;

const seoFragment = `
  fragment seo on SEO {
    description
    title
  }
`;

const productFragment = `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        ...price
      }
      minVariantPrice {
        ...price
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            ...price
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${priceFragment}
  ${seoFragment}
`;

const cartFragment = `
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                handle
                title
                featuredImage {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    totalQuantity
  }
`;

const collectionFragment = `
  fragment collection on Collection {
    id
    handle
    title
    description
    image {
      url
      altText
      width
      height
    }
    products(first: 50) {
      edges {
        node {
          ...product
        }
      }
    }
  }
  ${productFragment}
`;

export { imageFragment, priceFragment, productFragment, seoFragment, cartFragment, collectionFragment };
