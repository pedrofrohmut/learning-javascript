import StartLoanApplicationUseCase, {
    Input as StartLoanApplicationInput
} from "../../src/application/usecases/start-loan-application-usecase"
import GetLoanByCode, { Input as GetLoanByCodeInput } from "../../src/application/usecases/get-loan-by-code-usecase"
import PostgresConnection from "../../src/infra/database/postgres-connection"
import LoansDatabaseRepository from "../../src/infra/repositories/database/loans-database-repository"
import InstallmentsDatabaseRepository from "../../src/infra/repositories/database/installments-database-repository"
import LoansInMemoryRepository from "../../src/infra/repositories/in-memory/loans-inmemory-repository"
import InstallmentsInMemoryRepository from "../../src/infra/repositories/in-memory/installments-inmemory-repository"

test("Should apply for a financing using the price table (with Postgres Database)", async () => {
    const connection = new PostgresConnection()
    const loanRepository = new LoansDatabaseRepository(connection)
    const installmentRepository = new InstallmentsDatabaseRepository(connection)

    // Given
    const code = crypto.randomUUID()
    const startLoanApplication = new StartLoanApplicationUseCase(loanRepository, installmentRepository)
    const startLoanInput: StartLoanApplicationInput = {
        code,
        purchasePrice: 250000,
        downPayment: 50000,
        salary: 70000,
        period: 12,
        type: "price"
    }

    const getLoanByCode = new GetLoanByCode(loanRepository, installmentRepository)
    const getLoanInput: GetLoanByCodeInput = { code }

    // When
    await startLoanApplication.execute(startLoanInput)
    const output = await getLoanByCode.execute(getLoanInput)

    // Then
    expect(output).not.toBeNull()
    expect(output?.installments).toHaveLength(12)

    const firstInstallment = output?.installments.find((x) => x.getNumber() === 1)
    expect(firstInstallment).toBeDefined()
    expect(firstInstallment?.getBalance()).toBe(184230.24)

    const lastInstallment = output?.installments.find((x) => x.getNumber() === 12)
    expect(lastInstallment).toBeDefined()
    expect(lastInstallment?.getBalance()).toBe(0)

    await connection.close()
})

test("Should apply for a financing using the price table (in Memory)", async () => {
    const loanRepository = new LoansInMemoryRepository()
    const installmentRepository = new InstallmentsInMemoryRepository()

    // Given
    const code = crypto.randomUUID()
    const startLoanApplication = new StartLoanApplicationUseCase(loanRepository, installmentRepository)
    const startLoanInput: StartLoanApplicationInput = {
        code,
        purchasePrice: 250000,
        downPayment: 50000,
        salary: 70000,
        period: 12,
        type: "price"
    }

    const getLoanByCode = new GetLoanByCode(loanRepository, installmentRepository)
    const getLoanInput: GetLoanByCodeInput = { code }

    // When
    await startLoanApplication.execute(startLoanInput)
    const output = await getLoanByCode.execute(getLoanInput)

    // Then
    expect(output).not.toBeNull()
    expect(output?.installments).toHaveLength(12)

    const firstInstallment = output?.installments.find((x) => x.getNumber() === 1)
    expect(firstInstallment).toBeDefined()
    expect(firstInstallment?.getBalance()).toBe(184230.24)

    const lastInstallment = output?.installments.find((x) => x.getNumber() === 12)
    expect(lastInstallment).toBeDefined()
    expect(lastInstallment?.getBalance()).toBe(0)
})
