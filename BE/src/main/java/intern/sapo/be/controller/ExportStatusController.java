package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.ExportsStatus;
import intern.sapo.be.service.IExportStatusService;

import java.util.List;

import javax.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/exportsStatus")
@PreAuthorize("hasAnyAuthority('admin','coordinator')")
public class ExportStatusController extends BaseController<ExportsStatus> {
    public ExportStatusController(IBaseService<ExportsStatus> baseService, IExportStatusService service) {
        super(baseService);
        this.service = service;
    }

    private final IExportStatusService service;

    @GetMapping("getByExport/{id}")
    public ExportsStatus findByExport(@PathVariable Integer id) {
        return service.findByExport(id);
    }
    @GetMapping("getByParentId/{id}")
    public List<ExportsStatus> findByParentId(@PathVariable Integer id) {
        return service.findByParentId(id);
    }
    @PutMapping("/{id}")
    public ExportsStatus updateExportsStatus(@RequestBody @Valid ExportsStatus request,
                                             @PathVariable(value = "id") Integer id) {
        return service.updateExportsStatus(request, id);
    }

}
