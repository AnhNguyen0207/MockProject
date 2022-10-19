package intern.sapo.be.dto.request;

import intern.sapo.be.entity.Role;
import lombok.Data;

import java.util.List;

@Data
public class AllDetailsEmployees {
	private Integer id;
	private String fullName;
	private String image;
	private String email;
	private String phone;
	private String address;
	private Integer accountId;
	private List<Role> roles;
	private String username;
	private java.sql.Timestamp createAt;
	private java.sql.Timestamp updateAt;
	private Boolean isDelete;
	private String name;
	private String description;

}
