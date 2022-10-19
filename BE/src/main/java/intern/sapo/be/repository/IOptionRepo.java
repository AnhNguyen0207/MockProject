package intern.sapo.be.repository;

import intern.sapo.be.entity.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOptionRepo extends JpaRepository<Option,Integer> {
}
