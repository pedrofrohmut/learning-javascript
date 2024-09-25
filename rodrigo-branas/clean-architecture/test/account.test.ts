import Account from "../src/account"

test("Should create an account", () => {
    const account = new Account("1234")
    expect(account.getBalance()).toBe(0)
})

test("Should credit an account", () => {
    const account = new Account("1234")
    account.credit(100)
    expect(account.getBalance()).toBe(100)
})

test("Should debit an account", () => {
    const account = new Account("1234")
    account.credit(100)
    account.debit(50)
    expect(account.getBalance()).toBe(50)
})
