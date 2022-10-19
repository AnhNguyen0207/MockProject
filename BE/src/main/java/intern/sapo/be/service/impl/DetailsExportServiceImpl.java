package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.repository.DetailsExportRepository;
import intern.sapo.be.service.IDetailsExportService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DetailsExportServiceImpl extends BaseService<DetailsExport> implements IDetailsExportService {
    private final DetailsExportRepository repository;

    public DetailsExportServiceImpl(IBaseRepo<DetailsExport, Integer> baseRepo, DetailsExportRepository repository) {
        super(baseRepo);
        this.repository = repository;
    }

    @Override
    public List<DetailsExport> saveAll(Iterable<DetailsExport> entities) {
        return repository.saveAll(entities);
    }

    @Override
    public List<DetailsExport> findByExportId(Integer id) {
        return repository.findDetailsExportByExport(id);
    }

    @Override
    public void deleteByExportId(Integer id) {
        List<DetailsExport> list = findByExportId(id);
        for (DetailsExport detailsExport: list) {
            repository.deleteById(detailsExport.getId());
        }
    }

}
