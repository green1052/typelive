import axios, {AxiosInstance} from "axios";
import Channel from "./Channel";
import Article from "./Article";
import User from "./User";

export default class Typeinlive {
    private readonly client: AxiosInstance;

    private readonly _channel: Channel;

    public get Channel() {
        return this._channel;
    }

    private readonly _article: Article;

    public get Article() {
        return this._article;
    }

    private readonly _user: User;

    public get User() {
        return this._user;
    }

    constructor(client?: AxiosInstance) {
        this.client = client ?? axios.create({
            baseURL: "https://arca.live/api",
            headers: {
                "user-agent": "live.arca.android/0.8.272",
                "accept-encoding": "gzip"
            }
        });

        this._article = new Article(this.client);
        this._channel = new Channel(this.client);
        this._user = new User(this.client);
    }
}