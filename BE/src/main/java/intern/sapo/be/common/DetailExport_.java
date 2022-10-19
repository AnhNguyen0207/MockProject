package intern.sapo.be.common;

import intern.sapo.be.entity.DetailsExport;
import intern.sapo.be.entity.ProductVariant;

import javax.persistence.metamodel.SingularAttribute;

public class DetailExport_ {
    public static volatile SingularAttribute<DetailsExport, Integer> id;
    public static volatile SingularAttribute<DetailsExport, String> code;
    public static volatile SingularAttribute<DetailsExport, Integer> quantity;
    public static volatile SingularAttribute<DetailsExport, ProductVariant> productVariant;
}
