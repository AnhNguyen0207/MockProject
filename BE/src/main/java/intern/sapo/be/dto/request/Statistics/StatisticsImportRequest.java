package intern.sapo.be.dto.request.Statistics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsImportRequest {
    private Integer  inventoryId;
    private Integer  supplierId;
    private Timestamp startDate;
    private Timestamp endDate;
    private String sortBy;
    private boolean sortDir;
    private  Integer page;
    private  Integer size;
    private  Integer type;
}
