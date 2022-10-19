package intern.sapo.be.dto.request.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductVariantDTO {
    private Integer id;
    private String code;
    private String name;
    private Integer quantity;
    private BigDecimal importPrice;


}
