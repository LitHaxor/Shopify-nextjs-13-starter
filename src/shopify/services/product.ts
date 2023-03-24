import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { storefrontQuery } from "../client";

export async function getProducts(): Promise<Product[] | undefined> {
  const query = `#graphql
     query {
            products (first: 150) {
                edges {
                    node {
                        priceRange {
                            maxVariantPrice {
                                currencyCode
                                amount
                            }
                            minVariantPrice {
                                currencyCode
                                amount
                            }
                        }
                        id
                        title
                        handle
                        description
                        descriptionHtml
                        featuredImage {
                            url
                            width
                            height
                            altText
                            id
                        }
                        
                    }
                }
            }
        }
     `;

  const { data, status, errors } = await storefrontQuery(query);

  if (status !== 200) {
    console.error(errors);
    return undefined;
  }

  return data?.products?.edges.map((edge: any) => edge.node) as Product[];
}

export async function getProductByHandle(handle: string) {
  const query = `#graphql
        query getProductByHandle($handle: String!) {
            product (handle: $handle) {
                compareAtPriceRange {
                    maxVariantPrice {
                        currencyCode
                        amount
                    }
                    minVariantPrice {
                        currencyCode
                        amount
                    }
                }
                options(first: 250) {
                    id
                    name
                    values
                }
                collections(first: 150) {
                    edges {
                        node {
                            id
                            title
                            handle
                            updatedAt
                        }
                    }
                }

                description
                descriptionHtml
                featuredImage {
                    url
                    width
                    height
                    altText
                }
                handle
                id
                vendor
                media(first: 250) {
                    nodes {
                    ... on MediaImage {
                        mediaContentType
                        image {
                            id
                            url
                            altText
                            width
                            height
                        }
                    }
                    ... on Video {
                        mediaContentType
                            id
                            previewImage {
                                url
                            }
                            sources {
                                mimeType
                                url
                            }
                    }
                    ... on ExternalVideo {
                        mediaContentType
                        id
                        embedUrl
                        host
                    }
                    ... on Model3d {
                        mediaContentType
                        id
                        alt
                        mediaContentType
                        previewImage {
                            url
                        }
                        sources {
                            url
                        }
                    }
                    }
                }
                
                priceRange {
                    maxVariantPrice {
                        currencyCode
                        amount
                    }
                    minVariantPrice {
                        currencyCode
                        amount
                    }
                }
                seo {
                    description
                    title
                }
                title
                variants(first: 250) {
                    nodes {
                    quantityAvailable
                    availableForSale
                    id
                    image {
                        id
                        url
                        altText
                        width
                        height
                    }
                    selectedOptions {
                        name
                        value
                    }
                    sku
                    title
                    unitPrice {
                        amount
                        currencyCode
                    }
                    unitPriceMeasurement {
                        measuredType
                        quantityUnit
                        quantityValue
                        referenceUnit
                        referenceValue
                    }
                    }
                }
                }
            }   
    `;

  const variables = { handle };

  const { data } = await storefrontQuery(query, variables);

  return data?.product as Product;
}
