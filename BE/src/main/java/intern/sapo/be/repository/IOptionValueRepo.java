package intern.sapo.be.repository;

import intern.sapo.be.entity.OptionValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOptionValueRepo  extends JpaRepository<OptionValue,Integer> {
}
