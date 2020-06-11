**Storybot Overview**
Chat-enabled community-built storybook.

**Components**

1. React App
   - [DONE] Given twitch id, start chatbot
   - [DONE] Click button to end story recording
     - [DONE] Take result from chatbot
     - Assemble story book
2. Node.js Server

   - Manage chatbot

     - Command to see most recent line of story
     - [DONE] Command to add a new line to the story
     - [DONE] Store message history for a SINGLE story
     - Store multiple stories

   - End story
     - [DONE] Compile all messages and send to React App
     - Pull relevant image sources and add to payload

3. Stretch Goalz
    - Given user id, first page of the story should be the user's icon

/story/start/:username GET
Connects chatbot to twitch user, username :username

/story/stop/:username GET
Disconnects chatbot from twitch user, responds with payload of current story
{
username
story: {
text:
image:
}[]
}
