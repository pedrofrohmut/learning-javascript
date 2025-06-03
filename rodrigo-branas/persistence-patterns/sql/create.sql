-- Can generate uuid for id if needed 'using the uuid_generate_v4()'
-- create extension if not exists "uuid-ossp";

drop table if exists users;
drop table if exists tickets;

create table users (
    user_id uuid,
    name text not null,
    email text not null unique,

    primary key (user_id)
);

create table tickets (
    ticket_id uuid,
    requester_id uuid not null,
    assignee_id uuid,
    content text,
    start_date timestamp,
    end_date timestamp,
    status text,
    duration int,

    primary key (ticket_id),
    constraint fk_tickets_requester foreign key (requester_id) references users (user_id),
    constraint fk_tickets_assignee foreign key (assignee_id) references users (user_id)
);

create index if not exists index_users_email on users(email);

insert into users (user_id, name, email) values ('ebd9aa7c-2be2-4439-ad9a-2c16ea568bda', 'Alice', 'alice@mail.com');
insert into users (user_id, name, email) values ('840580b4-3653-4fcd-87cb-12c46d1aabd4', 'Bob', 'bob@mail.com');
