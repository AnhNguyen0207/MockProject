package intern.sapo.be.service.impl;

import intern.sapo.be.dto.response.ImportInvoice.DetailsImportsInvoiceResponse;
import intern.sapo.be.dto.response.ImportInvoice.DetailsReturnImportResponse;
import intern.sapo.be.dto.response.ImportInvoice.ImportResponse;
import intern.sapo.be.dto.response.ImportInvoice.ReturnImportInvoiceResponse;
import intern.sapo.be.entity.Import;
import intern.sapo.be.entity.ImportsStatus;
import intern.sapo.be.repository.*;
import intern.sapo.be.service.IDetailsImportService;
import intern.sapo.be.service.IImportService;
import intern.sapo.be.service.IInventoriesProductVariantService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
@AllArgsConstructor
public class ImportService implements IImportService {

    private final IImportRepo importRepo;

    private final ImportStatusService importStatusService;

    private final IStatusRepo statusRepo;
    private final ISupplierRepo supplierRepo;

    private final InventoryRepository inventoryRepository;
    private final EntityManager entityManager;

    private final IDetailsImportService detailsImportService;

    private final IReturnImportRepo returnImportRepo;

    private final JdbcTemplate jdbcTemplate;

    private final ModelMapper modelMapper;
    private final IInventoriesProductVariantService inventoriesProductVariantService;

    @Override
    public List<Import> findAll() {
        return importRepo.findAll();
    }

    @Override
    public List<ImportResponse> findAllImportDTO(String searchValue) {
        String query = "call filter_import_invoice(?)";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper(ImportResponse.class), searchValue);
    }

    @Override
    public Import save(Import importField) {
        Import anImport = importRepo.save(importField);
        updateStatus(anImport.getId(), "IMPORT01");
        return anImport;
    }

    public boolean checkStatusExitsInImport(Integer importId, Integer statusId) {
        if (statusId == 5) {
            return true;
        }
        var statusInImport = importStatusService.findByImportIdAndStatusId(importId, statusId);
        return statusInImport == null;
    }

    public void updateStatus(Integer importId, String code) {
        ImportsStatus importsStatus = new ImportsStatus();
        Integer statusId = statusRepo.findByCode(code).getId();
        if (checkStatusExitsInImport(importId, statusId)) {
            importsStatus.setImportId(importId);
            importsStatus.setStatusId(statusId);
            importsStatus.setCreateAt(Timestamp.from(Instant.now()));
            importStatusService.save(importsStatus);
        }
    }


    @Override
    public void updateStatusImport(Integer importId, String chooses) {
        Import anImport = importRepo.findById(importId).orElseThrow(() -> new IllegalArgumentException(("id not found: " + importId)));
        switch (chooses) {
            case "paidPayment": {
                updateStatus(importId, "IMPORT02");
                anImport.setIsPaid(true);
                if (anImport.getIsImport() && anImport.getIsPaid()) {
                    anImport.setIsDone(true);
                }
                anImport.setIsImport(false);
                break;
            }
            case "importWarehouse": {
                updateStatus(importId, "IMPORT03");
                anImport.setIsImport(true);
                break;
            }

            case "paidPaymentAndImportWarehouse": {
                updateStatus(importId, "IMPORT02");
                anImport.setIsImport(true);
                updateStatus(importId, "IMPORT03");
                anImport.setIsPaid(true);
                break;
            }
        }
        if (anImport.getIsImport()) {
            ;
            inventoriesProductVariantService.importProductVariantToInventory(anImport.getDetailsImports(), anImport.getInventoryId());
        }
        if (anImport.getIsDone()) {
            anImport.setIsImport(true);
        }
        if (anImport.getIsImport() && anImport.getIsPaid()) {
            anImport.setIsDone(true);
        }

        importRepo.save(anImport);
    }

    @Override
    public void updateStatusImportReturn(Integer importId, String chooses) {
        Import anImport = importRepo.findById(importId).orElseThrow(() -> new IllegalArgumentException(("id not found: " + importId)));
        updateStatus(importId, "IMPORT04");
        anImport.setIsReturn(true);
        importRepo.save(anImport);

    }


    @Override
    public DetailsImportsInvoiceResponse getDetailInvoiceByCode(String code) {
        DetailsImportsInvoiceResponse dImportResponse = new DetailsImportsInvoiceResponse();
        var im = importRepo.findByCode(code).orElseThrow(() -> new IllegalArgumentException(("code not found: " + code)));
        dImportResponse.setAnImport(im);
        dImportResponse.setSupplier(supplierRepo.findById(im.getSupplierId()).get());
        dImportResponse.setInventoryName(inventoryRepository.findById(im.getInventoryId()).get().getName());
        return dImportResponse;
    }

    @Override
    public List<DetailsReturnImportResponse> getAllReturnImport(String code) {
        Query query = entityManager.createNamedQuery("getImportReturnDTO");
        query.setParameter(1, code);
        return (List<DetailsReturnImportResponse>) query.getResultList();
    }

    @Override
    public List<ReturnImportInvoiceResponse> getDetailsReturnImport(String code) {
        Import anImport = importRepo.findByCode(code).orElseThrow(() -> new IllegalArgumentException(("code not found: " + code)));
        Type listType = new TypeToken<List<ReturnImportInvoiceResponse>>() {
        }.getType();
        List<ReturnImportInvoiceResponse> invoiceResponseList = modelMapper.map(returnImportRepo.findByImportId(anImport.getId()), listType);
        for (ReturnImportInvoiceResponse response : invoiceResponseList) {
            Query query = entityManager.createNamedQuery("getImportReturnDTOResponse");
            query.setParameter(1, response.getId());
            List<DetailsReturnImportResponse> list = (List<DetailsReturnImportResponse>) query.getResultList();
            BigDecimal total = BigDecimal.ZERO;
            for (DetailsReturnImportResponse detailsImportsInvoiceResponse : list) {
                total = total.add(detailsImportsInvoiceResponse.getTotalPrice());
            }
            response.setTotalPrice(total);
            response.setDetailsReturnImportResponseList(list);
        }
        return invoiceResponseList;
    }
}
