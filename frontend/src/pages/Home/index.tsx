import { useEffect } from 'react';
import './styles.scss';
import Table from '../../components/Table';
import Header from '../../components/Header';
import { useStore } from '../../store';


function Home() {

  const products = useStore(state => state.products);
  const refresh = useStore(state => state.refresh);
  
  useEffect(() => {
    refresh();
  }, [refresh]);
  
  return (
    <div className="app-container">
      <Header numberOfProducts={products.length} />
      <Table products={products} />
    </div>
  );
}

export default Home;
