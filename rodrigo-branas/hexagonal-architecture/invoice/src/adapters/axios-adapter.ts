import axios from "axios"
import IHttpClient from "../application/ihttp-client"

class AxiosAdapter implements IHttpClient {
    get(url: string): Promise<any> {
        return axios.get(url)
    }

    post(url: string, body: any): Promise<any> {
        return axios.post(url, body)
    }
}

export default AxiosAdapter
