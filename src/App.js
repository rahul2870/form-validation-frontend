import NavbarCMP from "./components/navbar";
import Frontend from "./pages/frontend";
import Backend from "./pages/backend";
import { Route, Routes } from "react-router-dom";
export default function App() {

    return <>
        <NavbarCMP />
        <Routes>
            <Route path="/" element={<Frontend />} />
            <Route path="/all-forms" element={<Backend />} />
        </Routes>
    </>
}