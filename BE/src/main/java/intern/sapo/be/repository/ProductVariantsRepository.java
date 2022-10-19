package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.ProductVariant;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;

public interface ProductVariantsRepository extends IBaseRepo<ProductVariant, Integer> {
    @Query(value = "SELECT * FROM product_variants WHERE NAME LIKE %?%", nativeQuery = true)
    List<ProductVariant> findProductVariantByName(String name);

    @Query(value = "call get_productvariant_byname(?1,?2)", nativeQuery = true)
    List<ProductVariant> listProductVariantByName(Integer id, String name);
}
