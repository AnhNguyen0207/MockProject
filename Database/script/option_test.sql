use mock_tts_10;
insert into options (id, product_id, name) values (1, 1, 'Size');
insert into options (id, product_id, name) values (2, 1, 'Color');
insert into options (id, product_id, name) values (3, 1, 'Status');

insert into option_values (id, option_id, name) values (1, 1, 'L');
insert into option_values (id, option_id, name) values (2, 1, 'S');
insert into option_values (id, option_id, name) values (3, 2, 'red');
insert into option_values (id, option_id, name) values (4, 2, 'green');
insert into option_values (id, option_id, name) values (5, 2, 'black');
insert into option_values (id, option_id, name) values (6, 2, 'white');
insert into option_values (id, option_id, name) values (7, 3, 'new');
insert into option_values (id, option_id, name) values (8, 3, 'old');
