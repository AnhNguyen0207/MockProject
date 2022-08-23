package com.vnpt.meeting.booking.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class UserRegistrationException extends RuntimeException {
    private final String user;
    private final String message;

    public UserRegistrationException(String user, String message) {
        super(String.format("Xảy ra lỗi khi cập nhật thông tin user [%s] : '%s'", user, message));
        this.user = user;
        this.message = message;
    }
}