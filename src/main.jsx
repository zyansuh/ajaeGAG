import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App.jsx를 import

const main = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

main();

export default main;
