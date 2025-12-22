/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_CAPTURE_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}





