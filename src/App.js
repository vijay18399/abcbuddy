import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import {ProtectedRoute,RedirectIfAuthenticated} from './components/Auth'
import { PractiseCards, PractiseCollection, PractiseCategories} from './components/Practise';
import { AdminLayout, BulkUpload, CollectionManager, Dashboard } from './components/Admin';
import { Layout,NotFound} from './components/Common';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<RedirectIfAuthenticated />}>
            <Route path="" element={<Auth />} />
          </Route>
          <Route path="practise" element={<ProtectedRoute />}>
            <Route path="" element={<PractiseCards />} />
            <Route path=":collectionType" element={<PractiseCategories />} />
            <Route path=":collectionType/:category" element={<PractiseCollection />} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bulk-upload" element={<BulkUpload />} />
            <Route path=":collectionType" element={<CollectionManager />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
