import React from 'react';
import {BrowserRouter as Browser, Route, Routes} from 'react-router-dom';

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
import EditArticleContainer from './screens/EditArticleContainer';
import CreateArticleContainer from './screens/CreateArticleContainer';
import CategoriesView from './screens/CategoriesView';

function App() {
  return (
    <Browser>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="users" element={<UserView />} />
          <Route path="tags" element={<TagsView />} />
          <Route path="articles" element={<ArticlesView />} />
          <Route path="articles/create" element={<CreateArticleContainer />} />
          <Route path={'articles/:id'} element={<EditArticleContainer />} />
          <Route path={'categories'} element={<CategoriesView />} />
          <Route path={'categories/:id'} element={<CategoriesView/>}/>
        </Route>
      </Routes>
    </Browser>
  );
}

export default App;
