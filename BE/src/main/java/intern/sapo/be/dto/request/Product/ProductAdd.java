package intern.sapo.be.dto.request.Product;

import intern.sapo.be.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class ProductAdd {


    private Product product;
    private List<OptionAdd> options;


}
