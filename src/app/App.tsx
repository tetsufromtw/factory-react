// src/app/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../features/dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App