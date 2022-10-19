package intern.sapo.be.base;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.BindingResult;
import intern.sapo.be.base.ResponseListDto;
import java.util.List;
import java.util.Optional;

@Log4j2
@RequiredArgsConstructor
public abstract class  BaseService<T> implements IBaseService<T> {

    private final IBaseRepo<T, Integer> baseRepo;

    @Override
    public T save(T entity) {
        return baseRepo.save(entity);
    }

    @Override
    public Optional<T> findById(Integer entityId) {
        return baseRepo.findById(entityId);
    }

    @Override
    public T update(T entity) {
        return baseRepo.save(entity);
    }

    @Override
    public T updateById(T entity, Integer entityId) {
        T t  = baseRepo.findById(entityId).orElseThrow(() -> new IllegalArgumentException(("id not found: " + entityId ))) ;
        if (t != null) {
            return baseRepo.save(entity);
        } else {
            return null;
        }
    }

    @Override
    public void delete(T entity) {
        baseRepo.delete(entity);
    }

    @Override
    public void deleteById(Integer entityId) {
        baseRepo.deleteById(entityId);
    }

    @Override
    public ResponseListDto<T> getList(Integer page, Integer perPage, String sort, String sortBy) {
        Page<T> pageList;
        List<T> data;
        if (sort == null) {
                pageList = baseRepo.findAll(PageRequest.of(page - 1, perPage));
        } else {
            Sort sortList = sort.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
            pageList = baseRepo.findAll(PageRequest.of(page - 1, perPage, sortList));
        }
        data = pageList.getContent();
        long total = pageList.getTotalElements();
        ResponseListDto<T> dto = new ResponseListDto<>();
        dto.setData(data);
        dto.setPage(page);
        dto.setPerPage(perPage);
        dto.setTotal(total);
        dto.setNumberPage((total % perPage == 0) ? (total / perPage) : (total / perPage + 1));
        dto.setBegin(page - 2 <= 1 ? 1 : page - 1);
        return dto;
    }
}
