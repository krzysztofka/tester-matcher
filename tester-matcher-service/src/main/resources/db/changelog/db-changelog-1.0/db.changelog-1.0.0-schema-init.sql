create table devices (
    id integer primary key,
    description varchar(64),
    CONSTRAINT devices_pk PRIMARY KEY(id),
);

create table testers (
    id bigint,
    first_name varchar(64),
    last_name varchar(64),
    country varchar(2),
    last_login timestamp,
    CONSTRAINT testers_pk PRIMARY KEY(id),
);

create table tester_devices (
    tester_id bigint,
    device_id integer,
    CONSTRAINT tester_device_pk PRIMARY KEY(tester_id, device_id),
    CONSTRAINT tester_device_tester_fk FOREIGN KEY(tester_id) REFERENCES testers(id),
    CONSTRAINT tester_device_device_fk FOREIGN KEY(device_id) REFERENCES devices(id)
);

create table bugs (
    id bigint,
    device_id integer,
    tester_id bigint,
    CONSTRAINT bugs_pk PRIMARY KEY(id),
    CONSTRAINT bugs_tester_fk FOREIGN KEY(tester_id) REFERENCES testers(id),
    CONSTRAINT bugs_device_fk FOREIGN KEY(device_id) REFERENCES devices(id)
);

create table countries (
    country_code varchar(2),
    CONSTRAINT countries_pk PRIMARY KEY(country_code)
);

create view tester_device_scores as
select t.id as tester_id, td.device_id, count(b.id) as bugs_count
from testers t
join tester_devices td on t.id = td.tester_id
left join bugs b on b.tester_id = t.id and b.device_id = td.device_id
group by t.id, t.first_name, t.last_name, t.country, td.device_id;