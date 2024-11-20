import { SyntheticEvent, useState } from 'react';
import type { Product } from '../../../../validation';
import { CiImageOff } from "react-icons/ci";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { Button } from '@mui/material';

import './styles.scss';
import Variants from './Variants';
import Actions from './Actions';


type ProductProps = {
    product: Product;
};

const ProductComponent = ({ product }: ProductProps) => {
    const [variantsOpen, setVariantsOpen] = useState<boolean>(false);
    const variants = product?.variants || [];
    const withVariants = variants.length > 1;
    const VariantsControlIcon = variantsOpen ? FaAngleUp : FaAngleDown;
    const toggleVariantsState = (e: SyntheticEvent) => {
        e.stopPropagation();
        if (withVariants) {
            setVariantsOpen(variantsOpen => !variantsOpen);
        }
    };
    const formattedPrice = product.priceData?.formatted?.price;
    return (
        <div className="product">
            <div className="main">
                <div className={`cell-variant-control`} onClick={toggleVariantsState} >
                    {withVariants ? (
                        <Button onClick={toggleVariantsState}>
                            <VariantsControlIcon size={20} />
                        </Button>
                    ) : null}
                </div>
                <div className="cell-thumbnail">
                    {product.media.mainMedia?.thumbnail.url ? (<img
                        src={product.media.mainMedia?.thumbnail.url}
                        alt={product.media.mainMedia?.title}
                    />) : (
                        <CiImageOff size={24} />
                    )}
                </div>
                <div className="cell-id">{product.id}</div>
                <div className="cell-name">{product.name}</div>
                <div className="cell-price">{formattedPrice}</div>
                <div className="cell-actions">
                    <Actions product={product}/>
                </div>
            </div>
            {variantsOpen && (
                <div className="variants">
                    <Variants variants={variants} isOpen={variantsOpen} />
                </div>
            )}
        </div>
    );
};

export default ProductComponent;