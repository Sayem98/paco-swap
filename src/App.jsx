import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { bsc, sepolia } from "wagmi/chains";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./pages/PageNotFound";
import Spinner from "./components/Spinner";
import Web3 from "web3";
const Homepage = lazy(() => import("./pages/Homepage"));
const AppLayout = lazy(() => import("./components/AppLayout"));
const Swappage = lazy(() => import("./pages/Swappage"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));

const chains = [bsc];
const config = createConfig(
  getDefaultConfig({
    alchemyId: "EbWpcrEoNB5gzeDJi_clFzLbpbgTtuRt",
    walletConnectProjectId: "1134b8f033ffc7945c3513d4fa5f0459",
    chains,
    appName: "Your App Name",
    appDescription: "Your App Description",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  })
);

function App() {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<AppLayout />}>
                <Route index element={<Swappage />} />
                <Route path="earn" element={<ComingSoon />} />
                <Route path="swap" element={<Swappage />} />
                <Route path="games" element={<ComingSoon />} />
                <Route path="lottery" element={<ComingSoon />} />
                <Route path="paco-staking" element={<ComingSoon />} />
                <Route path="about-staking" element={<ComingSoon />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default App;
