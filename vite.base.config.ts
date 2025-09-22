export default {
    build: {
        sourcemap: true,
    },
    // Required to use `accessors`
    // https://lit.dev/docs/components/properties/#avoiding-issues-with-class-fields
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#auto-accessors-in-classes
    // The fix:
    // https://github.com/vitest-dev/vitest/issues/5976
    esbuild: {
        target: "es2022",
    },
};
