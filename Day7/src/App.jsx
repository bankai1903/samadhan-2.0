import { useState } from 'react';
import './App.css';

function CounterAndTextPreview() {
  // State for counter
  const [count, setCount] = useState(0);
  
  // State for text input
  const [text, setText] = useState('');
  
  // State for additional features
  const [step, setStep] = useState(1);

  // Handler functions
  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleStepChange = (e) => {
    setStep(parseInt(e.target.value) || 1);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', background: 'linear-gradient(135deg, #e0f2fe 0%, #e8eaf6 100%)', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', color: '#374151', marginBottom: '32px' }}>
        Day 7: State Management Demo
      </h1>
      
      {/* Counter Section */}
      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', marginBottom: '24px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
          📊 Counter Component
        </h2>
        
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '8px' }}>
            {count}
          </div>
          <p style={{ color: '#6b7280' }}>Current Count</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
          <button
            onClick={decrement}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#ef4444', 
              color: 'white', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            - {step}
          </button>
          
          <button
            onClick={reset}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#6b7280', 
              color: 'white', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
          
          <button
            onClick={increment}
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#10b981', 
              color: 'white', 
              borderRadius: '8px', 
              border: 'none', 
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            + {step}
          </button>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.875rem', color: '#6b7280' }}>Step size:</label>
          <input
            type="number"
            value={step}
            onChange={handleStepChange}
            style={{ width: '64px', padding: '4px 8px', border: '1px solid #d1d5db', borderRadius: '4px', textAlign: 'center' }}
            min="1"
          />
        </div>
      </div>
      
      {/* Live Text Preview Section */}
      <div style={{ background: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
          ✍️ Live Text Preview
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
            Type something:
          </label>
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Start typing to see live preview..."
            style={{ 
              width: '100%', 
              padding: '8px 16px', 
              border: '1px solid #d1d5db', 
              borderRadius: '8px',
              outline: 'none',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '16px', borderLeft: '4px solid #2563eb' }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Live Preview:</p>
          <div style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151', minHeight: '1.5rem' }}>
            {text || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Nothing typed yet...</span>}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '8px' }}>
            Character count: {text.length} | Word count: {text.trim() ? text.trim().split(/\s+/).length : 0}
          </div>
        </div>
      </div>
      
      {/* State Overview */}
      <div style={{ marginTop: '24px', backgroundColor: '#eef2ff', borderRadius: '8px', padding: '16px', border: '1px solid #c7d2fe' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#3730a3', marginBottom: '8px' }}>
          🔍 Current State Overview
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '0.875rem' }}>
          <div>
            <span style={{ fontWeight: '500', color: '#4338ca' }}>count:</span> 
            <span style={{ marginLeft: '4px', color: '#374151' }}>{count}</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#4338ca' }}>step:</span> 
            <span style={{ marginLeft: '4px', color: '#374151' }}>{step}</span>
          </div>
          <div>
            <span style={{ fontWeight: '500', color: '#4338ca' }}>text:</span> 
            <span style={{ marginLeft: '4px', color: '#374151' }}>"{text}"</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CounterAndTextPreview />
    </div>
  );
}

export default App;