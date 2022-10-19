package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "details_exports")
@Getter
@Setter
public class DetailsExport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false)
    private String code;
    // @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @Column(name = "export_id", nullable = false)
    private Integer export;


     @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_variant_id", nullable = false)
    private ProductVariant productVariant;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

}