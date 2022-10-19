package intern.sapo.be.dto.request.Product;

import intern.sapo.be.entity.Option;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.modelmapper.ModelMapper;

import java.util.List;

@AllArgsConstructor
@Data
public class OptionAdd {
    private Integer id;
    private Integer productId;
    private String name;
   private List<OptionValuesAdd> values;
    public Option toEntity()
    {
        ModelMapper mapper=new ModelMapper();
        return mapper.map(this, Option.class);
    }

}
