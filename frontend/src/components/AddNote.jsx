import { useContext, useState } from "react"
import noteContext from "../context/notes/noteContext"
export default function AddNote() {
    const context = useContext(noteContext);
    const { handleAddNote, mode } = context;
    const handleAddClick = (e) => {
        e.preventDefault();
        swal("Note Added!", "", "success")
        handleAddNote(note.title, note.description, note.tag);
    }
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    document.body.style.background = (mode === "dark") ? "#091d63" : "white";
    const color = (mode === "dark") ? "white" : "black";
    return (
        <div className='container' style={{color:color}}>
            <h1>Welcome to Magic notes</h1>
            <form>
                <div className="mb-3">
                    <label className="form-label">Add a Note</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} autoComplete="off" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} autoComplete="off" />
                </div>
                <button disabled={!note.title.length || !note.description.length || !note.tag.length} type="button" className={`btn btn-${(mode === "dark") ? "danger" : "primary"}`} onClick={handleAddClick}>Add</button>
            </form>
        </div>
    )
}
