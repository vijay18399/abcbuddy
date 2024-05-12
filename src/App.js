import Layout from './components/Layout';
import NotFound from './containers/NotFound';
import Auth from './containers/Auth';
import Home from './containers/Home';
import BulkUpload from './containers/BulkUpload';
import PracticeCollection from './containers/PracticeCollection';
import CreateList from './containers/CreateList';
import ListPractice from './containers/ListPractice';
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './providers/AuthProvider';
import PracticeCards from './components/PracticeCards';
// Admin Components
import AdminLayout from './components/AdminLayout';
import Dashboard from './containers/Dashboard';
import CollectionManager from './containers/CollectionManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<RedirectIfAuthenticated><Auth /></RedirectIfAuthenticated>} />
          <Route path="practice" element={<Protected><PracticeCards /></Protected>}></Route>
          <Route path="practice/:collectionType" element={<PracticeCollection />} />
          <Route path="practice-list" element={<Protected><CreateList /></Protected>} />
          <Route path="practice-list/:uniqueId" element={<Protected><ListPractice /></Protected>} />
        </Route>
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="bulk-upload" element={<BulkUpload/>} />
          <Route path=":collectionType" element={<CollectionManager  />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Component to redirect logged-in users away from login and signup pages
const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Component to protect routes from unauthenticated users
const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default App;
