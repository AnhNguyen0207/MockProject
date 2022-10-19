package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class OptionsDTO {
    private Integer id;
    private Integer productId;
    private String name;


}
