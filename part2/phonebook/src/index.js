import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// ReactDOM.render is no longer supported in React 18. Use createRoot instead
ReactDOM.createRoot(document.getElementById("root")).render(<App />);