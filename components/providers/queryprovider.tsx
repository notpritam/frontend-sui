"use client";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
const networks = {
  devnet: { url: getFullnodeUrl("devnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
};

const queryClient = new QueryClient();

function Queryprovider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <WalletProvider>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default Queryprovider;
