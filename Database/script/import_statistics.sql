 select product_variants.product_id as product_id, product_variant_id,product_variants.name as variant_name, quantity,imports.total_price, delivery_date
from details_imports inner join imports on imports.id=details_imports.import_id 
inner join product_variants on product_variants.id=details_imports.product_variant_id 
where   imports.supplier_id=1;




--  nhập hàng
select inventory_id, supplier_id,account_id,imports.id as import_id,imports.code as import_code,details_imports.id as details_import_id,product_variant_id,details_imports.quantity as import_number, imports.total_price,delivery_date,create_at 
from imports inner join imports_status on imports.id=imports_status.import_id
left join details_imports on details_imports.import_id=imports.id 
where imports.is_done=true and imports.is_import=true and imports_status.id and status_id=4 ;

-- trả hàng
select details_imports.import_id as import_id, details_imports.id as detais_import_id, return_import_id,
product_variant_id,sum(details_return_import.quantity )as return_number,details_imports.quantity as import_number  ,(details_imports.quantity-sum(details_return_import.quantity )) as have
from return_import inner join details_return_import on return_import.id=details_return_import.return_import_id 
	inner join details_imports on details_imports.id=details_return_import.details_import_id
    group by details_import_id , product_variant_id;

CREATE TEMPORARY TABLE p_return (
	import_id   int , 
    detais_import_id  int , 
    return_import_id  int , 
    product_variant_id  int , 
    return_number  int , 
    import_number  int , 
    have int

		);
        CREATE TEMPORARY TABLE p_receive (
	inventory_id int,
    supplier_id int,
    account_id int,
    import_id int,
    import_code text,
    details_import_id int,
    product_variant_id int,
    import_number int ,
    total_price int ,
    delivery_date text,
    create_at datetime

		);
