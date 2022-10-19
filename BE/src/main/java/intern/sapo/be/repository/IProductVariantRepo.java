package intern.sapo.be.repository;

import intern.sapo.be.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IProductVariantRepo extends JpaRepository<ProductVariant,Integer> {
    @Query(value = "select * from  product_variants  order by id DESC limit 1",nativeQuery = true)
    ProductVariant getTop();

    @Query("select p from ProductVariant p where p.productId = :id and p.isDelete= false ")
    List<ProductVariant> findAllByProductId(@Param("id") Integer id);

    @Query("delete from ProductVariant p where p.productId = ?1")
    @Transactional
    @Modifying
    void deleteAllByProductId(@Param("id") Integer id);

    @Query(value = "call count_product_variant(?)", nativeQuery = true)
    Integer countProductVariantByFilter(String searchValue);
}
