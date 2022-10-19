package intern.sapo.be.exception;

import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeType;
import org.springframework.validation.BindException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.validation.ConstraintViolation;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class CustomRestExceptionHandler extends ResponseEntityExceptionHandler {
    //    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ErrorMessage> handleSystemError(Exception e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessage.builder().message(e.getMessage()).build());
//    }
//    @ExceptionHandler({
//            MethodArgumentTypeMismatchException.class,
//            TypeMismatchException.class
//    })

    //    public ResponseEntity<Map<String, String>> handleException(TypeMismatchException e) {
//        Map<String, String> errorResponse = new HashMap<>();
//        errorResponse.put("message", e.getLocalizedMessage());
//        errorResponse.put("status", HttpStatus.BAD_REQUEST.toString());
//        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//    }
//    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
//    public ResponseEntity<Map<String, String>> handleException(
//            HttpMediaTypeNotSupportedException e) {
//
//        String provided = e.getContentType().toString();
//        List<String> supported = e.getSupportedMediaTypes().stream()
//                .map(MimeType::toString)
//                .collect(Collectors.toList());
//
//        String error = provided + " is not one of the supported media types (" +
//                String.join(", ", supported) + ")";
//
//        Map<String, String> errorResponse = new HashMap<>();
//        errorResponse.put("error", error);
//        errorResponse.put("message", e.getLocalizedMessage());
//        errorResponse.put("status", HttpStatus.UNSUPPORTED_MEDIA_TYPE.toString());
//
//        return new ResponseEntity<>(errorResponse, HttpStatus.UNSUPPORTED_MEDIA_TYPE);
//    }
//    @ExceptionHandler({
//            BindException.class,
//            MethodArgumentNotValidException.class
//    })
//    public ResponseEntity<ErrorMessage> handleException(BindException  ex) {
//        ErrorMessage dto = new ErrorMessage(HttpStatus.BAD_REQUEST, "Validation error");
//        dto.setDetailedMessages(ex.getBindingResult().getAllErrors().stream()
//                .map(err -> err.unwrap(ConstraintViolation.class))
//                .map(err -> String.format("'%s' %s", err.getPropertyPath(), err.getMessage()))
//                .collect(Collectors.toList()));
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
//    }
    @ExceptionHandler(value = InvalidInputException.class)
    public ResponseEntity<ErrorMessage> handleInvalidInputException(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorMessage.builder().code("INVALID_INPUT").message(e.getMessage()).build());
    }
    @ExceptionHandler(value = AlreadyExistsException.class)
    public ResponseEntity<ErrorMessage> handleAlreadyExistsException(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorMessage.builder().code("ALREADY_EXIST").message(e.getMessage()).build());
    }
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorMessage> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(ErrorMessage.builder().code("FILE TO LARGE").message(exc.getMessage()).build());
    }
}
