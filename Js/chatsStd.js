document.addEventListener("DOMContentLoaded", function () {
    const usersListContainer = document.getElementById("students");
    const chatHeader = document.getElementById("chatHeader");
    const chatBody = document.getElementById("chatBody");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    let currentStudent = JSON.parse(localStorage.getItem("currentUser"))?.username || "student";
    let selectedUser = null;

    function loadUsers() {
        usersListContainer.innerHTML = "";

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let admins = users.filter(user => user.role === "admin");

        admins.forEach(admin => {
            let adminElement = document.createElement("div");
            adminElement.classList.add("student");
            adminElement.textContent = admin.username;
            adminElement.dataset.userUsername = admin.username;

            // التحقق مما إذا كان هناك رسالة غير مقروءة
            let receivedMessages = JSON.parse(localStorage.getItem(`received_${currentStudent}`)) || [];
            if (receivedMessages.length > 0) {
                adminElement.textContent += ` (New Message!)`;
                adminElement.classList.add("new-message");
            }

            adminElement.addEventListener("click", function () {
                selectedUser = admin.username;
                chatHeader.textContent = `Chatting with ${admin.username}`;
                loadMessages();

                // إزالة التنبيه بعد قراءة الرسائل
                localStorage.setItem(`received_${currentStudent}`, JSON.stringify([]));
                adminElement.classList.remove("new-message");
            });

            usersListContainer.appendChild(adminElement);
        });
    }

    function loadMessages() {
        chatBody.innerHTML = "";
        if (!selectedUser) return;

        let chatKey = `chat_${currentStudent}_${selectedUser}`;
        let messages = JSON.parse(localStorage.getItem(chatKey)) || [];

        messages.forEach(msg => {
            let messageContainer = document.createElement("div");
            messageContainer.classList.add("message-container", msg.sender === currentStudent ? "sent" : "received");

            let senderName = document.createElement("div");
            senderName.classList.add("message-sender");
            senderName.textContent = msg.sender; // عرض اسم المرسل

            let messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.textContent = msg.text;

            messageContainer.appendChild(senderName);
            messageContainer.appendChild(messageElement);
            chatBody.appendChild(messageContainer);
        });

        chatBody.scrollTop = chatBody.scrollHeight;
    }

    sendBtn.addEventListener("click", function () {
        let messageText = messageInput.value.trim();
        if (!messageText || !selectedUser) return;

        let chatKeyStudent = `chat_${currentStudent}_${selectedUser}`;
        let chatKeyAdmin = `chat_${selectedUser}_${currentStudent}`;

        let messagesStudent = JSON.parse(localStorage.getItem(chatKeyStudent)) || [];
        let messagesAdmin = JSON.parse(localStorage.getItem(chatKeyAdmin)) || [];

        let messageObj = { sender: currentStudent, text: messageText, timestamp: Date.now() };
        messagesStudent.push(messageObj);
        messagesAdmin.push(messageObj);

        localStorage.setItem(chatKeyStudent, JSON.stringify(messagesStudent));
        localStorage.setItem(chatKeyAdmin, JSON.stringify(messagesAdmin));

        messageInput.value = "";
        loadMessages();
    });

    loadUsers();
});
