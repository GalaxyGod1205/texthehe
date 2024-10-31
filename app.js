// Replace this section with your Firebase configuration details
const firebaseConfig = {
    apiKey: "AIzaSyDPUEcs3imWmZDzwJkSsuJ1pFvOxp5jxhg",
    authDomain: "textmyex-aee17.firebaseapp.com",
    databaseURL: "https://textmyex-aee17-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "textmyex-aee17",
    storageBucket: "textmyex-aee17.appspot.com",
    messagingSenderId: "945102003994",
    appId: "1:945102003994:web:2365927ad10c2563f096a3"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  let username;
  
  // Function to set the username
  function setUsername() {
    const nameInput = document.getElementById('username');
    if (nameInput.value.trim() !== "") {
      username = nameInput.value.trim();
      document.getElementById('message-form').style.display = 'flex';
      nameInput.style.display = 'none';
      document.querySelector('button[onclick="setUsername()"]').style.display = 'none';
    } else {
      alert("Please enter a username");
    }
  }
  
  const chatBox = document.getElementById('chat-box');
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message');
  
  // Load messages and display username with each message
  db.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
  
    if (message.username === username) {
      messageDiv.classList.add('my-message');
      messageDiv.textContent = `You: ${message.text}`;
    } else {
      messageDiv.classList.add('other-message');
      messageDiv.textContent = `${message.username}: ${message.text}`;
    }
  
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
  
  // Send a new message with username
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    db.ref('messages').push({ username: username, text: message });
    messageInput.value = '';
  });
  