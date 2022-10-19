package intern.sapo.be.dto.payload;

import lombok.Data;

import java.util.List;

@Data
public class RolesRequest {
	List<Long> rolesId;
	List<String> rolesString;
}
