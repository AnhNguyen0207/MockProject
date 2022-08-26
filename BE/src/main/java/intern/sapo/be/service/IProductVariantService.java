package intern.sapo.be.service;

import intern.sapo.be.base.IBaseService;
import intern.sapo.be.dto.request.Product.ProductVariantDTO;
import intern.sapo.be.entity.ProductVariant;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface IProductVariantService extends IBaseService<ProductVariant> {
    List<ProductVariant> findProductByName(String name);

    Optional<ProductVariant> findProductById(Integer id);

    List<ProductVariantDTO> findAllProductVariantDTO(Integer pageNumber, Integer pageSize);

    Integer countTotalPage();
}
