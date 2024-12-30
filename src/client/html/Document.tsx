import type { ReactNode } from 'react';

import type { Environment } from 'src/client/types/environment';

type Props = {
  children: ReactNode;
  entry?: string;
  environment: Environment;
};

const Document = ({
  children,
  environment
}: Props) => {
  const configString = `
    window.CONFIG_FIELD_ON_WINDOW = ${JSON.stringify(
      { environment }
    )}`;


  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        { environment === 'development' &&
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  import RefreshRuntime from '/@react-refresh'
                  RefreshRuntime.injectIntoGlobalHook(window)
                  window.$RefreshReg$ = () => {}
                  window.$RefreshSig$ = () => (type) => type
                  window.__vite_plugin_react_preamble_installed__ = true   
                `
              }}
              type="module"
            >
            </script>
            <script src="/src/client/Main.tsx" type="module" />
          </>
        }
        <script
          dangerouslySetInnerHTML={{
            __html: `${configString}`
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Document;
