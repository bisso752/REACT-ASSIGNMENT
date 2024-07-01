import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; 
import PostComponent from './Post';

interface Post {
  id: number;
  title: string;
  userId: number;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<{ [key: number]: User }>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://dummyjson.com/posts');
      const postsData = response.data.posts.slice(0, 10);
      setPosts(postsData);

      const userIds = postsData.map((post: Post) => post.userId);
      const uniqueUserIds = [...new Set(userIds)];

      const usersData = await Promise.all(
        uniqueUserIds.map(async (userId) => {
          const userResponse = await axios.get(`https://dummyjson.com/users/${userId}`);
          return userResponse.data;
        })
      );

      const usersMap = usersData.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as { [key: number]: User });

      setUsers(usersMap);
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          title={post.title}
          author={users[post.userId] || { firstName: 'Loading...', lastName: '' }}
        />
      ))}
    </div>
  );
};

export default Posts;
