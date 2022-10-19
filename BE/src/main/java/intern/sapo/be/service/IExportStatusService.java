package intern.sapo.be.service;

import java.util.List;

import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.Export;
import intern.sapo.be.entity.ExportsStatus;

public interface IExportStatusService extends IBaseService<ExportsStatus> {
    ExportsStatus findByExport(Integer export);
    List<ExportsStatus> findByParentId(Integer parentId);

    ExportsStatus updateExportsStatus(ExportsStatus exportsStatus, Integer id);
}
