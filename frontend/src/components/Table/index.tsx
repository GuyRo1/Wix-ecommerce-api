
import type { Product } from '../../validation';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

import './styles.scss';

type TableProps = {
    products: Product[];
};

const Table = ({ products }: TableProps) => {

    return (
        <div className="table-container">
            <TableHeader />
            <TableBody products={products} />
        </div>
    );
};

export default Table;