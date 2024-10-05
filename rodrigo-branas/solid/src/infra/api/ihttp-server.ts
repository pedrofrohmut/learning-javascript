interface IHttpServer {
    on(method: string, url: string, callback: Function): void
    listen(port: number): void
}

export default IHttpServer
