import { useState } from "react";
import { Button } from "@mui/material";
import { useStore } from "../../../../../store";
import { Product } from "../../../../../validation";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import { Tooltip } from 'react-tooltip';
import './styles.scss';
import { useNavigate } from "react-router-dom";
import Loader from "../../../../Loader";

type ActionsProps = {
    product: Product;
};

const sleep = (time: number) => new Promise<void>(resolve => {
    setTimeout(() => {
        resolve();
    }), time;
});

const Actions = ({ product }: ActionsProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const updateVisibility = useStore(state => state.updateVisibility);
    const deleteProduct = useStore(state => state.deleteProduct);
    const refresh = useStore(state => state.refresh);
    const onUpdateVisibility = async () => {
        await updateVisibility(product.id, !product.visible);
        toast.success(`Product: ${product.id} is now ${product.visible ? 'Not' : ''} visible in Wix Store`);
    };
    const onClickEdit = () => {
        navigate(`/${product.id}/edit`);
    };
    const onClickView = () => {
        navigate(`/${product.id}/view`);
    };
    const onClickDelete = async () => {
        try {
            const userConfirmed = window.confirm("Are you sure you want to delete this item?");
            if (userConfirmed) {
                setLoading(true)
                await deleteProduct(product.id);
                await sleep(3000);
                await refresh();
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }

    };
    const VisibilityIcon = product.visible ? FaRegEye : FaRegEyeSlash;
    const visibilityTooltipText = product.visible ? 'Hide from WIX store' : 'Show on WIX store';

    return (
        <div className="product-actions">
            {loading && <Loader />}
            <div data-tooltip-id="product-visibility" data-tooltip-content={visibilityTooltipText} className="action">
                <Button onClick={onUpdateVisibility}>
                    <VisibilityIcon />
                </Button>
                <Tooltip id="product-visibility" />
            </div>
            <div data-tooltip-id="product-edit" data-tooltip-content="Edit Product" className="action">
                <Button onClick={onClickEdit}>
                    <FiEdit2 />
                </Button>
                <Tooltip id="product-edit"></Tooltip>
            </div>
            <div data-tooltip-id="product-view" data-tooltip-content="View Product" className="action">
                <Button onClick={onClickView}>
                    <FaMagnifyingGlass />
                </Button>
                <Tooltip id="product-view"></Tooltip>
            </div>
            <div data-tooltip-id="delete" data-tooltip-content="Delete Product" className="action">
                <Button onClick={onClickDelete}>
                    <FaRegTrashCan />
                </Button>
                <Tooltip id="delete"></Tooltip>
            </div>
        </div>
    );
};

export default Actions;