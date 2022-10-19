package intern.sapo.be.repository;

import intern.sapo.be.entity.Category;
import intern.sapo.be.entity.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface ICategoryRepo extends JpaRepository<Category,Integer>{

    @Query(value = "call get_categoriesByIdorName(?1)", nativeQuery = true)
    Page<Category> findAllByPage(String value, Pageable pageable);

    @Transactional
    @Query(value = "call delete_category(?1)", nativeQuery = true)
    void delete(Integer id);

    @Transactional
    @Query(value = "call get_categoriesByIdorName(?1)", nativeQuery = true)
    List<Category> getAllByName(String valueInput);

    @Query("select c from Category c inner join CategoriesProduct cp on c.id=cp.category.id where cp.product.id=:id")
    List<Category> findAllByProductId(@Param("id") Integer id);


}