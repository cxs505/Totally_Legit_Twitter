# Totally_Legit_Twitter
Our first group project with the goal to create a community journaling website.

## Instructions
- Be sure to install all dependencies!
    - First go to the directory where the package.json is
    ```bash
    cd server
    ```
    - Then run the install command
    ```bash
    npm install
    ```
- After that you need to start the server:
    ```bash
    npm start
    ```
- Finally open the index.html with your browser. Have Hun!

## Goal No.1 (Reached)
- Create a basic home page that allows user interaction.
    - Users should be able to visit the website and anonymously post journal entries.

- Connect home page elements to a .js file which will add functionality to them
    - should be able to receive a text input and send it to the server
    - should be able to receive an array of strings from the server and diplaying them in the home page

- Set up a server that responds to client requests
    - contains an array of objects that can hold the information of user's posts
    - appends new entries to the array
    - returns each new entry to be displayed for all users to see

- Create a few basic tests for our application

## Goal No.2 (Reached)
- Improve home page UI and UX
- Modify the object array so that it can also store replies to original posts
- Add the ability to receive and append new replies to original posts
- Return all new replies to be displayed for all users

## Goal No.3 (Work in progress)
- Add the ability to react with emojis to original posts
- Add the ability to post gifs from giphy
- Increase test coverage to above 60%

## Future Goals
- Create a sign up system for new users
- Add the ability to also react to comments
- Allow users to post giffs as replies
- Allow users to post images or photos