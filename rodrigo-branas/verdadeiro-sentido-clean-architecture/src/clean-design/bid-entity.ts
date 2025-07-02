class Bid {
    private readonly bidId: string
    private readonly auctionId: string
    private readonly customer: string
    private readonly amount: number
    private readonly date: Date

    constructor(bidId: string, auctionId: string, customer: string, amount: number, date: Date) {
        this.bidId = bidId
        this.auctionId = auctionId
        this.customer = customer
        this.amount = amount
        this.date = date
    }

    public getBidId = () => this.bidId
    public getAuctionId = () => this.auctionId
    public getCustomer = () => this.customer
    public getAmount = () => this.amount
    public getDate = () => this.date
}

export default Bid
