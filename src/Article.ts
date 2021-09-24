import {AxiosInstance} from "axios";

export interface ArticleInfo {
    category: string | null,
    categoryDisplayName: string | null,
    commentCount: number,
    createdAt: string,
    id: string,
    ip?: string,
    isUser: boolean,
    nickname: string,
    publicId: number | null,
    ratingDown: number,
    ratingUp: number,
    thumbnailUrl: string | null,
    title: string,
    viewCount: number
}

interface ArticleView {
    captcha: boolean,
    category: string | null,
    categoryDisplayName: string | null,
    channelPermission: {
        block: boolean,
        comment: boolean,
        controlArticle: boolean,
        deleteContents: boolean,
        editContents: boolean,
        multimedia: boolean,
        rate: boolean,
        setNotices: boolean,
        write: boolean
    },
    commentCount: number,
    content: string,
    contentType: string,
    createdAt: string,
    gravatar: string,
    id: number,
    isDeletable: boolean,
    isEditable: boolean,
    isReportable: boolean,
    isSensitive: boolean,
    isUser: boolean,
    ip?: string
    lastComment: string,
    nickname: string,
    preventDelete: false,
    publicId: number | null,
    ratingDown: number,
    ratingDownIp: number,
    ratingUp: number,
    ratingUpIp: number,
    role: string,
    title: string,
    token: string,
    updatedAt: string,
    viewCount: number
}

interface ArticleComment {
    attachmentId: number | null,
    content: string,
    contentType: string,
    createdAt: string,
    depth: number,
    gravatar: string,
    id: number,
    isDeletable: boolean,
    isEditable: boolean,
    isReportable: boolean,
    nickname: string,
    ip?: string,
    parentId: number | null,
    publicId: number | null,
    ratingDown: number,
    ratingUp: number,
    updatedAt: string
}

export default class Article {
    private client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    public async getArticle(slug: string, index: number): Promise<ArticleView> {
        const response = await this.client.get(`/app/view/article/${slug}/${index}`);
        return response.data;
    }

    public async getComment(slug: string, index: number, limit: number = 50): Promise<ArticleComment[]> {
        const response = await this.client.get(`/app/list/comment/${slug}/${index}?limit=${limit}`);
        return response.data;
    }
}