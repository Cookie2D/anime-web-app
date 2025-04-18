declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
      GA_TAG: string;
      NEXT_PUBLIC_SITE_URL: string;
    }
  }
}

export {};
