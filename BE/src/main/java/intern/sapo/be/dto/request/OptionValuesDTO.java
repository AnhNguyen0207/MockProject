package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class OptionValuesDTO {
    private Integer id;
    private Integer optionId;
    private String name;


}
