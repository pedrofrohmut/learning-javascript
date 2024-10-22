import StartLoanApplicationUseCase, {
    Input as StartLoanApplicationInput
} from "../../src/application/usecases/start-loan-application-usecase"
import GetLoanByCode, { Input as GetLoanByCodeInput } from "../../src/application/usecases/get-loan-by-code-usecase"
import PostgresConnection from "../../src/infra/database/postgres-connection"
import LoanDatabaseRepository from "../../src/infra/repositories/loan-database-repository"
import InstallmentDatabaseRepository from "../../src/infra/repositories/installments-database-repository"

test("Should apply for a financing using the price table", async () => {
    const connection = new PostgresConnection()
    const loanRepository = new LoanDatabaseRepository(connection)
    const installmentRepository = new InstallmentDatabaseRepository(connection)
    
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
    expect(output.installments).toHaveLength(12)

    const firstInstallment = output.installments.find((x) => x.installmentNumber === 1)
    expect(firstInstallment).toBeDefined()
    expect(firstInstallment?.balance).toBe(184230.24)

    const lastInstallment = output.installments.find((x) => x.installmentNumber === 12)
    expect(lastInstallment).toBeDefined()
    expect(lastInstallment?.balance).toBe(0)

    await connection.close()
})
