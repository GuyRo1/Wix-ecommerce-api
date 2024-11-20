
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


import './styles.scss';
import { useStore } from '../../store';
import Loader from '../../components/Loader';
import Form from '../../components/Form';


function View() {
  const { id } = useParams();
  const getProduct = useStore(state => state.getProduct);
  const product = useStore(state => state.product);

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  return (
    <div className="view-app-container">
      {!product ? <Loader /> : (
        <>
          <div className="title">Product: <span className="id">{product.id}</span></div>
          <Form mode="View" defaultValues={{
            imageUrl: product?.media?.mainMedia?.thumbnail?.url || '',
            name: product.name,
            ribbon: '',
            description: '',
            price: product.priceData.price.toString(),
          }} />
        </>)
      }
    </div>

  );
}

export default View;
