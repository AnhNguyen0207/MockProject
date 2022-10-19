package intern.sapo.be.service;
import intern.sapo.be.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import java.util.List;


public interface ICategoryService {
    Page<Category> findAll(Integer pageNumber, Integer limit, String sortBy,String sortDir, String value);

    List<Category> getAll(String valueInput);

    Category findById(Integer id);

    Category create(Category category, BindingResult bindingResult);

    Category update(Integer id, Category category, BindingResult bindingResult);

    void  deleteLíst(List<Integer> id);

}
