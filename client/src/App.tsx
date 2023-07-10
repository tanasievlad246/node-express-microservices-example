import { useEffect, useState } from "react";
import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";
import axios from "axios";

function App() {
  const [posts, setPosts] = useState<{
    [key: string]: {
      id: string;
      title: string;
    }
  }>({});

  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://posts.com/query');
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPosts();
  }, []);


  const submitPost = async () => {
    try {
      const response = await axios.post('http://posts.com/posts', {
          title
      }); 
      setTitle('');
      console.log(response.data);
      posts[response.data.id] = response.data;
    } catch (error) {
      console.log(error); 
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <div>
      <PostCreate 
        title={title}
        submit={submitPost}
        handleChange={handleTitleChange}
      />
      <br />
      <PostList
        posts={posts}
      />
    </div>
  );
}

export default App;
