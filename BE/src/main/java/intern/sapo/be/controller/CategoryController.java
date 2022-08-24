package intern.sapo.be.controller;

import intern.sapo.be.dto.request.CategoriesDTO;
import intern.sapo.be.entity.Category;
import intern.sapo.be.service.ICategoryService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Log4j2
@CrossOrigin("*")
@RequestMapping("/api/categories")
@AllArgsConstructor
public class CategoryController {
    public final ICategoryService iCategoryService;

    @GetMapping("")
    public List<CategoriesDTO> getAll(@RequestParam(value = "page", required = false) Integer pageNumber,
                                      @RequestParam(value = "limit", required = false) Integer limit,
                                      @RequestParam(value = "sortby", required = false) String sortBy){
        return iCategoryService.findAll(pageNumber,limit,sortBy);
    }

    @GetMapping("/category/{id}")
    public CategoriesDTO getById(@PathVariable(value = "id") Integer id)
    {
        return iCategoryService.findById(id);
    }

    @PostMapping("/category")
    public CategoriesDTO create(@RequestBody @Valid CategoriesDTO categoriesDTO, BindingResult bindingResult) {
        return iCategoryService.create(categoriesDTO,bindingResult);
    }


    @PutMapping("/category/{id}")
    public CategoriesDTO update (@RequestBody @Valid CategoriesDTO categoriesDTO,BindingResult bindingResult,
                                 @PathVariable(value = "id") Integer id){
        return iCategoryService.update(id,categoriesDTO,bindingResult);
    }

    @PostMapping("/delete")
    public void delete (@RequestBody List<Integer> id){
        iCategoryService.delete(id);
    }

}



