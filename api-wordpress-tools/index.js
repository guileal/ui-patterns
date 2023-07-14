// 🎯 Input
// const apiURL = 'https://yoursitehere.com.br/wp-json/wp/v2/'
// const endpoint = 'posts'

// 🔥Functions
export async function getPostsFromWordpressAPI(apiURL, endpoint){
    if(apiURL === '' || endpoint ===''){
        throw new Error('URL or endpoint invalid')
    }

    const URL = apiURL + endpoint

    const posts = await fetchPosts(URL)

    const postArray = posts.map(post=>{
        const {id, title} = post
        return {id, title}
    })
    return postArray
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
// (()=>{
//     getPostsFromWordpressAPI(apiURL,endpoint)
// })()
