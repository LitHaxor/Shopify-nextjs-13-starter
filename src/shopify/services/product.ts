import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { storefrontQuery } from "../client";

export async function getProducts(): Promise<Product[]> {
  const query = `#graphql
     query {
            products (first: 150) {
                edges {
                    node {
                        id
                        title
                        handle
                        description
                        descriptionHtml
                        images(first: 10) {
                            edges {
                                node {
                                    id
                                    altText
                                    id
                                    height
                            }
                        }
                    }
                }
            }
        }
     }`;

  const { data } = await storefrontQuery(query);

  return data?.products?.edges.map((edge: any) => edge.node) as Product[];
}

export async function getProductByHandle(handle: string) {
  const query = `#graphql
        query getProductByHandle($handle: String!) {
            product(handle: $handle) {
                id
                title
                handle
                description
                descriptionHtml
                images(first: 10) {
                    edges {
                        node {
                            id
                            altText
                            id
                            height
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
