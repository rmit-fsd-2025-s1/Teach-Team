// Chakra UI v2 ships types, but some TS + "moduleResolution": "bundler" setups
// fail to resolve them for `@chakra-ui/react`. This shim unblocks `next build`.
declare module "@chakra-ui/react";
