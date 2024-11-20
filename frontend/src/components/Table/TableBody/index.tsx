import type { Product } from '../../../validation';

import './styles.scss';
import ProductComponent from './Product';

type TableProps = {
    products: Product[];
};

const Table = ({ products }: TableProps) => {
    return (
        <div className="table-body-container">
            {
                products.map((product) => (
                    <ProductComponent key={product.id} product={product} />
                ))
            }
        </div>
    );
};

export default Table;