import ICurrencyGateway from "../application/icurrency-gateway"
import IHttpClient from "../application/ihttp-client"

class CurrencyGateway implements ICurrencyGateway {
    private readonly httpClient: IHttpClient

    constructor(httpClient: IHttpClient) {
        this.httpClient = httpClient
    }

    async getCurrencies(url: string): Promise<any> {
        const response = await this.httpClient.get(url)
        return response.data
    }
}

export default CurrencyGateway
