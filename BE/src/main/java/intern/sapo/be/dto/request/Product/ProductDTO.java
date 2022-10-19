package intern.sapo.be.dto.request.Product;

import intern.sapo.be.entity.OptionValue;
import intern.sapo.be.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotNull;

@AllArgsConstructor
@Data
public class ProductDTO {
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

    public Product toEntity()
    {
        ModelMapper mapper=new ModelMapper();
        return mapper.map(this,Product.class);
    }



}
