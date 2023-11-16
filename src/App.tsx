import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Post, AddPost, Posts } from './pages';

function App() {

  return (
    <Routes>
      <Route path='/' index Component={Posts} />
      <Route path='/posts/:id' index Component={Post} />
      <Route path='/posts/new' index Component={AddPost} />
    </Routes>
  )
}

export default App
