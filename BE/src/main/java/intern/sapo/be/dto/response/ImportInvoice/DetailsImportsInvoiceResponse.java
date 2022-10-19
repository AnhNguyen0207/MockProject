package intern.sapo.be.dto.response.ImportInvoice;

import intern.sapo.be.entity.Import;
import intern.sapo.be.entity.Supplier;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class DetailsImportsInvoiceResponse {
    private Import anImport;
    private Supplier supplier;
    private String inventoryName;
}
