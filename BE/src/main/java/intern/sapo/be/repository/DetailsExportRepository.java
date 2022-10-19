package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.DetailsExport;

import java.util.List;

public interface DetailsExportRepository extends IBaseRepo<DetailsExport, Integer> {

    List<DetailsExport> findDetailsExportByExport(Integer id);
}
