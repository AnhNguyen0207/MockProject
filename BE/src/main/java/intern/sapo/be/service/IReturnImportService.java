package intern.sapo.be.service;

import intern.sapo.be.entity.DetailsReturnImport;
import intern.sapo.be.entity.ReturnImport;

import java.util.List;

public interface IReturnImportService {
    ReturnImport save(ReturnImport returnImport);

    void saveAllDetails(List<DetailsReturnImport> returnImport, Integer inventoryId, Integer importReturnId);

}
