import { FC } from "react";

interface PostCreateProps {
    title: string;
    submit: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PostCreate: FC<PostCreateProps> = ({ title, submit, handleChange }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1>Create Post</h1>
            <label htmlFor="title">Title</label>
            <input value={title} type="text" name="title" onChange={handleChange} />
            <button onClick={submit} style={{ marginTop: '5px'}}>Submit</button>
        </div>
    );
}

export default PostCreate;
