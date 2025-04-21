import React from "react";
import { createRoot } from "react-dom/client";
import BooksView from "./Views/BooksView";

import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<BooksView />);
