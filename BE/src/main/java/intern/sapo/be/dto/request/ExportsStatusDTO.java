package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ExportsStatusDTO {
    private Integer id;
    private Integer exportId;
    private Integer statusId;
    private java.sql.Timestamp createAt;


}
