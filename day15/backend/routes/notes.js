const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import auth middleware
const Note = require('../models/Note');

// @route   GET api/notes
// @desc    Get all of a user's notes
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/notes
// @desc    Add new note
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = new Note({
      title,
      content,
      user: req.user.id,
    });
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// ... Add DELETE route similarly, making sure to check the user
router.delete('/:id', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ msg: 'Note not found' });
        // Make sure user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Note.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Note removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
});


module.exports = router;
