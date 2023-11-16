import React from 'react'
import { PrettyDate } from '../PrettyDate';

export interface IPost {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  created: Date;
  children: React.ReactNode;
}

interface IProps extends IPost {
  onClick?: (id: number) => void;
}

export const Post: React.FC<IProps> = (props) => {
  function handleClick() {
    if (props.onClick) props.onClick(props.id);
  }

  const hasChildren = React.Children.count(props.children) > 0;

  return (
    <div onClick={handleClick} className='post card border-light'>
      <div className='post__header card-header'>
        <img className='post__author_avatar' src={props.authorAvatar} alt={props.author} />
        <div className='post__info'>
          <h5 className='post__author_name card-title'>
            <a href='#'>{props.author}</a>
          </h5>
          <PrettyDate date={props.created} className='post__date' />
        </div>
      </div>
      <div className='post__body card-body'>
        <p className='post__content card-text'>{props.content}</p>
      </div>
      {hasChildren && (
        <div className='post__footer card-footer'>
          {props.children}
        </div>
      )}
    </div>
  )
}
