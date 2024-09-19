import axios from "axios"
import IHttpClient from "./ihttp-client"

class HttpClient implements IHttpClient {
    get(url: string): Promise<any> {
        return axios.get(url)
    }

    post(url: string, body: any): Promise<any> {
        return axios.post(url, body)
    }
}

export default HttpClient
