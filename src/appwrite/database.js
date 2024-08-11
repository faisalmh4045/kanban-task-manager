import conf from "../conf/conf";
import { Client, Databases, ID, Query, Storage } from "appwrite";

class DatabaseService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
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
            const document = await this.databases.createDocument(
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
            return document;
        } catch (err) {
            console.log("Appwrite DbService :: createTodo :: error", err);
            throw err;
        }
    }

    async updateTodo(
        id,
        { title, description, date, status, priority, order }
    ) {
        try {
            const document = await this.databases.updateDocument(
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
            return document;
        } catch (err) {
            console.log("Appwrite DbService :: updateTodo :: error", err);
            throw err;
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
            throw err;
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

    async uploadFile(file) {
        try {
            const result = this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return result;
        } catch (err) {
            console.log("Appwrite DbService :: uploadFile :: error", err);
            throw err;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (err) {
            console.log("Appwrite DbService :: deleteFile :: error", err);
            throw err;
        }
    }

    getAvatarPreview(fileId) {
        try {
            const file = this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
            return file;
        } catch (err) {
            console.log("Appwrite DbService :: getAvatarPreview :: error", err);
            return null;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;
