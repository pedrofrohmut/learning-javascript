import SimulateLoan, { Input as SimulateLoanInput } from "../../src/application/usecases/simulate-loan-usecase"

test.skip("Should simulate a financing using the price table", async () => {
    // Given
    const simulateLoan = new SimulateLoan()
    const input: SimulateLoanInput = {
        code: crypto.randomUUID(),
        purchasePrice: 250000,
        downPayment: 50000,
        salary: 70000,
        period: 12,
        type: "price"
    }

    // When
    const output = await simulateLoan.execute(input)

    // Then
    expect(output.installments).toHaveLength(12)
    const [firstInstallment] = output.installments
    expect(firstInstallment.balance).toBe(184230.24)
    const lastInstallment = output.installments[output.installments.length - 1]
    expect(lastInstallment.balance).toBe(0)
})
