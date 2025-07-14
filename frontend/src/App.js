import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Templates from "./pages/Templates";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:templateId" element={<Editor />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;