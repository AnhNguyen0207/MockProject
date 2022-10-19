package intern.sapo.be.base;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Timestamp;
@MappedSuperclass
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {


    @Column(name = "create_at", nullable = false)
    @CreatedDate
    private Timestamp createAt;

    @Column(name = "update_at")
    @LastModifiedDate
    private Timestamp updateAt;
}
