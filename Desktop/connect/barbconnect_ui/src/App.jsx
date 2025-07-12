import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SetLocation from './pages/SetLocation';
import FindBarbers from './pages/FindBarbers';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main routes with shared layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-location"
          element={
            <ProtectedRoute>
              <Layout>
                <SetLocation />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-barbers"
          element={
            <Layout>
              <FindBarbers />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
