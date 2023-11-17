
async function getUsers() {
    const usersUrl = "https://jsonplaceholder.typicode.com/users"

    try {
        const res = await fetch(usersUrl)
        const data = await res.json()

        const users = data.map(({ id, name }) => ({ id, name }))

        return users

    } catch(error) {
        console.error(error)
    }
}

async function getPosts() {
    const postsUrl = "https://jsonplaceholder.typicode.com/posts"

    try {
        const res = await fetch(postsUrl)
        const json = await res.json()

        return json
        
    } catch (error) {
        console.error(error)
    }
}

/// no longer used
function displayUsers(users) {
    const container = document.createElement('div')

    users.map((user) => {
        const h2 = document.createElement('h2')
        h2.innerText = user.name

        container.append(h2)
    })

    document.body.append(container)
}

function displayAll(users, posts) {
    const userDivs = users.map((user) => {
        const foundPosts = posts.filter(post => post.userId === user.id)

        const userContainer = document.createElement('div')

        const h2 = document.createElement('h2')
        h2.innerText = user.name
        userContainer.append(h2)

        // note:
        // do more of this (more pure)
        const postParas = foundPosts.map((post) => {

            const p = document.createElement('p')
            p.innerText = `${post.id}. ${post.title}`
            return p
        })

        userContainer.append(...postParas)

        return userContainer
    })

    document.body.append(...userDivs)
}

displayAll(await getUsers(), await getPosts()) 
