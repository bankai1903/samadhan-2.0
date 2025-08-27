import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

export default function Day8ListsEvents() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React lists', completed: false },
    { id: 2, text: 'Handle onClick events', completed: true },
    { id: 3, text: 'Handle onChange events', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  // Handle adding new todo
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
      setTodos([...todos, { id: newId, text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  // Handle toggling todo completion
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Handle deleting todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Day 8: Lists & Events</h1>
        <p className="text-gray-600 text-sm">Mini Task: To-Do List (local state only)</p>
      </div>

      {/* Progress indicator */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-blue-800">Progress</span>
          <span className="text-sm text-blue-600">{completedCount}/{totalCount}</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
          ></div>
        </div>
      </div>

      {/* Add new todo */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleAddTodo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Todo list - rendered with .map() */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                todo.completed 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <button
                onClick={() => handleToggleTodo(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-300 hover:border-green-400'
                }`}
              >
                {todo.completed && <Check className="w-3 h-3" />}
              </button>
              
              <span 
                className={`flex-1 ${
                  todo.completed ? 'line-through text-green-700' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
              
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {todos.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            {completedCount === totalCount && totalCount > 0
              ? '🎉 All tasks completed!'
              : `${totalCount - completedCount} task${totalCount - completedCount !== 1 ? 's' : ''} remaining`
            }
          </p>
        </div>
      )}
    </div>
  );
}