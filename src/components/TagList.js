import React from 'react';
import { motion } from 'framer-motion';

const TagList = ({ tags, selectedTag, onSelectTag }) => {
    return (
        <div className="flex flex-wrap gap-2 my-4">
            {tags.map((tag, index) => (
                <motion.button
                    key={tag}
                    onClick={() => onSelectTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    {tag}
                </motion.button>
            ))}
        </div>
    );
};

export default TagList;