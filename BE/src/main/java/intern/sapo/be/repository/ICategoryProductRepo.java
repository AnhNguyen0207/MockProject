package intern.sapo.be.repository;

import intern.sapo.be.entity.CategoriesProduct;
import intern.sapo.be.entity.CategoriesProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ICategoryProductRepo extends JpaRepository<CategoriesProduct, CategoriesProductId> {

    @Transactional
    @Modifying
    @Query("delete from CategoriesProduct c where c.product.id = ?1")
    void deleteAllByProductId(Integer id);


}