import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (err) {
            console.log("Appwrite authService :: createAccount :: error", err);
            throw err;
        }
    }

    async login({ email, password }) {
        try {
            const userSession = await this.account.createEmailPasswordSession(
                email,
                password
            );
            return userSession;
        } catch (err) {
            console.log("Appwrite authService :: login :: error", err);
            throw err;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (err) {
            console.log("Appwrite authService :: getCurrentUser :: error", err);
            throw err;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (err) {
            console.log("Appwrite authService :: logout :: error", err);
        }
    }
}

const authService = new AuthService();

export default authService;
