import React from 'react'
import { Post } from '../../components/Post';

interface IPostView {
  id: number;
  author: string;
  authorAvatar: string;
  content:  string;
  created: Date;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
}

export const PostView: React.FC<IPostView> = (props) => {
  const handleEditClick = () => props.onEdit(props.id);
  const handleRemoveClick = () => props.onRemove(props.id);

  return (
    <Post {...props} >
      <button onClick={handleEditClick} className="post__edit_button btn btn-primary">Изменить</button>
      <button onClick={handleRemoveClick} className="post__remove_button btn btn-danger">Удалить</button>
    </Post>
  )
}
