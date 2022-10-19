package intern.sapo.be.service;

import intern.sapo.be.dto.response.ImportInvoice.ImportStatusResponse;
import intern.sapo.be.entity.ImportsStatus;

import java.util.List;

public interface IImportsStatusService {

    ImportsStatus save(ImportsStatus importsStatus);


    ImportsStatus findByImportIdAndStatusId(Integer importId, Integer statusId);

    List<ImportStatusResponse> findDetailsImportStatus(Integer importId);
}
