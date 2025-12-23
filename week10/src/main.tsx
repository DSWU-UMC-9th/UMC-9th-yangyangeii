// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { MovieDetail } from "./pages/MovieDetail";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
