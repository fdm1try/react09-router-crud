import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostEditView } from './PostEditView';
import { PostView } from './PostView';
import { apiRequest } from '../../utils';

interface IPost {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  created: Date;
}

export const Post = () => {
  const { id } = useParams();
  const [edit, setEdit] = useState<boolean>(false);
  const [data, setData] = useState<IPost>();
  const navigate = useNavigate();

  async function handleEditSubmit(content: string) {
    apiRequest(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, content})
    }).then(() => {
      loadPostData().catch(() => navigate(`/posts/${id}`));
      setEdit(false);
    }).catch((error: Error) => alert(`Произошла ошибка. ${error}`));
  }

  function handleEditStart() {
    setEdit(true);
  }

  function handleEditCancel() {
    setEdit(false);
  }

  function handleRemove() {
    apiRequest(`/posts/${id}`, { method: 'DELETE' }).then(() => {
      navigate('/', { replace: true, state: '/posts' });
    }).catch((error: Error) => alert(`Произошла ошибка удаления. ${error}`));
  }

  function loadPostData() {
    return apiRequest<{post: IPost}>(`/posts/${id}`).then((data) => {
      setData({ ...data.post, created: new Date(data.post.created)});
    });
  }

  useEffect(() => {
    loadPostData().catch((error) => alert(`Не удалось загрузить пост. ${error}`));
  }, []);

  if (!data) return <></>
  return (
    <div className='post__view'>
      {edit ? <PostEditView onClose={handleEditCancel} onSubmit={handleEditSubmit} {...data} /> :
        <PostView onEdit={handleEditStart} onRemove={handleRemove} {...data} />
      }
    </div>
  )
  return  
}
