import conf from "../conf/conf";
import { Client, Functions, ExecutionMethod } from "appwrite";

class ServerFunctions {
    client = new Client();
    functions;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.functions = new Functions(this.client);
    }

    async getOrderedTodos(userId) {
        const path = `/?userId=${userId}`;
        try {
            const result = await this.functions.createExecution(
                conf.appwriteFunctionId,
                "",
                false,
                path,
                ExecutionMethod.GET,
                {}
            );

            const responseBody = JSON.parse(result.responseBody);

            if (responseBody.success) {
                return responseBody.updatedTodos;
            } else {
                console.error(
                    "Failed to update order fields:",
                    responseBody.message
                );
                return [];
            }
        } catch (error) {
            console.error("Error calling function:", error);
        }
    }
}

const serverFunctions = new ServerFunctions();

export default serverFunctions;
