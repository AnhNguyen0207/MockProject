package intern.sapo.be.repository;
import intern.sapo.be.entity.TransportCompany;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ITransportCompaniesRepo extends JpaRepository<TransportCompany,Integer> {
    @Transactional
    @Query("select t from TransportCompany t")
    List<TransportCompany> getAll(Pageable pageable);
}
