import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SetLocation from './pages/SetLocation';
import FindBarbers from './pages/FindBarbers';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Home from './pages/Home';
import SearchResults from './pages/searchResults';
import ShopProfile from './pages/shopProfile.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/shop/:shopId"
          element={
            <Layout>
              <ShopProfile />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <SearchResults />
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