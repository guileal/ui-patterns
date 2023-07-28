// 🎯 Input
const apiURL = 'http://ope-law-firm.local/wp-json/wp/v2/';
const endpoint = 'advogados';

const postListElement = document.getElementById('postList');

// 🔥Functions
async function getPostsFromWordpressAPI(apiURL, endpoint) {
    const URL = apiURL + endpoint;

    try {
        const posts = await fetchPosts(URL);

        const postArray = posts.map(post => {
            const { id, title } = post;
            return { id, title };
        });

        return postArray;
    } catch (error) {
        throw new Error(`Failed to fetch posts from WordPress API ${error.message}`);
    }
}

async function fetchPosts(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} - ${response.statusText}`);
        }

        const posts = await response.json();

        return posts;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}

// 🟢 Example of use
getPostsFromWordpressAPI(apiURL, endpoint)
    .then(posts => {
        // Display posts on the web page
        const postListHTML = posts.map(post => `<div><strong>${post.title.rendered}</strong></div>`).join('');
        postListElement.innerHTML = postListHTML;
    })
    .catch(error => {
        console.error(error);
    });
