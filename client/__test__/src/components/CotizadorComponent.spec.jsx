import CotizadorComponent from "../../../src/components/CotizadorComponent";
import { render, screen, fireEvent } from '@testing-library/react';
import { coins } from "../../mocks/coins.mock";
import { valueCoins } from "../../helpers/returnValueCoin";
import { formatCurrencyWithOutFixed, formatCurrency } from "../../helpers/formatCurrency";

describe('CotizadorComponent Test', () => {

    beforeEach(()=>{
        render(<CotizadorComponent coins={coins} />);
    })

    test('Should render the Cotizador Component', () => {
        expect(screen.getByText("Resultado de la Inversion")).toBeDefined();
    });

    test('Should load the current value of each coin', async () => {

        let input;
        let { bitcoin, ethereum, cardano } = valueCoins(coins);

        bitcoin = formatCurrencyWithOutFixed(bitcoin); 
        ethereum = formatCurrencyWithOutFixed(ethereum); 
        cardano = formatCurrencyWithOutFixed(cardano);

        const wrapper = await screen.findByTestId('CotizadorComponent');

        input = wrapper.querySelector('#priceBitcoin');
        expect(input.value).toBe(bitcoin);

        input = wrapper.querySelector('#priceEthereum');
        expect(input.value).toBe(ethereum);

        input = wrapper.querySelector('#priceCardano');
        expect(input.value).toBe(cardano);
    })

    test('Should show with the investment how many coins you can have', async () => {
        let input;
        let { bitcoin, ethereum, cardano } = valueCoins(coins);

        const wrapper = await screen.findByTestId('CotizadorComponent');

        input = wrapper.querySelector('#inversion');
        const inversion = 30000;

        const qtyBitcoin  = formatCurrency(inversion / bitcoin);
        const qtyEthereum = formatCurrency(inversion / ethereum);
        const qtyCardano  = formatCurrency(inversion / cardano);

        await fireEvent.change(input, {target: {value: inversion}});
        
        input = wrapper.querySelector('#qtyBitcoin');
        expect(input.value).toBe(qtyBitcoin);

        input = wrapper.querySelector('#qtyEthereum');
        expect(input.value).toBe(qtyEthereum);

        input = wrapper.querySelector('#qtyCardano');
        expect(input.value).toBe(qtyCardano);
    })

    test('Should currency input results', async () => {

        let input;
        let { bitcoin, ethereum, cardano } = valueCoins(coins);

        const wrapper = await screen.findByTestId('CotizadorComponent');

        input = wrapper.querySelector('#inversion');
        const inversion = 30000;
        await fireEvent.change(input, {target: {value: inversion}});

        const months = Number(wrapper.querySelector('#months').textContent);

        const span_amount_bitcoin = wrapper.querySelector('#amount_bitcoin').textContent;
        const amount_bitcoin = formatCurrency(inversion * 0.050 * months);
        expect(span_amount_bitcoin).toBe(amount_bitcoin);

        const span_amount_ethereum = wrapper.querySelector('#amount_ethereum').textContent;
        const amount_ethereum = formatCurrency(inversion * 0.042 * months);
        expect(span_amount_ethereum).toBe(amount_ethereum);

        const span_amount_cardano = wrapper.querySelector('#amount_cardano').textContent;
        const amount_cardano = formatCurrency(inversion * 0.010 * months);
        expect(span_amount_cardano).toBe(amount_cardano);

    })
    
})