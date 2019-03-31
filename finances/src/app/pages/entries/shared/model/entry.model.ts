import { Category } from '../../../categories/shared/model/category.model';
import { BaseResourceModel } from '../../../../shared/model/base-resource.model';

export class Entry extends BaseResourceModel{
    constructor(
        public id?: number,
        public name?: string,
        public description?: string ,
        public type?: string ,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: Category
    ){
        super();
    }

    static types = {
        expense: "Despesa",
        revenue: "Receita",
    };

    getpaidText(): string{
        return this.paid? "Pago" : "Pendente";
    }
}