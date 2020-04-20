# json-aggregator

Project which calls 2 api endpoints and aggregates the responses by adding the user information to the respective post information
- Posts Api: https://jsonplaceholder.typicode.com/posts/
- Users Api: https://jsonplaceholder.typicode.com/users/${userId}

## Running the Project
```
yarn
yarn start
```

## Routes
Retrieves the latest 10 posts from the posts api, and returns the data with the user's information aggragated to the response:
- http://localhost:8080/latest-posts