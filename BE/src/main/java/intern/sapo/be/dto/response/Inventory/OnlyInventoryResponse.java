package intern.sapo.be.dto.response.Inventory;

import java.sql.Timestamp;

public class OnlyInventoryResponse {
	private Integer id;
	private String code;
	private String name;
	private String address;
	private Integer size;
	private Timestamp createAt;
	private Timestamp updateAt;
	private boolean isDelete;
	private Integer totalProductVariant;
}
