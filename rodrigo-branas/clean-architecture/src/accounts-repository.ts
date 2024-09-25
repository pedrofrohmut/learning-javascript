interface IAccountRepository {
    get(id: string): Promise<Account>
    save(account: Account): Promise<void>
    update(account: Account): Promise<void>
}

export default IAccountRepository
