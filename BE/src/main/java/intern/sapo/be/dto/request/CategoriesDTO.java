package intern.sapo.be.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoriesDTO {
    private Integer id;
    @NotNull
    @NotBlank
    private String name;

    @NotNull
    @NotBlank
    private String description;

}
