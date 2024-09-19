import axios from "axios"

import ICurrencyGateway from "./icurrency-gateway"

class CurrencyGateway implements ICurrencyGateway {
    async getCurrencies(): Promise<any> {
        const response = await axios.get("http://localhost:5001/currencies")
        return response.data
    }
}

export default CurrencyGateway
