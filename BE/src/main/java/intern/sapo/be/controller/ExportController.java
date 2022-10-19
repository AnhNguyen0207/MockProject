package intern.sapo.be.controller;

import intern.sapo.be.base.BaseController;
import intern.sapo.be.base.IBaseService;
import intern.sapo.be.base.ResponseListDto;
import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.entity.Export;
import intern.sapo.be.service.IExportService;
import intern.sapo.be.service.IInventoriesProductVariantService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("exports")
@PreAuthorize("hasAnyAuthority('admin','coordinator')")
public class ExportController extends BaseController<Export> {
    private final IInventoriesProductVariantService inventoriesProductVariantService;
    private final IExportService service;

    public ExportController(IBaseService<Export> baseService, IInventoriesProductVariantService inventoriesProductVariantService, IExportService service) {
        super(baseService);
        this.inventoriesProductVariantService = inventoriesProductVariantService;
        this.service = service;
    }
    @PutMapping("add/{id}")
    public void updateExportsStatus(@RequestBody @Valid List<DetailsExport> request,
                                             @PathVariable(value = "id") Integer id) {
         inventoriesProductVariantService.exportProductVariantToInventory(request, id);
    }
    @PutMapping("import/{id}")
    public void importExportsStatus(@RequestBody @Valid List<DetailsExport> request,
                                    @PathVariable(value = "id") Integer id) {
        inventoriesProductVariantService.importQuantityProductVariantToInventory(request, id);
    }
    @GetMapping("getExportByAll")
    public ResponseListDto<Export> findByParentId(@RequestParam(required = false) String code,
                                                  @RequestParam(required = false) String createAt,
                                                  @RequestParam(required = false) String dateSend,
                                                  @RequestParam(required = false) String dateReceive,
                                                  @RequestParam(required = false) String dateCancel,
                                                  @RequestParam(required = false) Integer exportInventory,
                                                  @RequestParam(required = false) Integer receiveInventory,
                                                  @RequestParam(required = false) Integer status,
                                                  @RequestParam(required = false) Boolean cancel,
                                                  @RequestParam(defaultValue = "1") Integer page,
                                                  @RequestParam(defaultValue = "10") Integer perPage,
                                                  @RequestParam(required = false, defaultValue = "desc") String sort,
                                                  @RequestParam(required = false, defaultValue = "id") String sortBy) {
        return service.findExportByAll( exportInventory,
                 receiveInventory,status,code,cancel,page,perPage,sort,sortBy);
    }
}
