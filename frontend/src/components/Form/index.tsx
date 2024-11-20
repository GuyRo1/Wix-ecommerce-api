import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormUpdateProductMold as UpdateProductMold, FormCreateProductMold as ProductMold } from "../../types";
import { TextareaAutosize, TextField, Checkbox } from "@mui/material";

import './styles.scss';

type FormProps = {
    onSubmit?: (product: ProductMold) => Promise<void> | void;
    defaultValues?: ProductMold | UpdateProductMold;
    mode: 'Edit' | 'View' | 'Create';
};

const Form = ({ onSubmit, defaultValues, mode }: FormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductMold>({ defaultValues });

    const onSubmitHandler = mode === 'View' || !onSubmit ? () => { } : onSubmit;
    const [withChoices, setWithChoices] = useState<boolean>(mode !== 'Create' && !!defaultValues?.choices);
    return (<form className="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <TextField
            label="Image"
            error={!!errors.imageUrl}
            helperText={mode == 'Edit' ? "Updating Image on existing Product is managed on Wix dashboard" : "Image URL or wix media ID"}
            {...register('imageUrl', { minLength: 2 })}
            disabled={mode !== 'Create'}
        />
        <TextField
            label="Product Name"
            error={!!errors.name}
            {...register('name', { required: true })}
            disabled={mode === "View"}
        />
        <TextField
            label="ribbon"
            {...register('ribbon',)}
            helperText="e.g Best Seller, New Arrival"
            disabled={mode === "View"}
        />
        <div>Description</div>
        <TextareaAutosize disabled={mode === "View"} className="text-area" minRows={4} {...register('description')} />
        <TextField disabled={mode === "View"} type="double" error={!!errors.price} label="Price" {...register('price', { required: true })} />
        <div className="choices-cb-container">
            {<Checkbox disabled={mode !== 'Create'} checked={withChoices} value={withChoices} onChange={() => setWithChoices(state => !state)} />}
            <div className="cb-label">Product with choices</div>
        </div>
        {
            withChoices && (
                <div className="choices-container">
                    <TextField label="Choices Name" helperText="e.g. Size" {...register('choices.name')} />
                    <div className="section">
                        <TextField disabled={mode === 'View'} label="First value" helperText="e.g. S" {...register('choices.one.value')} />
                        <TextField disabled={mode === 'View'} label="First description" helperText="e.g. Small" {...register('choices.one.description')} />
                    </div>
                    <div className="section">
                        <TextField disabled={mode === 'View'} label="Second value" helperText="e.g. M" {...register('choices.two.value')} />
                        <TextField disabled={mode === 'View'} label="Second description" helperText="e.g. Medium" {...register('choices.two.description')} />
                    </div>
                    <div className="section">
                        <TextField disabled={mode === 'View'} label="Third value" helperText="e.g. L" {...register('choices.three.value')} />
                        <TextField disabled={mode === 'View'} label="Third description" helperText="e.g. Large" {...register('choices.three.description')} />
                    </div>
                </div>
            )
        }
        <TextField disabled={mode === "View"} type="submit" />
    </form>);
};

export default Form;