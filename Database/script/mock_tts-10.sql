drop database mock_tts_10;
create database mock_tts_10;

use mock_tts_10;

create table roles
(
    id          int primary key,
    name        varchar(100) not null unique,
    description text
);
create table status
(
    id          int primary key auto_increment,
    code        varchar(200)  not null,
    name        nvarchar(200) not null,
    description text
);

create table accounts
(
    id        int primary key auto_increment,
    username  varchar(200) not null unique,
    password  varchar(500) not null,
    create_at datetime default (now()),
    update_at datetime default (now()),
    is_delete bit      default (0)
);

create table accounts_roles
(
    account_id int not null,
    role_id    int not null,
    primary key (account_id, role_id),
    foreign key (account_id) references accounts (id),
    foreign key (role_id) references roles (id)

);

create table employees
(
    id         int primary key auto_increment,
    full_name  text          not null,
    image      text,
    email      varchar(100)  not null unique,
    phone      varchar(20)   not null unique,
    address    nvarchar(500) not null,

    account_id int           not null,
    foreign key (account_id) references accounts (id)

);

create table transport_companies
(
    id         int primary key auto_increment,
    code       varchar(200) not null unique,
    name       text         not null,
    email      varchar(200) not null unique,
    phone      varchar(20)  not null,
    address    text         not null,
    account_id int          not null,
    create_at  datetime default (now()),
    update_at  datetime default (now()),
    is_delete  bit      default (0),
    foreign key (account_id) references accounts (id)

);

create table inventories
(
    id        int primary key auto_increment,
    code      varchar(100) not null unique,
    name      text         not null,
    address   text         not null,
    create_at datetime default (now()),
    update_at datetime,
    is_delete bit      default (0)

);
create table suppliers
(
    id         int primary key auto_increment,
    code       varchar(100) not null unique,
    name       text         not null,
    email      varchar(100) not null unique,
    phone      varchar(20)  not null unique,
    address    text         not null,
    account_id int          not null,
    create_at  datetime default (now()),
    update_at  datetime,
    is_delete  bit      default (0),
    foreign key (account_id) references accounts (id)

);
create table inventories_accounts
(
    account_id   int not null,
    inventory_id int not null,
    primary key (account_id, inventory_id),
    foreign key (account_id) references accounts (id),
    foreign key (inventory_id) references inventories (id)
);

create table categories
(
    id          int primary key auto_increment,
    name        nvarchar(500) not null,
    description text
);

create table products
(
    id          int primary key auto_increment,
    code        varchar(100) not null unique,
    name        text         not null,
    description text,
    status_id   int      default (0),
    supplier_id int          not null,
    account_id  int          not null,
    create_at   datetime default (now()),
    update_at   datetime,
    is_delete   bit      default (0),
    foreign key (supplier_id) references suppliers (id),
    foreign key (status_id) references status (id),
    foreign key (account_id) references accounts (id)


);

create table options
(
    id         int primary key auto_increment,
    product_id int           not null,
    name       nvarchar(200) not null,
    foreign key (product_id) references products (id)
);
create table option_values
(
    id        int primary key auto_increment,
    option_id int           not null,
-- product_id int not null,
    name      nvarchar(200) not null,
    foreign key (option_id) references options (id)
-- foreign key(product_id) references options(product_id)
);

create table product_variants
(
    id              int primary key auto_increment,
    code            varchar(100)  not null unique,
    product_id      int           not null,
    name            nvarchar(200) not null,
    image           text,
    wholesale_price decimal(20, 2) default (0),
    sale_price      decimal(20, 2) default (0),
    import_price    decimal(20, 2) default (0),
    foreign key (product_id) references products (id)

);
create table product_variant_options
(
    id              int primary key auto_increment,
    variant_id      int not null,
    option_value_id int not null,
    foreign key (option_value_id) references option_values (id),
    foreign key (variant_id) references product_variants (id)
);


create table categories_products
(
    product_id  int not null,
    category_id int not null,
    primary key (product_id, category_id),
    foreign key (product_id) references products (id),
    foreign key (category_id) references categories (id)
);

create table inventories_product_variant
(
    inventory_id       int not null,
    product_variant_id int not null,
    quantity           int default (0),
    primary key (inventory_id, product_variant_id),
    foreign key (inventory_id) references inventories (id),
    foreign key (product_variant_id) references product_variants (id)
);

create table contacts
(
    id          int primary key auto_increment,
    code        varchar(100) not null unique,
    supplier_id int          not null,
    status_id   int      default (0),
    account_id  int          not null,
    create_at   datetime default (now()),
    update_at   datetime,
    is_delete   bit      default (0),
    foreign key (account_id) references accounts (id),
    foreign key (supplier_id) references suppliers (id),
    foreign key (status_id) references status (id)

);

create table details_contacts
(
    id                 int primary key auto_increment,
    contact_id         int not null,
    product_variant_id int not null,
    quantity           int default (0),
    foreign key (contact_id) references contacts (id),
    foreign key (product_variant_id) references product_variants (id)
);

create table imports
(
    id                   int primary key auto_increment,
    contact_id           int not null,
    transport_company_id int not null,
    status_id            int not null,
    account_id           int not null,
    create_at            datetime default (now()),
    update_at            datetime,
    is_delete            bit      default (0),
    foreign key (contact_id) references contacts (id),
    foreign key (account_id) references accounts (id),
    foreign key (status_id) references status (id),
    foreign key (transport_company_id) references transport_companies (id)
);
create table details_imports
(
    id                 int primary key auto_increment,
    import_id          int not null,
    product_variant_id int not null,
    quantity           int default (0),
    foreign key (import_id) references imports (id),
    foreign key (product_variant_id) references product_variants (id)
);


create table exports
(
    id                   int primary key auto_increment,
    export_inventory_id  int not null,

    receive_inventory_id int not null,
    status_id            int not null default (0),
    transport_company_id int not null,
    account_id           int not null,
    create_at            datetime     default (now()),
    update_at            datetime,
    is_delete            bit          default (0),
    foreign key (account_id) references accounts (id),
    foreign key (receive_inventory_id) references inventories (id),
    foreign key (export_inventory_id) references inventories (id),
    foreign key (status_id) references status (id),
    foreign key (transport_company_id) references transport_companies (id)

);


create table details_exports
(
    id                 int primary key auto_increment,
    export_id          int not null,
    product_variant_id int not null,
    quantity           int default (0),
    foreign key (export_id) references exports (id),
    foreign key (product_variant_id) references product_variants (id)
);


create table actions
(
    id          int primary key auto_increment,
    code        varchar(20) not null unique,
    description text
);

create table logs
(
    id         int primary key auto_increment,
    account_id int not null,
    action_id  int not null,
    target_id  int not null,
    foreign key (account_id) references accounts (id),
    foreign key (action_id) references actions (id)

);



create table exports_status
(
    id        int primary key auto_increment,
    export_id int not null,
    status_id int not null,
    foreign key (export_id) references exports (id),
    foreign key (status_id) references status (id),
    create_at datetime default (now())
);
create table imports_status
(
    id        int primary key auto_increment,
    import_id int not null,
    status_id int not null,
    foreign key (import_id) references imports (id),
    foreign key (status_id) references status (id),
    create_at datetime default (now())
);
create table contacts_status
(
    id         int primary key auto_increment,
    contact_id int not null,
    status_id  int not null,
    foreign key (contact_id) references contacts (id),
    foreign key (status_id) references status (id),
    create_at  datetime default (now())
);


ALTER TABLE suppliers
    ADD COLUMN status_transaction bit default (0);

ALTER TABLE suppliers
    MODIFY COLUMN code varchar(100) unique;


ALTER TABLE suppliers
    MODIFY COLUMN account_id int;

CREATE TABLE supplier_seqId
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);
DELIMITER $$
CREATE TRIGGER tg_supplier_insert
    BEFORE INSERT
    ON suppliers
    FOR EACH ROW
    IF NEW.code is null or NEW.code = '' THEN
        begin
            INSERT INTO supplier_seqId VALUES (NULL);
            SET NEW.code = CONCAT('SUPP', LPAD(LAST_INSERT_ID(), 5, '0'));
        end;
    end if $$
DELIMITER ;

-- ducanh
DELIMITER $$
CREATE PROCEDURE `delete_category`(IN categories_id int)
BEGIN
    declare result int;
    if not exists(select * from categories where id = categories_id) then
        -- trả về 0 khi mã danh mục không tồn tại
        set @result = 0 ;
    else
        start transaction;
        begin
            DECLARE EXIT HANDLER FOR sqlstate '23000'
                set @result = 1;
            -- trả về 1 khi  không xóa được sản phẩm với mã danh mục truyền vào
            delete from categories_products where categories_products.category_id = categories_id;
            -- trả về 2 khi không xóa được danh mục
            set @result = 2;
            delete from categories where id = categories_id;
            -- trả về 3 tức là đã xóa thành công
            set @result = 3;

            commit;
        end;
    end if;
    select @result;
END;



-- product
CREATE
    DEFINER = `root`@`localhost` PROCEDURE `count_product_by_filter`(in key_word text, in sort_by text, in is_desc bit,
                                                                     in page int, in size int, in is_delete bit)
BEGIN

    declare search_value text;
    set search_value = lower(concat('%', key_word, '%'));
    select count(table1.total)
    from (select 0 as total
          from products
                   left join product_variants on products.id = product_variants.product_id
                   left join inventories_product_variant
                             on product_variants.id = inventories_product_variant.product_variant_id
          where (lower(products.name) like search_value or lower(products.code) like search_value)
            and products.is_delete = is_delete
            and product_variants.is_delete = false
          group by(products.id)) as table1
    group by table1.total;

END;

CREATE
    DEFINER = `root`@`localhost` PROCEDURE `filter_product`(in key_word text, in sort_by text, in is_desc bit,
                                                            in page int, in size int, in is_delete bit)
BEGIN
    declare offset_number int;
    declare search_value text;
    set search_value = lower(concat('%', key_word, '%'));
    set offset_number = (page - 1) * size;


    CREATE TEMPORARY TABLE products_count
    (
        id                int,
        code              text,
        name              text,
        description       text,
        status_id         int,
        supplier_id       int,
        account_id        int,
        create_at         datetime,
        update_at         datetime,
        is_delete         bit,
        number_of_variant int,
        total             int

    );

    insert into products_count (select products.*,
                                       count(product_variants.id)         as number_of_variant,
                                       sum(IF(quantity > 0, quantity, 0)) as total
                                from products
                                         left join product_variants on products.id = product_variants.product_id
                                         left join inventories_product_variant
                                                   on product_variants.id = inventories_product_variant.product_variant_id
                                where (lower(products.name) like search_value or lower(products.code) like search_value)
                                  and products.is_delete = is_delete
                                  and product_variants.is_delete = false
                                group by(products.id)) limit size offset offset_number;


    if (is_desc = true) then
        begin
            select * from products_count order by sort_by desc ;
        end;
    else
        begin
            select * from products_count order by sort_by asc;

        end;
    end if;


    drop table products_count;

END
use mock_tts_10


alter table mock_tts_10.imports
    drop foreign key imports_ibfk_3;


alter table mock_tts_10.imports
    modify transport_company_id int null;

alter table mock_tts_10.imports
    drop foreign key imports_ibfk_4;

alter table mock_tts_10.imports
    drop column status_id;

alter table mock_tts_10.imports
    drop column create_at;

alter table mock_tts_10.imports
    drop column update_at;

alter table mock_tts_10.imports
    drop column is_delete;

alter table mock_tts_10.imports
    add total_price decimal(20, 2) not null;

alter table mock_tts_10.imports
    add code nvarchar(50) unique;

alter table mock_tts_10.imports
    add note nvarchar(250) null;

drop index transport_company_id on mock_tts_10.imports;

alter table mock_tts_10.imports
    drop foreign key imports_ibfk_1;

alter table mock_tts_10.imports
    drop column contact_id;

alter table mock_tts_10.details_imports
    add total_price decimal(20, 2) not null;


CREATE TABLE import_seqId
(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY
);

DELIMITER $$
CREATE TRIGGER tg_import_insert_code
    BEFORE INSERT
    ON imports
    FOR EACH ROW
    IF NEW.code is null or NEW.code = '' THEN
        begin
            INSERT INTO import_seqId VALUES (NULL);
            SET NEW.code = CONCAT('PON', LPAD(LAST_INSERT_ID(), 5, '0'));
        end;
    end if $$
DELIMITER ;


alter table mock_tts_10.imports
    change transport_company_id supplier_id int null;

alter table mock_tts_10.imports
    add constraint imports_ibkf_3
        foreign key (supplier_id) references mock_tts_10.suppliers (id);

alter table mock_tts_10.imports
    modify supplier_id int not null;



alter table mock_tts_10.details_imports
    add constraint foreign_key_name
        foreign key (product_variant_id) references mock_tts_10.product_variants (id);

alter table mock_tts_10.details_imports
    modify import_id int null;

INSERT INTO mock_tts_10.status (id, code, name, description)
VALUES (2, 'IMPORT01', 'Đang giao dịch', 'Thêm mới đơn nhập hàng');
INSERT INTO mock_tts_10.status (id, code, name, description)
VALUES (3, 'IMPORT02', 'Thanh toán hóa đơn nhập hàng', 'Thêm mới thanh toán cho đơn nhập hàng');
INSERT INTO mock_tts_10.status (id, code, name, description)
VALUES (4, 'IMPORT03', 'Tạo phiếu nhập kho', 'Thêm mới phiếu nhập kho');
INSERT INTO mock_tts_10.status (id, code, name, description)
VALUES (5, 'IMPORT03', 'Tạo phiếu trả hàng', 'Thêm mới phiếu trả hàng');

alter table mock_tts_10.imports
    add inventory_id int not null;

alter table mock_tts_10.imports
    add constraint imports_ibkf_5
        foreign key (inventory_id)
            references mock_tts_10.inventories (id);

alter table mock_tts_10.imports
    add is_paid bit null default false;

alter table mock_tts_10.imports
    add is_import bit null default false;

alter table mock_tts_10.imports
    add is_done bit null default false;
ALTER TABLE product_variants
    add COLUMN is_delete bit default (0);


alter table mock_tts_10.imports
    add delivery_date varchar(50) null;


alter table mock_tts_10.details_imports
    add import_price decimal(20, 2) null;

create table mock_tts_10.return_import
(
    id         int auto_increment,
    createDate datetime default (now()),
    import_id  int not null,
    constraint id
        primary key (id),
    constraint tbl_import_return
        foreign key (import_id) references mock_tts_10.imports (id)
);



create table mock_tts_10.details_return_import
(
    id                int auto_increment,
    details_import_id int not null,
    quantity          int not null,
    constraint id
        primary key (id),
    constraint tbl_return_import_key
        foreign key (details_import_id) references mock_tts_10.details_imports (id)
);

alter table mock_tts_10.details_return_import
    add return_import_id int not null;

alter table mock_tts_10.details_return_import
    add constraint tbl_return_import_2
        foreign key (return_import_id) references mock_tts_10.return_import (id);

alter table mock_tts_10.return_import
    change createDate create_date datetime default (now()) null;

alter table mock_tts_10.details_return_import
    modify details_import_id int null;



alter table mock_tts_10.details_return_import
    add refund_reason nvarchar(250) null;

alter table mock_tts_10.imports
    add is_return bit null;

alter table mock_tts_10.details_return_import
    modify return_import_id int null;

# --------------------------------------
alter table mock_tts_10.inventories
    add column is_delete bit default (0);

alter table mock_tts_10.inventories_product_variant
    add column is_delete bit default (0);

DELIMITER $$
CREATE PROCEDURE select_create_at(in producVariantId int)
BEGIN
    select create_at
    from products
             inner join product_variants on products.id = product_variants.product_id
    where product_variants.id = producVariantId;
END;
$$

DELIMITER $$
CREATE PROCEDURE get_productvariant_byname(in inventoryId int, valueText text)
BEGIN
    begin
        select *
        from product_variants
                 inner join inventories_product_variant
                            on product_variants.id = inventories_product_variant.product_variant_id
        where inventories_product_variant.inventory_id = inventoryId
          and (product_variants.name like concat("%", valueText, "%") or
               product_variants.code like concat("%", valueText, "%"));
    end;
END;
$$

alter table mock_tts_10.product_variants
    modify is_delete bit null;

ALTER TABLE products
    DROP CONSTRAINT products_ibfk_1;

alter table mock_tts_10.products
    modify supplier_id int null;

alter table mock_tts_10.exports
    modify status_id int default (0) null;

alter table mock_tts_10.exports
    modify transport_company_id int null;

alter table mock_tts_10.exports
    modify account_id int null;

alter table mock_tts_10.exports_status
    modify account_create int null;

alter table mock_tts_10.exports_status
    modify account_receive int null;

alter table mock_tts_10.exports_status
    modify account_send int null;

alter table mock_tts_10.exports_status
    modify code varchar(255) null;

alter table mock_tts_10.exports_status
    modify date_receive varchar(255) null;

alter table mock_tts_10.exports_status
    modify date_send varchar(255) null;

alter table mock_tts_10.exports_status
    modify status_id int null;

alter table mock_tts_10.exports_status
    drop foreign key exports_status_ibfk_2;


# filter product


create
    definer = root@localhost procedure filter_product_variant(IN page int, IN size int, IN key_word text)
BEGIN
    declare offset_number int;
    declare search_value text;
    set search_value = lower(concat('%', key_word, '%'));
    set offset_number = (page - 1) * size;


    CREATE TEMPORARY TABLE products_count
    (
        id          int,
        code        text,
        name        text,
        quantity    int,
        importPrice bigint
    );

    insert into products_count (select pv.id,
                                       pv.code,
                                       pv.name,
                                       IF(quantity > 0, sum(quantity), 0)    as quantity,
                                       IF(import_price > 0, import_price, 0) as importPrice
                                from product_variants pv
                                         left join inventories_product_variant ipv on pv.id = ipv.product_variant_id
                                         inner join products p on pv.product_id = p.id
                                where (p.is_delete = false and pv.is_delete = false)
                                  and (lower(pv.name) like concat('%', search_value, '%') or
                                       pv.code like concat('%', search_value, '%'))
                                group by pv.id, pv.code, pv.name, IF(import_price > 0, import_price, 0)
                                order by pv.id desc
                                limit size offset offset_number);


    select * from products_count order by id desc;


    drop table products_count;

END;

drop procedure count_product_variant

create
    definer = root@localhost procedure count_product_variant(IN key_word text)
BEGIN

    declare search_value text;
    set search_value = lower(concat('%', key_word, '%'));
    select count(table1.total)
    from (select 0 as total  from products left join product_variants on products.id=product_variants.product_id
          where (lower(products.name) like search_value or lower(products.code) like search_value) and products.is_delete=false
          group by(products.id)) as table1
    group by table1.total;

END;





create
    definer = root@localhost procedure filter_import_invoice(IN key_word text)
BEGIN

    declare search_value text;
    set search_value = lower(concat('%', key_word, '%'));


    CREATE TEMPORARY TABLE products_count
    (
        code        text,
        supplierCode        text,
        inventoryName    text,
        totalPrice bigint,
        isDone boolean,
        isPaid boolean,
        isImport boolean,
        isReturn boolean,
        userName text,
        deliveryDate text
    );

    insert into products_count (select imports.code,
                                       s.code        as 'supplierCode',
                                       i.name        as 'inventoryName',
                                       total_price   as 'totalPrice',
                                       is_done       as 'isDone',
                                       is_paid       as 'isPaid',
                                       is_import     as 'isImport',
                                       is_return     as 'isReturn',
                                       a.username    as 'userName',
                                       delivery_date as 'deliveryDate'
                                from imports
                                         inner join accounts a on imports.account_id = a.id
                                         inner join inventories i on imports.inventory_id = i.id
                                         inner join suppliers s on imports.supplier_id = s.id
                                where (lower(imports.code) like concat('%', search_value, '%') or
                                      lower(s.code) like concat('%', search_value, '%') or lower(i.name) like concat('%', search_value, '%') )
                                order by imports.id desc);


    select * from products_count order by code desc;


    drop table products_count;

END;

# -----NEW FILRER


create
    definer = root@localhost procedure filter_import_by_supplier(IN supplierId int)
BEGIN


    select im.code,
           i.name        as 'inventoryName',
           im.total_price   as 'totalPrice',
           im.is_done       as 'isDone',
           im.is_paid       as 'isPaid',
           im.is_import     as 'isImport',
           im.is_return     as 'isReturn',
           (SELECT i2.create_at FROM imports_status i2 WHERE i2.import_id = im.id ORDER BY id LIMIT 1) as 'first',
           (SELECT i2.create_at FROM imports_status i2 WHERE  i2.import_id = im.id ORDER BY id DESC LIMIT 1) as 'last'
    from imports im
             inner join imports_status is2 on im.id = is2.import_id
             inner join inventories i on im.inventory_id = i.id
             inner join suppliers s on im.supplier_id = s.id
    where im.supplier_id = supplierId
    group by im.code,im.id
    order by im.id desc;
END;


call filter_import_by_supplier(9)


alter table mock_tts_10.imports_status
    add account_id int not null;

alter table mock_tts_10.imports_status
    add constraint fk_import_status_account_id
        foreign key (account_id) references mock_tts_10.accounts (id);

alter table mock_tts_10.return_import
    add account_id int not null;

alter table mock_tts_10.return_import
    add constraint fk_return_import
        foreign key (account_id) references mock_tts_10.accounts (id);

use mock_tts_10;

alter table inventories_product_variant
    add min_quantity int(11) default 0;


DELIMITER $$
CREATE PROCEDURE `get_categoriesByIdorName`( in valueText text )
BEGIN
    select * from categories where (categories.id  like concat('%', valueText, '%') or categories.name like concat('%', valueText, '%')) order by categories.id desc;
END; $$

alter table mock_tts_10.exports
    drop foreign key exports_ibfk_1;

alter table mock_tts_10.exports
    drop foreign key exports_ibfk_4;

alter table mock_tts_10.exports
    drop foreign key exports_ibfk_5;

alter table mock_tts_10.exports
    drop column status_id;

alter table mock_tts_10.exports
    drop column transport_company_id;

alter table mock_tts_10.exports
    drop column account_id;

alter table mock_tts_10.exports
    drop column create_at;

alter table mock_tts_10.exports
    drop column update_at;

alter table mock_tts_10.exports
    drop column is_delete;

alter table mock_tts_10.exports_status
    modify export_id int null;

alter table mock_tts_10.inventories
    drop column size;
alter table mock_tts_10.inventories
    add size bit(1) default 0 null;

