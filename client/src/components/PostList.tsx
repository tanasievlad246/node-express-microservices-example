import { FC } from "react";
import Post from "./Post";

interface PostListProps {
    posts: {
        [key: string]: {
            id: string;
            title: string;
        }
    }
}

const PostList: FC<PostListProps> = ({ posts }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1>Posts</h1>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'start',
                justifyContent: 'start',
                
            }}>
                {Object.values(posts).map((post: any) => (
                   <Post key={post.id} id={post.id} title={post.title} /> 
                ))}
            </div>
        </div>
    );
}

export default PostList;
