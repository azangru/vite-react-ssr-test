declare module '*.png' {
  const png: string;
  export = png;
}

declare module '*.ico' {
  const ico: string;
  export = ico;
}

declare module '*.jpg' {
  const jpg: string;
  export = jpg;
}

declare module '*.module.css' {
  const content: { [className: string]: string };
  export = content;
}
