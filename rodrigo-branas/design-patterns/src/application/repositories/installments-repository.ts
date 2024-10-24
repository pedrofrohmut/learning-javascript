import Installment from "../../domain/entities/Installment"

interface InstallmentsRepository {
    save(installment: Installment): Promise<void>

    findByLoanCode(code: string): Promise<Installment[]>
}

export default InstallmentsRepository
