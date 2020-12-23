# Chat-Room-App

### Some functionalities
1. User can chat in the room
2. User can share their location 
3. Show list of users in the room at the side-bar
4. Auto sending welcome message, new user joining message, and user disconnect message 

### Basic UI of the app
<p float="left">
  <img src="https://user-images.githubusercontent.com/35439849/102965927-cec62580-4529-11eb-894d-76e7a0be528b.png" width="300"> 
  <img src="https://user-images.githubusercontent.com/35439849/102966077-1ea4ec80-452a-11eb-98f5-c05af26138cf.png" width="530">
</p>

## Structure of the code
<img src="https://user-images.githubusercontent.com/35439849/102966658-4b0d3880-452b-11eb-92e6-bf2503c7c907.png">

## Basic implementations of the code
1. Setup express server
2. Use socket to emit event for real-time chatting
3. Use maustache cdn to render template in client side
4. Use moment.js cdn to manipulate time
5. Use qs cdn to parse query string in client side
6. Deploy using Heroku on https://kaiyi-chat-room-app.herokuapp.com/


## Step to run the code locally
1. Clone the project
2. cd to chat-app directory, run `npm run start`
3. In your browser, go to localhost:3000
4. Join with a username and room name
5. Open another brwoser, repeat step 3 and 4 with another username
6. Start chatting
7. If you wish to auto restart when you save changes on the code, run `npm run dev` instead
