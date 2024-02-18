# Next.js 14 Update Features

## Introduction

This document serves as a comprehensive guide to the new and updated features in Next.js 14. Next.js, a powerful React framework, continues to evolve, offering developers enhanced performance, improved developer experience, and more efficient ways to build web applications. This version brings a host of improvements and new capabilities designed to streamline development processes and enhance your applications.

## Objectives

The primary goal of this lecture note is to provide an in-depth look at the features introduced in Next.js 14. By the end of this document, readers will:

- Understand the key updates and how they compare to previous versions.
- Learn how to implement and benefit from the new features.
- Gain insights into best practices for upgrading existing Next.js projects to version 14.

## New Features in Next.js 14

### 1. Data fetching

#### Data Fetching, Caching, and Revalidating

1. Fetching Data on the server with `fetch`

   - To allow you to configure the caching and revalidating behavior for each fetch request on the server. React extends fetch to automatically memoize fetch requests while rendering a React component tree.

Example:

```javascript
async function getData() {
  const res = await fetch('https://api.example.com/...');
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <main></main>;
}
```

##### Caching Data

Caching stores data so it doesn't need to be re-fetched from your data source on every request.

By default, Next.js automatically caches the returned values of `fetch` in the [Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache) on the server. This means that the data can be fetched at build time or request time, cached, and reused on each data request.

##### Revalidating Data

Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information.

Cached data can be revalidated in two ways:

- **Time-based revalidation**: Automatically revalidate data after a certain amount of time has passed. This is useful for data that changes infrequently and freshness is not as critical.
- **On-demand revalidation**: Manually revalidate data based on an event (e.g. form submission). On-demand revalidation can use a `tag-based` or `path-based` approach to revalidate groups of data at once. This is useful when you want to ensure the latest data is shown as soon as possible (e.g. when content from your headless CMS is updated).

**Time-based Revalidation**
To revalidate data at a timed interval, you can use the `next.revalidate` option of `fetch` to set the cache lifetime of a resource (in seconds).

```js
fetch('https://...', { next: { revalidate: 3600 } });
```

OR
you can use the [Segment Config Options](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config).

```js
export const revalidate = 3600; // revalidate at most every hour
```

inside of _layout.js_ | _page.js_
