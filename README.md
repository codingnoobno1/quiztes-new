# Quiztes

## Overview
Quiztes is a web application designed to create, manage, and take quizzes. It provides an interactive platform for users to test their knowledge on various topics.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
<!-- - Create and manage quizzes
- User authentication and profiles
- Interactive quiz-taking experience
- Dashboard for users to track their progress -->

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (React/Vue/Angular)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Others**: Docker, TypeScript

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/quiztes.git
   ```

2. Navigate to the project directory:
   ```bash
   cd quiztes
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up the environment variables (create a `.env` file based on `.env.example`).

5. Start the application:
   ```bash
   npm start
   ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the application.
- Follow the on-screen instructions to create an account or log in.

## File Structure

```
C:.
│   .gitignore
│   dockerfile
│   next.config.ts
│   package-lock.json
│   package.json
│   postcss.config.mjs
│   README.md
│   tailwind.config.ts
│   tsconfig.json
│   yarn.lock
│   
├───public
│       file.svg
│       globe.svg
│       next.svg
│       vercel.svg
│       window.svg
│
└───src
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.tsx
    │   │   login.css
    │   │   Login.tsx
    │   │   page.tsx
    │   │   Register.tsx
    │   │
    │   ├───api
    │   │   │   api.rar
    │   │   │
    │   │   ├───auth
    │   │   │   ├───data_read
    │   │   │   │       route.ts
    │   │   │   │
    │   │   │   └───[...nextauth]
    │   │   │           dashboard_data.ts
    │   │   │           route.ts
    │   │   │           route2.ts
    │   │   │
    │   │   └───register
    │   │           route.ts
    │   │
    │   ├───dashboard
    │   │   └───[username]
    │   │           main_quiz.tsx
    │   │           page.tsx
    │   │           quizstarted.tsx
    │   │
    │   └───quiz
    │       │   background.css
    │       │   Background.tsx
    │       │   page.tsx
    │       │   quiz.css
    │       │   Quiz.tsx
    │       │   style.scss
    │       │
    │       └───kbc-logo-cssonly
    │           │   LICENSE.txt
    │           │   README.md
    │           │
    │           ├───dist
    │           │       index.html
    │           │       style.css
    │           │
    │           └───src
    │                   index.pug
    │                   style.scss
    │
    ├───data
    │   │   users.tsx
    │   │
    │   └───users
    │       ├───1hero
    │       │       1hero_registry.tsx
    │       │
    │       ├───2hero
    │       │       2hero_registry.tsx
    │       │
    │       └───anant110120006
    │               anant110120006_registry.tsx
    │
    └───lib
            mongodb.ts
```



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

