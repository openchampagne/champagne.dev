const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'public', 'posts');

function generatePostsIndex() {
    if (!fs.existsSync(postsDirectory)) {
        console.error(`Error: The directory ${postsDirectory} does not exist.`);
        console.log('Creating the directory...');
        fs.mkdirSync(postsDirectory, { recursive: true });
        console.log('Directory created. Please add some markdown files to this directory and run the script again.');
        return;
    }

    const fileNames = fs.readdirSync(postsDirectory);

    if (fileNames.length === 0) {
        console.error(`Error: The directory ${postsDirectory} is empty.`);
        console.log('Please add some markdown files to this directory and run the script again.');
        return;
    }

    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => {
            const id = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                id,
                ...data,
                content
            };
        });

    if (allPostsData.length === 0) {
        console.error('Error: No markdown files found in the posts directory.');
        console.log('Please add some markdown (.md) files to the posts directory and run the script again.');
        return;
    }

    const sortedPosts = allPostsData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const postsJson = JSON.stringify(sortedPosts);
    fs.writeFileSync(path.join(process.cwd(), 'public', 'posts-index.json'), postsJson);

    // Generate a list of all unique tags
    const allTags = [...new Set(allPostsData.flatMap(post => post.tags || []))];
    fs.writeFileSync(path.join(process.cwd(), 'public', 'tags.json'), JSON.stringify(allTags));

    console.log(`Successfully generated posts index with ${allPostsData.length} posts.`);
}

generatePostsIndex();