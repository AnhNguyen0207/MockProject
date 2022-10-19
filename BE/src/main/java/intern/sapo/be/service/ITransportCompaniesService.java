package intern.sapo.be.service;

import intern.sapo.be.dto.request.CategoriesDTO;
import intern.sapo.be.dto.request.TransportCompaniesDTO;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface ITransportCompaniesService {
    List<TransportCompaniesDTO> findAll(Integer pageNumber, Integer limit, String sortBy);

    TransportCompaniesDTO findById(Integer id);

    TransportCompaniesDTO create(TransportCompaniesDTO transportCompaniesDTO, BindingResult bindingResult);

    TransportCompaniesDTO update(Integer id, TransportCompaniesDTO transportCompaniesDTO, BindingResult bindingResult);
}

