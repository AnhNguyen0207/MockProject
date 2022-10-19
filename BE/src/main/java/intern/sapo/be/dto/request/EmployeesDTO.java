package intern.sapo.be.dto.request;

import intern.sapo.be.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;


@AllArgsConstructor
@Data
public class EmployeesDTO {
    private Integer id;
    private String fullName;
    private String image;
    private String email;
    private String phone;
    private String address;
    private Integer accountId;

}
