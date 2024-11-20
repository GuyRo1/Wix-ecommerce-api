import { Variant } from '../../../../../validation';

import './styles.scss';

type VariantsProps = {
    variants: Variant[];
    isOpen: boolean;
};

const Variants = ({ variants }: VariantsProps) => {
    const displayChoices = (variant: Variant): string => {
        const choicesArray = Object.keys(variant.choices).map((key) => ({ key: key, value: variant.choices[key] }));
        const choicesString = choicesArray.map((choice) => `${choice.key}: ${choice.value}`).join(', ');
        return choicesString;
    };
    const formattedPrice = (variant: Variant) => variant.variant.priceData?.formatted?.price

    return (
        <div className="variants-container">
            {variants.map((variant) => (
                <div className="variant" key={variant.id}>
                    <div className="cell-id">{variant.id}</div>
                    <div className="cell-sku">{variant.variant.sku}</div>
                    <div className="cell-variant">{displayChoices(variant)}</div>
                    <div className="cell-price">{formattedPrice(variant)}</div>
                    </div>
            ))}
                </div>
            );
};

            export default Variants;;