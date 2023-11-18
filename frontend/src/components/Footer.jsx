import { useContext } from "react";
import modeContext from "../context/notes/noteContext"
export default function Footer() {
    const context = useContext(modeContext);
    const { mode } = context;
    const color = (mode==="dark") ? "white": "black";
    return (
        <footer style={{
            bottom: "0px",
            position: "relative",
            width: "100%",
            color: color
        }}>
            <div
                className="text-center p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © 2020 Copyright: iNotebook.com
            </div>
        </footer>
    );
}
