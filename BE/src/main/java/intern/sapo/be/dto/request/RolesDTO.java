package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class RolesDTO {
    private Integer id;
    private String name;
    private String description;
    private List<Integer> ids;

}
