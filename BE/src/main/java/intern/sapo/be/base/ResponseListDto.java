package intern.sapo.be.base;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public  class ResponseListDto<T> {
    Integer page;
    Integer perPage;
    List<T> data;
    long total;
    long numberPage;
    int begin;
}