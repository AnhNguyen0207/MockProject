package intern.sapo.be.service;

import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.entity.DetailsImport;
import intern.sapo.be.entity.InventoriesProductVariant;

import java.util.List;

public interface IInventoriesProductVariantService {

   InventoriesProductVariant findByInventoryIdAndProductVariantId(Integer inventoryId, Integer productVariantId);

   void importProductVariantToInventory(List<DetailsImport> list, Integer inventoryId);

   void exportProductVariantToInventory(List<DetailsExport> detailsExports, Integer inventoryId);
   void importQuantityProductVariantToInventory(List<DetailsExport> detailsExports, Integer inventoryId);

}
