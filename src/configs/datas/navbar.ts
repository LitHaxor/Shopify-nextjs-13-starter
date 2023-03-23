export interface INavbarApi {
  title: string;
  description: string;
  to: string;
}

export const navbarData: INavbarApi[] = [
  {
    title: "Home",
    description: "Home",
    to: "/",
  },
  {
    title: "About",
    description: "About",
    to: "/about",
  },
  {
    title: "Products",
    description: "Products",
    to: "/products",
  },
];
