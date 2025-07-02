import Bid from "./bid-entity"

class Auction {
    private readonly auctionId: string
    private readonly startDate: Date
    private readonly endDate: Date
    private readonly minIncrement: number
    private readonly startAmount: number
    private highestBid: Bid | null = null

    constructor(auctionId: string, startDate: Date, endDate: Date, minIncrement: number, startAmount: number) {
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

    public validateNewBid(newBid: Bid) {
        // Validate bid customer
        if (this.highestBid && newBid.getCustomer() === this.highestBid.getCustomer()) {
            throw new Error("Invalid customer. The highest bid customer cannot place new bids.")
        }

        // Validate bid amount
        let validBidAmount = 0
        if (this.highestBid) {
            validBidAmount = this.highestBid.getAmount() + this.minIncrement
        } else {
            validBidAmount = this.startAmount
        }
        if (newBid.getAmount() < validBidAmount) {
            throw new Error("The bid amount is too low. Bid must be at least 1010.")
        }

        // Validate bid date
        const bidDate = new Date(newBid.getDate()).getTime()
        const startDate = new Date(this.startDate).getTime()
        const endDate = new Date(this.endDate).getTime()
        if (bidDate < startDate) {
            throw new Error("Too early. Auction is not opened yet.")
        }
        if (bidDate >= endDate) {
            throw new Error("Too late. Auction is already closed.")
        }
    }
}

export default Auction
