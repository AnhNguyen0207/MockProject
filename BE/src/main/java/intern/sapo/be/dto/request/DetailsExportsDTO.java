package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DetailsExportsDTO {
    private Integer id;
    private Integer exportId;
    private Integer productVariantId;
    private Integer quantity;


}
