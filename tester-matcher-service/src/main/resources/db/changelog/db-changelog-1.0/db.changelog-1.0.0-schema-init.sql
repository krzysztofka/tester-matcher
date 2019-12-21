create table devices (
    id integer primary key,
    description varchar(64),
    CONSTRAINT devices_pk PRIMARY KEY(id),
);

create table testers (
    id bigint,
    first_name varchar(64),
    last_name varchar(64),
    country varchar(64),
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