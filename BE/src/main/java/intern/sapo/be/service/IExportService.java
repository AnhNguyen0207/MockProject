package intern.sapo.be.service;

import intern.sapo.be.base.IBaseService;
import intern.sapo.be.base.ResponseListDto;
import intern.sapo.be.entity.Export;

import java.util.List;

public interface IExportService extends IBaseService<Export> {
    ResponseListDto<Export> findExportByAll(Integer exportInventory, Integer receiveInventory,
                                            Integer status, String code, Boolean cancel, Integer page,
                                            Integer perPage, String sort, String sortBy);
}
