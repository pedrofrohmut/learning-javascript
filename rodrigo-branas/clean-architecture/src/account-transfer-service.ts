import Account from "./account"

class AccountTransferService {
    static transfer(from: Account, to: Account, amount: number): void {
        from.debit(amount)
        to.credit(amount)
    }
}

export default AccountTransferService
