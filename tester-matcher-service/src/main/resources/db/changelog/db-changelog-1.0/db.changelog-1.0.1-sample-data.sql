insert into devices (id, description) select * from CSVREAD('classpath:db/sampledata/devices.csv');
insert into testers (id, first_name, last_name, country, Last_login) select * from CSVREAD('classpath:db/sampledata/testers.csv');
insert into tester_devices (tester_id, device_id) select * from CSVREAD('classpath:db/sampledata/tester_device.csv');
insert into bugs (id, device_id, tester_id) select * from CSVREAD('classpath:db/sampledata/bugs.csv');