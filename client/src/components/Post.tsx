import axios from "axios";
import { FC, useEffect, useState } from "react";

interface PostProps {
    title: string;
    id: string;
    comments: []
}

const Post: FC<PostProps> = ({ title, id, comments }) => {
    const [userComments, setUserComments] = useState<{
        [key: string]: {
            id: string;
            content: string;
        }
    }[]>([]);

    const [comment, setComment] = useState('');

    const submitComment = async () => {
        try {
            const results = await axios.post(`http://localhost:4011/posts/${id}/comments`, {
                content: comment
            });
            setComment('');
            console.log(results)
            setUserComments([...userComments, results.data]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setUserComments(comments);
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', padding: '5px', border: '1px solid black', margin: '5px' }}>
            <h3>{title}</h3>
            <input type="text" placeholder="comment" value={comment} onChange={e => setComment(e.target.value)}/>
            <button style={{marginTop: '5px'}} onClick={submitComment}>Submit</button>
            <br />
            {userComments.map((comment: any) => <div key={comment.id}>{comment.content}</div>)}
        </div>
    )

}

export default Post;
