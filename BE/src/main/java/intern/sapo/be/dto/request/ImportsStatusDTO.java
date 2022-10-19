package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ImportsStatusDTO {
    private Integer id;
    private Integer importId;
    private Integer statusId;
    private java.sql.Timestamp createAt;


}
