package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.base.ResponseListDto;
import intern.sapo.be.entity.Export;
import intern.sapo.be.repository.ExportRepository;
import intern.sapo.be.service.IExportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExportServiceImpl extends BaseService<Export> implements IExportService {
    private final ExportRepository repository;
    public ExportServiceImpl(IBaseRepo<Export, Integer> baseRepo, ExportRepository repository) {
        super(baseRepo);
        this.repository = repository;
    }

    @Override
    public ResponseListDto<Export> findExportByAll(Integer exportInventory,
                                                   Integer receiveInventory, Integer status, String code, Boolean cancel,
                                                   Integer page, Integer perPage, String sort, String sortBy) {
        Page<Export> pageList;
        List<Export> data;
        Sort sortList = sort.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        pageList = repository.findExportsByAll(exportInventory,
                receiveInventory, status,code, cancel,PageRequest.of(page - 1, perPage,sortList));

        data = pageList.getContent();
        long total = pageList.getTotalElements();
        ResponseListDto<Export> dto = new ResponseListDto<>();
        dto.setData(data);
        dto.setPage(page);
        dto.setPerPage(perPage);
        dto.setTotal(total);
        dto.setNumberPage((total % perPage == 0) ? (total / perPage) : (total / perPage + 1));
        dto.setBegin(page - 2 <= 1 ? 1 : page - 1);
        return dto;
    }
}
