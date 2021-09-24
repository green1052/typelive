import {AxiosInstance} from "axios";
import {ArticleInfo} from "./Article";

interface ChannelInfo {
    captcha: boolean,
    channel: {
        adTags: number,
        categories: string[] | [],
        categoryData: { id: string, displayName: string, preventDelete?: boolean }[] | [],
        description: string
        isMeta: boolean,
        name: string,
        slug: string,
        subscribes: number
    },
    permission: {
        audit: boolean,
        block: boolean,
        comment: boolean,
        deleteContents: boolean,
        editContents: boolean,
        multimedia: boolean,
        rate: boolean,
        setNotices: boolean,
        write: boolean
    },
    placeholder: { article?: string, comment?: string },
    subscribed: boolean,
    wiki: boolean
}

interface ArticleListInfo {
    articles: ArticleInfo[];
    key: string;
}

interface NoticeList {
    articles: {
        createdAt: string,
        id: number,
        isUser: boolean,
        nickname: string,
        ip?: string,
        publicId: number | null,
        title: string,
        type: "global" | "channel",
        viewCount: number
    }[];
}

type MainChannelList = { name: string, slug: string }[];

export default class Channel {
    private client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    public async getInfo(slug: string): Promise<ChannelInfo> {
        const response = await this.client.get(`/app/info/channel/${slug}`);
        return response.data;
    }

    // since 페이지 몰?루, limit 뭔지 몰?루
    public async getArticleList(slug: string, since: number | undefined = undefined, limit: number = 50): Promise<ArticleListInfo> {
        let url = `/app/list/channel/${slug}?limit=${limit}`;

        if (since !== undefined)
            url += `&since=${since}`;

        const response = await this.client.get(url);
        return response.data;
    }

    // since 페이지 몰?루, limit 뭔지 몰?루
    public async getBestArticleList(slug: string, since: number | undefined = undefined, limit: number = 50): Promise<ArticleListInfo> {
        let url = `/app/list/channel/${slug}?mode=best&limit=${limit}`;

        if (since !== undefined)
            url += `&since=${since}`;

        const response = await this.client.get(url);
        return response.data;
    }

    // TODO: global 제거 만들기
    public async getNotice(slug: string): Promise<NoticeList> {
        const response = await this.client.get(`/app/list/channel/${slug}/notice`);
        return response.data;
    }

    public async getMainChannel(): Promise<MainChannelList> {
        const response = await this.client.get("/app/list/channels/main");
        return response.data;
    }
}