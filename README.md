# Task Buddy: A React-based Task Management Application

Task Buddy is a modern, responsive task management application built with React and Tailwind CSS.
It provides an intuitive interface for users to create, organize, and track their tasks across different stages of completion.

The application features a clean, gradient-based design with a card system for task organization.
Users can easily add new tasks, move them between "To Do", "Ongoing", and "Completed" states, and delete tasks when necessary.
Task Buddy utilizes session storage to persist tasks locally, ensuring that user data is maintained between browser sessions.

## Repository Structure

```
.
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── App.js
│   ├── index.css
│   ├── index.js
│   └── pages
│       ├── Home.jsx
│       └── TaskCard.jsx
└── tailwind.config.js
```

Key Files:
- `src/index.js`: The entry point of the application.
- `src/pages/Home.jsx`: The main component containing the task management logic.
- `src/pages/TaskCard.jsx`: A reusable component for rendering task cards.
- `package.json`: Defines project dependencies and scripts.
- `tailwind.config.js`: Configuration for Tailwind CSS.

## Usage Instructions

### Installation

Prerequisites:
- Node.js (version 14 or later)
- npm (usually comes with Node.js)

To install the application, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/AbhishekBalija/Kodnest-ReactPro-TaskBuddy.git
   cd Kodnest-ReactPro-TaskBuddy
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

To start the development server:

```
npm start
```

This will run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

To create a production build:

```
npm run build
```

This command builds the app for production to the `build` folder.

### Deployment

To deploy the application to GitHub Pages:

```
npm run deploy
```

This command will build the application and deploy it to the GitHub Pages site specified in the `homepage` field of `package.json`.

### Usage

1. Adding a Task:
   - Type your task in the input field at the top of the page.
   - Click the "Add Task" button or press Enter to add the task to the "To Do" list.

2. Managing Tasks:
   - Tasks are organized into three columns: "To Do", "Ongoing", and "Completed".
   - Hover over a task to reveal management options.
   - Use the arrow buttons to move tasks between columns.
   - Click the trash icon to delete a task.

3. Data Persistence:
   - Tasks are automatically saved to the browser's session storage.
   - Your tasks will persist even if you refresh the page or close and reopen the browser tab.

### Troubleshooting

Common issues and solutions:

1. Tasks not saving:
   - Ensure that your browser supports and allows session storage.
   - Try clearing your browser cache and reloading the page.

2. Styling issues:
   - Make sure Tailwind CSS is properly installed and configured.
   - Check the console for any CSS-related errors.

3. Component rendering problems:
   - Verify that all required dependencies are installed.
   - Check the console for any React-related errors or warnings.

For debugging:
- Use browser developer tools to inspect the application state and network requests.
- Check the console for any error messages or warnings.

## Data Flow

The Task Buddy application manages data flow through the following process:

1. User Input: The user enters a task in the input field on the Home component.
2. Task Creation: When the user submits the task, it's added to the tasks state array in the Home component.
3. State Management: The tasks state is managed using React's useState hook in the Home component.
4. Task Distribution: Tasks are filtered based on their status (todo, ongoing, completed) and passed to respective TaskCard components.
5. Task Updates: When a user changes a task's status or deletes a task, the action is handled by functions in the Home component, updating the tasks state.
6. Persistence: Any change in the tasks state triggers a useEffect hook that saves the updated tasks to session storage.
7. Data Retrieval: On initial load, another useEffect hook retrieves saved tasks from session storage and sets them to the tasks state.

```
[User Input] -> [Home Component State] -> [TaskCard Components]
       ^                  |
       |                  v
[Session Storage] <-> [State Update Functions]
```

This flow ensures that task data is consistently managed, displayed, and persisted throughout the application lifecycle.