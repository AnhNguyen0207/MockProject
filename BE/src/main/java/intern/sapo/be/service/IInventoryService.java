package intern.sapo.be.service;

import intern.sapo.be.dto.request.Inventory.ListIdRequest;
import intern.sapo.be.dto.request.ProductVariantsDTO;
import intern.sapo.be.dto.response.Product.Inventory.InventoryResponse;
import intern.sapo.be.entity.InventoriesProductVariant;
import intern.sapo.be.entity.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import java.util.List;

public interface IInventoryService {
    Page<Inventory> findAllBypPage(Integer pageNumber, Integer pageSize, String sortBy, String sortDir, String name, String code);

    List<Inventory> findAll();

    List<Inventory> findAllActiveInventory();

    Inventory findById(Integer id);

    Inventory create(Inventory inventory, BindingResult bindingResult);

    Inventory update(Integer id, Inventory inventory, BindingResult bindingResult);

    void delete (Integer id);

    void updateStatusInventory(Integer id);

    InventoryResponse getProductVariantByInventoryId(Integer id, String name);

    void deleteListProductVanriant(ListIdRequest listIdRequest);

    InventoriesProductVariant changeMinQuantity(Integer inventoryId, Integer productVariantId, Integer minQuantity);

    List<ProductVariantsDTO> findInventoriesQuantity(Integer id);

}