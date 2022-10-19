package intern.sapo.be.service;

import intern.sapo.be.dto.payload.RolesRequest;
import intern.sapo.be.dto.request.RolesDTO;
import intern.sapo.be.entity.Account;
import intern.sapo.be.entity.Role;
import intern.sapo.be.exception.AccountException;
import intern.sapo.be.repository.AccountRepository;
import intern.sapo.be.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class RoleService {
	private RoleRepository roleRepository;
	private AccountRepository accountRepository;
	ModelMapper modelMapper;

	public Optional<Role> getOne(Integer id) {
		return roleRepository.findById(id);
	}

	public List<Role> getAll() {
		return roleRepository.findAll();
	}

	public Page<Role> getAll(Integer size, Integer page) {
		return roleRepository.findAll(PageRequest.of(page - 1, size, Sort.by("id")));
	}

	public Role save(RolesDTO rolesDTO) {
		Role role = new Role();
		role.setName(rolesDTO.getName());
		role.setDescription(rolesDTO.getDescription());
		return roleRepository.save(role);
	}

	public Account getRoleByEmp(Integer id) {
		try {
			Optional<Account> account = accountRepository.findById(id);
			if(account.isPresent()) {
				return account.get();
			} else {
				throw new NoSuchElementException("Tài khoản không tồn tại");
			}
		} catch(Exception e) {
			throw new AccountException(e.getMessage(), e.getCause());
		}
	}

	public Account updateRoleByEmp(Integer id, RolesRequest rolesId) {
		try {
			Optional<Account> account = accountRepository.findById(id);
			if(account.isEmpty()) {
				throw new NoSuchElementException("Tài khoản không tồn tại");
			} else {
				Account old = modelMapper.map(account.get(), Account.class);
				List<Role> roles = new ArrayList<>();
				for(String role : rolesId.getRolesString()) {
					Role roleId = roleRepository.findRoleByName(role);
					roles.add(roleId);
				}
				old.setRoles(new HashSet<>(roles));
				accountRepository.save(old);
				return old;
			}
		} catch(Exception e) {
			throw new AccountException(e.getMessage(), e.getCause());
		}
	}

	public Role update(RolesDTO rolesDTO) {
		try {
			roleRepository.findById(rolesDTO.getId());
			Role role = modelMapper.map(rolesDTO, Role.class);
			return roleRepository.save(role);
		} catch(NoSuchElementException e) {
			throw new NoSuchElementException("Id không tồn tại");
		} catch(Exception ex) {
			throw new AccountException(ex.getMessage());
		}
	}

	public boolean delete(List<Integer> ids) {
		try {
			roleRepository.deleteAllByIdInBatch(ids);
			return true;
		} catch(Exception e) {
			throw new AccountException(e.getMessage());
		}
	}
}
