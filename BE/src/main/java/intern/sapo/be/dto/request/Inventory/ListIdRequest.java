package intern.sapo.be.dto.request.Inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListIdRequest {
    private Integer idInventory;
    private List<Integer> idProductVariant;
}
