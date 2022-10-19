package intern.sapo.be.repository;

import intern.sapo.be.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepo extends JpaRepository<Product,Integer> {

    @Query(value = "select * from  products  order by id DESC limit 1",nativeQuery = true)
    Product getTop();


    @Query(value = "call count_product_by_filter(:key,:sortBy,:isDesc,:page,:size,:isDelete)",nativeQuery = true)
    Integer countProductByFilter(@Param("key") String key, @Param("sortBy") String sortBy, @Param("isDesc") Boolean isDesc,
                               @Param("page") Integer page, @Param("size") Integer size, @Param("isDelete") Boolean isDelete);

}
