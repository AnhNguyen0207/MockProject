package intern.sapo.be.dto.payload;

import lombok.Getter;

@Getter
public class LoginRequest {
	private String username;
	private String password;
}
