import { useContext } from 'react';
import noteContext from "../context/notes/noteContext"
export default function Notes(props) {
    const context = useContext(noteContext);
    const { handleDeleteNote } = context;
    const { note, updateNote } = props;
    const deleteClick = () => {
        swal({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((result) => {
            if (result) {
                handleDeleteNote(note._id)
                swal("Note Deleted!", "", "success");
            }
        });
    }
    return (
        <>
            <div className="card my-2 mx-2 card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-7">
                            <h5 className="card-title">{note.title}</h5>
                        </div>
                        <div className="col-5 text-right px-0">
                            <button
                                className="btn"
                                onClick={deleteClick}
                            >
                                <i className="fa-solid fa-trash" style={{ color: "#0084ff" }}></i>
                            </button>
                            <button
                                className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                            >
                                <i className="fa-regular fa-pen-to-square" style={{ color: "#0084ff" }} onClick={() => { updateNote(note) }}></i>
                            </button>
                        </div>
                    </div>
                    <p className="card-subtitle mb-2 text-body-secondary">{`${new Date(note.date).getUTCDate()}/${new Date(note.date).getUTCMonth() + 1}/${new Date(note.date).getUTCFullYear()}`}</p>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </>
    )
}
