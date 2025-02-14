import React, { useState, useEffect } from 'react';

const Search = ({ posts, onFilterPosts }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        onFilterPosts(filteredPosts);
    }, [searchTerm, posts, onFilterPosts]);

    return (
        <div className="my-4">
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default Search;