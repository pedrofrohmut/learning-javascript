import Account from "../src/account"
import AccountTransferService from "../src/account-transfer-service"

// Rodrigo branas ideia
test("Should transfer money from an account to another", () => {
    const from = new Account("1")
    from.credit(100)
    expect(from.getBalance()).toBe(100)

    const to = new Account("2")
    to.credit(100)
    expect(to.getBalance()).toBe(100)

    AccountTransferService.transfer(from, to, 50)
    expect(from.getBalance()).toBe(50)
    expect(to.getBalance()).toBe(150)
})
