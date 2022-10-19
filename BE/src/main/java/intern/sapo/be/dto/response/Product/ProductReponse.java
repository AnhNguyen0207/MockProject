package intern.sapo.be.dto.response.Product;

import intern.sapo.be.entity.Category;
import intern.sapo.be.entity.Product;
import intern.sapo.be.entity.ProductVariant;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Setter
public class ProductReponse {
    private Product product;
    private List<ProductVariant> variants;
    private List<Category> categories;
}