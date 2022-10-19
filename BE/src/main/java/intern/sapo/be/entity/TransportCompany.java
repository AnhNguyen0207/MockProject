package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "transport_companies")
@Getter
@Setter
public class TransportCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false, length = 200)
    private String code;

    @Lob
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, length = 200)
    private String email;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Lob
    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "account_id", nullable = false)
    private Integer accountId;

    @Column(name = "create_at", nullable = false)
    private Timestamp createAt;

    @Column(name = "update_at")
    private Timestamp updateAt;

    @Column(name = "is_delete", nullable = false)
    private Boolean isDelete = false;


}