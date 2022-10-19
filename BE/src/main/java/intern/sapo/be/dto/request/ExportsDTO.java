package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ExportsDTO {
    private Integer id;
    private Integer receiveInventoryId;
    private Integer statusId;
    private Integer transportCompanyId;
    private Integer accountId;
    private java.sql.Timestamp createAt;
    private java.sql.Timestamp updateAt;
    private Boolean isDelete;


}
