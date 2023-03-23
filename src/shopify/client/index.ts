import axios from "axios";
import {
  storefrontApiToken,
  storefrontDomain,
  storefrontVersion,
} from "./config";
import { GraphqlVariables } from "./types";

const adminUrl = `https://${storefrontDomain}/admin/api/${storefrontVersion}/graphql.json`;
const storefrontUrl = `https://${storefrontDomain}/api/${storefrontVersion}/graphql.json`;

const adminClient = axios.create({
  baseURL: adminUrl,
  headers: {
    "X-Shopify-Access-Token": storefrontApiToken,
  },
});
const storefrontClient = axios.create({
  baseURL: storefrontUrl,
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
  try {
    const { data } = await storefrontClient.post("", { query, variables });
    return data as R;
  } catch (error) {
    console.error(error);
    return null as any;
  }
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
