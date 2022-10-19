package intern.sapo.be.service.impl;

import intern.sapo.be.base.BaseService;
import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.ExportsStatus;
import intern.sapo.be.repository.ExportStatusRepository;
import intern.sapo.be.service.IExportStatusService;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ExportStatusServiceImpl extends BaseService<ExportsStatus> implements IExportStatusService {

    public ExportStatusServiceImpl(IBaseRepo<ExportsStatus, Integer> baseRepo, ExportStatusRepository repository) {
        super(baseRepo);
        this.repository = repository;
    }

    private final ExportStatusRepository repository;

    @Override
    public ExportsStatus findByExport(Integer export) {
        return repository.findByExport(export);
    }

    @Override
    public List<ExportsStatus> findByParentId(Integer parentId) {
        return repository.findByParentId(parentId);
    }

    @Override
    public ExportsStatus updateExportsStatus(ExportsStatus exportsStatus, Integer id) {
        ExportsStatus eStatus = repository.findByExport(id);
        if (eStatus.getCreateAt() != null) {
            exportsStatus.setCreateAt(eStatus.getCreateAt());
        }
        if (eStatus.getDateSend() != null) {
            exportsStatus.setDateSend(eStatus.getDateSend());
        }
        if (eStatus.getDateReceive() != null) {
            exportsStatus.setDateReceive(eStatus.getDateReceive());
        }
        if (eStatus.getAccountCreate() != null){
            exportsStatus.setAccountCreate(eStatus.getAccountCreate());
        }
        if(eStatus.getAccountSend()!= null){
            exportsStatus.setAccountSend(eStatus.getAccountSend());
        }
        if(eStatus.getAccountReceive()!= null){
            exportsStatus.setAccountReceive(eStatus.getAccountReceive());
        }
        if(eStatus.getAccountCancel()!= null){
            exportsStatus.setAccountCancel(eStatus.getAccountCancel());
        }
        exportsStatus.setCode(eStatus.getCode());
        return repository.save(exportsStatus);
    }
}
