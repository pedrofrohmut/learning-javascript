import StartLoanApplicationUseCase, {
    Input as StartLoanApplicationInput
} from "../src/application/usecases/start-loan-application-usecase"
import GetLoanByCode, { Input as GetLoanByCodeInput } from "../src/application/usecases/get-loan-by-code-usecase"

test("Should apply for a financing using the price table", async () => {
    // Given
    const code = crypto.randomUUID()
    const startLoanApplication = new StartLoanApplicationUseCase()
    const startLoanInput: StartLoanApplicationInput = {
        code,
        purchasePrice: 250000,
        downPayment: 50000,
        salary: 70000,
        period: 12,
        type: "price"
    }

    const getLoanByCode = new GetLoanByCode()
    const getLoanInput: GetLoanByCodeInput = { code }

    // When
    await startLoanApplication.execute(startLoanInput)
    const output = await getLoanByCode.execute(getLoanInput)

    // Then
    expect(output.installments).toHaveLength(12)
    const [firstInstallment] = output.installments
    expect(firstInstallment.balance).toBe(184230.24)
    const lastInstallment = output.installments[output.installments.length - 1]
    expect(lastInstallment.balance).toBe(0)
})
