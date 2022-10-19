package intern.sapo.be.dto.request.Product;

import intern.sapo.be.entity.Category;
import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductAddDTO {
    private Product product;
    private List<ProductVariant> variants;
    private List<Category> categories;

}