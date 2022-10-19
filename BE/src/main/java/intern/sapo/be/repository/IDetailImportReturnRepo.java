package intern.sapo.be.repository;

import intern.sapo.be.entity.DetailsReturnImport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDetailImportReturnRepo extends JpaRepository<DetailsReturnImport, Integer> {
}
