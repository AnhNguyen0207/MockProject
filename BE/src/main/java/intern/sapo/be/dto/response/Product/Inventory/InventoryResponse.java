package intern.sapo.be.dto.response.Product.Inventory;

import intern.sapo.be.dto.request.ProductVariantsDTO;
import intern.sapo.be.entity.Inventory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class InventoryResponse {
    private Inventory inventory;
    private List<ProductVariantsDTO> productVariants;
    private Integer totalProductVariant;
    private Integer countProductVariant;

}
