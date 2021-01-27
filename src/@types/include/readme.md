# @types/include

These type definitions are meant to be imported globally by the project, through tsconfig.

These type definitions should **NOT** be imported by other files.

## File structure

Features should be represented by a folder, with the feature name, and only an `index.d.ts` file in the folder.

```
- @types/
|-- include/
|---- foo/
|------ index.d.ts
```

The `index.d.ts` file must contain an export, even if it's an empty object.

E.g.:

```ts
export {}
```
