export async function getAllPosts() {
    const response = await fetch('/posts-index.json');
    return response.json();
}

export async function getPostContent(id) {
    const allPosts = await getAllPosts();
    return allPosts.find(post => post.id === id);
}

export async function getAllTags() {
    const response = await fetch('/tags.json');
    return response.json();
}