package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProductVariantOptionsDTO {
    private Integer id;
    private Integer variantId;
    private Integer optionValueId;


}
