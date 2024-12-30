- [Vite docs for SSR](https://vite.dev/guide/ssr.html) and [Vite docs for back-end integration](https://vite.dev/guide/backend-integration.html)
- [Github issue for vite-plugin-react](https://github.com/vitejs/vite-plugin-react/issues/222) discussing hot reloading for server-side-rendered react when `renderToPipeableStream` is used.
- [An example of using Vite with react and server-side streaming](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react-streaming) that I am going to base my investigation on.
- [A Vite React SSR example with typescript setup](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react-ts)
- [A place in source code](https://github.com/rakkasjs/rakkasjs/blob/ff95ee58ace4e262c320cc26884738ad0a74815c/packages/rakkasjs/src/features/pages/middleware.tsx#L750) that suggests what needs to be inserted in react-rendered html to achieve fast refresh
- Someone [tries](https://danielnagy.me/posts/Post_2mewtbsl6g4c) to combine vite, react, ssr, renderToPipeableStream, and react's having full control over html. See also their repo [rcs-vite-experiment](https://github.com/daniel-nagy/rcs-vite-experiment)


## Problems
1. Flash of unstyled content during SSR

See [vite issue](https://github.com/vitejs/vite/issues/2282)
