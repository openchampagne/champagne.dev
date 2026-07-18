import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Search from '../components/Search';
import TagList from '../components/TagList';
import { getAllPosts, getAllTags } from '../utils/posts';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        getAllPosts().then(setPosts).then(setFilteredPosts);
        getAllTags().then(setTags);
    }, []);

    const handleSearch = (searchResults) => {
        setFilteredPosts(searchResults);
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
        if (tag) {
            setFilteredPosts(posts.filter(post => post.tags.includes(tag)));
        } else {
            setFilteredPosts(posts);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Blog
            </motion.h1>
            <Search posts={posts} onFilterPosts={handleSearch} />
            <TagList tags={tags} selectedTag={selectedTag} onSelectTag={handleTagSelect} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        className="max-w-xs w-full group/card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto bg-cover flex flex-col justify-between p-4">
                            <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
                            <div className="flex flex-row items-center space-x-4 z-10">
                                <div className="flex flex-col">
                                    <p className="font-normal text-base text-gray-50 relative z-10">
                                        {post.title}
                                    </p>
                                    <p className="text-sm text-gray-400">{post.date}</p>
                                </div>
                            </div>
                            <div className="text content">
                                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                                    {post.title}
                                </h1>
                                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                                    <Link to={`/blog/${post.id}`} className="hover:underline">Read more</Link>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Blog;