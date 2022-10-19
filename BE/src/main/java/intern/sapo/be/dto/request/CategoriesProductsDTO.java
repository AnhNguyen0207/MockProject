package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CategoriesProductsDTO {
    private Integer productId;
    private Integer categoryId;


}
