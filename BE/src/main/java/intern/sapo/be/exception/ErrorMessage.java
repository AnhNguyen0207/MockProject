package intern.sapo.be.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
import java.util.List;
@Data
@ToString
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class ErrorMessage {
    private String code;
    private String message;
}
