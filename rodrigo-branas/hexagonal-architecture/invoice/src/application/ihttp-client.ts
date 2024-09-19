interface IHttpClient {
    get(url: string): Promise<any>
    post(url: string, body: any): Promise<any>
}

export default IHttpClient
