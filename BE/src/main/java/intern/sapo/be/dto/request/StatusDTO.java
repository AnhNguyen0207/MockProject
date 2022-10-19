package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class StatusDTO {
    private Integer id;
    private String code;
    private String name;
    private String description;


}
