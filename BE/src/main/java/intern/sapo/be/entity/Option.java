package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "options")
@Getter
@Setter
public class Option {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Integer id;

	@JoinColumn(name = "product_id", nullable = false)
	private Integer productId;

	@Column(name = "name", nullable = false, length = 200)
	private String name;

}