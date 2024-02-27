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

If you have multiple fetch requests in a statically rendered route, and each has a different revalidation frequency. The lowest time will be used for all requests.

**On-demand Revalidation**
Data can be revalidated on-demand by path ([`revalidatePath`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)) or by cache tag ([`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)) inside a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) or [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers).

Next.js has a cache tagging system for invalidating fetch requests across routes.

When using fetch, you have the option to tag cache entries with one or more tags. Then, you can call revalidateTag to revalidate all entries associated with that tag.

For example, the following `fetch` request adds the cache tag `collection`:

```ts
export default async function Page() {
  const res = await fetch('https://...', { next: { tags: ['collection'] } });
  const data = await res.json();
  // ...
}
```

You can then revalidate this `fetch` call tagged with `collection` by calling `revalidateTag` in a Server Action:

```ts
'use server';

import { revalidateTag } from 'next/cache';

export default async function action() {
  revalidateTag('collection');
}
```

**Error handling and revalidation**
If an error is thrown while attempting to revalidate data, the last successfully generated data will continue to be served from the cache. On the next subsequent request, Next.js will retry revalidating the data.

**Multiple `fetch` Requests**
If you have multiple `fetch` requests in a route segment (e.g. a Layout or Page), you can configure the caching behavior of all data requests in the segment using the [Segment Config Options](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config).

> However, we recommend configuring the caching behavior of each fetch request individually. This gives you more granular control over the caching behavior.
