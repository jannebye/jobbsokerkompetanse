import * as sinon from 'sinon';

export function stubFetch(fetchStub: FetchStub) {
    sinon.stub((global as any), 'fetch').callsFake((url: string) => getPromiseResponse(url, fetchStub));
}

function getPromiseResponse(url: string, fetchStub: FetchStub): Promise<Response> {
    const response = fetchStub.getResponse(url);
    return new Promise(((resolve, reject) => {
        if (response.status >= 200 && response.status < 300) {
            resolve(response);
        }
        reject(response);
    }));
}

export class FetchStub {
    urlMap: { [url: string]: {response: Response, status: number}};
    callCount: { [url: string]: number };
    constructor() {
        this.urlMap = {};
        this.callCount = {};
    }
    addResponse(url: string, response: Response) {
        this.urlMap[url] = {response, status: 200};
        this.callCount[url] = 0;
        return this;
    }

    getResponse(url: string): Response {
        const keys = Object.keys(this.urlMap);
        const length = keys.length;
        const responseKey = length === 1 ? keys[0] : keys.find(s => url.includes(s));
        if (responseKey) {
            this.callCount[responseKey] += 1;
        }
        if (responseKey) {
            return this.urlMap[responseKey].response;
        }
        return new Response({});
    }
}