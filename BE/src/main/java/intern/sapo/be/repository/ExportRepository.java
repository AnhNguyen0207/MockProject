package intern.sapo.be.repository;

import intern.sapo.be.base.IBaseRepo;
import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.entity.Export;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExportRepository extends IBaseRepo<Export, Integer>  {
    List<Export> findAll();

    @Query(value = "SELECT e FROM Export e\n" +
            "JOIN ExportsStatus s ON e.id = s.export" +
            " where " +
            " (?1 is null or e.exportInventory.id = ?1)" +
            "and (?2 is null or e.receiveInventory.id = ?2)" +
            "and (?3 is null or s.status = ?3)" +
            "and (?4 is null or s.code like %?4%)" +
            "and (?5 is null or s.statusCancel = ?5)"  )
    Page<Export> findExportsByAll(Integer exportInventory,
                                  Integer receiveInventory, Integer status, String code,
                                  Boolean cancel,
                                  Pageable pageable);
}
