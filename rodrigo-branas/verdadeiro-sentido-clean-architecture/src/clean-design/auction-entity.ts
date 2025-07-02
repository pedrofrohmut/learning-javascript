import Bid from "./bid-entity"

class Auction {
    private readonly auctionId: string
    private readonly startDate: Date
    private readonly endDate: Date
    private readonly minIncrement: number
    private readonly startAmount: number
    private highestBid: Bid | null = null

    constructor(
        auctionId: string,
        startDate: Date,
        endDate: Date,
        minIncrement: number,
        startAmount: number
    ) {
        this.auctionId = auctionId
        this.startDate = startDate
        this.endDate = endDate
        this.minIncrement = minIncrement
        this.startAmount = startAmount
    }

    public getAuctionId = () => this.auctionId
    public getStartDate = () => this.startDate
    public getEndDate = () => this.endDate
    public getMinIncrement = () => this.minIncrement
    public getStartAmount = () => this.startAmount
    public getHighestBid = () => JSON.parse(JSON.stringify(this.highestBid))

    public setHighestBid(highestBid: Bid | null) {
        this.highestBid = highestBid
    }
}

export default Auction
