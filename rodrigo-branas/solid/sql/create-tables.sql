drop table if exists installments;
drop table if exists transactions;

create table transactions (
    id text,
    code text unique,
    value numeric,
    number_installments integer,
    payment_method text,
    created_at timestamp default now(),
    primary key(id)
);

create table installments (
    id text,
    number integer,
    value numeric,
    transaction_code text,
    constraint fk_installment_transactions foreign key (transaction_code) references transactions(code),
    primary key(id)
);
