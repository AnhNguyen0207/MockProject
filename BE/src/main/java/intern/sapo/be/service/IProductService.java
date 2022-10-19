package intern.sapo.be.service;

import intern.sapo.be.dto.request.Product.ProductAddDTO;
import intern.sapo.be.dto.request.Product.ProductFilter;
import intern.sapo.be.dto.response.Product.ProductFilterResponse;
import intern.sapo.be.dto.response.Product.ProductReponse;
import intern.sapo.be.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.List;

public interface IProductService {
    List<Product> findAll();


    ProductReponse findById(Integer integer);


    void deleteById(Integer integer);

    Page<Product> findAll(Integer pageNumber, Integer pageSize);

//    Product save(ProductAdd request, BindingResult bindingResult);
ProductAddDTO save(ProductAddDTO request, BindingResult bindingResult);


    List<Product> findAllVariant(Integer pageNumber, Integer pageSize, String name);

    List<ProductFilterResponse> productFilter(ProductFilter filter, BindingResult bindingResult);

    Integer countProductByFilter(ProductFilter filter, BindingResult bindingResult);

    void deleteVariantById(Integer id);

    void deleteVariantsById(Integer[] listId);

    void deleteProductsById(Integer[] listId);

    @Transactional(rollbackOn = SQLException.class)
    ProductReponse update(ProductAddDTO request, BindingResult bindingResult);
}
