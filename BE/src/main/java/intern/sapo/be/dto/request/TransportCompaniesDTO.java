package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import intern.sapo.be.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransportCompaniesDTO {
    private Integer id;

    @NotBlank
    @NotNull
    private String code;

    @NotBlank
    @NotNull
    private String name;

    @NotBlank
    @NotNull
    private String email;

    @NotBlank
    @NotNull
    private String phone;

    @NotBlank
    @NotNull
    private String address;

    @NotBlank
    @NotNull
    private Integer accountId;

    private java.sql.Timestamp createAt;
    private java.sql.Timestamp updateAt;
    private Boolean isDelete;

}
