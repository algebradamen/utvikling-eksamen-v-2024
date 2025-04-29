create table innbygger (
                           id integer primary key,
                           navn varchar(100) not null
);

create table språk (
                       id integer primary key,
                       navn varchar(100) not null
);

create table chat_room (
                           id integer primary key,
                           navn varchar(100) not null,
                           språk int not null references språk(id)
);

create table chat_message (
                              id integer primary key,
                              avsender int not null references innbygger(id),
                              chat_room int not null references chat_room(id),
                              melding varchar(1000) not null,
                              tidspunkt timestamp not null
);

create table mentor (
                        id integer primary key,
                        innbygger int not null references innbygger(id),
                        språk int not null references språk(id)
);
create table elev (
                      id integer primary key,
                      innbygger int not null references innbygger(id),
                      språk int not null references språk(id)
);
