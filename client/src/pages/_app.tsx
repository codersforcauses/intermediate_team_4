import "@/styles/globals.css";
import "../styles/organization.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

import { AuthProvider } from "../context/AuthContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 1. React Query is the outermost layer */}

      <AuthProvider>
        {/* 2. AuthProvider is nested inside React Query */}
        <Component {...pageProps} />
      </AuthProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
