package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
public class InventoriesAccountId implements Serializable {
    private static final long serialVersionUID = 8274229272998471067L;
    @Column(name = "account_id", nullable = false)
    private Integer accountId;

    @Column(name = "inventory_id", nullable = false)
    private Integer inventoryId;



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        InventoriesAccountId entity = (InventoriesAccountId) o;
        return Objects.equals(this.accountId, entity.accountId) &&
                Objects.equals(this.inventoryId, entity.inventoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountId, inventoryId);
    }

}