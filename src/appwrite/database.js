import conf from "../conf/conf";
import { Client, Databases, ID, Query } from "appwrite";

class DatabaseService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createTodo({
        title,
        description,
        date,
        status,
        priority,
        order,
        userId,
    }) {
        try {
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    description,
                    date,
                    status,
                    priority,
                    order,
                    userId,
                }
            );
            return result;
        } catch (err) {
            console.log("Appwrite DbService :: createTodo :: error", err);
            return false;
        }
    }

    async updateTodo(
        id,
        { title, description, date, status, priority, order }
    ) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    description,
                    date,
                    status,
                    priority,
                    order,
                }
            );
            return result;
        } catch (err) {
            console.log("Appwrite DbService :: updateTodo :: error", err);
            return false;
        }
    }

    async deleteTodo(todoId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                todoId
            );
            return true;
        } catch (err) {
            console.log("Appwrite DbService :: deleteTodo :: error", err);
            return false;
        }
    }

    async getTodos(userId) {
        try {
            const result = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId", userId), Query.orderAsc("order")]
            );
            return result;
        } catch (err) {
            console.log("Appwrite DbService :: getTodos :: error", err);
            throw err;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
