package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.sql.Timestamp;

@Entity
@Table(name = "exports_status")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class ExportsStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    @Column(name = "parent_id")
    private Integer parentId;
    @Column(name = "code", nullable = false)
    private String code;
    // @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Column(name = "export_id", nullable = false)
    private Integer export;

    // @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @Column(name = "status_id", nullable = false)
    private Integer status;

    @Column(name = "account_create", nullable = false)
    private Integer accountCreate;
    @Column(name = "account_send", nullable = false)
    private Integer accountSend;
    @Column(name = "account_receive", nullable = false)
    private Integer accountReceive;
    @Column(name = "account_cancel")
    private Integer accountCancel;
    @Column(name = "create_at", nullable = false)
    @CreatedDate
    private Timestamp createAt;
    @Column(name = "date_send")
    private String dateSend;
    @Column(name = "date_receive")
    private String dateReceive;
    @Column(name = "date_cancel")
    private String dateCancel;
    @Column(name = "date_update")
    private String dateUpdate;
    @Column(name = "status_cancel")
    private Boolean statusCancel = false;
    @Column(name = "note")
    private String note;
}