import axios from "axios";
import { FC, useEffect, useState } from "react";

interface PostProps {
    title: string;
    id: string;
}

const Post: FC<PostProps> = ({ title, id }) => {
    const [comments, setComments] = useState<{
        [key: string]: {
            id: string;
            content: string;
        }
    }[]>([]);

    const [comment, setComment] = useState('');

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:4010/posts/${id}/comments`);
            setComments(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const submitComment = async () => {
        try {
            await axios.post(`http://localhost:4010/posts/${id}/comments`, {
                content: comment
            });
            setComment('');
            fetchComments();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', padding: '5px', border: '1px solid black', margin: '5px' }}>
            <h3>{title}</h3>
            <input type="text" placeholder="comment" value={comment} onChange={e => setComment(e.target.value)}/>
            <button style={{marginTop: '5px'}} onClick={submitComment}>Submit</button>
            <br />
            {comments.map((comment: any) => <div key={comment.id}>{comment.content}</div>)}
        </div>
    )

}

export default Post;
