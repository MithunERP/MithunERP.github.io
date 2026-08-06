// Loads TypeScript's ambient type declarations for React's `canary` release
// channel (e.g. `ViewTransition`) — Next.js's App Router uses an internally
// bundled React build that includes these at runtime (confirmed in
// node_modules/next/dist/compiled/react), but @types/react only ships them
// under a separate "react/canary" types subpath, not the default "react"
// export surface. A triple-slash reference is the officially documented way
// to bring them into scope project-wide without changing tsconfig's
// "types" array (which would otherwise stop auto-including every other
// @types/* package). See node_modules/@types/react/canary.d.ts's own
// top-of-file comment for the three documented ways to do this.
/// <reference types="react/canary" />
