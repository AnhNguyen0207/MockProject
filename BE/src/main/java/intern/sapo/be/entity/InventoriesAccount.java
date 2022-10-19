package intern.sapo.be.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "inventories_accounts")
@Getter
@Setter
public class InventoriesAccount {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EmbeddedId
    private InventoriesAccountId id;

    @MapsId("accountId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @MapsId("inventoryId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "inventory_id", nullable = false)
    private Inventory inventory;



}