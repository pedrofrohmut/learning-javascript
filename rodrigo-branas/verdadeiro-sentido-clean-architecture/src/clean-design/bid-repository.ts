interface BidRepository {
    save(bid: any): Promise<void>
    getHighestByAuctionId(auctionId: string): Promise<any>
}

export default BidRepository
