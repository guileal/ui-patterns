// this code works only in node enviroment
// 🎯 Input
const apiURL = 'https://yoursite.com.br/wp-json/wp/v2/'
const endpoint = 'posts'

// 🔥Functions
export async function getPostsFromWordpressAPI(apiURL, endpoint){
    if(apiURL === '' || endpoint === ''){
        throw new Error('APIurl and Endpoint must to be provided.')
    }

    const URL = apiURL + endpoint

    try {
        const posts = await fetchPosts(URL)

        const postArray = posts.map(post=>{
            const {id, title} = post
            return {id, title}
        })

        return postArray
    } catch (error) {
        throw new Error(`Failed to fetch posts from Wordpress API ${error.message}`)
    }
}

async function fetchPosts(url){
    try {
        const response = await fetch(url) 
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status} - ${response.statusText}`)
        }

        const posts = await response.json()

        return posts
    } catch (error) {
        console.log('Error: ', error)
        throw error
    }
}


// 🟢 Example of use
(async ()=>{
    const response = await getPostsFromWordpressAPI(apiURL,endpoint)
    console.log(response)
})()
