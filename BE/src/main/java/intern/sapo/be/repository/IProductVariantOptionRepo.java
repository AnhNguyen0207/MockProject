package intern.sapo.be.repository;

import intern.sapo.be.entity.ProductVariantOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductVariantOptionRepo extends JpaRepository<ProductVariantOption,Integer> {
}
