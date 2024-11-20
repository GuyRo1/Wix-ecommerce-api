import { Button } from '@mui/material';
import './styles.scss'
import { useNavigate } from 'react-router-dom';


type TableHeaderProps = {
    numberOfProducts: number;
};

const Header = ({ numberOfProducts }: TableHeaderProps) => {
    const navigate = useNavigate();
    const openProductCreate = () => {
        navigate('/create');
    }
    return (
        <div className="header">
            <div className="title">
                <span className="label">Products</span>
                <span className="number-of-products">{numberOfProducts}</span>
            </div>
            <div className="actions">
            <Button variant="contained" onClick={openProductCreate}>+</Button>
            </div>
        </div>
    );
};

export default Header;