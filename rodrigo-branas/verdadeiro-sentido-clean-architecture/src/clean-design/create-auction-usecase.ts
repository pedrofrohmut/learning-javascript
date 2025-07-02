import Auction from "./auction-entity"
import AuctionRepository from "./auction-repository"

export type CreateAuctionInput = {
    auctionId: string
    startDate: Date
    endDate: Date
    minIncrement: number
    startAmount: number
}

export type CreateAuctionOutput = {
    auctionId: string
}

class CreateAuctionUseCase {
    private readonly auctionRepository: AuctionRepository

    constructor(auctionRepository: AuctionRepository) {
        this.auctionRepository = auctionRepository
    }

    async execute(input: CreateAuctionInput): Promise<CreateAuctionOutput> {
        const auction = new Auction(crypto.randomUUID(), input.startDate, input.endDate, input.minIncrement, input.startAmount)
        try {
            await this.auctionRepository.save(auction)
        } catch (err: any) {
            console.error("Create Auction Error: " + err.message)
            throw new Error("Error trying to create a new auction")
        }
        return { auctionId: auction.getAuctionId() }
    }
}

export default CreateAuctionUseCase
