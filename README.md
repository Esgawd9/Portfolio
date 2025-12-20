# Zsombor Pinter - Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

A modern, responsive personal portfolio built to showcase creative work and technical projects.

**[View Live Demo](https://www.zsombor-pinter.site)**

---

## Features

### User Interface & UX
- **Dynamic Dark/Light Mode:** Seamless theme switching for better accessibility.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **Interactive Gallery:** High-quality image rendering for projects and origami work.

### Backend & Admin Capabilities
- **Authentication:** Secure Admin Login using **Firebase Auth**.
- **CRUD Operations:**
  - **Create:** Upload new projects/origami with images directly to Firebase Storage.
  - **Read:** Real-time data fetching from Firestore.
  - **Update:** Edit existing entries directly from the UI.
  - **Delete:** Remove outdated content safely.
- **Image Management:** Integrated file upload handling with automatic storage references.

---

## Contact Integration (EmailJS)

The portfolio features a fully functional "Contact Me" section powered by **EmailJS**. This allows for direct communication without the need for a dedicated backend mail server.

### Key Implementation Details:
* **Direct-to-Inbox:** Messages sent via the contact form are delivered instantly to my email.
* **Asynchronous Handling:** Utilizes `emailjs-com` to handle form submission via promises, ensuring a smooth UI experience without page reloads.
* **Automated Feedback:** Includes success/error handling to notify users when their message has been sent.
* **Security:** API keys and Service IDs are managed via environment variables to keep the configuration secure.
