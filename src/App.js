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

        <div className="text-center py-10">
            <h1 className="text-lg">Hi, Quick Connect</h1>
            <div className="flex gap-10 justify-center mt-4 font-bold">
                <p>+91-8448443891</p>
                <p>+91-9310964293</p>
            </div>
        </div>
    </>
}