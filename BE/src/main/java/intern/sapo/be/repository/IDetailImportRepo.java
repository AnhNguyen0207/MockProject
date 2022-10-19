package intern.sapo.be.repository;

import intern.sapo.be.entity.DetailsImport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IDetailImportRepo extends JpaRepository<DetailsImport, Long> {

    Optional<DetailsImport> findById(Integer id);
}
