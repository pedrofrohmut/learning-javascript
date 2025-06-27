interface AuctionRepository {
    save(auction: any): Promise<void>
    get(auctionId: string): Promise<any>
}

export default AuctionRepository
