const Notes = require('../models/Notes')
const fetchNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const addNotes = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const notes = new Notes({
            user: req.user.id,
            title: title,
            description: description,
            tag: tag
        })
        const result = await notes.save();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Internal Server Error" });
    }
}
const updateNotes = async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        let newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let result = await Notes.findById(req.params.id);
        if (!result) return res.status(404).send("Not found");
        if (result.user.toString() !== req.user.id) return res.status(404).send("Not Allowed");

        result = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ newNote });

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Internal Server Error" });
    }

}
const deleteNotes = async (req, res) => {
    try {
        let result = await Notes.findById(req.params.id);
        if (!result) return res.status(404).send("Not found");
        if (result.user.toString() !== req.user.id) return res.status(404).send("Not Allowed");
        result = await Notes.findByIdAndDelete(req.params.id);
        res.send("note deleted ");
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Internal Server Error" });
    }
}
module.exports = {
    fetchNotes,
    addNotes,
    updateNotes,
    deleteNotes
}