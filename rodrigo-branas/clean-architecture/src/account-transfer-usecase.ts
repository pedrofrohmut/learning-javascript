import Account from "./account"
import AccountTransferService from "./account-transfer-service"
import IAccountGateway from "./iaccounts-gateway"

type Input = {
    from: Account
    to: Account
    amount: number
}

type Output = {
    success: boolean
}

class AccountTransferUseCase {
    private readonly accountGateway: IAccountGateway

    constructor(accountGateway: IAccountGateway) {
        this.accountGateway = accountGateway
    }

    async execute(input: Input): Promise<Output> {
        const from = await this.accountGateway.get(input.from.getId())
        const to = await this.accountGateway.get(input.to.getId())
        AccountTransferService.transfer(from, to, input.amount)
        await this.accountGateway.update(from)
        await this.accountGateway.update(to)
        return { success: true }
    }
}

export default AccountTransferUseCase
