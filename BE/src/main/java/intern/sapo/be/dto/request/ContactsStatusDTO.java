package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ContactsStatusDTO {
    private Integer id;
    private Integer contactId;
    private Integer statusId;
    private java.sql.Timestamp createAt;


}
