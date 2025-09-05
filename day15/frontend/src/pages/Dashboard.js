import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // This component will contain the notes logic (fetch, add, delete)
    // All fetch calls must include the Authorization header.
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    // ... (Your notes state and functions go here)
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('http://localhost:4000/api/notes', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            setNotes(data);
        };
        fetchNotes();
    }, [token]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>My Notes</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Form to add notes */}
            {/* List of notes */}
             <div>
                {notes.map(note => <div key={note._id}><h3>{note.title}</h3><p>{note.content}</p></div>)}
            </div>
        </div>
    );
};

export default Dashboard;
