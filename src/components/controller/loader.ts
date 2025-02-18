interface LoaderInterface {
    baseLink?: string;
    options?: {
        apiKey?: string;
    };
    // constructor(baseLink: string | undefined, options: RequestInit):void;
    load(method: string, endpoint: string, callback: () => {}, options?: {}): void;
    getResp({ endpoint, options }: { endpoint: string; options: Request }, callback: () => void): void;
}

class Loader implements LoaderInterface {
    baseLink;
    options;

    constructor(
        baseLink?: string,
        options?: {
            apiKey?: string;
        }
    ) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Request | {} },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Request | {}, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const typedKey = key as keyof Request;
            url += `${key}=${urlOptions[typedKey]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: (data: T) => void, options: Request | {} = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
