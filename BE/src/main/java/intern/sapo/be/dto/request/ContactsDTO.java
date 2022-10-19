package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ContactsDTO {
    private Integer id;
    private String code;
    private Integer supplierId;
    private Integer statusId;
    private Integer accountId;
    private java.sql.Timestamp createAt;
    private java.sql.Timestamp updateAt;
    private Boolean isDelete;


}
