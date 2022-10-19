package intern.sapo.be.controller;

import intern.sapo.be.dto.request.CategoriesDTO;
import intern.sapo.be.dto.request.TransportCompaniesDTO;
import intern.sapo.be.service.ITransportCompaniesService;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Log4j2
@CrossOrigin("*")
@RequestMapping("/api/transport_companies")
@AllArgsConstructor
@RestController
@PreAuthorize("hasAnyAuthority('admin','stocker')")
public class TransportCompaniesController {
    private final ITransportCompaniesService iTransportCompaniesService;

    @GetMapping("")
    public List<TransportCompaniesDTO> getAll(@RequestParam(value = "page", required = false) Integer pageNumber,
                                              @RequestParam(value = "limit", required = false) Integer limit,
                                              @RequestParam(value = "sortby", required = false) String sortBy){
        return iTransportCompaniesService.findAll(pageNumber,limit,sortBy);
    }

    @GetMapping("/{id}")
    public TransportCompaniesDTO getById(@PathVariable(value = "id") Integer id)
    {
        return iTransportCompaniesService.findById(id);
    }

    @PostMapping("")
    public TransportCompaniesDTO create(@RequestBody @Valid TransportCompaniesDTO transportCompaniesDTO, BindingResult bindingResult) {
        return iTransportCompaniesService.create(transportCompaniesDTO,bindingResult);
    }


    @PutMapping("/{id}")
    public TransportCompaniesDTO update (@RequestBody @Valid TransportCompaniesDTO transportCompaniesDTO,BindingResult bindingResult,
                                 @PathVariable(value = "id") Integer id){
        return iTransportCompaniesService.update(id,transportCompaniesDTO,bindingResult);
    }
}
