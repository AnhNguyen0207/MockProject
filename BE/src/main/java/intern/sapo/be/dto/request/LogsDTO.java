package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LogsDTO {
    private Integer id;
    private Integer accountId;
    private Integer actionId;
    private Integer targetId;


}
