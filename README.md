This project is a part of the interview test for **Afford Medical Technologies**. It is made with NextJs using Typescript and Material UI as React component library.

## Getting Started

After cloning the repo, you should run `npm i` in the project directory. Before starting the development server, you should start the "mock e-commerce" server. To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

After starting the development server, navigate to http://localhost:3000. Below is the screen shot of the same page:

![screenshot](/screenshot.jpeg)

## Comments

As per the requirement, the page is server-side rendered, with brands and categories as query parameters. In a typical scenario, all categories and brand names are static and does not change frequently, so I am saving categories and brand names in the global state. Since there are randomly generated brand names and categories on each request to the server, it causes an issue.

So let's say when you first opened the page, there will be a list of some brands. When you select one or more brands you can see the URL is updated, but when you refresh the page with the same URL, you will see another set of randomly selected brands that might or might not contain the previously selected brands which are present in the URL.

So to check if this is working, you can select all the brands displayed on the page and keep on refreshing the page until one or more brand name matches the brands present in the URL.

Similarly, in the case of categories, since the categories are randomly generated from the server, we may not get the same category and the same sub-categories. So there is no way to select categories on the left side from the categories in the URL. But the categories from the URL are saved in the react state which you can inspect.

And also, I was asked to make an add-to-cart button in the product card and a remove-from-cart button in the cart modal functional.
