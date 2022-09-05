package intern.sapo.be.execptionAdivice;

import intern.sapo.be.dto.request.ApiResponse;
import intern.sapo.be.entity.Account;
import intern.sapo.be.exception.AccountException;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {
	private MessageSource messageSource;

	public ExceptionController(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

	private String resolvePathFromRequest(WebRequest request) {
		return ((ServletWebRequest) request).getRequest().getRequestURI();
	}

	@ExceptionHandler(value = AccountException.class)
	@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
	@ResponseBody
	public ApiResponse handleAccountException(AccountException ex, WebRequest request) {
		return new ApiResponse(false, ex.getMessage(), ex.getClass().getName(), resolvePathFromRequest(request));
	}

	@ExceptionHandler(value = NoSuchElementException.class)
	@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
	@ResponseBody
	public ApiResponse handleNotFoundElementException(NoSuchElementException ex, WebRequest request) {
		return new ApiResponse(false, ex.getMessage(), ex.getClass().getName(), resolvePathFromRequest(request));
	}
}
