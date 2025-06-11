interface TicketsDao {
    save(ticket: any): Promise<void>
    update(ticket: any): Promise<void>
    get(ticketId: string): Promise<any>
}

export default TicketsDao
