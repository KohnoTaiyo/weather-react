import "./App.scss";

import { Route, Routes } from "react-router-dom";

import Date from "./page/Date/Date";
import Home from "./page/Home/Home";

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:date" element={<Date />} />
      </Routes>
    </main>
  );
}

export default App;
