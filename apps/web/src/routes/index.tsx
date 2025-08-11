import { BrowserRouter, Route, Routes } from "react-router";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>homepage</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
