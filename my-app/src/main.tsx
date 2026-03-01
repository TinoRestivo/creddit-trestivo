/*
 * FILE:				  main.tsx
 * PROJECT:			Front end assignment
 * PROGRAMMER:		Tino Restivo
 * FIRST VERSION:	Feb 22, 2026
 * DESCRIPTION:
 * Loads the app file.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
