package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class InventoriesDTO {
    private Integer id;
    private String code;
    private String name;
    private String address;
    private java.sql.Timestamp createAt;
    private java.sql.Timestamp updateAt;
    private Boolean isDelete;


}
