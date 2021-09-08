



db.posts.insert({
    title: 'Post One',
    body: 'Body of post one',
    category: 'News',
    likes: 4,
    tags: ['news', 'events'],
    user: {
        name: 'John Doe',
        status: 'author'
    },
    date: Date()
})

db.posts.insertMany([
    {
        title: 'Post Two',
        body: 'Body of post two',
        category: 'Technology',
        date: Date()
    },
    {
        title: 'Post Three',
        body: 'Body of post Three',
        category: 'News',
        date: Date()
    },
    {
        title: 'Post Four',
        body: 'Body of post four',
        category: 'Entertainment',
        date: Date()
    }
])


tra.update({ title: 'Post One' },
    {
        $set: {
            comments: [
                {
                    user: 'Mary Williams',
                    body: 'Comment One',
                    date: Date()
                },
                {
                    user: 'Harry White',
                    body: 'Comment Two',
                    date: Date()
                }
            ]
        }
    }
)

tra.find({
    comments: {
        $elemMatch: {
            user: 'Mary Williams'
        }
    }
})

tra.find({
    user: {
        $elemMatch: {
            name: "John Doe",
            status : "author"
        }
    }
})

tra.find({
    $text: {
        $search: "\"Post T\""
    }
})