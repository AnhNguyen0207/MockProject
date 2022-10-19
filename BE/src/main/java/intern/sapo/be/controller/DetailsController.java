package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.service.IDetailsExportService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/details")
@PreAuthorize("hasAnyAuthority('admin','coordinator')")
public class DetailsController extends BaseController<DetailsExport> {
    private final IDetailsExportService service;

    public DetailsController(IBaseService<DetailsExport> baseService, IDetailsExportService service) {
        super(baseService);
        this.service = service;
    }

    @PostMapping("createAll")
    public List<DetailsExport> saveAll(@RequestBody @Valid Iterable<DetailsExport> request) {
        return service.saveAll(request);
    }

    @GetMapping("getByExport/{id}")
    public List<DetailsExport> findByExport(@PathVariable Integer id) {
        return service.findByExportId(id);
    }

    @DeleteMapping("getByExport/{id}")
    public void deleteByExport(@PathVariable Integer id) {
         service.deleteByExportId(id);
    }

}
