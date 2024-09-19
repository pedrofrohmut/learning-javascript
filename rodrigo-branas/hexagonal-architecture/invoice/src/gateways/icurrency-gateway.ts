interface ICurrencyGateway {
    getCurrencies(url: string): Promise<any>
}

export default ICurrencyGateway
