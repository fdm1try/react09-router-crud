import { useState, useEffect, useRef } from 'react'
import {Post, IPost} from '../components/Post';
import { apiRequest } from '../utils';
import { NavLink, useNavigate } from 'react-router-dom';

export const Posts = () => {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const loading = useRef<boolean>(false);
  const navigate = useNavigate();

  function loadPosts() {
    if (loading.current) return;
    loading.current = true;
    apiRequest<Array<IPost>>('/posts').then((data) => {
      const postList = data.map((item) => ({...item, created: new Date(item.created)}));
      postList.sort((a, b) => b.created.getTime() - a.created.getTime());
      setPosts(postList);
    }).catch((error) => {
      loading.current = false;
      alert(`Не удалось загрузить данные, произошла ошибка. ${error}`);
    })
  }

  function handlePostClick(id: number) {
    navigate(`/posts/${id}`, { state: '/' });
  }

  useEffect(() => {
    loadPosts();
    return () => {
      loading.current = false
    }
  }, []);

  return (
    <>
      <div className='app__header'>
        <NavLink className='app__newpost btn btn-primary' to='/posts/new'>Создать пост</NavLink>
      </div>
      <div className='posts'>
        { posts.length ? '' : 'Нет публикаций...' }
        {
          posts.map((post) => <Post key={post.id} {...post} onClick={handlePostClick}/>)
        }
      </div>
    </>
  )
}
