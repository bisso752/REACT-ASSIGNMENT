import React from 'react';

interface PostProps {
  title: string;
  author: {
    firstName: string;
    lastName: string;
  };
}

const PostComponent: React.FC<PostProps> = ({ title, author }) => (
  <div className="post">
    <h2>{title}</h2>
    <p>
      {author.firstName} {author.lastName}
    </p>
  </div>
);

export default PostComponent;
