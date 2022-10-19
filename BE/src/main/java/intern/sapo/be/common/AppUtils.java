package intern.sapo.be.common;


import org.springframework.util.DigestUtils;

import java.util.UUID;

public class AppUtils {

	private AppUtils() {
		throw new UnsupportedOperationException("Cannot instantiate a App Util class");
	}

	public static String generateRandomUuid() {
		return UUID.randomUUID().toString();
	}

	public static String hash(String input) {
		String salt = "+WW=2c*8eW#da*5#&8M#";
		input = input + salt;
		return DigestUtils.md5DigestAsHex(input.getBytes());
	}

}
