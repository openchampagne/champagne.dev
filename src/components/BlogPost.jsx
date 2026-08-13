import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { getPostContent } from '../utils/posts';

const BlogPost = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getPostContent(id).then(setPost);
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkImages]}
                components={{
                    img: ({ node, ...props }) => (
                        <motion.img
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            {...props}
                            className="my-4 rounded-lg shadow-lg"
                        />
                    )
                }}
            >
                {post.content}
            </ReactMarkdown>
        </div>
    );
};

export default BlogPost;