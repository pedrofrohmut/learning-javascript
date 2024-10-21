drop table loans if exists;
drop table installments if exists;

create table loans (
    id text primary key,
    code text,
    amount numeric,
    period integer,
    rate numeric,
    type text
);

create table installments (
    id text primary key,
    loan_code text,
    number integer,
    amount numeric,
    interest numeric,
    amortization numeric,
    balance numeric
);
