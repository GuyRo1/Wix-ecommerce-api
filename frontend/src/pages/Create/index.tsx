
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormCreateProductMold as ProductMold } from '../../types';

import './styles.scss';
import { useStore } from '../../store';
import Form from '../../components/Form';
import Loader from '../../components/Loader';

const sleep = (timeout: number) => new Promise<void>(resolve=>{setTimeout(()=>{
  resolve()
},timeout)})

function Create() {


  const [loading, setLoading] = useState<boolean>(false);

  const createProduct = useStore(state => state.createProduct);

  const navigate = useNavigate();
  // create createProduct store action, add it here

  const onSubmit = useCallback(async (data: ProductMold) => {
    try {
      setLoading(true);
      await createProduct(data);
      await sleep(2000)
      setLoading(false);
      navigate('/');
    } catch (err) { setLoading(false); }
  }, []);


  return (
    <div className="create-app-container">
      {loading && <Loader />}
      <Form onSubmit={onSubmit} mode="Create" />
    </div>
  );
}

export default Create;
