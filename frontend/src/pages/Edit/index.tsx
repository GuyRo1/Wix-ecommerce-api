
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { FormUpdateProductMold, FormCreateProductMold as ProductMold } from '../../types';

import './styles.scss';
import { useStore } from '../../store';
import Loader from '../../components/Loader';
import Form from '../../components/Form';


function Edit() {
  const [loading, setLoading] = useState<boolean>(false)
  const { id } = useParams();
  const getProduct = useStore(state => state.getProduct);
  const updateProduct = useStore(state => state.updateProduct);
  const product = useStore(state => state.product);
  const navigate = useNavigate();
  const defaultValues: FormUpdateProductMold | undefined = !product ? undefined : {
    imageUrl: product?.media?.mainMedia?.thumbnail?.url || '',
    name: product.name,
    ribbon: product.ribbon,
    description: '',
    price: product.priceData.price.toString(),
    choices: !Array.isArray(product?.productOptions?.[0]?.choices) ? undefined:
    {
      name: product?.productOptions?.[0]?.name,
      one: product?.productOptions?.[0]?.choices?.[0],
      two: product?.productOptions?.[0]?.choices?.[1],
      three: product?.productOptions?.[0]?.choices?.[1]
    }
  };

  const onSubmit = async (data: ProductMold) => {
    try{
    if (!defaultValues) return;
    const diff: FormUpdateProductMold = {};
    if (data.description !== defaultValues.description) diff.description = data.description;
    if (data.imageUrl !== defaultValues.imageUrl) diff.imageUrl = data.imageUrl;
    if (data.name !== defaultValues.name) diff.name = data.name;
    if (data.price !== defaultValues.price) diff.price = data.price;
    if (data.ribbon !== defaultValues.ribbon) diff.ribbon = data.ribbon;
    if (Object.keys(diff).length < 1) return;
    if (!id) return;
    await updateProduct(id, diff);
    navigate('/')
    }catch(err){
      setLoading
    }

  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  return (
    <div className="edit-app-container">
      {!product ? <Loader /> : (
        <>
          {loading && <Loader />}
          <div className="title">Product: <span className="id">{product.id}</span></div>
          <Form onSubmit={onSubmit} mode="Edit" defaultValues={defaultValues} />
        </>)
      }
    </div>

  );
}

export default Edit;
