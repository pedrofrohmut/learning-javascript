import InstallmentsRepository from "../../../application/repositories/installments-repository"
import Installment from "../../../domain/entities/Installment"

class InstallmentsInMemoryRepository implements InstallmentsRepository {
    private readonly installments: Installment[]

    constructor() {
        this.installments = []
    }

    async save(installment: Installment): Promise<void> {
        this.installments.push(installment)
    }

    async findByLoanCode(code: string): Promise<Installment[]> {
        return this.installments.filter((x) => x.getLoanCode() === code)
    }
}

export default InstallmentsInMemoryRepository
