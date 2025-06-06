"use client";
import { useState } from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

// mui
import { LinearProgress, Stack } from "@mui/material";
import ThemeRegistry from "@/theme";

// redux
import { Provider } from "react-redux";
import { reduxStore, persistor } from "@/redux";

// redux-persist
import { PersistGate } from "redux-persist/integration/react";

// ✅ Updated TanStack Query import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// toast
import { Toaster } from "react-hot-toast";

// components
import GlobalStyles from "@/theme/globalStyles";

// dynamic import
const ProgressBar = dynamic(() => import("@/components/ProgressBar"), {
  ssr: false,
});

export default function Providers({ ...props }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <Provider store={reduxStore}>
      <ThemeRegistry>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" />
          <PersistGate
            loading={
              <Stack
                sx={{
                  position: "fixed",
                  top: "calc(50vh - 2px)",
                  width: "300px",
                  left: "calc(50vw - 150px)",
                  zIndex: 11,
                }}
              >
                <LinearProgress />
              </Stack>
            }
            persistor={persistor}
          >
            {props.children}
          </PersistGate>
        </QueryClientProvider>
        <ProgressBar />
      </ThemeRegistry>
    </Provider>
  );
}

Providers.propTypes = {
  isAuth: PropTypes.bool,
  children: PropTypes.node.isRequired,
  lang: PropTypes.any,
};
