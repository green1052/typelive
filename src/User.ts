import {AxiosInstance} from "axios";

interface UserInfo {
    articles: {
        commentCount: number,
        createdAt: string,
        id: number,
        slug: string,
        title: string
    }[],
    comments: {
        articleId: number,
        content: string,
        contentType: "text" | "emoticon",
        createdAt: string,
        id: number
        slug: string
    }[]
}

interface UserInfoError {
    message: string,
    result: boolean
}

export default class User {
    private client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    public async getInfo(nickname: string): Promise<UserInfo | UserInfoError> {
        const response = await this.client.get(`/app/users/recent?nickname=${encodeURIComponent(nickname)}`);
        return response.data;
    }
}
