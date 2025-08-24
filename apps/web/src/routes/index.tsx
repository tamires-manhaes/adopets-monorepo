import { BrowserRouter, Route, Routes } from "react-router";
import AuthPage from "@/pages/Auth/AuthPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}
