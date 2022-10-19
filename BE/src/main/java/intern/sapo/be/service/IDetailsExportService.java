package intern.sapo.be.service;

import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.DetailsExport;

import java.util.List;

public interface IDetailsExportService extends IBaseService<DetailsExport> {
    List<DetailsExport> saveAll(Iterable<DetailsExport> entities);

    List<DetailsExport> findByExportId(Integer id);
     void  deleteByExportId(Integer id);
}
