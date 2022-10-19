package intern.sapo.be.service.impl;
import intern.sapo.be.dto.request.TransportCompaniesDTO;
import intern.sapo.be.entity.TransportCompany;
import intern.sapo.be.repository.ITransportCompaniesRepo;
import intern.sapo.be.service.ITransportCompaniesService;
import intern.sapo.be.security.jwt.util.Utils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class TransportCompaniesService implements ITransportCompaniesService {
    private final ITransportCompaniesRepo iTransportCompaniesRepo;
    private final ModelMapper modelMapper;
    private final Utils utils;

    private TransportCompaniesDTO toDto(TransportCompany transportCompany){
        TransportCompaniesDTO transportCompaniesDTO  = modelMapper.map(transportCompany,TransportCompaniesDTO.class);
        return  transportCompaniesDTO;
    }

    private TransportCompany toEntity(TransportCompaniesDTO transportCompaniesDTO){
        TransportCompany transportCompany = modelMapper.map(transportCompaniesDTO,TransportCompany.class);
        return transportCompany;
    }

    @Override
    public List<TransportCompaniesDTO> findAll(Integer pageNumber, Integer limit, String sortBy) {
        List<TransportCompaniesDTO> results = new ArrayList<>();

        if(pageNumber != null && limit != null) {
            if (sortBy == null) {
                sortBy = "name";
            }
            Pageable pageable = PageRequest.of(pageNumber - 1, limit, Sort.by(sortBy).ascending());
            List<TransportCompany> transportCompanies = iTransportCompaniesRepo.getAll(pageable);
            for (TransportCompany item : transportCompanies) {
                TransportCompaniesDTO transportCompaniesDTO = toDto(item);
                results.add(transportCompaniesDTO);
            }
            return results;
        }else{
            List<TransportCompany> transportCompanies = iTransportCompaniesRepo.findAll();
            for (TransportCompany item : transportCompanies) {
                TransportCompaniesDTO transportCompaniesDTO = toDto(item);
                results.add(transportCompaniesDTO);
            }
            return results;
        }
    }

    @Override
    public TransportCompaniesDTO findById(Integer id) {
        TransportCompany transportCompany = iTransportCompaniesRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found: " + id));
        TransportCompaniesDTO transportCompaniesDTO = toDto(transportCompany);
        return transportCompaniesDTO;
    }

    @Override
    public TransportCompaniesDTO create(TransportCompaniesDTO transportCompaniesDTO , BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw utils.invalidInputException(bindingResult);
        }
        TransportCompany transportCompany = toEntity(transportCompaniesDTO);
        iTransportCompaniesRepo.save(transportCompany);
        transportCompaniesDTO = toDto(transportCompany);
        return transportCompaniesDTO;
    }

    @Override
    public TransportCompaniesDTO update(Integer id, TransportCompaniesDTO transportCompaniesDTO, BindingResult bindingResult) {
        TransportCompany transportCompany = iTransportCompaniesRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id not found:" + id));
        BindingResult result = utils.getListResult(bindingResult, transportCompaniesDTO);
        if (result.hasErrors()) {
            throw utils.invalidInputException(result);
        } else {
            if (transportCompany != null)
            {
                transportCompaniesDTO.setId(id);
                transportCompaniesDTO.setCreateAt(transportCompany.getCreateAt());
                transportCompany = toEntity(transportCompaniesDTO);
                iTransportCompaniesRepo.save(transportCompany);
                transportCompaniesDTO = toDto(transportCompany);
            }
            return transportCompaniesDTO;
        }
    }
}
