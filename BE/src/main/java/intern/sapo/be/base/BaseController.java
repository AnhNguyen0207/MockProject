package intern.sapo.be.base;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@CrossOrigin("*")
public abstract class BaseController<T> {

    private final IBaseService<T> baseService;

    @PostMapping
    public T save(@RequestBody @Valid T request) {
        return baseService.save(request);
    }

    @PatchMapping("/{id}")
    public T update(@RequestBody @Valid T request, @PathVariable(value = "id") Integer id) {
        return baseService.updateById(request, id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        baseService.deleteById(id);
    }

    @GetMapping
    public ResponseListDto<T> listAll(@RequestParam(defaultValue = "1") Integer page,
                                      @RequestParam(defaultValue = "10") Integer perPage,
                                      @RequestParam(required = false, defaultValue = "desc") String sort,
                                      @RequestParam(required = false, defaultValue = "id") String sortBy) {
        return baseService.getList(page, perPage, sort, sortBy);
    }

    @GetMapping("{id}")
    public Optional<T> findById(@PathVariable(value = "id") Integer id) {
        return baseService.findById(id);
    }
}
