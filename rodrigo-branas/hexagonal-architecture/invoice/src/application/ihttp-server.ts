interface IHttpServer {
    addRoute(method: string, url: string, callback: Function): void
    listen(port: number): void
}

export default IHttpServer
