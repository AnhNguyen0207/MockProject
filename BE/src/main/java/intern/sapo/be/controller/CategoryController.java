package intern.sapo.be.controller;

import intern.sapo.be.entity.Category;
import intern.sapo.be.entity.Inventory;
import intern.sapo.be.service.ICategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@CrossOrigin("*")
@RequestMapping("/api/categories")
@AllArgsConstructor
@PreAuthorize("hasAnyAuthority('admin','warehouse')")
public class CategoryController {
    public final ICategoryService iCategoryService;

    @GetMapping("")
    public ResponseEntity getAllByPage(@RequestParam(value = "page", required = true, defaultValue = "1") Integer pageNumber,
                                        @RequestParam(value = "limit", required = true, defaultValue = "10") Integer limit,
                                        @RequestParam(value = "sortby", required = false,defaultValue = "id") String sortBy,
                                        @RequestParam(value = "sortdir", required = false,defaultValue = "desc") String sortDir,
                                        @RequestParam(value = "value", required = false) String value){
        Page<Category> categories = iCategoryService.findAll(pageNumber,limit,sortBy,sortDir, value);
        Map<String, Object> results = new HashMap<>();
        results.put("data", categories.getContent());
        results.put("total", categories.getTotalElements());
        results.put("from", categories.getSize() * categories.getNumber() + 1);
        results.put("to", categories.getSize() * categories.getNumber() + categories.getNumberOfElements());
        return ResponseEntity.ok(results);
    }

    @GetMapping("/findall")
    public List<Category> getdAll(@RequestParam(value = "valueInput", required = false) String valueInput){
        return iCategoryService.getAll(valueInput);
    }

    @GetMapping("/category/{id}")
    public Category getById(@PathVariable(value = "id") Integer id)
    {
        return iCategoryService.findById(id);
    }

    @PostMapping("/category")
    public Category create(@RequestBody @Valid Category category, BindingResult bindingResult) {
        return iCategoryService.create(category,bindingResult);
    }


    @PutMapping("/category/{id}")
    public Category update (@RequestBody @Valid Category category,BindingResult bindingResult,
                                 @PathVariable(value = "id") Integer id){
        return iCategoryService.update(id,category,bindingResult);
    }

    @PostMapping("/delete")
    public void deleteList (@RequestBody List<Integer> id){
        iCategoryService.deleteLíst(id);
    }


}
