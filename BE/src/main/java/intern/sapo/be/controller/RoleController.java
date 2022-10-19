package intern.sapo.be.controller;

import intern.sapo.be.dto.payload.RolesRequest;
import intern.sapo.be.dto.request.RolesDTO;
import intern.sapo.be.entity.Role;
import intern.sapo.be.service.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/roles")
@CrossOrigin("*")
@PreAuthorize("hasAnyAuthority('admin')")
@AllArgsConstructor
public class RoleController {
	RoleService roleService;

	@GetMapping
	public ResponseEntity<Object> getRoles(@RequestParam(required = false) Integer id) {
		if(id == null) {
			return ResponseEntity.ok(roleService.getAll());
		}

		return ResponseEntity.ok(roleService.getOne(id));
	}

	@GetMapping("{page}")
	public ResponseEntity<Object> getRole(@RequestParam(defaultValue = "10") Integer size, @PathVariable Integer page) {
		Page<Role> roles = roleService.getAll(size, page);
		Map<String, Object> result = new HashMap<>();
		result.put("data", roles.getContent());
		result.put("total", roles.getTotalElements());
		result.put("from", roles.getSize() * roles.getNumber() + 1);
		result.put("to", roles.getSize() * roles.getNumber() + roles.getNumberOfElements());
		return ResponseEntity.ok(result);
	}

	@GetMapping("emp/{id}")
	public ResponseEntity<Object> getRoleByEmp(@PathVariable Integer id) {
		return ResponseEntity.ok(roleService.getRoleByEmp(id));
	}

	@PatchMapping()
	public ResponseEntity<Object> updateRole(@RequestBody RolesDTO rolesDTO) {
		return ResponseEntity.ok(roleService.update(rolesDTO));
	}

	@PostMapping
	public ResponseEntity<Object> addRole(@RequestBody RolesDTO rolesDTO) {
		return ResponseEntity.ok(roleService.save(rolesDTO));
	}

	@PatchMapping("emp/{id}")
	public ResponseEntity<Object> updateRoleByEmp(@PathVariable Integer id, @RequestBody RolesRequest roleIds) {
		return ResponseEntity.ok(roleService.updateRoleByEmp(id, roleIds));
	}

	@DeleteMapping()
	public ResponseEntity<Object> deleteRoles(@RequestBody List<Integer> ids) {
		return ResponseEntity.ok(roleService.delete(ids));
	}
}
