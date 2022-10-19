package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_variant_options")
@Getter
@Setter
public class ProductVariantOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@JoinColumn(name = "variant_id", nullable = false)
	private Integer variantId;

	@JoinColumn(name = "option_value_id", nullable = false)
	private Integer optionValueId;

}