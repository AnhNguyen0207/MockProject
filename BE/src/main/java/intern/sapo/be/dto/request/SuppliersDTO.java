package intern.sapo.be.dto.request;

import intern.sapo.be.base.BaseEntity;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class SuppliersDTO extends BaseEntity {

    @NotEmpty(message = "Code can not be null")
    @Size(max = 100,message = "code can not be more then 100 character")
    private String code;
    @NotEmpty(message = "Name can not be null")
    private String name;
    @Email(message = "Email not valid")
    @Size(max = 100,message = "code can not be more then 100 character")
    private String email;
    @NotEmpty(message = "Phone can not be null")
    @Size(max = 20,message = "Phone number cant be more than 20")
    private String phone;
    @NotEmpty(message = "Address can not be null")
    private String address;

}
