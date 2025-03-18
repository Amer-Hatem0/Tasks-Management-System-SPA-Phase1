document.addEventListener("DOMContentLoaded", function () {
    const studentsListContainer = document.getElementById("students");
    const chatHeader = document.getElementById("chatHeader");
    const chatBody = document.getElementById("chatBody");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    let currentAdmin = JSON.parse(localStorage.getItem("currentUser"))?.username || "Admin";
    let selectedStudent = null;

    function loadStudents() {
        studentsListContainer.innerHTML = "";

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let students = users.filter(user => user.role === "student");

        students.forEach(student => {
            let studentElement = document.createElement("div");
            studentElement.classList.add("student");
            studentElement.textContent = student.username;
            studentElement.dataset.studentUsername = student.username;

            studentElement.addEventListener("click", function () {
                selectedStudent = student.username;
                chatHeader.textContent = `Chatting with ${student.username}`;
                loadMessages();
            });

            studentsListContainer.appendChild(studentElement);
        });
    }

    function loadMessages() {
        chatBody.innerHTML = "";
        if (!selectedStudent) return;

        let chatKey = `chat_${currentAdmin}_${selectedStudent}`;
        let messages = JSON.parse(localStorage.getItem(chatKey)) || [];

        messages.forEach(msg => {
            let messageContainer = document.createElement("div");
            messageContainer.classList.add("message-container", msg.sender === currentAdmin ? "sent" : "received");

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
        if (!messageText || !selectedStudent) return;

        let chatKeyAdmin = `chat_${currentAdmin}_${selectedStudent}`;
        let chatKeyStudent = `chat_${selectedStudent}_${currentAdmin}`;

        let messagesAdmin = JSON.parse(localStorage.getItem(chatKeyAdmin)) || [];
        let messagesStudent = JSON.parse(localStorage.getItem(chatKeyStudent)) || [];

        let messageObj = { sender: currentAdmin, text: messageText, timestamp: Date.now() };

        messagesAdmin.push(messageObj);
        messagesStudent.push(messageObj);

        localStorage.setItem(chatKeyAdmin, JSON.stringify(messagesAdmin));
        localStorage.setItem(chatKeyStudent, JSON.stringify(messagesStudent));

        // تحديث الرسائل عند الطالب ليظهر له إشعار بوجود رسالة جديدة
        let receivedMessages = JSON.parse(localStorage.getItem(`received_${selectedStudent}`)) || [];
        receivedMessages.push({ from: currentAdmin, text: messageText });
        localStorage.setItem(`received_${selectedStudent}`, JSON.stringify(receivedMessages));

        messageInput.value = "";
        loadMessages();
    });

    loadStudents();
});
