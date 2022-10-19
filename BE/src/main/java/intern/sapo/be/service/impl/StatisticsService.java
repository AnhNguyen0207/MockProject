package intern.sapo.be.service.impl;

import intern.sapo.be.dto.request.Statistics.StatisticsImportRequest;
import intern.sapo.be.dto.request.Statistics.StatisticsInventoryRequest;
import intern.sapo.be.dto.response.Statistics.StatisticsImportResponse;
import intern.sapo.be.dto.response.Statistics.StatisticsInventoryRespone;
import intern.sapo.be.service.IStatisticsService;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatisticsService implements IStatisticsService {
    private final JdbcTemplate jdbcTemplate;

    public StatisticsService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<StatisticsImportResponse> getStatisticsImport(StatisticsImportRequest request) {
        String sql = "call mock_tts_10.get_statistic_import(?, ?,?, ?,?, ?, ?, ?,?);";

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(StatisticsImportResponse.class), request.getInventoryId()
                , request.getSupplierId(), request.getStartDate(), request.getEndDate(), request.getSortBy(), request.isSortDir(), request.getPage(), request.getSize(),request.getKeySearch()
        );

    }

    @Override
    public List<StatisticsImportResponse> getStatisticsImportExtend(StatisticsImportRequest request) {
        String sql = "call mock_tts_10.get_statistic_import_extend(?, ?,?, ?,?, ?, ?, ?,?);";

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(StatisticsImportResponse.class), request.getInventoryId()
                , request.getSupplierId(), request.getStartDate(), request.getEndDate(), request.getSortBy(), request.isSortDir(), request.getPage(), request.getSize(),request.getKeySearch()
        );

    }
    @Override
    public List<StatisticsInventoryRespone> getStatisticsInventory(StatisticsInventoryRequest request) {
        String sql = "call mock_tts_10.get_statistic_inventory(?, ?,?, ?,?, ?, ?,?);";

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(StatisticsInventoryRespone.class), request.getInventoryId()
                , request.getStartDate(), request.getEndDate(), request.getSortBy(), request.isSortDir(), request.getPage(), request.getSize(),request.getKeySearch()
        );

    }

}
