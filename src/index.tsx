import { HeroUIProvider } from "@heroui/react";
import { Analytics } from "@vercel/analytics/react";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import SplashScreen from "./components/SplashScreen";
import "./index.css";
const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <Suspense fallback={<SplashScreen />}>
        <App />
      </Suspense>
      <Analytics />
    </HeroUIProvider>
  </React.StrictMode>
);
