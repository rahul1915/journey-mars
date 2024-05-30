declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.svg' {
    const content: string;
    export default content;
}
// Required to avoid TypeScript Errors when importing images.
// Currently, No images files are imported in Modules/Components
