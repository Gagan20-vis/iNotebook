import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import NoteState from "./context/notes/noteState";
function App() {
  return (
    <div>
      <NoteState>
      <Navbar />
      <Outlet />
      <Footer />
      </NoteState>
    </div>
  );
}

export default App;
