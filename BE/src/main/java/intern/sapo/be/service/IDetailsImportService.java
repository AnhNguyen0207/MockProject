package intern.sapo.be.service;

import intern.sapo.be.entity.DetailsImport;

import java.util.List;

public interface IDetailsImportService {

    List<DetailsImport> save(List<DetailsImport> detailsImportList, Integer importId);
}
