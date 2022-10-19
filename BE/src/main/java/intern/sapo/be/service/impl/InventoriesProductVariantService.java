package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.InventoriesProductVariantDTO;
import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.entity.DetailsImport;
import intern.sapo.be.entity.InventoriesProductVariant;
import intern.sapo.be.repository.IInventoriesProductVariantRepo;
import intern.sapo.be.service.IInventoriesProductVariantService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InventoriesProductVariantService implements IInventoriesProductVariantService {

    private final IInventoriesProductVariantRepo inventoriesProductVariantRepo;


    @Override
    public InventoriesProductVariant findByInventoryIdAndProductVariantId(Integer inventoryId, Integer productVariantId) {
        return inventoriesProductVariantRepo.findByInventoryIdAndProductVariantId(inventoryId, productVariantId);
    }

    @Override
    public void importProductVariantToInventory(List<DetailsImport> list, Integer inventoryId) {
        ModelMapper modelMapper = new ModelMapper();
        if (inventoryId == null) {
            throw new IllegalArgumentException("id not found");
        }
        for (DetailsImport detailsImport : list) {
            Integer productVariantId = detailsImport.getProduct_variant_id();
            InventoriesProductVariant inventoriesProductVariant = inventoriesProductVariantRepo
                    .findByInventoryIdAndProductVariantId(inventoryId, productVariantId);
            if (inventoriesProductVariant == null) {
                InventoriesProductVariantDTO inDTO = new InventoriesProductVariantDTO(inventoryId, productVariantId, detailsImport.getQuantity());
                InventoriesProductVariant in = modelMapper.map(inDTO, InventoriesProductVariant.class);
                inventoriesProductVariantRepo.save(in);
            } else {
                inventoriesProductVariant.setQuantity(inventoriesProductVariant.getQuantity() + detailsImport.getQuantity());
                inventoriesProductVariantRepo.save(inventoriesProductVariant);
            }
        }
    }

    @Override
    public void exportProductVariantToInventory(List<DetailsExport> detailsExports, Integer inventoryId) {
        for(DetailsExport proId : detailsExports){
            InventoriesProductVariant inventoriesProductVariant = inventoriesProductVariantRepo
                    .findByInventoryIdAndProductVariantId(inventoryId, proId.getProductVariant().getId());
            inventoriesProductVariant.setQuantity(inventoriesProductVariant.getQuantity()-proId.getQuantity());
            inventoriesProductVariantRepo.save(inventoriesProductVariant);
        }
    }

    @Override
    public void importQuantityProductVariantToInventory(List<DetailsExport> detailsExports, Integer inventoryId) {
        ModelMapper modelMapper = new ModelMapper();
        for(DetailsExport proId : detailsExports){
            InventoriesProductVariant inventoriesProductVariant = inventoriesProductVariantRepo
                    .findByInventoryIdAndProductVariantId(inventoryId, proId.getProductVariant().getId());
            if (inventoriesProductVariant == null) {
                InventoriesProductVariantDTO inDTO = new InventoriesProductVariantDTO(inventoryId, proId.getProductVariant().getId(),proId.getQuantity());
                InventoriesProductVariant in = modelMapper.map(inDTO, InventoriesProductVariant.class);
                inventoriesProductVariantRepo.save(in);
            }else {
                inventoriesProductVariant.setQuantity(inventoriesProductVariant.getQuantity() + proId.getQuantity());
                inventoriesProductVariantRepo.save(inventoriesProductVariant);
            }
        }
    }
}
