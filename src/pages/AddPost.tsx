import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils';

export const AddPost: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    apiRequest('/posts', {
      method: 'POST',
      body: JSON.stringify({ id: 0, content})
    }).then(() => {
      navigate('/', { replace: true, state: '/posts' })
    })
    .catch((error) => {
      alert(`Произошла ошибка. ${error}`);
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  useEffect(() => textareaRef?.current?.focus(), []);

  return (
    <div className='newpost'>
      <div className='post card border-light'>
        <div className='post__header card-header'>
          <h4 className='card-title'>Публикация</h4>
        </div>
        <form className='post__body' onSubmit={handleSubmit}>
          <textarea ref={textareaRef} rows={5} required onChange={handleChange} className='post__content-editable' placeholder='Текст поста' value={content} />
          <div className='post__footer card-footer'>
            <button className='post__add-button btn btn-primary'>Опубликовать</button>
          </div>
        </form>        
      </div>
    </div>
  )
}
