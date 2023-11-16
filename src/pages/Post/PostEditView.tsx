import React, {useState, useRef, useEffect} from 'react'

interface IPostEditView {
  author: string;
  authorAvatar: string;
  content:  string;
  onSubmit: (content: string) => void;
  onClose: () => void;
}

export const PostEditView: React.FC<IPostEditView> = (props) => {
  const [content, setContent] = useState<string>(props.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.onSubmit(content);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  useEffect(() => {
    const { length } = content;
    textareaRef.current?.setSelectionRange(length, length);
    textareaRef.current?.focus();
  }, [])

  return (
    <div className="editpost card">
      <div className="post__header card-header">
        <h4 className='post__title card-title'>Редактировать публикацию</h4>
        <button onClick={props.onClose} className="post__cancel_button">✖</button>
      </div>
      <form onSubmit={handleSubmit} className='editpost__form'>
        <div className='post__body card-body'>
          <img className='post__author_avatar' src={props.authorAvatar} alt={props.author} />
          <textarea ref={textareaRef} required onChange={handleInputChange} className='post__content-editable' value={content} />
        </div>
        <div className='post__footer card-footer'>
          <button className='editpost__save_button btn btn-primary'>Сохранить</button>
        </div>
      </form>
    </div>
  )
}