package intern.sapo.be.security.service;

import intern.sapo.be.entity.Account;
import intern.sapo.be.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
public class UserDetailsImpl implements UserDetails {
	Account account;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<GrantedAuthority> authorities = new HashSet<>();
		for(Role role : account.getRoles()) {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		}
		return authorities;
	}

	@Override
	public String getPassword() {
		return account.getPassword();
	}

	@Override
	public String getUsername() {
		return account.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return !account.getIsDelete();
	}

	@Override
	public boolean isAccountNonLocked() {
		return !account.getIsDelete();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return !account.getIsDelete();
	}

	@Override
	public boolean isEnabled() {
		return !account.getIsDelete();
	}
}
