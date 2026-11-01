// Optional sub-path (NEXT_PUBLIC_BASE_PATH) for hosting under a prefix such as
// /<repo>; empty on Vercel. next/image does not add the basePath to string
// `src`s, so public files go through `asset()`.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
