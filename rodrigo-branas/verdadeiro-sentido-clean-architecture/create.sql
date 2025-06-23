drop table if exists bids;
drop table if exists auctions;

create table auctions (
    auction_id uuid,
    start_date timestamptz,
    end_date timestamptz,
    min_increment numeric,
    start_amount numeric,
    primary key (auction_id)
);

create table bids (
    bid_id uuid,
    auction_id uuid,
    customer text,
    amount numeric,
    created_at timestamptz,
    constraint fk_bid_auction foreign key (auction_id) references auctions (auction_id),
    primary key (bid_id)
);
