## Kanban Task Manager

This is a task manager web app that allows users to organize their tasks efficiently. It offers a kanban board with drag and drop support. Visit the [Live Demo](https://kanban-task-manager-delta.vercel.app/) to explore the app in action.

![app preview](https://res.cloudinary.com/dwked6q0h/image/upload/v1723577124/kanban-app/app-preview_al5dln.png)

### Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Technical Problem: Reordering of Tasks](#technical-problem-reordering-of-tasks)
4. [Installation](#installation)
    - [Step 1: Clone the Repository and Set Up Environment](#step-1-clone-the-repository-and-set-up-environment)
    - [Step 2: Create a New Project in Appwrite](#step-2-create-a-new-project-in-appwrite)
    - [Step 3: Add a Web Platform in Appwrite](#step-3-add-a-web-platform-in-appwrite)
    - [Step 4: Create an API Key in Appwrite](#step-4-create-an-api-key-in-appwrite)
    - [Step 5: Configure Appwrite Services](#step-5-configure-appwrite-services)
    - [Step 6: Final Steps](#step-6-final-steps)

### Features

-   Kanban board with drag-and-drop functionality
-   Task prioritization (High, Medium, Low)
-   Multiple views: To-Do, Doing, Review, Completed
-   User authentication and profile management
-   Responsive design

### Technologies

-   **Frontend:** HTML, CSS, ReactJS, React Beautiful DnD
-   **Backend:** Appwrite (Backend as a Service)

### Technical Problem: Reordering of Tasks

When a user drags and drops a task, the new order must be updated in the database immediately. However, reordering one task can affect the order of many other tasks, leading to multiple database updates.

**Solution Implemented: Incremental Ordering**

To address this, the Incremental Ordering approach was implemented. Initially, order values are assigned in large increments (e.g., multiples of 100). This allows for the insertion of tasks between existing ones without needing to reorder the entire list.

However, when the difference between two tasks' order values becomes 1 (i.e., there’s no room for additional tasks between them), the order of all tasks needs to be adjusted. Although this is a drawback, it occurs infrequently, and the amortized time remains constant. Given that the task manager is designed to handle hundreds of tasks, this approach is practical and efficient for the intended use case.

**Other Considered Approaches**

1. **Fractional indexing**: This method uses floating-point numbers for order values, allowing flexible reordering without running out of positions. However, floating-point numbers have precision and size limits, which can lead to issues in extremely large datasets, requiring adjustment of the order for all items.

2. **LexoRank (Alphanumeric Ordering)**: This method uses alphanumeric strings to order items, as seen in platforms like Jira. While it offers excellent scalability, implementing and maintaining LexoRank, particularly with its use of buckets and normalization, can be quite complex.

<details>
<summary><h3>Installation</h3></summary>
    
To get the project up and running locally, follow these steps:

#### Step 1: Clone the Repository and Set Up Environment

1. **Clone the Repo:**

    ```bash
    git clone https://github.com/faisalmh4045/kanban-task-manager.git
    cd kanban-task-manager
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**
    - Create a `.env` file in the root directory.
    - Copy all contents from `.env.sample` to `.env`.
    - Set the local development URL: `VITE_APP_BASE_URL="http://localhost:5173"`

#### Step 2: Create a New Project in Appwrite

-   In the Appwrite console, click on "Create project".
-   Provide a name for your project and click "Create".
-   Copy the project ID and update `VITE_APPWRITE_PROJECT_ID="your-project-id"` in `.env`:

#### Step 3: Add a Web Platform in Appwrite

-   In your project overview, go to the "Platforms" section.
-   Click "Add Platform" and select "Web".
-   Enter a name and hostname (e.g., `localhost` for local development).
-   Click "Next" and skip the optional steps.

#### Step 4: Create an API Key in Appwrite

-   In your project overview, go to the "Integrations" section.
-   Select "API Keys" and click "Create API Key".
-   Name it `APPWRITE_API_KEY` and set the expiration date to "Never".
-   Set the following scopes and click "Create":
    -   Auth: `users.read`, `users.write`
    -   Database: `documents.read`, `documents.write`
    -   Storage: `files.read`, `files.write`

#### Step 5: Configure Appwrite Services

1.  **Authentication:**

    -   Navigate to the "Auth / Settings" tab.
    -   Enable `Email/Password` from the authentication methods.

2.  **Database:**

    -   Go to "Databases" and click "Create database".
    -   Provide a name for the database and click "Create".
    -   Copy the database ID and update `VITE_APPWRITE_DATABASE_ID="your-database-id"` in `.env`:

3.  **Collection:**

    -   In the newly created database click on "Create collection"
    -   Provide a name for the collection and click "Create".
    -   Copy the collection ID and update `VITE_APPWRITE_COLLECTION_ID="your-collection-id"` in `.env`:

    -   Add the following attributes:
        | Key | Size | Type | Required |
        |-----------|------|--------|----------|
        | title | 255 | String | true |
        | description | 500 | String | true |
        | status | 20 | String | true |
        | priority | 20 | String | true |
        | userId | 50 | String | true |
        | date | - | Date | true |
        | order | - | Integer| true |

    -   Create an index:

        | Index Key | Index Type | Attribute | Order |
        | --------- | ---------- | --------- | ----- |
        | index_1   | key        | order     | ASC   |

    -   In the collection settings, add a role for "All users" in the permissions section.

4.  **Storage:**

    -   Go to "Storage" and click "Create Bucket".
    -   Provide a name for the bucket and click "Create".
    -   Copy the bucket ID and update `VITE_APPWRITE_BUCKET_ID="your-bucket-id"`in `.env`:
    -   In the bucket settings, add a role for "All users" in the permissions section, then click "Update".

5.  **Function (Manual Deployment):**

    -   Clone the server function repository.
        ```bash
        git clone https://github.com/faisalmh4045/kanban-server-function.git
        ```
    -   Compress the folder into a zip (`.tar.gz`) file.
    -   In the Appwrite console, click "Create Function" -> "Create Function Manually".
    -   Provide a function name, choose Node.js 18.0 runtime, and click "Next".
    -   Upload the compressed file and set the entry point to `src/main.js`.
    -   Set execute access permission to "any" and click "Create".
    -   Copy the function ID and update `VITE_APPWRITE_FUNCTION_ID="your-function-id"` in `.env`:

    -   Go to "Settings" and set the environment variables mentioned in `kanban-server-function/.env.sample`.

#### Step 6: Final Steps

-   Ensure all environment variables in the `.env` file are set correctly.
-   Start the development server:
    ```bash
    npm run dev
    ```

</details>
