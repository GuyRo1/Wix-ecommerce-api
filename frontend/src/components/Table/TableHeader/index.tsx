import { useStore } from '../../../store';
import './styles.scss';
import { Button } from '@mui/material';
import { FcRefresh } from "react-icons/fc";


const TableHeader = () => {
    const refresh = useStore(state => state.refresh);
    return (
        <div className="table-header">
            <div className="header-title">
                Table Header
            </div>
            <div className="actions">
                <Button  onClick={refresh}>
                    <FcRefresh size={24} />
                </Button>
            </div>
        </div>
    );
};

export default TableHeader;