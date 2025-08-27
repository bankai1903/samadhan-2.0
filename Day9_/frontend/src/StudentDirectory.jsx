import React, { useState, useEffect } from 'react';
import { User, Mail, BookOpen, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

// Real backend base (point to the Express server)
const API_BASE = 'http://localhost:3001/api/students';

const api = {
  getStudents: async () => {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Failed to fetch students');
    return res.json();
  },
  addStudent: async (student) => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (!res.ok) throw new Error('Failed to add student');
    return res.json();
  },
  updateStudent: async (id, student) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (!res.ok) throw new Error('Failed to update student');
    return res.json();
  },
  deleteStudent: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete student');
    return { success: true };
  }
};

/* ---------- StudentForm component (same shape as yours) ---------- */
function StudentForm({ student, onSave, onCancel, isEditing }) {
  const [formData, setFormData] = useState(
    student || { name: '', email: '', course: '', year: new Date().getFullYear() }
  );

  useEffect(() => {
    setFormData(student || { name: '', email: '', course: '', year: new Date().getFullYear() });
  }, [student]);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.course) return alert('Please fill required fields');
    onSave(formData);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {isEditing ? 'Edit Student' : 'Add New Student'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input name="name" value={formData.name} onChange={handleChange}
                 className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter student name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input name="email" value={formData.email} onChange={handleChange} type="email"
                 className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
          <input name="course" value={formData.course} onChange={handleChange}
                 className="w-full p-2 border border-gray-300 rounded-md" placeholder="Enter course name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input name="year" value={formData.year} onChange={handleChange} type="number" min="2020" max="2030"
                 className="w-full p-2 border border-gray-300 rounded-md" />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={handleSubmit}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <Save className="w-4 h-4" />
          {isEditing ? 'Update' : 'Add'} Student
        </button>
        <button onClick={onCancel}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );
}

/* ---------- StudentCard component ---------- */
function StudentCard({ student, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{student.name}</h3>
            <p className="text-sm text-gray-500">ID: {student.id}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(student)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(student.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="text-sm">{student.email}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">{student.course}</span>
        </div>
        <div className="text-sm text-gray-500">Year: {student.year}</div>
      </div>
    </div>
  );
}

/* ---------- Main StudentDirectory component ---------- */
export default function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // fetch students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await api.getStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      const newStudent = await api.addStudent(studentData);
      setStudents(prev => [newStudent, ...prev]);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError('Failed to add student. Please try again.');
    }
  };

  const handleUpdateStudent = async (studentData) => {
    try {
      const updated = await api.updateStudent(editingStudent.id, studentData);
      setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
      setEditingStudent(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update student. Please try again.');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await api.deleteStudent(id);
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      setError('Failed to delete student. Please try again.');
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Directory</h1>
          <p className="text-gray-600">Manage your student database with ease</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button onClick={() => setError(null)} className="float-right text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search students by name, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <button onClick={() => { setShowForm(!showForm); setEditingStudent(null); }}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <StudentForm
              student={editingStudent}
              onSave={editingStudent ? handleUpdateStudent : handleAddStudent}
              onCancel={handleCancel}
              isEditing={!!editingStudent}
            />
          </div>
        )}

        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              {searchTerm ? 'No students found' : 'No students yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search criteria' : 'Add your first student to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(s => (
              <StudentCard key={s.id} student={s} onEdit={handleEdit} onDelete={handleDeleteStudent} />
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-gray-500">
          <p>Showing {filteredStudents.length} of {students.length} students{searchTerm && ` matching "${searchTerm}"`}</p>
        </div>
      </div>
    </div>
  );
}
