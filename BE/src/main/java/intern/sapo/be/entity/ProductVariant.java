package intern.sapo.be.entity;

import intern.sapo.be.dto.request.Product.ProductVariantDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@NamedNativeQuery(
        name = "getFeaturedProductDTO",
        query = "set @searchValue = lower(?);\n" +
                "select pv.id,\n" +
                "       pv.code,\n" +
                "       pv.name,\n" +
                "       IF(quantity > 0, sum(quantity), 0)    as quantity,\n" +
                "       IF(import_price > 0, import_price, 0) as importPrice\n" +
                "from product_variants pv\n" +
                "         left join inventories_product_variant ipv on pv.id = ipv.product_variant_id\n" +
                "         inner join products p on pv.product_id = p.id\n" +
                "where (p.is_delete = false and pv.is_delete = false) and   ( lower(pv.name) like concat('%',@searchValue,'%') or pv.code like concat('%',@searchValue,'%'))\n" +
                "group by pv.id, pv.code, pv.name, IF(import_price > 0, import_price, 0)\n" +
                "order by pv.id desc;",
        resultSetMapping = "FeaturedProductVariant"
)
@SqlResultSetMapping(
		name = "FeaturedProductVariant",
		classes = {
				@ConstructorResult(
						targetClass = ProductVariantDTO.class,
						columns = {
								@ColumnResult(name="id", type = Integer.class),
								@ColumnResult(name="code", type = String.class),
								@ColumnResult(name="name", type = String.class),
								@ColumnResult(name="quantity", type = Integer.class),
								@ColumnResult(name="importPrice", type = BigDecimal.class),
						}
				)
		}
)
public class ProductVariant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@Column(name = "code", nullable = false, length = 100)
	private String code;

	@JoinColumn(name = "product_id", nullable = false)
	private Integer productId;


	@Column(name = "name", nullable = false, length = 200)
	private String name;

    @Lob
    @Column(name = "image")
    private String image;



	@Column(name = "wholesale_price", nullable = false, precision = 20, scale = 2,columnDefinition = " default (0)")
	private BigDecimal wholesalePrice;

	@Column(name = "sale_price", nullable = false, precision = 20, scale = 2, columnDefinition = " default (0)")
	private BigDecimal salePrice;
	@Column(name = "import_price", nullable = false, precision = 20, scale = 2, columnDefinition = " default (0)")
	private BigDecimal importPrice;

	@Column(name = "is_delete")
	private Boolean isDelete = false;

}