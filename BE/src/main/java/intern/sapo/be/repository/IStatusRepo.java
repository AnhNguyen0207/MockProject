package intern.sapo.be.repository;

import intern.sapo.be.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStatusRepo extends JpaRepository<Status, Integer> {
    Status findByCode(String import01);


}
