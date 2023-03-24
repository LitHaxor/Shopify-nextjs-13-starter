import axios from "axios";
import {
  storefrontApiToken,
  storefrontDomain,
  storefrontVersion,
} from "./config";
import { GraphqlVariables, StorefrontQueryResponse } from "./types";

const adminUrl = `https://${storefrontDomain}/admin/api/${storefrontVersion}/graphql.json`;
const storefrontUrl = `https://${storefrontDomain}/api/${storefrontVersion}/graphql.json`;

const adminClient = axios.create({
  baseURL: adminUrl,
  headers: {
    "X-Shopify-Access-Token": "74fee122a580fb569d6d35115039644e",
  },
});
const storefrontClient = axios.create({
  baseURL: storefrontUrl,
  headers: {
    "X-Shopify-Storefront-Access-Token": "74fee122a580fb569d6d35115039644e",
  },
});

export const adminQuery = async <R = any>(query: string) => {
  try {
    const { data } = await adminClient.post("", { query });
    return data as R;
  } catch (error) {
    console.error(error);
    return null as any;
  }
};

export const storefrontQuery = async <R = any>(
  query: string,
  variables?: GraphqlVariables
) => {
  let response = {} as StorefrontQueryResponse<R>;
  try {
    const { data, status } = await storefrontClient.post("", {
      query,
      variables,
    });
    response.data = data.data as R;
    response.status = status;
    response.errors = null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      response.data = null;
      response.status = error.response?.status || 500;
      response.errors = error.response?.data.errors;
    }
  }

  return response;
};

export const adminMutation = async <T = any, R = any>(
  query: string,
  variables?: GraphqlVariables
) => {
  try {
    const { data } = await adminClient.post("", { query, variables });
    return data as R;
  } catch (error) {
    console.error(error);
    return null as any;
  }
};

export const storefrontMutation = async <T = any, R = any>(
  query: string,
  variables?: GraphqlVariables
) => {
  try {
    const { data } = await storefrontClient.post("", { query, variables });
    return data as R;
  } catch (error) {
    console.error(error);
    return null as any;
  }
};
