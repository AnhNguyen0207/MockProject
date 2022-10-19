package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProductsDTO {
    private Integer id;
    private String code;
    private String name;
    private String description;
    private Integer statusId;
    private Integer supplierId;
    private Integer accountId;
    private java.sql.Timestamp createAt;
    private java.sql.Timestamp updateAt;
    private Boolean isDelete;



}
