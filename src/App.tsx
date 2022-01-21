import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap-css-only/css/bootstrap.css';
import './styles/index.css';
import './styles/tailwind.css';
import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/LoginScreen';
import MainLayout from './layout/MainLayout';
import UserView from './screens/UserView';
import TagsView from './screens/TagsView';
import ArticlesView from './screens/ArticlesView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="users" element={<UserView />} />
          <Route path="tags" element={<TagsView />} />
          <Route path="articles" element={<ArticlesView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
