package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.Product.OptionValuesAdd;
import intern.sapo.be.dto.request.Product.ProductAddDTO;
import intern.sapo.be.dto.request.Product.ProductFilter;
import intern.sapo.be.dto.response.Product.ProductFilterResponse;
import intern.sapo.be.dto.response.Product.ProductReponse;
import intern.sapo.be.entity.*;
import intern.sapo.be.repository.*;
import intern.sapo.be.security.jwt.util.Utils;
import intern.sapo.be.service.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ProductService implements IProductService {
    Utils utils;
    private final ModelMapper mapper;
    private final IProductRepo productRepo;
    private final IProductVariantRepo variantRepo;
    private final ICategoryRepo categoryRepo;
    private final JdbcTemplate jdbcTemplate;
    private final IProductVariantOptionRepo variantOptionRepo;
    private final ICategoryProductRepo categoryProductRepo;

    public ProductService(ModelMapper mapper, IProductRepo productRepo, IProductVariantRepo variantRepo, IOptionRepo optionRepo,
                          ICategoryRepo categoryRepo, JdbcTemplate jdbcTemplate, IProductVariantOptionRepo variantOptionRepo, ICategoryProductRepo categoryProductRepo) {
        this.mapper = mapper;
        this.productRepo = productRepo;
        this.variantRepo = variantRepo;
        this.categoryRepo = categoryRepo;

        this.jdbcTemplate = jdbcTemplate;
        this.variantOptionRepo = variantOptionRepo;
        this.categoryProductRepo = categoryProductRepo;
    }

    List<OptionValuesAdd> list = new ArrayList<>();

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }



    @Override
    public ProductReponse findById(Integer id) {
        ProductReponse reponse = new ProductReponse(productRepo.findById(id).get(), variantRepo.findAllByProductId(id)
                , categoryRepo.findAllByProductId(id));
        return reponse;
    }

    @Override
    @Transactional
    public void deleteById(Integer id) {

        Product product = productRepo.findById(id).orElseThrow(() -> new RuntimeException("Id is not exist"));
        product.setIsDelete(true);
        productRepo.save(product);
        deleteVariantsByProductId(id);
    }
    public  void deleteVariantsByProductId(Integer productId)
    {
        String query="update product_variants set is_delete=true where product_id=?";
        jdbcTemplate.update(query,productId);
    }

    @Override
    public Page<Product> findAll(Integer pageNumber, Integer pageSize) {
        return productRepo.findAll(PageRequest.of(pageNumber - 1, pageSize, Sort.Direction.DESC, "name"));

    }


    // Thêm sản phẩm  và biến thể
    @Override
    @Transactional(rollbackOn = SQLException.class)
    public ProductAddDTO save(ProductAddDTO request, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) throw new RuntimeException("Input Invalid");
        Product product = request.getProduct();
        product.setCode(getNewCode());
        request.setProduct(productRepo.save(product));

        for (ProductVariant variant : request.getVariants()) {
            variant.setProductId(request.getProduct().getId());
            variant.setCode(getNewVariantCode());
            variant.setIsDelete(false);
            variant = variantRepo.save(variant);
        }
        for (Category category : request.getCategories()) {
            CategoriesProductId id = new CategoriesProductId(request.getProduct().getId(), category.getId());
            CategoriesProduct categoriesProduct = new CategoriesProduct(id, request.getProduct(), category);

            categoryProductRepo.save(categoriesProduct);

        }
        return request;
    }

    @Override
    public List<Product> findAllVariant(Integer pageNumber, Integer pageSize, String name) {
        return null;
    }

    @Override
    public List<ProductFilterResponse> productFilter(ProductFilter filter, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) throw new RuntimeException("Invalid input ");
        String query = "call filter_product(?,?,?,?,?,?)";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper(ProductFilterResponse.class),
                filter.getKey(), filter.getSortBy(), filter.getIsDesc(), filter.getPage(), filter.getSize(), filter.getIsDelete());
    }

    @Override
    public Integer countProductByFilter(ProductFilter filter, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) throw new RuntimeException("Invalid input ");
//        String query="call filter_product(?,?,?,?,?,?)";
//      Integer total=jdbcTemplate.query(query,new BeanPropertyRowMapper(Integer.class),
//                filter.getKey(),filter.getSortBy(),filter.getIsDesc(),filter.getPage(),filter.getSize(),filter.getIsDelete());
//
        return productRepo.countProductByFilter(filter.getKey(), filter.getSortBy(), filter.getIsDesc(), filter.getPage(), filter.getSize(), filter.getIsDelete());
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public void deleteVariantById(Integer id) {
        var variant = variantRepo.findById(id).orElseThrow(() -> new RuntimeException("Id is not exist"));
        variant.setIsDelete(true);
        variantRepo.save(variant);
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public void deleteVariantsById(Integer[] listId) {
        var variants = variantRepo.findAllById(Arrays.asList(listId));
        for (ProductVariant variant : variants) {
            variant.setIsDelete(true);
        }
        variantRepo.saveAll(variants);


    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public void deleteProductsById(Integer[] listId) {
        var products = productRepo.findAllById(Arrays.asList(listId));
        for (Product product : products) {
            product.setIsDelete(true);
            deleteVariantsByProductId(product.getId());
        }
        productRepo.saveAll(products);
    }

    @Override
    @Transactional(rollbackOn = SQLException.class)
    public ProductReponse update(ProductAddDTO request, BindingResult bindingResult) {
        request.getProduct().setUpdateAt(Timestamp.valueOf(LocalDateTime.now()));
        productRepo.save(request.getProduct());
        variantRepo.saveAll(request.getVariants());
        categoryProductRepo.deleteAllByProductId(request.getProduct().getId());
        for (Category category : request.getCategories()) {
            String q = "insert into categories_products values (?,?)";

            jdbcTemplate.update(q, request.getProduct().getId(), category.getId());
        }
        return findById(request.getProduct().getId());
    }


    public String getNewCode() {
        String newCode = "SP";
        Product product = productRepo.getTop();
        if (product == null) return "SP1";
        newCode = newCode + (product.getId() + 1);
        return newCode;
    }

    public String getNewVariantCode() {
        String newCode = "SPV";
        ProductVariant variant = variantRepo.getTop();

        if (variant == null) return "SPV1";

        newCode = newCode + (variant.getId() + 1);
        return newCode;
    }


}