package intern.sapo.be.exception;

import lombok.*;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AlreadyExistsException extends RuntimeException{
    private String message;
}
