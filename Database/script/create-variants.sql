
select table1.*,table2.options_id,table2.option_name,table2.option_value_name from (SELECT product_id,options.id as options_id, options.name as option_name,option_values.name as option_value_name  FROM options inner join option_values on option_values.option_id=options.id) as table1 
cross join (SELECT product_id,options.id as options_id, options.name as option_name,option_values.name as option_value_name  FROM options inner join option_values on option_values.option_id=options.id ) as table2 on table2.options_id!=	table1.options_id 
where table1.options_id<table2.options_id and  table1.product_id=18;


CREATE TEMPORARY TABLE a (

option_id int,
option_value_id int,
name VARCHAR(20) 

);
CREATE TEMPORARY TABLE b (
option_value_id int,
option_id int,
name VARCHAR(20) 

);
CREATE TEMPORARY TABLE c (
option_value_id int,
option_id int,
name VARCHAR(20) 

);
drop table c;
drop table a;
drop table b;


insert into a
(select option_id,option_values.id as option_value_id, option_values.name as name from option_values inner join options on options.id=option_values.option_id
where options.product_id=18)  ;
insert into b select * from a;
insert into c select * from a;

select * from a,b,c
where a.option_id!=b.option_id and a.option_id!=c.option_id and c.option_id!=b.option_id;

select * from a