package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DetailsContactsDTO {
    private Integer id;
    private Integer contactId;
    private Integer productVariantId;
    private Integer quantity;


}
